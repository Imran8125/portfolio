import React, { useState, useEffect } from 'react';
import { ArrowDown, Rocket, FileDown } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "> Hello, I'm Imran";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    // Cursor blink effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = "/Shaik Imran's Resume.pdf";
    link.download = "Shaik Imran's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Floating physics formulas
  const formulas = [
    { text: 'E=mc²', position: 'top-20 left-20', delay: '0s', size: 'text-2xl md:text-4xl' },
    { text: 'λ', position: 'top-32 right-32', delay: '0.5s', size: 'text-3xl md:text-5xl' },
    { text: '∑', position: 'bottom-32 left-32', delay: '1s', size: 'text-4xl md:text-6xl' },
    { text: '∇²ψ', position: 'bottom-20 right-20', delay: '1.5s', size: 'text-2xl md:text-3xl' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Curved spacetime grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 255, 255, 0.1) 60%, transparent 70%),
              linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-20%)',
            transformOrigin: 'center center'
          }}
        />
        {/* Gravity well effect overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
          }}
        />
      </div>

      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-mono font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {text}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-mono">
          I architect intelligent systems, secure code, and digital backends.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            View Projects
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button 
            onClick={handleDownloadResume}
            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-mono font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50 flex items-center gap-2"
          >
            <FileDown className="w-5 h-5" />
            Download Resume
          </button>
        </div>

        {/* Floating physics formulas */}
        {formulas.map((formula, index) => (
          <div 
            key={index}
            className={`absolute ${formula.position} ${formula.size} font-mono text-cyan-400/30 animate-bounce`}
            style={{ animationDelay: formula.delay, animationDuration: '3s' }}
          >
            {formula.text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-cyan-400" />
      </div>
    </section>
  );
};

export default Hero;
