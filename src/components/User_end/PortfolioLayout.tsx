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
// Improved loading component with professional premium aesthetic
const LoadingIndicator = ({ progress }: { progress: number }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Dynamic Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
        <div className="w-full space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {progress < 100 ? 'Initialising' : 'Finalising'}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                {progress < 40 ? 'Database handshake' : progress < 80 ? 'Syncing assets' : 'Polishing interface'}
              </p>
            </div>
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            />
          </div>
        </div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Secure Session Active</span>
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

  // Smooth progress animation logic with safety timeout
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let safetyTimeout: NodeJS.Timeout;

    if (isDataLoading) {
      // Fast climb to 40% while waiting for data
      interval = setInterval(() => {
        setDisplayProgress(prev => prev < 40 ? prev + 2 : prev);
      }, 30);

      // Force progress forward if stuck for > 7s
      safetyTimeout = setTimeout(() => {
        setForceComplete(true);
      }, 7000);
    } else if (isAssetsLoading) {
      // Rapid climb to 95% while prefetching
      interval = setInterval(() => {
        setDisplayProgress(prev => prev < 95 ? prev + 4 : prev);
      }, 20);
    } else {
      // Instant completion
      setDisplayProgress(100);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [isDataLoading, isAssetsLoading]);

  useEffect(() => {
    // Dynamic SEO
    if (portfolioInfo?.name) {
      document.title = `${portfolioInfo.name} | ${portfolioInfo.roles?.[0] || 'Portfolio'}`;
    }
  }, [portfolioInfo]);

  useEffect(() => {
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
        className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${theme === 'light' ? 'bg-white' : 'bg-[#020617]'}`}
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