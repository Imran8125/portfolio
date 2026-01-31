import React, { useState, useEffect } from 'react';
import { Atom, Orbit, Zap, Activity, Star, Globe, Radio } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'home', name: 'Home', Icon: Atom },
    { id: 'about', name: 'About', Icon: Orbit },
    { id: 'skills', name: 'Skills', Icon: Zap },
    { id: 'experience', name: 'Experience', Icon: Activity },
    { id: 'achievements', name: 'Achievements', Icon: Star },
    { id: 'projects', name: 'Projects', Icon: Globe },
    { id: 'contact', name: 'Contact', Icon: Radio }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);

      // Check which section is currently in view
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      let currentSection = 'home';
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sectionElements) {
        const sectionTop = section.element!.offsetTop;
        const sectionHeight = section.element!.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Physics-themed scroll indicator - responsive positioning */}
      <div className="fixed right-2 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-4">
        {sections.map((section) => {
          const IconComponent = section.Icon;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-8 h-8 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                activeSection === section.id
                  ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
              }`}
              title={section.name}
            >
              <IconComponent className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          );
        })}
        
        {/* Progress bar - positioned at the edge */}
        <div className="w-1 h-20 md:h-32 bg-gray-800 rounded-full relative mt-2 md:mt-4 ml-auto">
          <div 
            className="w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;
