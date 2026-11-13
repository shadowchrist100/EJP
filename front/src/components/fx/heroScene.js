/**
 * heroScene — Three.js scene for the home Hero, loaded on demand by HeroCanvas.jsx.
 *
 * Layer 1: full-screen photo plane with a liquid cursor distortion, chromatic
 *          aberration and a noise-driven "burn" transition between slides.
 * Layer 2: golden dust (points) rendered with a perspective camera on top.
 *
 * mountScene() returns { setSlide(i), dispose() }.
 */
import {
    AdditiveBlending, BufferAttribute, BufferGeometry, Color, Mesh, OrthographicCamera,
    PerspectiveCamera, PlaneGeometry, Points, Scene, ShaderMaterial, SRGBColorSpace,
    TextureLoader, Vector2, WebGLRenderer,
} from 'three';

const PHOTO_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const PHOTO_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uAspectA;   // cover-fit scale for texture A
uniform vec2 uAspectB;
uniform float uProgress; // 0 = A, 1 = B
uniform float uTime;
uniform vec2 uMouse;     // 0..1
uniform vec2 uVel;       // cursor velocity (smoothed)
uniform float uScroll;   // 0..1 scroll-out
uniform float uReveal;   // 0..1 intro reveal
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
    return v;
}
vec2 cover(vec2 uv, vec2 s) { return (uv - 0.5) * s + 0.5; }

