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

import { InteractiveBackgroundCanvas } from './InteractiveBackgroundCanvas';

const LoadingIndicator = ({ progress }: { progress: number }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#020617] z-[100]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-sm px-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center flex flex-col items-center"
        >
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-[0.3em] uppercase mb-3">
            Saad Ikram
          </h1>
          <div className="h-px w-12 bg-blue-500/50 mb-3" />
          <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
            Engineering Portfolio
          </p>
        </motion.div>

        {/* Minimalist Premium Progress Bar */}
        <div className="w-full h-px bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 flex justify-between w-full"
        >
          <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-black">
            {progress < 100 ? 'Loading Assets...' : 'Ready'}
          </span>
          <span className="text-[9px] text-gray-300 uppercase tracking-widest font-black tabular-nums">
            {Math.floor(progress)}%
          </span>
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

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
      style={{
        background: theme === 'light'
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.04), transparent 80%)`
          : `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.03) 50%, transparent 80%)`
      }}
    />
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
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

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
        if (prev < 50) increment = 10; // Rapid jump to 50
        else if (prev < 90) increment = 5; // Steady middle
        else if (prev < 99) {
          // Keep moving but wait for loading state
          increment = (isDataLoading || isAssetsLoading) ? 0.5 : 15;
        }

        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, 30); 

    return () => clearInterval(interval);
  }, [isDataLoading, isAssetsLoading]);

  useEffect(() => {
    // Fail-safe: Force finish after 4 seconds regardless of state
    const failSafe = setTimeout(() => {
      setDisplayProgress(100);
      setIsAssetsLoading(false);
    }, 4000);

    // Snap to completion when all data is definitely ready
    if (!isDataLoading && !isAssetsLoading) {
      setDisplayProgress(100);
      clearTimeout(failSafe);
    }

    return () => clearTimeout(failSafe);
  }, [isDataLoading, isAssetsLoading]);

  useEffect(() => {
    // Dynamic SEO
    if (portfolioInfo?.name) {
      document.title = `${portfolioInfo.name} | ${portfolioInfo.roles?.[0] || 'Portfolio'}`;
    }
  }, [portfolioInfo]);

  useEffect(() => {
    // Console Easter Egg for developers
    const labelStyle = 'color: #3b82f6; font-weight: bold; font-family: monospace; font-size: 11px;';
    const valueStyle = 'color: #f8fafc; font-family: monospace; font-size: 11px;';
    const titleStyle = 'background: linear-gradient(90deg, #3b82f6, #8b5cf6); color: white; padding: 4px 8px; font-weight: 900; border-radius: 4px; font-size: 12px; font-family: sans-serif; text-transform: uppercase;';

    console.log('%c⚡ SAAD IKRAM - PORTFOLIO CONSOLE SYSTEM ⚡', titleStyle);
    console.log('%cType %cSaad.help()%c to start neural interface.', labelStyle, 'color: #10b981; font-weight: bold; background: #064e3b; padding: 2px 4px; border-radius: 3px;', labelStyle);

    (window as any).Saad = {
      help: () => {
        console.log('%cAvailable Commands:', titleStyle);
        console.log('%cSaad.details() %c- Displays technical metadata.', 'color: #10b981;', valueStyle);
        console.log('%cSaad.techStack() %c- Outputs classified technical arsenal.', 'color: #10b981;', valueStyle);
        console.log('%cSaad.hire() %c- Returns contact instructions & secure transmission logs.', 'color: #10b981;', valueStyle);
        return 'Neural link established.';
      },
      details: () => {
        console.log('%c[Target Details]', 'color: #8b5cf6; font-weight: bold;');
        console.log('%cName: %cSaad Ikram', labelStyle, valueStyle);
        console.log('%cRole: %cLead Mobile & AI Developer', labelStyle, valueStyle);
        console.log('%cLocation: %cChakwal, Punjab, Pakistan', labelStyle, valueStyle);
        console.log('%cStatus: %cReady for Innovation & Core Architect tasks', labelStyle, 'color: #10b981; font-weight: bold;');
        return 'Data retrieval completed.';
      },
      techStack: () => {
        console.log('%c[Technical Arsenal Matrix]', 'color: #3b82f6; font-weight: bold;');
        console.log('%cLanguages: %cDart (Flutter), Python (FastAPI), TypeScript, JavaScript', labelStyle, valueStyle);
        console.log('%cPlatforms: %ciOS, Android, Web Ecosystems', labelStyle, valueStyle);
        console.log('%cTesting: %cPlaywright E2E Testing, Unit & Integration tests', labelStyle, valueStyle);
        console.log('%cCloud & DB: %cFirebase, Supabase, SQLite, PostgreSQL, GCP', labelStyle, valueStyle);
        return 'Matrix analysis compiled.';
      },
      hire: () => {
        console.log('%c[Secure Communication Protocols]', 'color: #ec4899; font-weight: bold;');
        console.log('%cEmail: %csaadnaz43165@gmail.com', labelStyle, valueStyle);
        console.log('%cPhone: %c+92-314-5459961', labelStyle, valueStyle);
        console.log('%cResume: %cRefer to UI download button or execute: window.open("/Saad_Ikram_CV.pdf")', labelStyle, valueStyle);
        return 'Transmission portal active.';
      }
    };

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
        <MouseGlow />
        <InteractiveBackgroundCanvas />
        <BackToTop />
        {isLoading && <LoadingIndicator progress={displayProgress} />}

        <Suspense fallback={null}>
          <Navigation />
        </Suspense>

        {/* Content container with snappy transition */}
        <div
          className={`transition-opacity duration-300 ease-out ${
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