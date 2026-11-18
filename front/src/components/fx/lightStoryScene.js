/**
 * lightStoryScene — « De l'ombre à la lumière », the scroll-driven Three.js film of the home page.
 * Loaded on demand by LightStory.jsx, which owns the clock and the scroll progress.
 *
 *  Act I  (globe)  : a dark Earth with a few lights, a faint dawn on the limb (Genèse 1:2).
 *  Act II (ground) : a young man curled on the ground; a Bible descends, he opens it, and for each
 *                    passage a stream of light travels from the pages into his chest. His posture,
 *                    inner glow and the surrounding darkness change step by step until he stands,
 *                    radiant, and his light spreads to the silhouettes of a generation behind him.
 *
 * mountLightStory(host, { compact }) → { render(p, time), dispose() }   (p = 0..1 story progress)
 * The beat timings live in LightStory.jsx (STORY) and are passed in, so text and image stay in sync.
 */
import {
    ACESFilmicToneMapping, AdditiveBlending, BoxGeometry, BufferAttribute, BufferGeometry,
    CanvasTexture, CapsuleGeometry, Color, ConeGeometry, DirectionalLight, DodecahedronGeometry,
    DoubleSide, FogExp2, Group, HemisphereLight, InstancedMesh, Mesh, MeshStandardMaterial, Object3D,
    PerspectiveCamera, PlaneGeometry, PointLight, Points, Scene, ShaderMaterial, SphereGeometry,
    Sprite, SpriteMaterial, SRGBColorSpace, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/* ── small math helpers ─────────────────────────────────────────────────────── */
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

/** Piecewise-smooth interpolation through keys [[p, value], …]; `mix(a, b, t)` blends two values. */
function track(keys, p, mix) {
    if (p <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
        if (p <= keys[i][0]) {
            const [p0, a] = keys[i - 1];
            const [p1, b] = keys[i];
            return mix(a, b, ease((p - p0) / (p1 - p0)));
        }
    }
    return keys[keys.length - 1][1];
}
const mixNum = (a, b, t) => lerp(a, b, t);
const mixV3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/* ── shared GLSL ────────────────────────────────────────────────────────────── */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const SOFT_POINT_FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vA;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(uColor * a * vA, a * vA);
}`;

/* ── Act I : the dark Earth ─────────────────────────────────────────────────── */
const GLOBE_VERT = /* glsl */ `
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
void main(){
  vPos = position;
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position,1.);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const GLOBE_FRAG = /* glsl */ `
uniform float uDawn;
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
${NOISE}
float fbm(vec3 p){ float s=0., a=.5; for(int i=0;i<4;i++){ s+=a*snoise(p); p*=2.03; a*=.5; } return s; }
void main(){
  vec3 p = normalize(vPos);
  float h = fbm(p*1.7);
  float land = smoothstep(0.02, 0.08, h);
  vec3 ocean = vec3(0.004,0.008,0.016);
  vec3 ground = mix(vec3(0.010,0.011,0.014), vec3(0.018,0.018,0.02), smoothstep(0.1,0.5,h));
  vec3 col = mix(ocean, ground, land);
  // cold, faint moonlight from the upper left
  float moon = max(dot(vN, normalize(vec3(-0.6,0.5,0.6))), 0.);
  col += vec3(0.05,0.07,0.11) * moon * 0.4;
  // a handful of distant city lights — almost no light in the world
  float cluster = smoothstep(0.35, 0.6, snoise(p*3.2 + 7.0));
  float dots = smoothstep(0.78, 0.92, snoise(p*46.0));
  col += vec3(1.0,0.66,0.3) * dots * cluster * land * 1.6;
  // limb: cold atmosphere + the first warm light of Genesis 1:2
  float rim = pow(1. - max(dot(vN, vView), 0.), 3.);
  float dawnSide = smoothstep(-0.2, 0.9, dot(vN, normalize(vec3(0.75,0.55,-0.2))));
  col += vec3(0.05,0.09,0.16) * rim * 0.6;
  col += vec3(1.0,0.78,0.42) * rim * dawnSide * uDawn * 1.4;
  gl_FragColor = vec4(col, 1.);
}`;
const ATMO_FRAG = /* glsl */ `
uniform float uDawn;
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
void main(){
  float f = pow(1. - abs(dot(vN, vView)), 2.2);
  float glow = smoothstep(0.0, 1.0, f) * (1. - smoothstep(0.75, 1.0, f));
  float dawnSide = smoothstep(-0.1, 0.95, dot(vN, normalize(vec3(0.75,0.55,-0.2))));
  vec3 col = vec3(0.06,0.11,0.22) * 0.22 + vec3(1.0,0.75,0.38) * dawnSide * uDawn * 1.3;
  gl_FragColor = vec4(col * glow, glow);
}`;