void main() {
    vec2 uv = vUv;

    // Slow breathing zoom + scroll-out zoom
    float zoom = 1.0 - 0.04 * (0.5 + 0.5 * sin(uTime * 0.25)) - uScroll * 0.15;
    uv = (uv - 0.5) * zoom + 0.5;

    // Liquid distortion around the cursor: ripple + velocity smear
    vec2 d = uv - uMouse;
    d.x *= 1.6;
    float dist = length(d);
    float ring = exp(-dist * 4.5) * sin(dist * 22.0 - uTime * 5.0) * 0.012;
    vec2 smear = uVel * exp(-dist * 3.5) * 0.35;
    uv += normalize(d + 1e-4) * ring + smear;

    // Gentle global liquid wobble
    float w = fbm(uv * 3.0 + uTime * 0.12);
    uv += (w - 0.5) * 0.012;

    // Burn transition mask
    float n = fbm(vUv * 4.0 + 7.0);
    float p = uProgress * 1.4 - 0.2;
    float t = 1.0 - smoothstep(p - 0.15, p + 0.15, n); // 0 → A, 1 → B
    float burn = smoothstep(0.0, 0.5, t) * (1.0 - smoothstep(0.5, 1.0, t));

    // Chromatic aberration (stronger near cursor and during transition)
    float ca = 0.004 + exp(-dist * 4.0) * 0.012 + burn * 0.02;
    vec2 dir = normalize(uv - 0.5 + 1e-4);

    vec2 ua = cover(uv, uAspectA), ub = cover(uv, uAspectB);
    vec3 a = vec3(texture2D(uTexA, ua + dir * ca).r, texture2D(uTexA, ua).g, texture2D(uTexA, ua - dir * ca).b);
    vec3 b = vec3(texture2D(uTexB, ub + dir * ca).r, texture2D(uTexB, ub).g, texture2D(uTexB, ub - dir * ca).b);

    vec3 col = mix(a, b, t);
    col += vec3(1.0, 0.55, 0.12) * burn * 1.4; // glowing gold edge during the burn

    // Warm amber grade + vignette + cursor spotlight
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 graded = mix(col, vec3(lum) * vec3(1.25, 0.95, 0.65), 0.25);
    graded *= 0.9;
    float spot = exp(-dist * 2.4) * 0.5;
    graded += col * spot;
    float vig = smoothstep(1.3, 0.3, length((vUv - 0.5) * vec2(1.3, 1.0)));
    graded *= 0.7 + 0.3 * vig;

    // Intro reveal: image resolves out of darkness + grain
    float r = smoothstep(0.0, 1.0, uReveal);
    graded *= r;
    float grain = (hash(vUv * 900.0 + fract(uTime)) - 0.5) * 0.05;
    gl_FragColor = vec4(graded + grain, 1.0);
}
`;

const DUST_VERT = /* glsl */ `
uniform float uTime; uniform float uPixelRatio; uniform vec2 uMouse;
attribute float aSeed; attribute float aSize;
varying float vSeed; varying float vAlpha;
void main() {
    vec3 p = position;
    float t = uTime * (0.15 + aSeed * 0.25);
    p.x += sin(t + aSeed * 6.2831) * 0.6;
    p.y += cos(t * 0.8 + aSeed * 12.0) * 0.4 + uTime * (0.05 + aSeed * 0.08);
    p.y = mod(p.y + 6.0, 12.0) - 6.0;
    p.xy += uMouse * (p.z + 5.0) * 0.12;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * 30.0 * uPixelRatio / -mv.z;
    vSeed = aSeed;
    vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 40.0));
}
`;
const DUST_FRAG = /* glsl */ `
uniform vec3 uColorA; uniform vec3 uColorB; varying float vSeed; varying float vAlpha;
void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = pow(smoothstep(0.5, 0.0, d), 2.2);
    gl_FragColor = vec4(mix(uColorA, uColorB, vSeed * vSeed), glow * vAlpha);
}
`;

const COUNT = 1100;

export function mountScene(host, { images, onReady }) {
    let renderer;
    try {
        renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    } catch {
        return { setSlide() {}, setScroll() {}, dispose() {} };
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.autoClear = false;
    host.appendChild(renderer.domElement);

    // ── Photo plane ──────────────────────────────────────────────
    const photoScene = new Scene();
    const ortho = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const textures = images.map(() => null);
    const aspects = images.map(() => new Vector2(1, 1));
    const pu = {
        uTexA: { value: null }, uTexB: { value: null },
        uAspectA: { value: new Vector2(1, 1) }, uAspectB: { value: new Vector2(1, 1) },
        uProgress: { value: 0 }, uTime: { value: 0 },
        uMouse: { value: new Vector2(0.5, 0.5) }, uVel: { value: new Vector2() },
        uScroll: { value: 0 }, uReveal: { value: 0 },
    };
    const photoMat = new ShaderMaterial({ vertexShader: PHOTO_VERT, fragmentShader: PHOTO_FRAG, uniforms: pu, depthTest: false });
    photoScene.add(new Mesh(new PlaneGeometry(2, 2), photoMat));

    let viewW = 1, viewH = 1;
    const computeAspect = (i) => {
        const tex = textures[i];
        if (!tex) return;
        const img = tex.image;
        const ia = img.width / img.height, va = viewW / viewH;
        // UV scale so that the image covers the view
        aspects[i].set(va > ia ? 1 : va / ia, va > ia ? ia / va : 1);
    };

    const start = performance.now();
    let current = 0, from = 0, transitionStart = -1, ready = false, readyAt = -1;
    const loader = new TextureLoader();
    images.forEach((src, i) => {
        loader.load(src, (tex) => {
            tex.colorSpace = SRGBColorSpace;
            textures[i] = tex;
            computeAspect(i);
            if (i === current && !ready) {
                pu.uTexA.value = tex; pu.uTexB.value = tex;
                pu.uAspectA.value.copy(aspects[i]); pu.uAspectB.value.copy(aspects[i]);
                ready = true;
                readyAt = (performance.now() - start) / 1000;
                host.classList.add('is-ready');
                onReady?.();
            }
        });
    });

    // ── Dust ────────────────────────────────────────────────────
    const dustScene = new Scene();
    const persp = new PerspectiveCamera(60, 1, 0.1, 100);
    persp.position.z = 8;
    const pos = new Float32Array(COUNT * 3), seeds = new Float32Array(COUNT), sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20; pos[i * 3 + 1] = (Math.random() - 0.5) * 12; pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        seeds[i] = Math.random(); sizes[i] = 0.4 + Math.random() ** 3 * 2.4;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    geo.setAttribute('aSize', new BufferAttribute(sizes, 1));
    const du = {
        uTime: { value: 0 }, uPixelRatio: { value: pixelRatio }, uMouse: { value: new Vector2() },
        uColorA: { value: new Color('#F59E0B') }, uColorB: { value: new Color('#FEF3C7') },
    };
    const dustMat = new ShaderMaterial({ vertexShader: DUST_VERT, fragmentShader: DUST_FRAG, uniforms: du, transparent: true, depthWrite: false, blending: AdditiveBlending });
    const dust = new Points(geo, dustMat);
    dustScene.add(dust);

    // ── Sizing / input ──────────────────────────────────────────
    const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        viewW = w; viewH = h;
        renderer.setSize(w, h, false);
        persp.aspect = w / h; persp.updateProjectionMatrix();
        textures.forEach((t, i) => t && computeAspect(i));
        pu.uAspectA.value.copy(aspects[from]); pu.uAspectB.value.copy(aspects[current]);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const target = { x: 0.5, y: 0.5 };
    let lastX = 0.5, lastY = 0.5;
    const onMove = (e) => {
        const r = host.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
    };

    let scrollTarget = 0;
    const render = () => {
        const t = (performance.now() - start) / 1000;
        pu.uTime.value = t; du.uTime.value = t;

        const m = pu.uMouse.value;
        m.x += (target.x - m.x) * 0.08; m.y += (target.y - m.y) * 0.08;
        const v = pu.uVel.value;
        v.x += ((m.x - lastX) - v.x) * 0.12; v.y += ((m.y - lastY) - v.y) * 0.12;
        lastX = m.x; lastY = m.y;
        du.uMouse.value.set((m.x - 0.5) * 2, (m.y - 0.5) * 2);
        pu.uScroll.value += (scrollTarget - pu.uScroll.value) * 0.1;
        if (readyAt >= 0) pu.uReveal.value = Math.min(1, (t - readyAt) / 1.6);

        if (transitionStart >= 0) {
            const p = Math.min(1, (t - transitionStart) / 1.6);
            pu.uProgress.value = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            if (p >= 1) { transitionStart = -1; from = current; pu.uTexA.value = textures[current]; pu.uAspectA.value.copy(aspects[current]); pu.uProgress.value = 0; }
        }

        dust.rotation.y = t * 0.02 + du.uMouse.value.x * 0.1;
        dust.rotation.x = du.uMouse.value.y * 0.06;

        renderer.clear();
        if (ready) renderer.render(photoScene, ortho);
        renderer.render(dustScene, persp);
    };

    let onScreen = true;
    const sync = () => renderer.setAnimationLoop(onScreen && !document.hidden && !reduceMotion ? render : null);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    io.observe(host);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', onMove, { passive: true });
    if (reduceMotion) { pu.uReveal.value = 1; const once = () => { render(); if (!ready) requestAnimationFrame(once); }; once(); }
    sync();

    return {
        setSlide(i) {
            if (i === current || !textures[i] || !ready) { if (textures[i]) { current = i; } return; }
            from = current; current = i;
            pu.uTexA.value = textures[from]; pu.uAspectA.value.copy(aspects[from]);
            pu.uTexB.value = textures[i]; pu.uAspectB.value.copy(aspects[i]);
            transitionStart = (performance.now() - start) / 1000;
            if (reduceMotion) { pu.uProgress.value = 1; render(); }
        },
        setScroll(p) { scrollTarget = p; },
        dispose() {
            renderer.setAnimationLoop(null);
            io.disconnect(); ro.disconnect();
            document.removeEventListener('visibilitychange', sync);
            window.removeEventListener('pointermove', onMove);
            textures.forEach((x) => x && x.dispose());
            geo.dispose(); dustMat.dispose(); photoMat.dispose();
            renderer.dispose(); renderer.domElement.remove();
            host.classList.remove('is-ready');
        },
    };
}
