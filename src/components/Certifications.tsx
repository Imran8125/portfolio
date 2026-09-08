import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, Cloud, Database, Brain } from 'lucide-react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const certifications = [
    {
      title: 'AWS Certified AI Practitioner (AIF-C01)',
      issuer: 'Amazon Web Services',
      icon: Brain,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      icon: Cloud,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Microsoft Certified: Fabric Data Engineer Associate (DP-700)',
      issuer: 'Microsoft',
      icon: Database,
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Oracle AI Vector Search Certified Professional',
      issuer: 'Oracle',
      icon: BadgeCheck,
      color: 'from-green-400 to-emerald-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          certifications.forEach((_, index) => {
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
    <section ref={sectionRef} id="certifications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-mono font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          &gt; Certifications.verify()
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div
                key={cert.title}
                className={`relative bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6 transition-all duration-300 group hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 ${
                  animatedItems.has(index) ? 'animate-scale-in' : 'opacity-0 scale-95'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-mono font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono">{cert.issuer}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded text-xs font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent border border-gray-600">
                      certified
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-gray-400 text-sm">
            // Verified credentials & professional certifications
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
