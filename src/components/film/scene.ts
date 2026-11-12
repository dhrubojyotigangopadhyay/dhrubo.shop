import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

/**
 * The film's single persistent WebGL scene: one particle system that is
 * re-formed for each chapter while one camera travels through all eight
 * sets on a single spline (no cuts). Everything readable lives in the DOM;
 * this canvas is atmosphere and is safe to lose (static CSS backdrop stays).
 */

export interface SceneOptions {
  canvas: HTMLCanvasElement;
  /** Release dates (ISO), oldest first. Drives the chapter 06 formation. */
  releaseDates: string[];
  lite: boolean;
  reducedMotion: boolean;
}

export interface SceneApi {
  /** f = chapter index + progress of the viewport centre through that chapter. */
  setProgress(f: number): void;
  setPointer(x: number, y: number): void;
  setFocus(group: number): void;
  resize(): void;
  start(): void;
  stop(): void;
  dispose(): void;
}

const CHAPTERS = 8;
const GAP = 64; // world distance between chapter sets along -z
const TAU = Math.PI * 2;

/** Engineer chapter: satellite layout around the runtime core (group ids 2..7). */
export const SYSTEM_NODE_COUNT = 7;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Put = (i: number, x: number, y: number, z: number) => void;

function systemNodes(): Vector3[] {
  const nodes = [new Vector3(0, 0, 0)];
  // The approval gate sits at the top of the ring; the rest follow clockwise.
  for (let k = 0; k < 6; k++) {
    const a = Math.PI / 2 - (k / 6) * TAU;
    nodes.push(new Vector3(Math.cos(a) * 11.5, Math.sin(a) * 7.6, Math.sin(a * 2 + 0.6) * 2.5));
  }
  return nodes;
}

