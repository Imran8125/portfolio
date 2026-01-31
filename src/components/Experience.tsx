import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      role: 'Team Lead - Software Engineering Intern',
      company: 'Infosys Springboard',
      duration: 'Nov 2025 – Jan 2026',
      achievements: [
        'Led development of a monolithic Spring Boot backend with RBAC (Lawyer, NGO, Citizen).',
        'Optimized PostgreSQL geospatial queries for the Impact Dashboard, reducing latency from 5s to 200ms.',
        'Implemented OAuth2/JWT session management and integrated Spring Boot Actuator with virtual threads.'
      ]
    },
    {
      role: 'Machine Learning Intern',
      company: 'Edunet Foundation',
      duration: 'Oct 2025 – Nov 2025',
      achievements: [
        'Built a renewable energy forecasting pipeline processing 500K+ records.',
        'Reduced prediction error by 15% using statistical feature extraction on weather datasets.',
        'Deployed trained models on Kaggle for reproducibility.'
      ]
    },
    {
      role: 'Open Source Contributor',
      company: 'JabRef',
      duration: 'Mar 2025 – Apr 2025',
      achievements: [
        'Standardized UI consistency across 12+ modules and resolved complex merge conflicts for a 50K+ user base.'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => new Set([...prev, index]));
            }, index * 200);
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
    <section ref={sectionRef} id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Experience.timeline()
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 md:mb-16 ${
                animatedItems.has(index)
                  ? 'animate-scale-in'
                  : 'opacity-0 scale-95'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 shadow-lg shadow-cyan-400/50 z-10" />

              {/* Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 group">
                  {/* Duration badge */}
                  <span className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-mono mb-3">
                    {exp.duration}
                  </span>

                  {/* Role */}
                  <h3 className="text-xl font-mono font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {exp.role}
                  </h3>

                  {/* Company */}
                  <p className="text-blue-400 font-mono text-sm mb-4">
                    @ {exp.company}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm font-mono">
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <p className="font-mono text-gray-400 text-sm">
            // Professional journey & contributions
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
