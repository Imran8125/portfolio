
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import BackgroundEffects from '../components/BackgroundEffects';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <BackgroundEffects />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
