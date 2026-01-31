import React from 'react';

const About = () => {
  const stats = [
    { label: 'LeetCode Problems', value: '150+', color: 'text-cyan-400' },
    { label: 'CodeVita Rank', value: 'Top 3%', color: 'text-blue-400' }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Atom model with orbiting electrons */}
        <div className="relative">
          <div className="w-80 h-80 mx-auto relative flex items-center justify-center">
            {/* Central nucleus */}
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-lg shadow-cyan-400/50 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/30" />
            </div>
            
            {/* Outer orbit - slowest */}
            <div className="absolute w-72 h-72 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400/60" />
            </div>
            
            {/* Middle orbit - medium speed, reverse */}
            <div className="absolute w-52 h-52 border border-blue-400/30 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }}>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-400/80" />
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400/60" />
            </div>
            
            {/* Inner orbit - faster */}
            <div className="absolute w-36 h-36 border border-purple-400/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/80" />
            </div>
            
            {/* Innermost orbit - fastest, reverse */}
            <div className="absolute w-24 h-24 border border-green-400/30 rounded-full" style={{ animation: 'spin 6s linear infinite reverse' }}>
              <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/80" />
            </div>

            {/* Orbital plane indicator - tilted ellipse */}
            <div 
              className="absolute w-64 h-20 border border-cyan-400/10 rounded-full"
              style={{ transform: 'rotateX(75deg)' }}
            />
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
    </section>
  );
};

export default About;
