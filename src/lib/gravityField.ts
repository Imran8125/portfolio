import { clock, effect, frameLoop, init, surface } from "vgpu";
import type { FrameLoopHandle } from "vgpu";

const SHADER = /* wgsl */ `
struct Params {
  resolution: vec2f,
  mouse: vec2f,
  time: f32,
  mass: f32,
}
@group(0) @binding(0) var<uniform> params: Params;

fn hash21(p: vec2f) -> f32 {
  var q = fract(p * vec2f(123.34, 456.21));
  q = q + dot(q, q + 45.32);
  return fract(q.x * q.y);
}

// Gravitational lens displacement: pulls space toward the cursor.
fn lens(p: vec2f, center: vec2f, radius: f32, strength: f32) -> vec2f {
  let d = p - center;
  let r = max(length(d), 0.0001);
  let falloff = strength / (1.0 + (r * r) / (radius * radius));
  return p - (d / r) * falloff;
}

fn gridLine(v: f32, spacing: f32, width: f32) -> f32 {
  let c = abs(fract(v / spacing - 0.5) - 0.5) * spacing;
  return 1.0 - smoothstep(0.0, width, c);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let p = uv * params.resolution;
  let m = params.mouse;
  let radius = 210.0;
  let strength = 120.0 * params.mass;

  // Warp space around the cursor, plus a slow breathing warp of the whole field.
  var q = lens(p, m, radius, strength);
  q = q + vec2f(
    sin(q.y * 0.006 + params.time * 0.25) * 9.0,
    cos(q.x * 0.006 - params.time * 0.2) * 9.0
  );

  let r = length(p - m);
  let near = 1.0 - smoothstep(0.0, radius * 1.8, r);

  // Spacetime grid, brighter and denser where it is stretched.
  let w = 1.15 + near * 1.4;
  let g = max(gridLine(q.x, 78.0, w), gridLine(q.y, 78.0, w));
  let gridGlow = 0.05 + near * 0.5;
  var col = vec3f(0.0, 0.85, 1.0) * g * gridGlow;

  // Concentric gravity ripples travelling out from the cursor.
  let ripple = sin(r * 0.05 - params.time * 2.2) * 0.5 + 0.5;
  col += vec3f(0.45, 0.25, 1.0) * ripple * near * near * 0.28;

  // Photon-sphere rim and core glow.
  let rim = exp(-pow(abs(r - radius * 0.42) / 16.0, 2.0));
  col += vec3f(0.35, 0.95, 1.0) * rim * 0.30;
  col += vec3f(0.25, 0.55, 1.0) * exp(-r / 90.0) * 0.22;

  // Lensed starfield: stars follow the warped coordinates.
  let cell = floor(q / 26.0);
  let f = fract(q / 26.0);
  let h = hash21(cell);
  let starPos = vec2f(hash21(cell + 3.7), hash21(cell + 9.1));
  let sd = length(f - starPos);
  let twinkle = 0.55 + 0.45 * sin(params.time * (1.0 + h * 2.5) + h * 30.0);
  let star = step(0.86, h) * (1.0 - smoothstep(0.0, 0.09, sd)) * twinkle;
  col += vec3f(0.8, 1.0, 1.0) * star * (0.5 + near * 0.9);

  return vec4f(col, 1.0);
}
`;

export type GravityFieldHandle = { stop: () => void };

/**
 * Starts the WebGPU gravity-well background on `canvas`.
 * Resolves to null when WebGPU is unavailable so the caller can keep its 2D fallback.
 */
export async function startGravityField(
  canvas: HTMLCanvasElement,
  mouse: { current: { x: number; y: number } }
): Promise<GravityFieldHandle | null> {
  if (typeof navigator === "undefined" || !("gpu" in navigator)) return null;

  let gpu: Awaited<ReturnType<typeof init>> | undefined;
  let loop: FrameLoopHandle | undefined;

  try {
    gpu = await init();
  } catch {
    return null;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] });

  const field = effect(gpu, SHADER, {
    label: "gravity-field",
    set: {
      params: {
        resolution: [canvas.width, canvas.height],
        mouse: [-9999, -9999],
        time: 0,
        mass: 0,
      },
    },
  });

  canvasSurface.onResize(() => {
    field.set({ params: { resolution: [canvas.width, canvas.height] } });
  });

  const time = clock(gpu);
  let mass = 0;

  loop = frameLoop(gpu, (frame) => {
    const m = mouse.current;
    const active = m.x > -1000;
    // Ease the well in and out so the cursor feels like it has inertia.
    mass += ((active ? 1 : 0) - mass) * 0.06;
    field.set({
      params: {
        time: time.time,
        mouse: [m.x * dpr, m.y * dpr],
        mass,
        resolution: [canvas.width, canvas.height],
      },
    });
    frame.pass(canvasSurface, field);
  });

  return {
    stop: () => {
      loop?.stop();
      gpu?.dispose();
    },
  };
}