function buildFormations(count: number, accentCount: number, releaseDates: string[]) {
  const rnd = mulberry32(20261112);
  const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2;
  const sets: Float32Array[] = [];
  const groups = new Float32Array(count);

  const make = (index: number, fill: (put: Put) => void) => {
    const arr = new Float32Array(count * 3);
    const cz = -index * GAP;
    fill((i, x, y, z) => {
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z + cz;
    });
    sets.push(arr);
  };
  const dust = (put: Put, i: number, w = 46, h = 16, d = 44) => put(i, (rnd() - 0.5) * 2 * w, (rnd() - 0.4) * 2 * h, (rnd() - 0.5) * 2 * d);

  // 01 Opening: drifting dust above a faint horizon; embers along the horizon line.
  make(0, (put) => {
    for (let i = 0; i < count; i++) {
      if (i < accentCount) put(i, (rnd() - 0.5) * 120, -7 + Math.abs(gauss()) * 0.5, -34 + gauss() * 2);
      else if (rnd() < 0.42) {
        const x = (rnd() - 0.5) * 110;
        const z = -40 + rnd() * 52;
        put(i, x, -7 + Math.sin(x * 0.16) * 0.5 + Math.cos(z * 0.2) * 0.4, z);
      } else dust(put, i, 48, 15, 30);
    }
  });

  // 02 Journey: a distribution network. One plant, depots, dealers.
  make(1, (put) => {
    const hub = new Vector3(-30, 0, 0);
    const depots: Vector3[] = [];
    const dealers: { p: Vector3; parent: Vector3 }[] = [];
    for (let d = 0; d < 6; d++) {
      const y = (d - 2.5) * 5.2;
      const depot = new Vector3(-9 + gauss() * 3, y + gauss(), gauss() * 5);
      depots.push(depot);
      for (let k = 0; k < 7; k++) {
        dealers.push({ p: new Vector3(8 + rnd() * 30, y + (k - 3) * 0.95 + gauss() * 1.2, depot.z + gauss() * 7), parent: depot });
      }
    }
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (i < accentCount) {
        // sparks on the plant
        put(i, hub.x + gauss() * 1.6, hub.y + gauss() * 1.6, hub.z + gauss() * 1.6);
      } else if (r < 0.2) {
        const dp = depots[(rnd() * depots.length) | 0];
        const t = Math.pow(rnd(), 0.8);
        put(i, hub.x + (dp.x - hub.x) * t + gauss() * 0.12, hub.y + (dp.y - hub.y) * t + gauss() * 0.12, hub.z + (dp.z - hub.z) * t + gauss() * 0.12);
      } else if (r < 0.62) {
        const dl = dealers[(rnd() * dealers.length) | 0];
        const t = rnd();
        put(i, dl.parent.x + (dl.p.x - dl.parent.x) * t + gauss() * 0.08, dl.parent.y + (dl.p.y - dl.parent.y) * t + gauss() * 0.08, dl.parent.z + (dl.p.z - dl.parent.z) * t + gauss() * 0.08);
      } else if (r < 0.8) {
        const dl = dealers[(rnd() * dealers.length) | 0];
        put(i, dl.p.x + gauss() * 0.35, dl.p.y + gauss() * 0.35, dl.p.z + gauss() * 0.35);
      } else if (r < 0.88) {
        const dp = depots[(rnd() * depots.length) | 0];
        put(i, dp.x + gauss() * 0.8, dp.y + gauss() * 0.8, dp.z + gauss() * 0.8);
      } else dust(put, i, 50, 18, 30);
    }
  });

  // 03 Engineer: the system map. Core runtime, six connected capabilities, one red approval gate.
  const nodes = systemNodes();
  make(2, (put) => {
    const sphere = (c: Vector3, radius: number) => {
      const u = rnd() * 2 - 1;
      const th = rnd() * TAU;
      const s = Math.sqrt(1 - u * u);
      const rr = radius * (0.92 + rnd() * 0.08);
      return [c.x + s * Math.cos(th) * rr, c.y + u * rr, c.z + s * Math.sin(th) * rr] as const;
    };
    for (let i = 0; i < count; i++) {
      if (i < accentCount) {
        // approval gate: a ring the core's traffic passes through
        const a = rnd() * TAU;
        const c = nodes[1];
        put(i, c.x + Math.cos(a) * 2.4 + gauss() * 0.05, c.y + Math.sin(a) * 2.4 + gauss() * 0.05, c.z + gauss() * 0.12);
        groups[i] = 2;
        continue;
      }
      const r = rnd();
      if (r < 0.2) {
        const [x, y, z] = sphere(nodes[0], 3.3);
        put(i, x, y, z);
        groups[i] = 1;
      } else if (r < 0.5) {
        const k = 2 + ((rnd() * 5) | 0);
        const [x, y, z] = sphere(nodes[k], 1.5);
        put(i, x, y, z);
        groups[i] = k + 1;
      } else if (r < 0.78) {
        const k = 1 + ((rnd() * 6) | 0);
        const t = 0.2 + rnd() * 0.72;
        const c = nodes[k];
        put(i, c.x * t + gauss() * 0.06, c.y * t + gauss() * 0.06, c.z * t + gauss() * 0.06);
        groups[i] = k + 1;
      } else {
        dust(put, i, 44, 20, 26);
        groups[i] = 0;
      }
    }
  });

  // 04 Builder: a dark stage. Floor grid and four columns of light, one per product.
  make(3, (put) => {
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (i < accentCount) put(i, (rnd() - 0.5) * 90, -9, -22 + gauss() * 0.4);
      else if (r < 0.5) {
        const onX = rnd() < 0.5;
        const a = (rnd() - 0.5) * 100;
        const b = (Math.round((rnd() - 0.5) * 14) / 14) * 100;
        put(i, onX ? a : b, -9, (onX ? b : a) * 0.5 - 8);
      } else if (r < 0.82) {
        const col = ((rnd() * 4) | 0) - 1.5;
        put(i, col * 17 + gauss() * 0.5, -9 + rnd() * 30, -20 + gauss() * 0.5);
      } else dust(put, i, 50, 16, 26);
    }
  });

  // 05 Thinker: seven gates in a line; work flows through them. Gate six (human approval) is red.
  make(4, (put) => {
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (i < accentCount) {
        const a = rnd() * TAU;
        put(i, Math.cos(a) * 5.2, Math.sin(a) * 5.2, 21 - 5 * 7 + gauss() * 0.08);
      } else if (r < 0.46) {
        let g = (rnd() * 7) | 0;
        if (g === 5) g = (rnd() * 5) | 0;
        const a = rnd() * TAU;
        put(i, Math.cos(a) * 5.2 + gauss() * 0.04, Math.sin(a) * 5.2 + gauss() * 0.04, 21 - g * 7 + gauss() * 0.06);
      } else if (r < 0.84) {
        const a = rnd() * TAU;
        const rr = Math.abs(gauss()) * 1.3;
        put(i, Math.cos(a) * rr, Math.sin(a) * rr, 26 - rnd() * 54);
      } else dust(put, i, 40, 16, 34);
    }
  });

  // 06 Proof: every published release, stacked by the day it shipped.
  make(5, (put) => {
    const days = releaseDates.map((d) => Math.floor(Date.parse(d) / 86400000));
    const d0 = days[0] ?? 0;
    const span = Math.max(1, (days[days.length - 1] ?? 1) - d0);
    const perDay = new Map<number, number>();
    const slots = days.map((d) => {
      const n = perDay.get(d) ?? 0;
      perDay.set(d, n + 1);
      return { x: ((d - d0) / span - 0.5) * 50, y: -7 + n * 1.5 };
    });
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (slots.length && (i < accentCount || r < 0.7)) {
        const s = i < accentCount ? slots[slots.length - 1] : slots[(rnd() * slots.length) | 0];
        put(i, s.x + (rnd() - 0.5) * 1.1, s.y + (rnd() - 0.5) * 1.05, gauss() * 0.25);
      } else if (r < 0.82) put(i, (rnd() - 0.5) * 58, -8.2, gauss() * 0.15);
      else dust(put, i, 46, 16, 24);
    }
  });

  // 07 Future: a living field. Slow swells and rising spores.
  make(6, (put) => {
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (r < 0.62) {
        const x = (rnd() - 0.5) * 120;
        const z = (rnd() - 0.5) * 80 - 6;
        put(i, x, -8 + Math.sin(x * 0.14 + z * 0.08) * 2.2 + Math.cos(z * 0.21 - x * 0.05) * 1.6, z);
      } else {
        const stem = (rnd() * 26) | 0;
        const sx = Math.sin(stem * 12.9898) * 43758.5453;
        const sz = Math.sin(stem * 78.233) * 12543.123;
        const x = ((sx - Math.floor(sx)) - 0.5) * 90;
        const z = ((sz - Math.floor(sz)) - 0.5) * 50 - 10;
        const h = Math.pow(rnd(), 1.6) * 26;
        put(i, x + Math.sin(h * 0.4 + stem) * 0.9 + gauss() * (0.2 + h * 0.03), -7 + h, z + Math.cos(h * 0.33 + stem) * 0.9 + gauss() * (0.2 + h * 0.03));
      }
    }
  });

  // 08 Contact: an eclipse. A thin ring with one red arc, and a calm floor.
  make(7, (put) => {
    for (let i = 0; i < count; i++) {
      const r = rnd();
      if (i < accentCount) {
        const a = -0.5 + rnd() * 1.1;
        put(i, Math.cos(a) * 10.2 + gauss() * 0.05, Math.sin(a) * 10.2 + gauss() * 0.05, gauss() * 0.1);
      } else if (r < 0.5) {
        const a = rnd() * TAU;
        const rr = 10.2 + Math.abs(gauss()) * (rnd() < 0.8 ? 0.12 : 2.6);
        put(i, Math.cos(a) * rr, Math.sin(a) * rr, gauss() * 0.15);
      } else if (r < 0.82) {
        const x = (rnd() - 0.5) * 110;
        put(i, x, -11 + Math.cos(x * 0.1) * 0.3, -30 + rnd() * 50);
      } else dust(put, i, 46, 16, 24);
    }
  });

  return { sets, groups, nodes };
}