/* ── Act II shaders ─────────────────────────────────────────────────────────── */
// Light stream: particles flowing along a quadratic Bézier from the open pages into the chest.
const STREAM_VERT = /* glsl */ `
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
uniform float uTime; uniform float uAmt; uniform float uPR; uniform float uSize;
attribute float aSeed; attribute vec3 aJit;
varying float vA;
void main(){
  float t = fract(aSeed * 1.618 + uTime * (0.32 + aSeed * 0.3));
  vec3 p = mix(mix(uA,uB,t), mix(uB,uC,t), t);
  p += aJit * sin(t * 3.14159) * (0.04 + 0.1 * aSeed);
  vec4 mv = modelViewMatrix * vec4(p,1.);
  gl_Position = projectionMatrix * mv;
  vA = uAmt * smoothstep(0., .08, t) * (1. - smoothstep(.86, 1., t));
  gl_PointSize = uSize * uPR * (0.45 + aSeed) / -mv.z * (0.6 + uAmt * 0.6);
}`;
// Aura: particles spiralling up around the body (renewal, 2 Corinthiens 5:17).
const AURA_VERT = /* glsl */ `
uniform vec3 uBase; uniform float uTime; uniform float uAmt; uniform float uPR; uniform float uSize; uniform float uHeight;
attribute float aSeed; attribute float aR;
varying float vA;
void main(){
  float k = fract(aSeed * 7.31 + uTime * (0.05 + aSeed * 0.05));
  float ang = aSeed * 40.0 + uTime * (0.35 + aR * 0.4);
  float r = 0.32 + aR * 0.55 + k * 0.25;
  vec3 p = uBase + vec3(cos(ang) * r, k * uHeight, sin(ang) * r);
  vec4 mv = modelViewMatrix * vec4(p,1.);
  gl_Position = projectionMatrix * mv;
  vA = uAmt * smoothstep(0., .15, k) * (1. - smoothstep(.7, 1., k));
  gl_PointSize = uSize * uPR * (0.4 + aSeed) / -mv.z;
}`;
// Dust floating in the air — cold and dim at first, golden at the end.
const DUST_VERT = /* glsl */ `
uniform float uTime; uniform float uPR; uniform float uAmt;
attribute float aSeed;
varying float vA;
void main(){
  vec3 p = position;
  p.x += sin(uTime * 0.11 + aSeed * 30.) * 0.35;
  p.z += cos(uTime * 0.09 + aSeed * 21.) * 0.35;
  p.y = mod(p.y + uTime * (0.03 + aSeed * 0.05), 4.5);
  vec4 mv = modelViewMatrix * vec4(p,1.);
  gl_Position = projectionMatrix * mv;
  vA = uAmt * (0.35 + 0.65 * fract(aSeed * 13.7)) * smoothstep(0.0, 0.6, p.y);
  gl_PointSize = (2.0 + aSeed * 5.0) * uPR * 2.2 / -mv.z;
}`;
// Expanding ring of light on the ground: his light reaching the distance.
const RING_VERT = /* glsl */ `varying vec2 vXZ; void main(){ vec4 w = modelMatrix * vec4(position,1.); vXZ = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const RING_FRAG = /* glsl */ `
uniform vec2 uC; uniform float uR; uniform float uAmt;
varying vec2 vXZ;
void main(){
  float d = length(vXZ - uC);
  float ring = exp(-pow((d - uR) / 0.7, 2.)) * (1. - smoothstep(4., 24., uR) * 0.6);
  float pool = (1. - smoothstep(0., max(uR, 0.01), d)) * 0.22;
  float a = (ring * 0.6 + pool) * uAmt;
  gl_FragColor = vec4(vec3(1.0, 0.78, 0.42) * a, a);
}`;
// Volumetric-looking cone of light from above.
const RAY_VERT = /* glsl */ `
varying float vY; varying float vF;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.);
  vec3 n = normalize(normalMatrix * normal);
  vF = abs(dot(n, normalize(-mv.xyz)));
  vY = uv.y;
  gl_Position = projectionMatrix * mv;
}`;
const RAY_FRAG = /* glsl */ `
uniform float uAmt; uniform vec3 uColor;
varying float vY; varying float vF;
void main(){
  float a = pow(vF, 2.5) * smoothstep(0.0, 0.35, vY) * (1. - smoothstep(0.75, 1.0, vY)) * uAmt;
  gl_FragColor = vec4(uColor * a, a);
}`;
// Bible pages: warm paper with faint lines of text, glowing from within.
const PAGE_VERT = /* glsl */ `
uniform float uCurl;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 p = position;
  p.y += sin(uv.x * 3.14159) * uCurl * 0.05 + uv.x * uv.x * uCurl * 0.03;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.);
}`;
const PAGE_FRAG = /* glsl */ `
uniform float uGlow; uniform float uFlip;
varying vec2 vUv;
void main(){
  vec2 uv = vUv;
  if (uFlip > 0.5) uv.x = 1. - uv.x;
  vec3 paper = vec3(0.92, 0.86, 0.72);
  // two columns of tiny text lines, verse numbers in gold
  float inX = step(0.1, uv.x) * step(uv.x, 0.9);
  float col = step(0.08, uv.y) * step(uv.y, 0.92) * (1. - step(0.485, uv.y) * step(uv.y, 0.515));
  float rows = step(0.45, fract(uv.x * 34.));
  float ragged = step(fract(sin(floor(uv.x * 34.) * 91.7 + floor(uv.y * 2.) * 13.1) * 437.5), 0.92);
  float txt = inX * col * rows * ragged * 0.16;
  vec3 c = paper * (1. - txt);
  float edge = smoothstep(0.0, 0.08, min(min(uv.x, 1. - uv.x), min(uv.y, 1. - uv.y)));
  c *= 0.75 + 0.25 * edge;
  vec3 lit = c * (0.14 + uGlow * 0.62) + vec3(1.0, 0.8, 0.45) * uGlow * uGlow * 0.22;
  gl_FragColor = vec4(lit, 1.);
}`;

/* ── textures ───────────────────────────────────────────────────────────────── */
function radialTexture(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([o, col]) => grad.addColorStop(o, col));
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
}

/* ── the human figure (articulated mannequin) ───────────────────────────────── */
/** Body material: dark matte skin of light-absorbing cloth, with a fresnel rim and an inner glow. */
function bodyMaterial(color) {
    const mat = new MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.05 });
    mat.userData.u = {
        uRim: { value: 0.45 },
        uRimCol: { value: new Color(0.35, 0.45, 0.65) },
        uGlow: { value: 0 },
        uGlowCol: { value: new Color(1.0, 0.72, 0.32) },
    };
    mat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, mat.userData.u);
        shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', '#include <common>\nuniform float uRim; uniform vec3 uRimCol; uniform float uGlow; uniform vec3 uGlowCol;')
            .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
                float fres = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.4);
                totalEmissiveRadiance += uRimCol * fres * uRim + uGlowCol * uGlow * (0.25 + fres * 0.9);`);
    };
    return mat;
}

/**
 * Builds a figure facing +Z. Joints are Groups; rotation.x bends in the sagittal plane
 * (spine/neck: + = forward; limbs hanging down: − = forward).
 */
