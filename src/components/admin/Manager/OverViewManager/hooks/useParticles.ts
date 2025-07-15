import { useState, useEffect } from 'react';
import { Particle } from '../types';

export const useParticles = (): Particle[] => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['blue', 'purple', 'cyan', 'pink', 'indigo'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -10 : particle.y + particle.speed * 0.05,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
        }))
      );
    };
    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  return particles;
};