// Two camera marks per chapter (enter, leave). The spline through all sixteen is the one-take path.
const MARKS: [number, number, number, number, number, number][] = [
  // x, y, z (relative to the chapter centre), look x, y, z
  [0, 1.5, 30, 0, 0, 0],
  [2, 0.5, 22, 0, -1, 0],
  [-48, 3, 30, -44, 0, 0],
  [2, 2, 36, -2, 0, 0],
  [-5, 1, 39, 0, 0, 0],
  [5, -1, 36, 0, 0, 0],
  [-12, 2, 30, -8, 2, -20],
  [12, 2, 30, 8, 2, -20],
  [3.4, 2.2, 36, 0, 0, 10],
  [1.2, 0.6, 12, 0, 0, -20],
  [-6, 1, 34, 0, -2, 0],
  [6, 0, 30, 0, -2, 0],
  [0, -3, 30, 0, 2, -10],
  [0, 3, 18, 0, 6, -14],
  [0, 0, 44, 0, 0, 0],
  [0, -1, 30, 0, 0, 0],
];

// Per chapter: base colour A, base colour B, accent strength, overall gain.
const LOOKS: [number[], number[], number, number][] = [
  [[0.8, 0.74, 0.64], [0.42, 0.39, 0.37], 1, 0.9],
  [[0.98, 0.66, 0.38], [0.6, 0.48, 0.4], 1, 0.85],
  [[0.86, 0.87, 0.92], [0.5, 0.54, 0.64], 1, 1],
  [[0.72, 0.69, 0.64], [0.36, 0.34, 0.36], 0.7, 0.5],
  [[0.88, 0.83, 0.74], [0.5, 0.49, 0.54], 1, 0.62],
  [[0.92, 0.87, 0.78], [0.56, 0.5, 0.44], 1, 0.95],
  [[0.3, 0.96, 0.82], [0.14, 0.48, 0.78], 0.25, 1.5],
  [[0.92, 0.86, 0.78], [0.5, 0.45, 0.42], 1, 0.9],
];