function buildFigure(mat) {
    const J = {};
    const ends = [];
    const root = new Group();
    const hips = new Group();
    hips.position.y = 0.95;
    root.add(hips);
    J.hips = hips;
    const pelvis = new Mesh(new SphereGeometry(0.15, 16, 12), mat);
    pelvis.scale.set(1.15, 0.8, 0.85);
    hips.add(pelvis);

    const seg = (parent, name, len, radius, dir, offset, scale) => {
        const g = new Group();
        g.position.set(...offset);
        parent.add(g);
        const m = new Mesh(new CapsuleGeometry(radius, Math.max(0.01, len - radius * 1.4), 6, 14), mat);
        m.position.y = (dir * len) / 2;
        if (scale) m.scale.set(...scale);
        g.add(m);
        J[name] = g;
        return g;
    };
    const marker = (parent, y, z = 0) => { const o = new Object3D(); o.position.set(0, y, z); parent.add(o); ends.push(o); return o; };

    const spine = seg(hips, 'spine', 0.26, 0.13, 1, [0, 0.04, 0], [1.05, 1, 0.8]);
    const chest = seg(spine, 'chest', 0.3, 0.16, 1, [0, 0.24, 0], [1.25, 1, 0.78]);
    const neck = seg(chest, 'neck', 0.11, 0.052, 1, [0, 0.29, 0]);
    const head = new Group();
    head.position.y = 0.1;
    neck.add(head);
    J.head = head;
    const skull = new Mesh(new SphereGeometry(0.112, 20, 16), mat);
    skull.scale.set(0.88, 1.08, 1);
    skull.position.set(0, 0.115, 0.01);
    head.add(skull);
    marker(head, 0.24);
    marker(head, 0.1, 0.12);
    J.chestFront = new Object3D();
    J.chestFront.position.set(0, 0.15, 0.13);
    chest.add(J.chestFront);

    for (const [s, side] of [[1, 'L'], [-1, 'R']]) {
        const arm = seg(chest, `arm${side}`, 0.3, 0.056, -1, [0.215 * s, 0.25, -0.01]);
        const fore = seg(arm, `fore${side}`, 0.27, 0.047, -1, [0, -0.3, 0]);
        const hand = new Mesh(new SphereGeometry(0.052, 12, 10), mat);
        hand.scale.set(0.8, 1.3, 0.6);
        hand.position.y = -0.31;
        fore.add(hand);
        marker(fore, -0.34);
        marker(arm, -0.3);
        const thigh = seg(hips, `thigh${side}`, 0.46, 0.078, -1, [0.1 * s, -0.05, 0]);
        const shin = seg(thigh, `shin${side}`, 0.45, 0.062, -1, [0, -0.46, 0]);
        marker(shin, 0, 0.04); // knee cap
        const foot = new Mesh(new CapsuleGeometry(0.045, 0.16, 4, 10), mat);
        foot.rotation.x = Math.PI / 2;
        foot.position.set(0, -0.47, 0.06);
        shin.add(foot);
        marker(shin, -0.5, -0.02); // heel
        marker(shin, -0.5, 0.16); // toe
    }
    root.userData = { J, ends };
    return root;
}

const RAD = Math.PI / 180;
/* Poses: joint → [x, y, z] in radians (degrees written for readability). */
const P = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.map((d) => d * RAD)]));
const NEUTRAL = {
    hips: [0, 0, 0], spine: [0, 0, 0], chest: [0, 0, 0], neck: [0, 0, 0], head: [0, 0, 0],
    armL: [0, 0, 0], armR: [0, 0, 0], foreL: [0, 0, 0], foreR: [0, 0, 0],
    thighL: [0, 0, 0], thighR: [0, 0, 0], shinL: [0, 0, 0], shinR: [0, 0, 0],
};
const pose = (o) => ({ ...NEUTRAL, ...P(o) });
const POSES = {
    // curled up on the ground, folded over his knees, head down, arms around himself
    curled: pose({
        spine: [50, 0, 0], chest: [32, 0, 0], neck: [18, 0, 0], head: [24, 0, 0],
        armL: [-92, 0, -14], armR: [-92, 0, 14], foreL: [-62, 0, 0], foreR: [-62, 0, 0],
        thighL: [-78, 0, 4], thighR: [-78, 0, -4], shinL: [168, 0, 0], shinR: [168, 0, 0],
    }),
    // notices the book, reaches out his right hand
    reach: pose({
        spine: [38, 0, 0], chest: [22, 0, 0], neck: [4, 0, 0], head: [8, 0, 0],
        armL: [-70, 0, -10], armR: [-112, 0, 6], foreL: [-55, 0, 0], foreR: [-10, 0, 0],
        thighL: [-78, 0, 4], thighR: [-78, 0, -4], shinL: [168, 0, 0], shinR: [168, 0, 0],
    }),
    // hands on the open book, first hope
    reading: pose({
        spine: [40, 0, 0], chest: [20, 0, 0], neck: [6, 0, 0], head: [10, 0, 0],
        armL: [-100, 0, -4], armR: [-100, 0, 4], foreL: [-12, 0, 0], foreR: [-12, 0, 0],
        thighL: [-78, 0, 4], thighR: [-78, 0, -4], shinL: [168, 0, 0], shinR: [168, 0, 0],
    }),
    // shoulders rise, posture less defensive
    rising: pose({
        spine: [24, 0, 0], chest: [10, 0, 0], neck: [2, 0, 0], head: [10, 0, 0],
        armL: [-58, 0, 2], armR: [-58, 0, -2], foreL: [-40, 0, 0], foreR: [-40, 0, 0],
        thighL: [-80, 0, 4], thighR: [-80, 0, -4], shinL: [168, 0, 0], shinR: [168, 0, 0],
    }),
    // back straight, head lifted, hands on the thighs
    upright: pose({
        spine: [4, 0, 0], chest: [-4, 0, 0], neck: [-4, 0, 0], head: [-10, 0, 0],
        armL: [-28, 0, 6], armR: [-28, 0, -6], foreL: [-48, 0, 0], foreR: [-48, 0, 0],
        thighL: [-82, 0, 4], thighR: [-82, 0, -4], shinL: [168, 0, 0], shinR: [168, 0, 0],
    }),
    // kneeling tall, chest opening
    kneelTall: pose({
        spine: [-2, 0, 0], chest: [-8, 0, 0], neck: [-4, 0, 0], head: [-12, 0, 0],
        armL: [-14, 0, 22], armR: [-14, 0, -22], foreL: [-18, 0, 0], foreR: [-18, 0, 0],
        thighL: [-8, 0, 3], thighR: [-8, 0, -3], shinL: [94, 0, 0], shinR: [94, 0, 0],
    }),
    // one knee up, about to stand
    oneKnee: pose({
        spine: [12, 0, 0], chest: [2, 0, 0], neck: [-2, 0, 0], head: [-6, 0, 0],
        armL: [-6, 0, 12], armR: [-44, 0, -6], foreL: [-10, 0, 0], foreR: [-50, 0, 0],
        thighL: [-4, 0, 3], thighR: [-88, 0, -4], shinL: [96, 0, 0], shinR: [90, 0, 0],
    }),
    // standing firm, chest open
    standing: pose({
        spine: [-1, 0, 0], chest: [-5, 0, 0], neck: [0, 0, 0], head: [-6, 0, 0],
        armL: [4, 0, 12], armR: [4, 0, -12], foreL: [-12, 0, 0], foreR: [-12, 0, 0],
        thighL: [-2, 0, 3], thighR: [2, 0, -3], shinL: [3, 0, 0], shinR: [3, 0, 0],
    }),
    // radiant: arms slightly open, looking ahead
    radiant: pose({
        spine: [-2, 0, 0], chest: [-8, 0, 0], neck: [-2, 0, 0], head: [-8, 0, 0],
        armL: [-14, 0, 34], armR: [-14, 0, -34], foreL: [-14, 0, 0], foreR: [-14, 0, 0],
        thighL: [-2, 0, 4], thighR: [2, 0, -4], shinL: [3, 0, 0], shinR: [3, 0, 0],
    }),
};
function mixPose(a, b, t) {
    const out = {};
    for (const k in a) out[k] = mixV3(a[k], b[k], t);
    return out;
}

