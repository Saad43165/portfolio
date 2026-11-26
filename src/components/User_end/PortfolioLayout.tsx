import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Cursor, GoProvider, Preloader, ReadyProvider, VelocityMarquee, goToSection, useSmoothScroll } from '../motion/kit';

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

// Theme context
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => { },
});

const MouseGlow = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { theme } = React.useContext(ThemeContext);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty('--mx', `${e.clientX}px`);
        ref.current?.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{
        background:
          theme === 'light'
            ? 'radial-gradient(600px circle at var(--mx, -999px) var(--my, -999px), rgba(59,130,246,0.05), transparent 80%)'
            : 'radial-gradient(600px circle at var(--mx, -999px) var(--my, -999px), rgba(99,102,241,0.12), rgba(168,85,247,0.03) 50%, transparent 80%)',
      }}
    />
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left z-[100]"
      style={{ scaleX }}
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
      onClick={() => goToSection('home')}
      aria-label="Back to top"
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
  useSmoothScroll();
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
        console.log('%cRole: %cFlutter Developer', labelStyle, valueStyle);
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

  const [ready, setReady] = useState(false);
  const finishIntro = React.useCallback(() => setReady(true), []);
  void forceComplete; void setForceComplete; void displayProgress; void isConsoleOpen; void setIsConsoleOpen;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ReadyProvider value={ready}>
        <GoProvider>
          <div
            className={`min-h-screen transition-colors duration-500 ${theme === 'light' ? 'bg-[#fcfdfe]' : 'bg-[#020617]'}`}
            role="main"
            aria-label="Portfolio website content"
          >
            <ScrollProgressBar />
            <Cursor />
            <MouseGlow />
            <InteractiveBackgroundCanvas />
            <BackToTop />
            {!ready && <Preloader name={portfolioInfo?.name || 'Saad Ikram'} onDone={finishIntro} />}

            <Suspense fallback={null}>
              <Navigation />
            </Suspense>

            <Suspense fallback={null}>
              <main className="relative">
                <Hero />
                <VelocityMarquee
                  items={['Flutter', 'Dart', 'TensorFlow Lite', 'Firebase', 'FastAPI', 'React Native', 'Next.js']}
                  outline={['Mobile', 'AI / ML', 'Offline-first', 'Cross-platform', 'Motion']}
                />
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
        </GoProvider>
      </ReadyProvider>
    </ThemeContext.Provider>
  );
};

export default PortfolioLayout;
export { ThemeContext };