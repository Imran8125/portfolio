import React, { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars
    const stars: Array<{x: number, y: number, size: number, speed: number}> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
      });
    }

    // Physics formulas floating in background
    const formulas = ['E=mc²', 'λ', '∫', '∑', '∂', 'ℏ', 'Δ', 'π', '∞', '∇'];
    const floatingFormulas: Array<{
      text: string,
      x: number,
      y: number,
      speed: number,
      opacity: number,
      size: number
    }> = [];

    for (let i = 0; i < 15; i++) {
      floatingFormulas.push({
        text: formulas[Math.floor(Math.random() * formulas.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.15 + 0.05,
        size: Math.random() * 16 + 12
      });
    }

    // Draw warped grid
    const drawWarpedGrid = () => {
      const gridSpacing = 80;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      // Horizontal lines with warp effect
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 10) {
          const distX = (x - centerX) / centerX;
          const distY = (y - centerY) / centerY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const warp = Math.sin(dist * Math.PI) * 20;
          
          const warpedY = y + warp * (1 - Math.abs(distY));
          
          if (x === 0) {
            ctx.moveTo(x, warpedY);
          } else {
            ctx.lineTo(x, warpedY);
          }
        }
        ctx.stroke();
      }

      // Vertical lines with warp effect
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 10) {
          const distX = (x - centerX) / centerX;
          const distY = (y - centerY) / centerY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          const warp = Math.sin(dist * Math.PI) * 20;
          
          const warpedX = x + warp * (1 - Math.abs(distX));
          
          if (y === 0) {
            ctx.moveTo(warpedX, y);
          } else {
            ctx.lineTo(warpedX, y);
          }
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      // Clear with slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw warped grid (static, so draw once per frame)
      drawWarpedGrid();

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.8 + 0.2})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw floating formulas
      ctx.font = 'bold 16px monospace';
      floatingFormulas.forEach(formula => {
        ctx.font = `bold ${formula.size}px monospace`;
        ctx.fillStyle = `rgba(139, 92, 246, ${formula.opacity})`;
        ctx.fillText(formula.text, formula.x, formula.y);
        
        formula.y += formula.speed;
        formula.x += Math.sin(formula.y * 0.01) * 0.5; // Gentle horizontal drift
        
        if (formula.y > canvas.height + 20) {
          formula.y = -20;
          formula.x = Math.random() * canvas.width;
          formula.text = formulas[Math.floor(Math.random() * formulas.length)];
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #000011 100%)' }}
    />
  );
};

export default BackgroundEffects;
