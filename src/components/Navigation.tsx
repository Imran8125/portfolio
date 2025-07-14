
import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'home', name: 'Home', symbol: '♔' },
    { id: 'about', name: 'About', symbol: '♕' },
    { id: 'skills', name: 'Skills', symbol: '♗' },
    { id: 'projects', name: 'Projects', symbol: '♖' },
    { id: 'contact', name: 'Contact', symbol: '♘' }
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
      {/* Chess piece scroll indicator - responsive positioning */}
      <div className="fixed right-2 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-8 h-8 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center text-sm md:text-xl transition-all duration-300 hover:scale-110 ${
              activeSection === section.id
                ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/50'
                : 'border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
            }`}
            title={section.name}
          >
            {section.symbol}
          </button>
        ))}
        
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
