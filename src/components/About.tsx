
import React from 'react';

const About = () => {
  const stats = [
    { label: 'LeetCode Problems', value: '150+', color: 'text-cyan-400' },
    { label: 'CodeVita Rank', value: 'Top 3%', color: 'text-blue-400' },
    { label: 'GitHub Commits', value: '3,700', color: 'text-purple-400' }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Pixel chessboard with planets */}
        <div className="relative">
          <div className="w-80 h-80 mx-auto relative">
            {/* Chessboard */}
            <div className="grid grid-cols-8 gap-1 bg-gray-800 p-4 rounded-lg shadow-2xl">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center text-lg ${
                    Math.floor(i / 8) % 2 === i % 2 
                      ? 'bg-gray-700' 
                      : 'bg-gray-600'
                  } ${[8, 16, 24, 32, 40, 48].includes(i) ? 'text-cyan-400' : ''}`}
                >
                  {[8, 16, 24, 32, 40, 48].includes(i) && '🪐'}
                </div>
              ))}
            </div>
            
            {/* Glowing orbit rings */}
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-4 border border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
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
              My journey combines the strategic thinking of chess with the precision of code, creating solutions that are both elegant and powerful.
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
            {stats.map((stat, index) => (
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
    </section>
  );
};

export default About;
