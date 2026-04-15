import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SnowParticles = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme(); // To react to theme changes if needed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Mouse tracking
    let mouse = {
      x: null,
      y: null,
      radius: 120 // Radius of interaction
    };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // moderately thicker sizes (1 to 4px)
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.weight = Math.random() * 0.8 + 0.3; // slightly faster falling to compensate for thickness
        this.wind = (Math.random() - 0.5) * 0.8; // Sway left/right
      }

      draw() {
        // Adjust color based on html class since context might not re-render immediately on theme change
        const isDark = document.documentElement.classList.contains('dark');
        // If dark mode, use pure white. If light mode, use a slightly opaque slate so it's visible but subtle
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.25)';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Fall down
        this.y += this.weight;
        this.x += this.wind;

        // Reset if goes off screen at the bottom
        if (this.y > canvas.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas.width;
          this.weight = Math.random() * 0.8 + 0.3;
        }

        // Wrap horizontally
        if (this.x > canvas.width + this.size) {
          this.x = 0 - this.size;
        } else if (this.x < 0 - this.size) {
          this.x = canvas.width + this.size;
        }

        // Mouse interaction (push away)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;

          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      // Make the snow denser by dividing screen area by a smaller number
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4000);

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-initialize effects if theme context dependency triggers

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh', opacity: 0.8 }}
      aria-hidden="true"
    />
  );
};

export default SnowParticles;