const VERT = /* glsl */ `
attribute vec3 aFrom;
attribute vec3 aTo;
attribute vec4 aSeed; // x: random, y: size, z: accent flag, w: system-map group
uniform float uMix;
uniform float uTime;
uniform float uPx;
uniform float uMotion;
uniform float uFocus;
uniform float uFocusAmt;
uniform float uAccentAmt;
uniform float uGain;
uniform float uRise;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uAccent;
varying vec3 vCol;
varying float vAlpha;
void main() {
  float d = aSeed.x;
  float m = clamp(uMix * 1.5 - d * 0.5, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 p = mix(aFrom, aTo, m);
  float arc = sin(m * 3.14159265);
  p += arc * vec3(sin(d * 40.0), cos(d * 31.0), sin(d * 17.0)) * 5.0;
  float t = uTime * 0.16 + d * 6.2831;
  p += vec3(sin(t + p.y * 0.3), cos(t * 1.3 + p.x * 0.25), sin(t * 0.7 + p.z * 0.2)) * 0.2 * uMotion;
  p.y += uRise * uMotion * (0.5 + 0.5 * sin(uTime * 0.5 + d * 30.0)) * 0.9;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  gl_PointSize = min(aSeed.y * uPx / max(dist, 1.0), uPx * 0.16);
  float fade = smoothstep(3.0, 14.0, dist) * (1.0 - smoothstep(80.0, 150.0, dist));
  vec3 c = mix(uColB, uColA, d);
  c = mix(c, uAccent, aSeed.z * uAccentAmt);
  float match = 1.0 - step(0.5, abs(aSeed.w - uFocus));
  float foc = mix(1.0, mix(0.5, 1.9, match), uFocusAmt * step(0.5, uFocus));
  float tw = 0.72 + 0.28 * sin(uTime * 1.4 + d * 50.0) * uMotion;
  vCol = c * foc * (1.0 + aSeed.z * 0.8);
  vAlpha = fade * tw * uGain;
}`;

