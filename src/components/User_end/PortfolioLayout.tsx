import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';

// Enhanced lazy loading with prefetching and progress tracking
type LazyWithPrefetch<T extends React.ComponentType<unknown>> = React.LazyExoticComponent<T> & {
  prefetch: () => Promise<{ default: T }>
};

const lazyWithPrefetch = <T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
): LazyWithPrefetch<T> => {
  const Component = lazy(factory) as LazyWithPrefetch<T>;
  Component.prefetch = factory;
  return Component;
};

// Lazy load components
const Navigation = lazyWithPrefetch(() => import('./Navigation'));
const Hero = lazyWithPrefetch(() => import('./Hero'));
const About = lazyWithPrefetch(() => import('./About'));
const Skills = lazyWithPrefetch(() => import('./Skills'));
const Projects = lazyWithPrefetch(() => import('./Projects'));
const Experience = lazyWithPrefetch(() => import('./Experience'));
const Education = lazyWithPrefetch(() => import('./Education'));
const Contact = lazyWithPrefetch(() => import('./Contact'));
const Footer = lazyWithPrefetch(() => import('./Footer'));

// Improved loading component with smooth progress animation
// Improved loading component with Engineering AI theme and rotating orbits
const LoadingIndicator = ({ progress }: { progress: number }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#020617] z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
      />

      {/* Rotating Orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] border border-blue-500/20 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
        </motion.div>
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] border border-purple-500/10 rounded-full"
        >
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]" />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] border border-cyan-500/5 rounded-full"
        >
          <div className="absolute top-1/4 right-0 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
        </motion.div>
      </div>

      {/* Pulsing Core Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"
      />

      <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
        <div className="w-full space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]"
            >
              System Neural Link
            </motion.div>
            
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                {progress < 100 ? 'Neural Synthesis' : 'Core Ready'}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                  {progress < 30 ? 'Matrix Init' : progress < 60 ? 'Syncing Neurons' : 'Finalizing Core'}
                </p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
              </div>
            </div>
          </div>

          <div className="relative pt-2">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Efficiency 0.98</span>
              <span className="text-4xl font-black text-white tabular-nums tracking-tighter">
                {Math.floor(progress)}<span className="text-blue-500 text-xl">%</span>
              </span>
            </div>
            
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 relative shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" 
                  style={{ backgroundSize: '200% 100%' }} />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-16 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-3 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Data Stream Encrypted</span>
        </motion.div>
      </div>
    </div>
  );
};

// Theme context
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => { },
});

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <div
        className="custom-cursor-dot hidden md:block"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-[80] p-4 rounded-2xl bg-blue-600 text-white shadow-2xl shadow-blue-600/30 backdrop-blur-xl border border-white/10 flex items-center justify-center group"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </motion.button>
  );
};

const PortfolioLayout = () => {
  const location = useLocation();
  const { isLoading: isDataLoading, portfolioInfo } = useData();
  const [isAssetsLoading, setIsAssetsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [displayProgress, setDisplayProgress] = useState(0);
  const [forceComplete, setForceComplete] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Continuous progress animation logic - Optimized for stability and speed
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= 100) return 100;
        
        let increment = 1;
        if (prev < 50) increment = 8; // Faster start
        else if (prev < 85) increment = 4; // Steady middle
        else if (prev < 99.5) {
          // Slow down but keep moving to prevent "stuck" feeling
          increment = (isDataLoading || isAssetsLoading) ? 0.4 : 15;
        }

        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, 25); // Relaxed interval for better UI thread performance

    return () => clearInterval(interval);
  }, [isDataLoading, isAssetsLoading]);

  useEffect(() => {
    // Snap to completion when all data is definitely ready
    if (!isDataLoading && !isAssetsLoading) {
      setDisplayProgress(100);
    }
  }, [isDataLoading, isAssetsLoading]);

  useEffect(() => {
    // Dynamic SEO
    if (portfolioInfo?.name) {
      document.title = `${portfolioInfo.name} | ${portfolioInfo.roles?.[0] || 'Portfolio'}`;
    }
  }, [portfolioInfo]);

  useEffect(() => {
    console.log("Portfolio Version: 2.0.1 - Redesign Applied");
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Prefetch essential components with safety timeout
    const prefetchComponents = async () => {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Prefetch timeout')), 5000)
      );

      try {
        await Promise.race([
          Promise.all([
            Navigation.prefetch(),
            Hero.prefetch(),
            About.prefetch(),
            Skills.prefetch(),
            Projects.prefetch(),
            Experience.prefetch(),
            Education.prefetch(),
            Contact.prefetch(),
            Footer.prefetch()
          ]),
          timeoutPromise
        ]);
      } catch (error) {
        console.warn('Prefetching issue or timeout:', error);
      } finally {
        setIsAssetsLoading(false);
      }
    };

    if (!isDataLoading) {
      prefetchComponents();
    }
  }, [location, isDataLoading]);

  const isLoading = !forceComplete && (isDataLoading || isAssetsLoading || displayProgress < 100);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${theme === 'light' ? 'bg-[#fcfdfe]' : 'bg-[#020617]'}`}
        role="main"
        aria-label="Portfolio website content"
      >
        <CustomCursor />
        <BackToTop />
        {isLoading && <LoadingIndicator progress={displayProgress} />}

        <Suspense fallback={null}>
          <Navigation />
        </Suspense>

        {/* Content container with smooth fade-in transition */}
        <div
          className={`transition-opacity duration-1000 ease-in-out ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Suspense fallback={<LoadingIndicator progress={displayProgress} />}>
            <main className="relative">
              <Hero />
              <section id="about" className="scroll-mt-20">
                <About />
              </section>
              <section id="experience" className="scroll-mt-20">
                <Experience />
              </section>
              <section id="education" className="scroll-mt-20">
                <Education />
              </section>
              <section id="skills" className="scroll-mt-20">
                <Skills />
              </section>
              <section id="projects" className="scroll-mt-20">
                <Projects />
              </section>
              <section id="contact" className="scroll-mt-20">
                <Contact />
              </section>
            </main>
            <Footer />
          </Suspense>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default PortfolioLayout;
export { ThemeContext };