const _v = new Vector3();
/** Applies a pose and drops the figure so its lowest point touches the ground (y = 0). */
function applyPose(fig, p) {
    const { J, ends } = fig.userData;
    for (const k in p) J[k].rotation.set(p[k][0], p[k][1], p[k][2]);
    fig.position.y = 0;
    fig.updateMatrixWorld(true);
    let min = Infinity;
    for (const e of ends) min = Math.min(min, e.getWorldPosition(_v).y);
    fig.position.y = -min + 0.005;
    fig.updateMatrixWorld(true);
}

/* ── the Bible ──────────────────────────────────────────────────────────────── */
const BW = 0.24; // page width (across, from the spine)
const BL = 0.33; // page length (along the spine)
const BC = 0.008; // cover thickness
const BT = 0.05; // page block thickness

function buildBible() {
    const leather = new MeshStandardMaterial({ color: '#2a1610', roughness: 0.55, metalness: 0.1 });
    const gilt = new MeshStandardMaterial({ color: '#f59e0b', emissive: '#f59e0b', emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.9 });
    const pageUniforms = { uGlow: { value: 0 }, uFlip: { value: 0 }, uCurl: { value: 0 } };
    const pageMat = (flip) => new ShaderMaterial({
        uniforms: { ...pageUniforms, uFlip: { value: flip }, uCurl: { value: 0 } },
        vertexShader: PAGE_VERT, fragmentShader: PAGE_FRAG, side: DoubleSide,
    });
    const edgeMat = new MeshStandardMaterial({ color: '#c9a35a', emissive: '#f5b84a', emissiveIntensity: 0.15, roughness: 0.4, metalness: 0.6 });

    const book = new Group();
    // spine runs along X; pages extend toward +Z (right) and, once open, toward −Z (left)
    const back = new Mesh(new BoxGeometry(BL + 0.02, BC, BW + 0.01), leather);
    back.position.set(0, BC / 2, BW / 2);
    book.add(back);
    const rightBlock = new Mesh(new BoxGeometry(BL, BT / 2, BW), edgeMat);
    rightBlock.position.set(0, BC + BT / 4, BW / 2);
    book.add(rightBlock);
    const rightPage = new Mesh(new PlaneGeometry(BL * 0.97, BW * 0.97, 1, 1), pageMat(0));
    rightPage.rotation.x = -Math.PI / 2;
    rightPage.position.set(0, BC + BT / 2 + 0.0015, BW / 2);
    book.add(rightPage);

    // the half that swings open with the front cover
    const hinge = new Group();
    hinge.position.set(0, BC + BT / 2, 0);
    book.add(hinge);
    const leftBlock = new Mesh(new BoxGeometry(BL, BT / 2, BW), edgeMat);
    leftBlock.position.set(0, BT / 4, BW / 2);
    hinge.add(leftBlock);
    const leftPage = new Mesh(new PlaneGeometry(BL * 0.97, BW * 0.97, 1, 1), pageMat(1));
    leftPage.rotation.x = Math.PI / 2; // faces down while closed, up once opened
    leftPage.position.set(0, -0.0015, BW / 2);
    hinge.add(leftPage);
    const front = new Mesh(new BoxGeometry(BL + 0.02, BC, BW + 0.01), leather);
    front.position.set(0, BT / 2 + BC / 2, BW / 2);
    hinge.add(front);
    // gilt cross on the cover and gilt page edges
    const crossV = new Mesh(new BoxGeometry(0.13, 0.002, 0.018), gilt);
    crossV.position.set(0.0, BT / 2 + BC + 0.001, BW / 2);
    const crossH = new Mesh(new BoxGeometry(0.018, 0.002, 0.08), gilt);
    crossH.position.set(0.025, BT / 2 + BC + 0.001, BW / 2);
    hinge.add(crossV, crossH);
    const spine = new Mesh(new CapsuleGeometry(BT / 2 + BC, BL - 0.02, 4, 10), leather);
    spine.rotation.z = Math.PI / 2;
    spine.scale.set(1, 1, 0.45);
    spine.position.set(0, BC + BT / 2, 0);
    book.add(spine);

    // the single page that turns for each passage
    const turnPivot = new Group();
    turnPivot.position.set(0, BC + BT / 2 + 0.003, 0);
    book.add(turnPivot);
    const turnGeo = new PlaneGeometry(BL * 0.96, BW * 0.96, 1, 18);
    turnGeo.rotateX(-Math.PI / 2);
    turnGeo.translate(0, 0, (BW * 0.96) / 2);
    // uv.x must run across the page for the curl: swap uv axes
    const uv = turnGeo.attributes.uv;
    for (let i = 0; i < uv.count; i++) { const u = uv.getX(i); uv.setXY(i, 1 - uv.getY(i), u); }
    const turnMat = pageMat(0);
    const turnPage = new Mesh(turnGeo, turnMat);
    turnPage.visible = false;
    turnPivot.add(turnPage);

    const pages = [rightPage.material, leftPage.material, turnMat];
    return {
        book,
        setOpen(t) { hinge.rotation.x = -Math.PI * t; },
        setTurn(t) {
            turnPage.visible = t > 0.001 && t < 0.999;
            turnPivot.rotation.x = -Math.PI * ease(t);
            turnMat.uniforms.uCurl.value = Math.sin(t * Math.PI);
        },
        setGlow(g) { pages.forEach((m) => { m.uniforms.uGlow.value = g; }); edgeMat.emissiveIntensity = 0.15 + g * 0.8; },
        pageCenter: new Vector3(0, BC + BT / 2 + 0.01, 0),
        dispose() { leather.dispose(); gilt.dispose(); edgeMat.dispose(); pages.forEach((m) => m.dispose()); },
    };
}

