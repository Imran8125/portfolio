
import React from 'react';

const About = () => {
  const stats = [
    { label: 'LeetCode Problems', value: '150+', color: 'text-cyan-400' },
    { label: 'CodeVita Rank', value: 'Top 3%', color: 'text-blue-400' }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Pixel chessboard with revolving chess pieces */}
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
                  }`}
                >
                </div>
              ))}
            </div>
            
            {/* Revolving chess pieces as planets */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer orbit - King */}
              <div className="absolute w-72 h-72 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl">♔</div>
              </div>
              
              {/* Middle orbit - Queen */}
              <div className="absolute w-56 h-56 border border-blue-400/20 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl text-cyan-400">♕</div>
              </div>
              
              {/* Inner orbit - Rook */}
              <div className="absolute w-40 h-40 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '12s' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xl text-purple-400">♖</div>
              </div>
              
              {/* Innermost orbit - Knight */}
              <div className="absolute w-24 h-24 border border-green-400/20 rounded-full" style={{ animation: 'spin 8s linear infinite reverse' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-lg text-green-400">♘</div>
              </div>
            </div>
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
