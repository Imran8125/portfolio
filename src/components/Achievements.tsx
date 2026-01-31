import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Award, Medal, BadgeCheck } from 'lucide-react';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      title: 'TCS CodeVita 2025',
      description: 'Achieved Global Rank 156 (Round 2)',
      type: 'competition',
      icon: Trophy
    },
    {
      title: 'NASA Citizen Scientist',
      description: 'Recognized by the International Astronomical Search Collaboration (IASC)',
      type: 'recognition',
      icon: Award
    },
    {
      title: 'ISRO World Space Week 2024',
      description: '1st Place Winner in Quiz',
      type: 'award',
      icon: Medal
    },
    {
      title: 'Google Cybersecurity Professional',
      description: 'Professional Certificate',
      type: 'certification',
      icon: BadgeCheck
    },
    {
      title: 'Oracle AI Vector Search',
      description: 'Certified Professional',
      type: 'certification',
      icon: BadgeCheck
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'competition':
        return 'from-yellow-400 to-orange-500';
      case 'recognition':
        return 'from-purple-400 to-pink-500';
      case 'award':
        return 'from-cyan-400 to-blue-500';
      case 'certification':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-cyan-400 to-blue-500';
    }
  };

  const getTypeBorder = (type: string) => {
    switch (type) {
      case 'competition':
        return 'hover:border-yellow-400/50 hover:shadow-yellow-400/10';
      case 'recognition':
        return 'hover:border-purple-400/50 hover:shadow-purple-400/10';
      case 'award':
        return 'hover:border-cyan-400/50 hover:shadow-cyan-400/10';
      case 'certification':
        return 'hover:border-green-400/50 hover:shadow-green-400/10';
      default:
        return 'hover:border-cyan-400/50 hover:shadow-cyan-400/10';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          achievements.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => new Set([...prev, index]));
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="achievements" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Achievements.unlock()
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className={`bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6 transition-all duration-300 group hover:shadow-lg ${getTypeBorder(achievement.type)} ${
                  animatedItems.has(index)
                    ? 'animate-scale-in'
                    : 'opacity-0 scale-95'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTypeColor(achievement.type)} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 bg-gradient-to-br ${getTypeColor(achievement.type)} bg-clip-text`} style={{ color: 'transparent', stroke: 'url(#gradient)' }} />
                      <svg width="0" height="0">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-mono font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono">
                      {achievement.description}
                    </p>
                    
                    {/* Type badge */}
                    <span className={`inline-block mt-3 px-2 py-0.5 rounded text-xs font-mono capitalize bg-gradient-to-r ${getTypeColor(achievement.type)} bg-clip-text text-transparent border border-gray-600`}>
                      {achievement.type}
                    </span>
                  </div>
                </div>

                {/* Gradient glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(achievement.type)} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <p className="font-mono text-gray-400 text-sm">
            // Milestones & recognitions earned
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
