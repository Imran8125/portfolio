import React, { useEffect, useRef, useState } from 'react';
import { clock, effect, frameLoop, init, surface } from 'vgpu';
import ResumeAdmin from './ResumeAdmin';

const OxygenAtom = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      if (!canvasRef.current) return;
      try {
        const gpu = await init();
        if (cancelled || !canvasRef.current) {
          gpu.dispose();
          return;
        }
        const atomSurface = surface(gpu, canvasRef.current, { dpr: [1, 2] });
        const time = clock(gpu);
        const atom = effect(gpu, `
          struct Params { time: f32, texel: vec2f }
          @group(0) @binding(0) var<uniform> params: Params;
          fn hash21(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
          fn ring(p: vec2f, radius: f32, width: f32) -> f32 {
            return smoothstep(width, 0.0, abs(length(p) - radius));
          }
          @fragment fn fs_main(@builtin(position) pos: vec4f) -> @location(0) vec4f {
            let uv = (pos.xy * params.texel - 0.5) * 2.0;
            let t = params.time;
            var color = vec3f(0.005, 0.012, 0.03);
            let glow = exp(-length(uv) * 2.8);
            color += vec3f(0.01, 0.12, 0.2) * glow;
            let orbitA = abs(uv.x * 0.82 + uv.y * 0.34);
            let orbitB = abs(uv.x * 0.82 - uv.y * 0.34);
            color += vec3f(0.02, 0.42, 0.65) * smoothstep(0.018, 0.0, abs(orbitA - 0.42));
            color += vec3f(0.1, 0.18, 0.65) * smoothstep(0.018, 0.0, abs(orbitB - 0.42));
            color += vec3f(0.02, 0.32, 0.42) * ring(uv, 0.39, 0.014);
            let nucleus = exp(-length(uv) * 18.0);
            color += vec3f(0.85, 0.14, 0.75) * nucleus;
            color += vec3f(0.1, 0.8, 1.0) * exp(-length(uv) * 32.0);
            for (var i = 0; i < 8; i++) {
              let a = t * (0.45 + f32(i % 3) * 0.12) + f32(i) * 0.785;
              let p = vec2f(cos(a), sin(a)) * (0.42 + 0.03 * sin(f32(i) * 4.0));
              color += vec3f(0.25, 0.9, 1.0) * exp(-length(uv - p) * 90.0);
            }
            return vec4f(color, 1.0);
          }
        `, { set: { params: { time: 0, texel: atomSurface.texelSize } } });
        atomSurface.onResize(() => atom.set({ params: { texel: atomSurface.texelSize } }));
        frameLoop(gpu, (frame) => {
          atom.set({ params: { time: time.time } });
          frame.pass(atomSurface, atom);
        });
        dispose = () => gpu.dispose();
      } catch {
        // WebGPU is optional; the canvas remains a graceful enhancement.
      }
    };
    start();
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return <canvas ref={canvasRef} aria-label="Animated 3D-inspired oxygen atom model" className="oxygen-atom-canvas" />;
};

const About = () => {
  const stats = [
    { label: 'LeetCode Problems', value: '150+', color: 'text-cyan-400' },
    { label: 'CodeVita Rank', value: 'Top 3%', color: 'text-blue-400' }
  ];

  const clicksRef = useRef<number[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleSecretClick = () => {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter((t) => now - t <= 4000);
    if (clicksRef.current.length >= 8) {
      clicksRef.current = [];
      setAdminOpen(true);
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Atom model with orbiting electrons */}
        <div className="relative">
          <div onClick={handleSecretClick} className="w-80 h-80 mx-auto relative flex items-center justify-center cursor-default select-none">
            <OxygenAtom />
            <span className="sr-only">Click the oxygen atom eight times to access the admin panel.</span>
          </div>
        </div>

        {/* Right: About content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-mono font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              &gt; About.exe
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a Computer Science student with a passion for building intelligent systems that solve real-world problems. 
              My journey combines the elegance of physics with the precision of code, creating solutions that are both elegant and powerful.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {['AI', 'Backend', 'Cybersecurity', 'System Design'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg text-cyan-400 font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Animated stats */}
          <div className="space-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-900/50 backdrop-blur rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-400">[ {stat.label}: </span>
                  <span className={`font-mono font-bold text-xl ${stat.color}`}>{stat.value} ]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResumeAdmin open={adminOpen} onClose={() => setAdminOpen(false)} />
    </section>
  );
};

export default About;
