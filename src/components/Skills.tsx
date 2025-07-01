
import React, { useState } from 'react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'Java', level: 90, category: 'Backend', icon: '☕', description: 'Enterprise applications & Spring Boot' },
    { name: 'Python', level: 95, category: 'AI', icon: '🐍', description: 'ML models & data analysis' },
    { name: 'C/C++', level: 85, category: 'System', icon: '⚡', description: 'System programming & algorithms' },
    { name: 'PyTorch', level: 80, category: 'AI', icon: '🔥', description: 'Deep learning & neural networks' },
    { name: 'Spring Boot', level: 88, category: 'Backend', icon: '🍃', description: 'RESTful APIs & microservices' },
    { name: 'PostgreSQL', level: 82, category: 'Database', icon: '🐘', description: 'Database design & optimization' },
    { name: 'Docker', level: 78, category: 'DevOps', icon: '🐳', description: 'Containerization & deployment' },
    { name: 'React', level: 85, category: 'Frontend', icon: '⚛️', description: 'Modern web applications' }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Skills.map()
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`relative aspect-square border-2 transition-all duration-300 cursor-pointer group ${
                Math.floor(index / 4) % 2 === index % 2
                  ? 'bg-gray-900/30 border-gray-700'
                  : 'bg-gray-800/30 border-gray-600'
              } hover:border-cyan-400 hover:bg-cyan-400/10 hover:scale-105`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="font-mono font-semibold text-white text-center mb-1">
                  {skill.name}
                </h3>
                <div className="text-xs text-gray-400 text-center">
                  {skill.category}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-xs text-cyan-400 mt-1">{skill.level}%</span>
              </div>

              {/* Hover tooltip */}
              {hoveredSkill === skill.name && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black border border-cyan-400 rounded-lg p-3 text-sm font-mono text-cyan-400 z-10 whitespace-nowrap">
                  Skill Tree: {skill.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-cyan-400" />
                </div>
              )}

              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <p className="font-mono text-gray-400 text-sm">
            // Hover over each skill square to reveal details
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