/* ── particles helpers ──────────────────────────────────────────────────────── */
function seededPoints(count, fill, uniforms, vertexShader) {
    const g = new BufferGeometry();
    const attrs = fill(count);
    for (const [name, [arr, size]] of Object.entries(attrs)) g.setAttribute(name, new BufferAttribute(arr, size));
    const m = new ShaderMaterial({
        uniforms, vertexShader, fragmentShader: SOFT_POINT_FRAG,
        transparent: true, depthWrite: false, blending: AdditiveBlending,
    });
    const pts = new Points(g, m);
    pts.frustumCulled = false;
    return pts;
}

/* ════════════════════════════════════════════════════════════════════════════ */
export function mountLightStory(host, { compact = false, story }) {
    const PR = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.75);
    const renderer = new WebGLRenderer({ antialias: !compact, powerPreference: 'high-performance' });
    renderer.setPixelRatio(PR);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);

    const camera = new PerspectiveCamera(38, 1, 0.05, 200);
    const disposables = [];
    const track$ = (o) => { disposables.push(o); return o; };

    /* ── Act I : globe scene ── */
    const globeScene = new Scene();
    globeScene.background = new Color('#010204');
    const dawn = { value: 0 };
    const globe = new Mesh(
        track$(new SphereGeometry(2, 96, 64)),
        track$(new ShaderMaterial({ uniforms: { uDawn: dawn }, vertexShader: GLOBE_VERT, fragmentShader: GLOBE_FRAG })),
    );
    globeScene.add(globe);
    const atmo = new Mesh(
        track$(new SphereGeometry(2.18, 64, 48)),
        track$(new ShaderMaterial({
            uniforms: { uDawn: dawn }, vertexShader: GLOBE_VERT, fragmentShader: ATMO_FRAG,
            transparent: true, blending: AdditiveBlending, depthWrite: false, side: 1, // BackSide
        })),
    );
    globeScene.add(atmo);
    const starCount = compact ? 900 : 1800;
    const stars = seededPoints(starCount, (n) => {
        const pos = new Float32Array(n * 3);
        const seed = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const v = new Vector3().randomDirection().multiplyScalar(40 + Math.random() * 20);
            pos.set([v.x, v.y, v.z], i * 3);
            seed[i] = Math.random();
        }
        return { position: [pos, 3], aSeed: [seed, 1] };
    }, { uColor: { value: new Color(0.55, 0.62, 0.8) }, uTime: { value: 0 }, uPR: { value: PR }, uAmt: { value: 0.5 } }, /* glsl */ `
        uniform float uPR; uniform float uAmt; attribute float aSeed; varying float vA;
        void main(){ vec4 mv = modelViewMatrix * vec4(position,1.); gl_Position = projectionMatrix * mv;
          vA = uAmt * (0.25 + 0.75 * aSeed * aSeed); gl_PointSize = (1.0 + aSeed * 2.2) * uPR; }`);
    globeScene.add(stars);
    track$(stars.geometry); track$(stars.material);

    /* ── Act II : ground scene ── */
    const scene = new Scene();
    const COLD = new Color('#04060b');
    const WARM = new Color('#3a2a14');
    const BRIGHT = new Color('#7a5f36');
    const bg = new Color().copy(COLD);
    scene.background = bg;
    scene.fog = new FogExp2(bg, 0.3);

    const hemi = new HemisphereLight('#3b4a66', '#0a0806', 0.12);
    scene.add(hemi);
    const moon = new DirectionalLight('#6f86b3', 0.8);
    moon.position.set(-3, 5, 4);
    scene.add(moon);

    const groundMat = track$(new MeshStandardMaterial({ color: '#141210', roughness: 0.96, metalness: 0 }));
    const ground = new Mesh(track$(new PlaneGeometry(120, 120)), groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // contact shadow under the young man
    const shadowTex = track$(radialTexture([[0, 'rgba(0,0,0,0.85)'], [0.6, 'rgba(0,0,0,0.35)'], [1, 'rgba(0,0,0,0)']]));
    const contact = new Mesh(track$(new PlaneGeometry(1.8, 1.4)), track$(new MeshStandardMaterial({ map: shadowTex, transparent: true, depthWrite: false, color: '#000' })));
    contact.rotation.x = -Math.PI / 2;
    contact.position.set(0.3, 0.004, 0);
    scene.add(contact);

    // stones and distant hills, revealed as the darkness retreats
    const rockMat = track$(new MeshStandardMaterial({ color: '#1d1a17', roughness: 0.9, flatShading: true }));
    const rockN = compact ? 40 : 80;
    const rocks = new InstancedMesh(track$(new DodecahedronGeometry(1, 0)), rockMat, rockN);
    const dummy = new Object3D();
    for (let i = 0; i < rockN; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.8 + Math.pow(Math.random(), 0.8) * 12;
        const s = 0.04 + Math.random() * 0.22 * (r / 8);
        dummy.position.set(Math.cos(a) * r, s * 0.25, Math.sin(a) * r - 1);
        dummy.scale.set(s * (1 + Math.random()), s * 0.6, s);
        dummy.rotation.set(Math.random(), Math.random() * 6, Math.random());
        dummy.updateMatrix();
        rocks.setMatrixAt(i, dummy.matrix);
    }
    scene.add(rocks);
    const hillGeo = track$(new SphereGeometry(1, 24, 12));
    [[-14, -26, 11], [6, -32, 14], [22, -22, 9], [-28, -14, 8], [30, -6, 7]].forEach(([x, z, r]) => {
        const h = new Mesh(hillGeo, rockMat);
        h.position.set(x, -r * 0.72, z);
        h.scale.set(r * 1.6, r, r);
        scene.add(h);
    });

    // the young man
    const manMat = track$(bodyMaterial('#2a2724'));
    const man = buildFigure(manMat);
    man.rotation.y = Math.PI / 2; // facing +X, toward where the Bible will land
    scene.add(man);
    const { J } = man.userData;
    const chestLight = new PointLight('#ffc977', 0, 7, 1.6);
    scene.add(chestLight);
    const glowTex = track$(radialTexture([[0, 'rgba(255,240,210,1)'], [0.2, 'rgba(255,200,120,0.6)'], [0.5, 'rgba(245,158,11,0.18)'], [1, 'rgba(245,158,11,0)']]));
    const chestGlow = new Sprite(track$(new SpriteMaterial({ map: glowTex, blending: AdditiveBlending, depthWrite: false, transparent: true })));
    scene.add(chestGlow);

    // silhouettes of other people and younger generations, lit as his light reaches them
    const crowd = [
        [-2.6, -3.4, 1.0, 0.5], [-4.3, -2.2, 0.72, 0.8], [-1.0, -5.8, 0.95, 0.2], [1.6, -5.2, 0.62, -0.2],
        [-5.6, -5.0, 1.02, 0.6], [3.4, -7.2, 0.98, -0.4], [-3.0, -8.4, 0.7, 0.3], [0.2, -9.5, 1.0, 0.0],
    ].slice(0, compact ? 5 : 8).map(([x, z, s, yaw], i) => {
        const mat = track$(bodyMaterial('#16130f'));
        mat.userData.u.uRim.value = 0;
        mat.userData.u.uRimCol.value.set(1.0, 0.75, 0.4);
        const f = buildFigure(mat);
        const base = mixPose(POSES.standing, POSES.radiant, (i % 3) * 0.25);
        applyPose(f, base);
        f.scale.setScalar(s);
        f.position.x = x;
        f.position.z = z;
        f.rotation.y = yaw + Math.atan2(-x, -z) * 0.25;
        f.position.y *= s;
        f.visible = false;
        scene.add(f);
        return { f, mat, dist: Math.hypot(x, z) };
    });

    // the Bible
    const bible = buildBible();
    const BIBLE_AT = new Vector3(1.12, 0, 0.0);
    scene.add(bible.book);
    bible.book.rotation.y = -Math.PI / 2; // spine runs away from the young man
    const bibleLight = new PointLight('#ffd89a', 0, 4, 1.4);
    scene.add(bibleLight);
    const bibleGlow = new Sprite(track$(new SpriteMaterial({ map: glowTex, blending: AdditiveBlending, depthWrite: false, transparent: true })));
    scene.add(bibleGlow);

    // light streams, aura, dust, ground ring, rays
    const streamU = {
        uA: { value: new Vector3() }, uB: { value: new Vector3() }, uC: { value: new Vector3() },
        uTime: { value: 0 }, uAmt: { value: 0 }, uPR: { value: PR }, uSize: { value: 34 },
        uColor: { value: new Color(1.0, 0.82, 0.5) },
    };
    const stream = seededPoints(compact ? 360 : 720, (n) => {
        const seed = new Float32Array(n);
        const jit = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
            seed[i] = Math.random();
            const v = new Vector3().randomDirection();
            jit.set([v.x, v.y, v.z], i * 3);
        }
        return { position: [new Float32Array(n * 3), 3], aSeed: [seed, 1], aJit: [jit, 3] };
    }, streamU, STREAM_VERT);
    scene.add(stream);
    track$(stream.geometry); track$(stream.material);

    const auraU = {
        uBase: { value: new Vector3() }, uTime: { value: 0 }, uAmt: { value: 0 }, uPR: { value: PR },
        uSize: { value: 40 }, uHeight: { value: 1.2 }, uColor: { value: new Color(1.0, 0.8, 0.45) },
    };
    const aura = seededPoints(compact ? 160 : 320, (n) => {
        const seed = new Float32Array(n);
        const r = new Float32Array(n);
        for (let i = 0; i < n; i++) { seed[i] = Math.random(); r[i] = Math.random(); }
        return { position: [new Float32Array(n * 3), 3], aSeed: [seed, 1], aR: [r, 1] };
    }, auraU, AURA_VERT);
    scene.add(aura);
    track$(aura.geometry); track$(aura.material);

    const dustU = { uTime: { value: 0 }, uPR: { value: PR }, uAmt: { value: 0.3 }, uColor: { value: new Color(0.45, 0.55, 0.75) } };
    const dust = seededPoints(compact ? 300 : 650, (n) => {
        const pos = new Float32Array(n * 3);
        const seed = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            pos.set([(Math.random() - 0.5) * 12, Math.random() * 4.5, (Math.random() - 0.5) * 10 - 1], i * 3);
            seed[i] = Math.random();
        }
        return { position: [pos, 3], aSeed: [seed, 1] };
    }, dustU, DUST_VERT);
    scene.add(dust);
    track$(dust.geometry); track$(dust.material);

    const ringU = { uC: { value: new Vector2(0, 0) }, uR: { value: 0 }, uAmt: { value: 0 } };
    const ring = new Mesh(track$(new PlaneGeometry(60, 60)), track$(new ShaderMaterial({
        uniforms: ringU, vertexShader: RING_VERT, fragmentShader: RING_FRAG,
        transparent: true, depthWrite: false, blending: AdditiveBlending,
    })));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    const rayU = { uAmt: { value: 0 }, uColor: { value: new Color(1.0, 0.85, 0.6) } };
    const rayMat = track$(new ShaderMaterial({
        uniforms: rayU, vertexShader: RAY_VERT, fragmentShader: RAY_FRAG,
        transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide,
    }));
    const rays = new Group();
    [[0, 0, 0, 2.2, 1], [-0.6, 0.3, 0.18, 1.2, 0.6], [0.7, -0.4, -0.15, 1.0, 0.5]].forEach(([x, z, tilt, r, s]) => {
        const cone = new Mesh(track$(new ConeGeometry(r, 9, 40, 1, true)), rayMat);
        cone.position.set(x, 4.5, z);
        cone.rotation.z = tilt;
        cone.scale.setScalar(s);
        rays.add(cone);
    });
    rays.position.x = 0.3;
    scene.add(rays);

    /* ── composer (bloom on desktop only) ── */
    let composer = null;
    let renderPass = null;
    let bloom = null;
    if (!compact) {
        composer = new EffectComposer(renderer);
        renderPass = new RenderPass(scene, camera);
        bloom = new UnrealBloomPass(new Vector2(256, 256), 0.85, 0.55, 0.72);
        composer.addPass(renderPass);
        composer.addPass(bloom);
        composer.addPass(new OutputPass());
    }

    /* ── sizing ── */
    let W = 1;
    let H = 1;
    const resize = () => {
        W = host.clientWidth || 1;
        H = host.clientHeight || 1;
        renderer.setSize(W, H, false);
        composer?.setSize(W, H);
        bloom?.resolution.set(W / 2, H / 2);
        camera.aspect = W / H;
        // leave a calm column for the scripture text: subject to the right (desktop) or upper half (mobile)
        if (compact) camera.setViewOffset(W, H, 0, H * 0.14, W, H);
        else camera.setViewOffset(W, H, -W * 0.17, 0, W, H);
        camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* ── timeline (driven by STORY from the host) ── */
    const S = story;
    const passages = S.passages; // [{ at }] for the five transformation passages
    const glowKeys = [[0, 0], [S.open, 0], [S.open + 0.03, 0.06]];
    const lightKeys = [[0, 0], [S.open, 0.02], [S.open + 0.03, 0.08]];
    const steps = [[0.2, 0.2], [0.34, 0.3], [0.5, 0.45], [0.66, 0.6], [0.88, 0.76]];
    passages.forEach((ps, i) => {
        glowKeys.push([ps.at + 0.03, glowKeys[glowKeys.length - 1][1]], [ps.at + 0.065, steps[i][0]]);
        lightKeys.push([ps.at + 0.03, lightKeys[lightKeys.length - 1][1]], [ps.at + 0.07, steps[i][1]]);
    });
    glowKeys.push([S.final, 0.9], [S.final + 0.04, 1]);
    lightKeys.push([S.final, 0.8], [S.final + 0.05, 0.92], [1, 1]);

    const [pJohn, pTim, pCor, pRom, pMat] = passages.map((x) => x.at);
    const poseKeys = [
        [0, POSES.curled], [S.bibleLand + 0.005, POSES.curled], [S.reach, POSES.reach], [S.open + 0.01, POSES.reach],
        [pJohn + 0.05, POSES.reading], [pTim + 0.06, POSES.rising], [pCor + 0.06, mixPose(POSES.rising, POSES.upright, 0.45)],
        [pRom + 0.06, POSES.upright], [pMat + 0.035, POSES.kneelTall], [S.stand - 0.03, POSES.oneKnee],
        [S.stand + 0.03, POSES.standing], [S.final + 0.05, POSES.radiant],
    ];
    const yawKeys = [[0, Math.PI / 2], [S.stand + 0.01, Math.PI / 2], [S.final + 0.04, Math.PI / 2 - 0.75]];

    const B = BIBLE_AT;
    // over-the-book shot: the open pages in the foreground, the young man behind them
    const close = (dz = 0) => [[B.x + 0.95, 0.72, 0.55 + dz], [B.x - 0.3, 0.2, 0]];
    const camKeys = [
        [S.ground, [0.6, 2.4, 6.8], [0.4, 0.25, 0]],
        [S.ground + 0.05, [0.5, 1.15, 3.9], [0.35, 0.35, 0]],
        [S.bibleIn + 0.01, [1.6, 1.4, 4.8], [0.9, 1.85, 0]],
        [(S.bibleIn + S.bibleLand) / 2, [1.6, 1.05, 3.9], [0.85, 1.1, 0]],
        [S.bibleLand, [1.9, 0.95, 2.6], [0.8, 0.3, 0]],
        [S.reach + 0.01, [2.3, 0.85, 1.7], [0.75, 0.25, 0]],
        [S.open + 0.02, ...close()],
    ];
    // 3/4 front views: the Bible in the foreground, the light travelling to his chest
    const mediums = [
        [[2.4, 0.95, 1.9], [0.6, 0.45, 0]],
        [[1.7, 1.0, 2.7], [0.55, 0.5, 0]],
        [[2.7, 1.2, 1.3], [0.55, 0.6, 0]],
        [[1.9, 0.9, 2.5], [0.5, 0.7, 0]],
        [[2.5, 1.1, 2.7], [0.5, 0.8, 0]],
    ];
    passages.forEach((ps, i) => {
        const c = close(i % 2 ? 0.12 : -0.1);
        camKeys.push([ps.at + 0.006, ...c], [ps.at + 0.02, ...c], [ps.at + 0.042, ...mediums[i]], [ps.end - 0.004, ...mediums[i]]);
    });
    camKeys.push(
        [S.stand + 0.03, [1.8, 1.25, 3.9], [0.4, 1.0, 0]],
        [S.final + 0.01, [2.4, 1.1, 2.9], [0.7, 0.75, 0]],
        [S.final + 0.035, [2.2, 1.15, 3.2], [0.6, 0.85, 0]],
        [1, [2.9, 1.9, 7.2], [-0.7, 1.0, -2.6]],
    );
    const camPos = camKeys.map(([p, pos]) => [p, pos]);
    const camTgt = camKeys.map(([p, , tgt]) => [p, tgt]);

    /* ── per-frame ── */
    // portrait screens: pull the camera back so the subject still fits
    const compactFactor = () => (compact ? 1 + Math.max(0, 1.15 - W / H) * 1.2 : 1);
    const chestW = new Vector3();
    const hipsW = new Vector3();
    const tmpC = new Color();
    const bibleBase = new Vector3();

    function renderGround(p, time) {
        // environment: darkness retreats
        const L = track(lightKeys, p, mixNum);
        const G = track(glowKeys, p, mixNum);
        const final = smooth(S.final, 1, p);
        tmpC.copy(COLD).lerp(WARM, smooth(0.0, 0.85, L)).lerp(BRIGHT, final * 0.7);
        bg.copy(tmpC);
        scene.fog.color.copy(tmpC);
        scene.fog.density = lerp(0.3, 0.035, smooth(0, 1, L));
        hemi.intensity = lerp(0.12, 1.1, L);
        hemi.color.setRGB(lerp(0.23, 1.0, L), lerp(0.29, 0.85, L), lerp(0.4, 0.6, L));
        hemi.groundColor.setRGB(lerp(0.04, 0.35, L), lerp(0.03, 0.25, L), lerp(0.02, 0.12, L));
        moon.intensity = lerp(0.8, 0.1, L);
        // Isaiah 60:2 — a faint mysterious glow from above, then the final rays
        const hint = smooth(S.isaiah2, S.isaiah2 + 0.03, p) * (1 - smooth(S.bibleIn - 0.02, S.bibleIn + 0.02, p));
        rayU.uAmt.value = hint * 0.18 + final * 0.55 + Math.sin(time * 0.6) * 0.01;
        dustU.uAmt.value = lerp(0.25, 0.9, L);
        dustU.uColor.value.setRGB(lerp(0.45, 1.0, L), lerp(0.55, 0.8, L), lerp(0.75, 0.45, L));

        // the young man
        const breathe = Math.sin(time * (1.1 + L)) * (0.012 + 0.01 * (1 - L));
        const ps = track(poseKeys, p, mixPose);
        ps.chest = [ps.chest[0] - breathe, ps.chest[1], ps.chest[2]];
        man.rotation.y = track(yawKeys, p, mixNum);
        applyPose(man, ps);
        manMat.userData.u.uGlow.value = G * 0.85;
        manMat.userData.u.uRim.value = lerp(0.5, 1.2, G);
        manMat.userData.u.uRimCol.value.setRGB(lerp(0.35, 1.0, G), lerp(0.45, 0.78, G), lerp(0.65, 0.42, G));
        J.chestFront.getWorldPosition(chestW);
        J.hips.getWorldPosition(hipsW);
        chestLight.position.copy(chestW);
        chestLight.intensity = G * G * 9 + final * 6;
        chestGlow.position.copy(chestW);
        const pulse = streamU.uAmt.value * 0.25;
        chestGlow.scale.setScalar(0.15 + G * 1.1 + pulse + final * 0.8);
        chestGlow.material.opacity = Math.min(1, G * 1.2 + pulse);
        contact.position.set(hipsW.x + 0.15, 0.004, hipsW.z);

        // the Bible: appears, floats down, lands, opens; a page turns for each passage
        const appear = smooth(S.bibleIn, S.bibleIn + 0.012, p);
        const land = smooth(S.bibleIn, S.bibleLand, p);
        bible.book.visible = appear > 0.001;
        const fall = 1 - ease(land);
        bibleBase.set(B.x - fall * 0.4, fall * 2.4 + Math.sin(time * 1.4) * 0.04 * fall, B.z - fall * 0.3);
        bible.book.position.copy(bibleBase);
        bible.book.rotation.set(fall * 0.5 * Math.sin(time * 0.8), -Math.PI / 2 + fall * 1.6, fall * 0.35);
        bible.book.scale.setScalar(0.4 + appear * 0.6);
        const open = smooth(S.open - 0.03, S.open, p);
        const rest = appear * land * (1 - open); // landed, still closed: a soft halo
        bible.setOpen(open);
        let turn = 0;
        let streamAmt = 0;
        passages.forEach((pp, i) => {
            const t = clamp01((p - pp.at) / 0.025);
            if (t > 0 && t < 1) turn = t;
            const boost = i === 4 ? 1.6 : 1;
            streamAmt = Math.max(streamAmt, (smooth(pp.at + 0.018, pp.at + 0.035, p) - smooth(pp.end - 0.02, pp.end, p)) * boost);
        });
        const finalBurst = smooth(S.final - 0.005, S.final + 0.02, p) * (1 - smooth(S.final + 0.05, 1, p) * 0.6);
        streamAmt = Math.max(streamAmt, finalBurst * 1.4);
        bible.setTurn(turn);
        const pageGlow = Math.max(open * 0.5, streamAmt * 0.8, finalBurst);
        bible.setGlow(pageGlow + appear * (1 - land) * 0.3);
        const pageW = bible.book.localToWorld(bible.pageCenter.clone());
        bibleLight.position.set(pageW.x, pageW.y + 0.25, pageW.z);
        bibleLight.intensity = appear * (1 - land) * 1.5 + rest * 0.8 + open * 1.2 + streamAmt * 2 + finalBurst * 3;
        bibleGlow.position.set(pageW.x, pageW.y + 0.04, pageW.z);
        bibleGlow.scale.setScalar(0.2 + (1 - land) * appear * 0.6 + open * 0.25 + streamAmt * 0.3 + finalBurst * 1.0);
        bibleGlow.material.opacity = Math.min(1, appear * (1 - land) * 0.9 + rest * 0.5 + open * 0.35 + streamAmt * 0.35);

        // stream of light from the pages into his chest
        streamU.uA.value.copy(pageW).y += 0.03;
        streamU.uC.value.copy(chestW);
        streamU.uB.value.copy(pageW).lerp(chestW, 0.5).y += 0.55;
        streamU.uAmt.value = streamAmt;
        streamU.uTime.value = time;

        // renewal particles around him
        auraU.uBase.value.set(hipsW.x, 0.05, hipsW.z);
        auraU.uHeight.value = 0.6 + chestW.y * 1.1;
        auraU.uAmt.value = smooth(pCor + 0.03, pCor + 0.07, p) * 0.9 + final * 0.6;
        auraU.uTime.value = time;
        dustU.uTime.value = time;

        // his light spreads into the distance and reaches the generations behind him
        const spread = smooth(S.final + 0.02, 1, p);
        ringU.uC.value.set(hipsW.x, hipsW.z);
        ringU.uR.value = spread * 13;
        ringU.uAmt.value = smooth(S.final + 0.02, S.final + 0.05, p);
        rays.position.x = hipsW.x;
        rays.position.z = hipsW.z;
        crowd.forEach(({ f, mat, dist }) => {
            const lit = smooth(dist - 1.0, dist + 1.5, spread * 13);
            f.visible = spread > 0.001;
            mat.userData.u.uRim.value = lit * 0.9;
            mat.userData.u.uGlow.value = lit * 0.12;
        });

        // camera
        const cp = track(camPos, p, mixV3);
        const ct = track(camTgt, p, mixV3);
        const k = compactFactor();
        camera.position.set(ct[0] + (cp[0] - ct[0]) * k, ct[1] + (cp[1] - ct[1]) * k, ct[2] + (cp[2] - ct[2]) * k);
        camera.position.x += Math.sin(time * 0.21) * 0.03;
        camera.position.y += Math.sin(time * 0.17) * 0.02;
        camera.lookAt(ct[0], ct[1], ct[2]);
        if (bloom) bloom.strength = lerp(0.55, 1.0, Math.max(G, finalBurst));
    }

    function renderGlobe(p, time) {
        const t = smooth(0, S.ground, p);
        globe.rotation.y = 0.6 + p * 9 + time * 0.015;
        globe.rotation.x = 0.25;
        atmo.rotation.copy(globe.rotation);
        dawn.value = smooth(S.genesis, S.genesis + 0.05, p) * 0.55;
        const dist = lerp(8.5, 2.55, ease(t)) * compactFactor();
        camera.position.set(Math.sin(t * 0.6) * 0.8, lerp(0.9, 0.45, t), dist);
        camera.lookAt(0, lerp(0, 0.6, t), 0);
    }

    return {
        render(p, time) {
            const inGlobe = p < S.ground;
            const active = inGlobe ? globeScene : scene;
            if (inGlobe) renderGlobe(p, time); else renderGround(p, time);
            if (composer) {
                renderPass.scene = active;
                bloom.enabled = !inGlobe;
                composer.render();
            } else {
                renderer.render(active, camera);
            }
        },
        dispose() {
            ro.disconnect();
            const seen = new Set();
            [scene, globeScene].forEach((sc) => sc.traverse((o) => {
                if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
            }));
            disposables.forEach((d) => d.dispose?.());
            bible.dispose();
            composer?.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        },
    };
}