const FRAG = /* glsl */ `
precision mediump float;
varying vec3 vCol;
varying float vAlpha;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r);
  a *= a * vAlpha;
  gl_FragColor = vec4(vCol, a);
}`;

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function createScene({ canvas, releaseDates, lite, reducedMotion }: SceneOptions): SceneApi {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  let dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.6);
  renderer.setPixelRatio(dpr);

  let count = lite ? 9000 : 30000;
  const accentCount = Math.round(count * 0.05);
  const { sets, groups, nodes } = buildFormations(count, accentCount, releaseDates);

  const seeds = new Float32Array(count * 4);
  const rnd = mulberry32(7);
  for (let i = 0; i < count; i++) {
    seeds[i * 4] = rnd();
    seeds[i * 4 + 1] = (0.55 + Math.pow(rnd(), 3) * 1.9) * (i < accentCount ? 1.25 : 1);
    seeds[i * 4 + 2] = i < accentCount ? 1 : 0;
    seeds[i * 4 + 3] = groups[i];
  }
  const attrs = sets.map((s) => new BufferAttribute(s, 3));
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", attrs[0]);
  geometry.setAttribute("aFrom", attrs[0]);
  geometry.setAttribute("aTo", attrs[1]);
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 4));

  const uniforms = {
    uMix: { value: 0 },
    uTime: { value: 0 },
    uPx: { value: 1 },
    uMotion: { value: reducedMotion ? 0 : 1 },
    uFocus: { value: 0 },
    uFocusAmt: { value: 0 },
    uAccentAmt: { value: 1 },
    uGain: { value: 1 },
    uRise: { value: 0 },
    uColA: { value: new Vector3(1, 1, 1) },
    uColB: { value: new Vector3(0.5, 0.5, 0.5) },
    uAccent: { value: new Vector3(1.0, 0.2, 0.09) },
  };
  const material = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending });
  const points = new Points(geometry, material);
  points.frustumCulled = false;
  const scene = new Scene();
  scene.add(points);

  const camera = new PerspectiveCamera(50, 1, 0.5, 400);
  const posCurve = new CatmullRomCurve3(MARKS.map((m, k) => new Vector3(m[0], m[1], m[2] - Math.floor(k / 2) * GAP)), false, "centripetal");
  const lookCurve = new CatmullRomCurve3(MARKS.map((m, k) => new Vector3(m[3], m[4], m[5] - Math.floor(k / 2) * GAP)), false, "centripetal");

  let target = 0;
  let current = -1;
  let pointerX = 0;
  let pointerY = 0;
  let px = 0;
  let py = 0;
  let focus = 0;
  let segment = -1;
  let running = false;
  let raf = 0;
  let last = 0;
  let slowFrames = 0;
  let frames = 0;
  let width = 0;
  let height = 0;
  const camPos = new Vector3();
  const camLook = new Vector3();
  const projected = new Vector3();
  const labels = Array.from(document.querySelectorAll<HTMLElement>("[data-sysnode]"));
  const wide = window.matchMedia("(min-width: 1024px)");

  const resize = () => {
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Hold the horizontal field of view on tall screens so formations stay in frame.
    camera.fov = camera.aspect < 1 ? Math.min(88, 50 / Math.pow(camera.aspect, 0.72)) : 50;
    camera.updateProjectionMatrix();
    uniforms.uPx.value = height * dpr * 0.082;
  };

  const render = (time: number) => {
    const dt = Math.min(0.05, (time - last) / 1000 || 0.016);
    last = time;
    current = current < 0 || reducedMotion ? target : current + (target - current) * (1 - Math.exp(-dt * 6));
    const f = Math.min(CHAPTERS - 0.001, Math.max(0, current));

    // Formation: hold through a chapter, re-form while crossing into the next.
    const g = Math.max(0, f - 0.2);
    const seg = Math.min(CHAPTERS - 2, Math.floor(g));
    if (seg !== segment) {
      segment = seg;
      geometry.setAttribute("aFrom", attrs[seg]);
      geometry.setAttribute("aTo", attrs[seg + 1]);
    }
    const mix = reducedMotion ? (g - seg > 0.75 ? 1 : 0) : smooth(0.5, 1, g - seg);
    uniforms.uMix.value = mix;

    const a = LOOKS[seg];
    const b = LOOKS[seg + 1];
    uniforms.uColA.value.set(lerp(a[0][0], b[0][0], mix), lerp(a[0][1], b[0][1], mix), lerp(a[0][2], b[0][2], mix));
    uniforms.uColB.value.set(lerp(a[1][0], b[1][0], mix), lerp(a[1][1], b[1][1], mix), lerp(a[1][2], b[1][2], mix));
    uniforms.uAccentAmt.value = lerp(a[2], b[2], mix);
    uniforms.uGain.value = lerp(a[3], b[3], mix);
    uniforms.uRise.value = smooth(5.6, 6.2, f) * (1 - smooth(6.9, 7.3, f));
    uniforms.uTime.value = reducedMotion ? 0 : time / 1000;
    const inSystem = smooth(1.9, 2.25, f) * (1 - smooth(2.8, 3.05, f));
    uniforms.uFocus.value = focus;
    uniforms.uFocusAmt.value = inSystem;

    // Camera: chapter i is held between its two marks while f runs i+0.2 .. i+0.8.
    const ci = Math.floor(f);
    const local = f - ci;
    let k: number;
    if (local < 0.2) k = ci * 2 - 0.5 + (local / 0.2) * 0.5;
    else if (local < 0.8) k = ci * 2 + (local - 0.2) / 0.6;
    else k = ci * 2 + 1 + ((local - 0.8) / 0.2) * 0.5;
    const u = Math.min(1, Math.max(0, k / (MARKS.length - 1)));
    posCurve.getPoint(u, camPos);
    lookCurve.getPoint(u, camLook);
    px += (pointerX - px) * 0.05;
    py += (pointerY - py) * 0.05;
    // The system map shares the frame with its text panel: beside it on wide screens, above it on tall ones.
    const shiftX = (camera.aspect > 1.2 ? -9.5 : 0) * inSystem;
    const shiftY = (camera.aspect > 1.2 ? 0 : -7.5) * inSystem;
    camera.position.set(camPos.x + px * 1.6 + shiftX, camPos.y - py * 1.0 + shiftY, camPos.z);
    camLook.x += shiftX;
    camLook.y += shiftY;
    camera.lookAt(camLook);
    renderer.render(scene, camera);

    // Pin the system-map labels to their nodes (desktop only; phones get a list).
    if (labels.length && wide.matches && inSystem > 0.01) {
      for (const el of labels) {
        const n = nodes[Number(el.dataset.sysnode)];
        if (!n) continue;
        projected.set(n.x, n.y, n.z - 2 * GAP).project(camera);
        el.style.transform = `translate3d(${((projected.x + 1) / 2) * width}px, ${((1 - projected.y) / 2) * height}px, 0)`;
      }
    }

    // Adaptive quality: if early frames are slow, halve the particle draw and drop to 1x.
    if (frames < 90) {
      frames++;
      if (frames > 20 && dt > 0.03) slowFrames++;
      if (frames === 90 && slowFrames > 30) {
        count = Math.floor(count / 2);
        geometry.setDrawRange(0, count);
        dpr = 1;
        renderer.setPixelRatio(1);
        resize();
      }
    }
  };

  const loop = (time: number) => {
    if (!running) return;
    render(time);
    // With reduced motion nothing drifts, so only draw when the scroll position changes.
    raf = reducedMotion ? 0 : requestAnimationFrame(loop);
  };

  resize();
  return {
    setProgress(f) {
      target = f;
      if (reducedMotion && running && !raf) raf = requestAnimationFrame((t) => { raf = 0; render(t); });
    },
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
    setFocus(group) {
      focus = group;
    },
    resize,
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
