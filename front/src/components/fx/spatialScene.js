/**
 * spatialScene — the home Hero's Three.js scene, loaded on demand by SpatialHero.jsx.
 *
 *  - Background: radial amber light tinted by the current slide photo (ambient colour shift).
 *  - Centre: the EJP monogram as a solid gold 3D emblem (stacked alpha slices = extrusion),
 *    tilting toward the cursor; hover/click → spin + particle burst.
 *  - Halo rings, floating gold/glass shards and a 3-depth gold particle field; particles and
 *    shards are pushed away from the cursor ray (force field).
 *  - Intro choreography (GSAP): the emblem assembles slice by slice, particles explode out.
 *
 * mountSpatialScene(host, opts) → { setSlide(i), setScroll(p), burst(), dispose() }
 */
import {
    ACESFilmicToneMapping, AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture,
    CircleGeometry, Color, DirectionalLight, DoubleSide, Group, IcosahedronGeometry, Mesh,
    MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, OctahedronGeometry,
    PerspectiveCamera, PlaneGeometry, PMREMGenerator, PointLight, Points, Raycaster, Scene,
    ShaderMaterial, SRGBColorSpace, TetrahedronGeometry, TextureLoader,
    TorusGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import gsap from 'gsap';

/* ── Background: radial amber + blurred slide photo + slow light rays ─────────── */
const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }
`;
const BG_FRAG = /* glsl */ `
uniform sampler2D uPhotoA;
uniform sampler2D uPhotoB;
uniform float uMix;
uniform float uHasPhoto;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uTime;
uniform float uScroll;
uniform float uFlash;
varying vec2 vUv;
void main() {
    vec2 c = vec2(0.5 + uMouse.x * 0.06, 0.5 + uMouse.y * 0.05);
    vec2 d = (vUv - c) * vec2(uAspect, 1.0);
    float r = length(d);
    vec3 base = vec3(0.022, 0.018, 0.014);
    vec3 amber = vec3(0.96, 0.58, 0.05);

    vec3 col = mix(amber * 0.075, base, smoothstep(0.0, 0.85, r));
    col += amber * 0.05 * exp(-r * r * 9.0) * (0.85 + 0.15 * sin(uTime * 0.7));

    // Slow rotating light rays from behind the emblem
    float a = atan(d.y, d.x);
    float rays = pow(max(0.0, sin(a * 7.0 + uTime * 0.12)), 10.0) + pow(max(0.0, sin(a * 11.0 - uTime * 0.08)), 14.0) * 0.6;
    col += amber * rays * exp(-r * 2.4) * 0.045;

    // Ambient colour from the active photo (very blurred via mip bias)
    vec3 pa = texture2D(uPhotoA, vUv, 7.0).rgb;
    vec3 pb = texture2D(uPhotoB, vUv, 7.0).rgb;
    vec3 ph = mix(pa, pb, uMix);
    col += ph * ph * 0.10 * (1.0 - smoothstep(0.1, 1.1, r)) * uHasPhoto;

    col += amber * uFlash * 0.12 * exp(-r * 3.0);
    col *= 1.0 - uScroll * 0.55;
    gl_FragColor = vec4(col, 1.0);
}
`;

/* ── Particles: drift + cursor-ray repulsion + burst + intro assembly ────────── */
const P_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uRayO;
uniform vec3 uRayD;
uniform float uRepel;
uniform float uBurst;
uniform float uAssemble;
uniform float uScroll;
attribute float aSeed;
attribute float aSize;
varying float vSeed;
varying float vAlpha;
void main() {
    vec3 p = position;
    float t = uTime * (0.12 + aSeed * 0.2);
    p.x += sin(t + aSeed * 6.2831) * 0.5;
    p.y += cos(t * 0.8 + aSeed * 12.0) * 0.4;
    p.z += sin(t * 0.6 + aSeed * 3.0) * 0.3;

    // Intro: everything starts collapsed in the emblem, then explodes outward
    float delay = aSeed * 0.45;
    float k = clamp((uAssemble - delay) / (1.0 - delay + 1e-4), 0.0, 1.0);
    k = 1.0 - pow(1.0 - k, 3.0);
    p *= k;

    // Burst (click / slide change) and scroll spread
    vec3 dir = normalize(p + vec3(1e-4));
    p += dir * (uBurst * (0.6 + aSeed * 1.6) + uScroll * 2.5);

    // Force field around the cursor ray
    vec3 v = p - uRayO;
    vec3 closest = uRayO + uRayD * dot(v, uRayD);
    vec3 away = p - closest;
    float dist = length(away);
    float f = smoothstep(1.9, 0.0, dist);
    p += normalize(away + vec3(1e-4)) * f * f * uRepel * (1.0 + aSeed);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * 34.0 * uPixelRatio / -mv.z * (1.0 + f * 1.5);
    vSeed = aSeed;
    vAlpha = (0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 40.0))) * k + f * 0.6;
}
`;
const P_FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying float vSeed;
varying float vAlpha;
void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = pow(smoothstep(0.5, 0.0, d), 2.0);
    vec3 col = mix(uColorA, uColorB, vSeed * vSeed);
    gl_FragColor = vec4(col * 1.4, glow * vAlpha);
}
`;

const GOLD = new Color('#f2b33d');
const GOLD_DEEP = new Color('#b8781c');

export function mountSpatialScene(host, { emblem, photos = [], compact = false, onReady }) {
    let renderer;
    try {
        renderer = new WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch {
        return { setSlide() {}, setScroll() {}, burst() {}, dispose() {} };
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const pmrem = new PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    /* Background quad */
    const loader = new TextureLoader();
    const blank = new CanvasTexture(document.createElement('canvas'));
    const bgU = {
        uPhotoA: { value: blank }, uPhotoB: { value: blank }, uMix: { value: 0 }, uHasPhoto: { value: 0 },
        uMouse: { value: new Vector2() }, uAspect: { value: 1 }, uTime: { value: 0 }, uScroll: { value: 0 }, uFlash: { value: 0 },
    };
    const bg = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({ vertexShader: BG_VERT, fragmentShader: BG_FRAG, uniforms: bgU, depthWrite: false, depthTest: false }));
    bg.frustumCulled = false;
    bg.renderOrder = -1;
    scene.add(bg);

    let currentSlide = 0;
    const photoTex = photos.map(() => null);
    photos.forEach((src, i) => loader.load(src, (t) => {
        t.colorSpace = SRGBColorSpace;
        photoTex[i] = t;
        if (i === currentSlide) { bgU.uPhotoA.value = t; bgU.uPhotoB.value = t; bgU.uHasPhoto.value = 1; }
    }));

    /* Rig (whole-scene parallax) */
    const rig = new Group();
    scene.add(rig);

    /* Lights: warm key + cursor-following light */
    const key = new DirectionalLight(0xffd59a, 2.2);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const cursorLight = new PointLight(0xffb347, 25, 14, 2);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    /* Emblem: stacked alpha slices = extruded gold monogram */
    const fit = new Group(); // responsive scale only (set on resize)
    const emblemGroup = new Group(); // intro / spin / scroll
    const emblemTilt = new Group(); // cursor tilt / hover
    fit.add(emblemGroup);
    emblemGroup.add(emblemTilt);
    rig.add(fit);
    const SLICES = compact ? 18 : 30;
    const DEPTH = 0.36;
    const SIZE = compact ? 2.3 : 2.7;
    const slices = [];
    const faceMat = new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22, alphaTest: 0.5, side: DoubleSide, envMapIntensity: 1.0 });
    const edgeMat = new MeshStandardMaterial({ color: GOLD_DEEP, metalness: 1, roughness: 0.3, alphaTest: 0.5, side: DoubleSide, envMapIntensity: 1.1 });
    const sliceGeo = new PlaneGeometry(SIZE, SIZE);
    for (let i = 0; i < SLICES; i++) {
        const isFace = i === 0 || i === SLICES - 1;
        const m = new Mesh(sliceGeo, isFace ? faceMat : edgeMat);
        m.userData.z = DEPTH / 2 - (i / (SLICES - 1)) * DEPTH;
        m.position.z = m.userData.z;
        emblemTilt.add(m);
        slices.push(m);
    }
    const hitDisc = new Mesh(new CircleGeometry(SIZE * 0.42, 32), new MeshBasicMaterial({ visible: false }));
    emblemTilt.add(hitDisc);

    loader.load(emblem, (tex) => {
        tex.colorSpace = SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        faceMat.map = tex; edgeMat.map = tex;
        faceMat.needsUpdate = true; edgeMat.needsUpdate = true;
        host.classList.add('is-ready');
        onReady?.();
        if (reduceMotion) { finalState(); renderOnce(); } else { intro(); }
    });

    /* Halo rings */
    const rings = [];
    const ringSpecs = [
        { r: SIZE * 0.56, tube: 0.01, rot: [0.3, 0.2, 0], speed: [0.0, 0.25, 0.05], basic: true },
        { r: SIZE * 0.64, tube: 0.007, rot: [1.2, -0.4, 0], speed: [0.15, 0.0, 0.1], basic: true },
        { r: SIZE * 0.5, tube: 0.035, rot: [0, 0, 0], speed: [0, 0, 0.08], basic: false },
    ];
    ringSpecs.forEach((s) => {
        const mat = s.basic
            ? new MeshBasicMaterial({ color: new Color(1.2, 0.85, 0.4), transparent: true, opacity: 0.75 })
            : new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.25 });
        const ring = new Mesh(new TorusGeometry(s.r, s.tube, 12, 160), mat);
        ring.rotation.set(...s.rot);
        ring.position.z = s.basic ? 0 : -0.5;
        ring.userData = s;
        emblemGroup.add(ring);
        rings.push(ring);
    });

    /* Floating shards (gold + glass), several depths */
    const shards = [];
    const shardGeos = [new OctahedronGeometry(1), new IcosahedronGeometry(1), new TetrahedronGeometry(1)];
    const shardGold = new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2 });
    const shardGlass = new MeshPhysicalMaterial({ color: new Color('#ffcf7a'), metalness: 0, roughness: 0.05, transparent: true, opacity: 0.35, clearcoat: 1, envMapIntensity: 2 });
    const SHARDS = compact ? 8 : 18;
    for (let i = 0; i < SHARDS; i++) {
        const m = new Mesh(shardGeos[i % 3], i % 3 === 1 ? shardGlass : shardGold);
        const ang = (i / SHARDS) * Math.PI * 2 + Math.random() * 0.4;
        const rad = (compact ? 2.4 : 3.2) + Math.random() * (compact ? 1.2 : 2.6);
        const base = new Vector3(Math.cos(ang) * rad * 1.35, Math.sin(ang) * rad * 0.75, -3 + Math.random() * 5);
        m.position.copy(base);
        m.scale.setScalar(0.08 + Math.random() * 0.2);
        m.userData = { base, offset: new Vector3(), spin: new Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.8), phase: Math.random() * 10 };
        rig.add(m);
        shards.push(m);
    }

    /* Particle field */
    const COUNT = compact ? 1100 : 2600;
    const pos = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
        const layer = i % 3; // 0 back, 1 mid, 2 front
        const z = layer === 0 ? -6 + Math.random() * 3 : layer === 1 ? -3 + Math.random() * 4 : 1 + Math.random() * 3.5;
        const spread = 1 + (-z + 4) * 0.12;
        pos[i * 3] = (Math.random() - 0.5) * 18 * spread;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 11 * spread;
        pos[i * 3 + 2] = z;
        seeds[i] = Math.random();
        sizes[i] = (layer === 2 ? 0.6 : 0.35) + Math.random() ** 3 * (layer === 2 ? 2.8 : 1.8);
    }
    const pGeo = new BufferGeometry();
    pGeo.setAttribute('position', new BufferAttribute(pos, 3));
    pGeo.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    pGeo.setAttribute('aSize', new BufferAttribute(sizes, 1));
    const pU = {
        uTime: { value: 0 }, uPixelRatio: { value: pixelRatio },
        uRayO: { value: new Vector3(0, 0, 12) }, uRayD: { value: new Vector3(0, 0, -1) },
        uRepel: { value: 1.6 }, uBurst: { value: 0 }, uAssemble: { value: reduceMotion ? 1 : 0 }, uScroll: { value: 0 },
        uColorA: { value: new Color('#F59E0B') }, uColorB: { value: new Color('#FFF1C9') },
    };
    const particles = new Points(pGeo, new ShaderMaterial({ vertexShader: P_VERT, fragmentShader: P_FRAG, uniforms: pU, transparent: true, depthWrite: false, blending: AdditiveBlending }));
    rig.add(particles);

    /* Output: tone mapping + sRGB for every material (incl. the custom shaders) */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new OutputPass());

    /* Sizing */
    const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        bgU.uAspect.value = w / h;
        // Keep the emblem a sensible size on narrow screens
        const s = Math.min(1, (w / h) / 1.2 + 0.35);
        fit.scale.setScalar(Math.max(0.62, s));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    /* Input */
    const ndc = new Vector2();
    const ndcSmooth = new Vector2();
    const raycaster = new Raycaster();
    let hovering = false;
    const onMove = (e) => {
        const r = host.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const hitEmblem = () => {
        raycaster.setFromCamera(ndc, camera);
        return raycaster.intersectObject(hitDisc).length > 0;
    };
    const onClick = (e) => {
        if (e.target.closest('a, button')) return;
        if (hitEmblem()) spin();
    };

    let spinning = false;
    const spin = () => {
        if (spinning || reduceMotion) return;
        spinning = true;
        burst(1.8);
        gsap.to(emblemGroup.rotation, { y: emblemGroup.rotation.y + Math.PI * 2, duration: 1.6, ease: 'expo.inOut', onComplete: () => { spinning = false; } });
        gsap.fromTo(bgU.uFlash, { value: 1 }, { value: 0, duration: 1.4, ease: 'power2.out' });
    };
    function burst(strength = 1.2) {
        if (reduceMotion) return;
        gsap.killTweensOf(pU.uBurst);
        gsap.timeline()
            .to(pU.uBurst, { value: strength, duration: 0.35, ease: 'power3.out' })
            .to(pU.uBurst, { value: 0, duration: 1.6, ease: 'elastic.out(1, 0.5)' });
    }

    /* Intro choreography */
    function finalState() {
        pU.uAssemble.value = 1;
        slices.forEach((s) => { s.position.z = s.userData.z; });
    }
    function intro() {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        // Exploded kit → assembled: slices start far apart and snap together
        slices.forEach((s, i) => { s.position.z = s.userData.z + (i - SLICES / 2) * 0.09; });
        emblemGroup.scale.setScalar(0.001);
        emblemGroup.rotation.set(0.5, -Math.PI * 2, 0);
        rings.forEach((r) => r.scale.setScalar(0.001));
        shards.forEach((m) => { m.position.multiplyScalar(3.5); });

        tl.to(emblemGroup.scale, { x: 1, y: 1, z: 1, duration: 1.8 }, 0)
            .to(emblemGroup.rotation, { x: 0, y: 0, duration: 2.6, ease: 'power4.out' }, 0)
            .to(slices.map((s) => s.position), { z: (i) => slices[i].userData.z, duration: 1.6, stagger: { each: 0.02, from: 'edges' }, ease: 'power3.inOut' }, 0.5)
            .to(pU.uAssemble, { value: 1, duration: 2.8, ease: 'power2.out' }, 0.9)
            .fromTo(bgU.uFlash, { value: 0 }, { value: 1.2, duration: 0.25, ease: 'power2.out' }, 1.9)
            .to(bgU.uFlash, { value: 0, duration: 1.6, ease: 'power2.out' }, 2.15)
            .to(rings.map((r) => r.scale), { x: 1, y: 1, z: 1, duration: 1.4, stagger: 0.15, ease: 'back.out(1.6)' }, 1.7)
            .to(shards.map((m) => m.position), {
                x: (i) => shards[i].userData.base.x, y: (i) => shards[i].userData.base.y, z: (i) => shards[i].userData.base.z,
                duration: 2.2, stagger: 0.04, ease: 'power3.out',
            }, 1.2);
    }

    /* Frame loop */
    const start = performance.now();
    let scroll = 0, scrollTarget = 0;
    const tmp = new Vector3();
    const tmpInv = rig.matrixWorld.clone();
    const render = () => {
        const t = (performance.now() - start) / 1000;
        pU.uTime.value = t; bgU.uTime.value = t;

        ndcSmooth.lerp(ndc, 0.07);
        bgU.uMouse.value.copy(ndcSmooth);
        scroll += (scrollTarget - scroll) * 0.1;
        bgU.uScroll.value = scroll; pU.uScroll.value = scroll;

        // Cursor ray → particle force field + cursor light
        raycaster.setFromCamera(ndcSmooth, camera);
        pU.uRayO.value.copy(raycaster.ray.origin).applyMatrix4(tmpInv.copy(rig.matrixWorld).invert());
        pU.uRayD.value.copy(raycaster.ray.direction).transformDirection(tmpInv);
        raycaster.ray.at(8, tmp);
        cursorLight.position.set(tmp.x, tmp.y, 3.5);

        // Hover on emblem
        const over = hitEmblem();
        if (over !== hovering) {
            hovering = over;
            host.style.cursor = over ? 'pointer' : '';
            gsap.to(emblemTilt.scale, { x: over ? 1.1 : 1, y: over ? 1.1 : 1, z: over ? 1.1 : 1, duration: 0.8, ease: 'expo.out' });
            gsap.to(cursorLight, { intensity: over ? 55 : 25, duration: 0.6 });
        }

        // Emblem tilt toward cursor + idle float
        emblemTilt.rotation.y += ((ndcSmooth.x * 0.55) - emblemTilt.rotation.y) * 0.08;
        emblemTilt.rotation.x += ((-ndcSmooth.y * 0.4) - emblemTilt.rotation.x) * 0.08;
        emblemGroup.position.y = Math.sin(t * 0.9) * 0.08 + scroll * 2.4;
        emblemGroup.position.z = -scroll * 3;
        if (!spinning) emblemGroup.rotation.z = Math.sin(t * 0.5) * 0.03;

        rings.forEach((r) => {
            const s = r.userData.speed, k = hovering ? 3 : 1;
            r.rotation.x += s[0] * 0.01 * k; r.rotation.y += s[1] * 0.01 * k; r.rotation.z += s[2] * 0.01 * k;
        });

        // Shards: drift + spin + repel from cursor ray
        shards.forEach((m) => {
            const u = m.userData;
            m.rotation.x += u.spin.x * 0.01; m.rotation.y += u.spin.y * 0.01;
            raycaster.ray.closestPointToPoint(m.position, tmp);
            const away = tmp.subVectors(m.position, tmp);
            const d = away.length();
            const f = Math.max(0, 1 - d / 2.2);
            u.offset.lerp(away.normalize().multiplyScalar(f * f * 1.6), 0.08);
            if (!gsap.isTweening(m.position)) {
                m.position.set(
                    u.base.x + u.offset.x + Math.sin(t * 0.4 + u.phase) * 0.15,
                    u.base.y + u.offset.y + Math.cos(t * 0.5 + u.phase) * 0.2 + scroll * 1.5,
                    u.base.z + u.offset.z,
                );
            }
        });

        // Whole-scene parallax
        rig.rotation.y += ((ndcSmooth.x * 0.08) - rig.rotation.y) * 0.05;
        rig.rotation.x += ((-ndcSmooth.y * 0.05) - rig.rotation.x) * 0.05;
        rig.updateMatrixWorld();
        particles.rotation.y = t * 0.01;

        composer.render();
    };
    function renderOnce() { composer.render(); }

    let onScreen = true;
    const sync = () => renderer.setAnimationLoop(onScreen && !document.hidden && !reduceMotion ? render : null);
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    io.observe(host);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', onMove, { passive: true });
    host.parentElement?.addEventListener('click', onClick);
    sync();

    return {
        setSlide(i) {
            if (i === currentSlide) return;
            const next = photoTex[i];
            currentSlide = i;
            if (!next) return;
            bgU.uPhotoA.value = bgU.uPhotoB.value;
            bgU.uPhotoB.value = next;
            gsap.fromTo(bgU.uMix, { value: 0 }, { value: 1, duration: 1.4, ease: 'power2.inOut' });
            burst(0.9);
            if (reduceMotion) renderOnce();
        },
        setScroll(p) { scrollTarget = p; },
        burst,
        dispose() {
            renderer.setAnimationLoop(null);
            gsap.killTweensOf([pU.uBurst, pU.uAssemble, bgU.uFlash, bgU.uMix]);
            io.disconnect(); ro.disconnect();
            document.removeEventListener('visibilitychange', sync);
            window.removeEventListener('pointermove', onMove);
            host.parentElement?.removeEventListener('click', onClick);
            scene.traverse((o) => {
                o.geometry?.dispose();
                const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
                mats.forEach((m) => { m.map?.dispose(); m.dispose(); });
            });
            photoTex.forEach((x) => x?.dispose());
            blank.dispose(); envRT.dispose(); pmrem.dispose();
            composer.dispose(); renderer.dispose(); renderer.domElement.remove();
            host.classList.remove('is-ready');
        },
    };
}
