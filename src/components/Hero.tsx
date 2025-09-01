import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

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
    link.href = "/Imran's Resume.pdf";
    link.download = "Imran's Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      {/* Chessboard grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`border border-cyan-400/20 ${
                Math.floor(i / 8) % 2 === i % 2 ? 'bg-cyan-400/5' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
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
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
          >
            <span className="mr-2">♞</span>
            View Projects
            <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button 
            onClick={handleDownloadResume}
            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-mono font-semibold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/50"
          >
            <span className="mr-2">♜</span>
            Download Resume
          </button>
        </div>

        {/* Floating chess pieces */}
        <div className="absolute top-20 left-20 text-4xl text-cyan-400/30 animate-bounce" style={{ animationDelay: '0s' }}>♔</div>
        <div className="absolute top-32 right-32 text-3xl text-blue-400/30 animate-bounce" style={{ animationDelay: '0.5s' }}>♕</div>
        <div className="absolute bottom-32 left-32 text-5xl text-purple-400/30 animate-bounce" style={{ animationDelay: '1s' }}>♗</div>
        <div className="absolute bottom-20 right-20 text-4xl text-cyan-400/30 animate-bounce" style={{ animationDelay: '1.5s' }}>♘</div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-cyan-400" />
      </div>
    </section>
  );
};

export default Hero;
