/**
 * goldScene — Three.js golden-dust scene, loaded on demand by GoldParticles.jsx.
 * Named imports let Rollup tree-shake the parts of three we don't use.
 */
import {
    AdditiveBlending, BufferAttribute, BufferGeometry, Color, PerspectiveCamera,
    Points, Scene, ShaderMaterial, Vector2, WebGLRenderer,
} from 'three';

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uRise;
uniform vec2 uMouse;
attribute float aSeed;
attribute float aSize;
varying float vSeed;
varying float vAlpha;

void main() {
    vec3 p = position;
    float t = uTime * (0.15 + aSeed * 0.25);
    p.x += sin(t + aSeed * 6.2831) * 0.6;
    p.y += cos(t * 0.8 + aSeed * 12.0) * 0.4;

    float risen = mod(p.y + uTime * (0.25 + aSeed * 0.45) + 6.0, 12.0) - 6.0;
    p.y = mix(p.y, risen, uRise);

    // Depth parallax: nearer particles follow the cursor more.
    p.xy += uMouse * (p.z + 5.0) * 0.08;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * 28.0 * uPixelRatio / -mv.z;

    vSeed = aSeed;
    vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 40.0));
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vSeed;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = pow(smoothstep(0.5, 0.0, d), 2.2);
    vec3 col = mix(uColorA, uColorB, vSeed * vSeed);
    gl_FragColor = vec4(col, glow * vAlpha);
}
`;

export function mountScene(host, { count, variant }) {
    let renderer;
    try {
        renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    } catch {
        return () => {};
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 18;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        seeds[i] = Math.random();
        sizes[i] = 0.4 + Math.random() ** 3 * 2.2;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    geometry.setAttribute('aSize', new BufferAttribute(sizes, 1));

    const uniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uRise: { value: variant === 'rise' ? 1 : 0 },
        uMouse: { value: new Vector2() },
        uColorA: { value: new Color('#F59E0B') },
        uColorB: { value: new Color('#FEF3C7') },
    };

    const material = new ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const mouseTarget = { x: 0, y: 0 };
    const onPointerMove = (e) => {
        mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const start = performance.now();
    const render = () => {
        const t = (performance.now() - start) / 1000;
        uniforms.uTime.value = t;
        const m = uniforms.uMouse.value;
        m.x += (mouseTarget.x - m.x) * 0.04;
        m.y += (mouseTarget.y - m.y) * 0.04;
        points.rotation.y = t * 0.015 + m.x * 0.08;
        points.rotation.x = m.y * 0.05;
        renderer.render(scene, camera);
    };

    render();
    host.classList.add('is-ready');

    if (reduceMotion) {
        return () => {
            resizeObserver.disconnect();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }

    let onScreen = false;
    const sync = () => renderer.setAnimationLoop(onScreen && !document.hidden ? render : null);
    const intersection = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
    });
    intersection.observe(host);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
        renderer.setAnimationLoop(null);
        intersection.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', sync);
        window.removeEventListener('pointermove', onPointerMove);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
    };
}
