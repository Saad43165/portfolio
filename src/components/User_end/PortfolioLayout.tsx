import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

// Theme context
const ThemeContext = React.createContext('light');

// Improved loading component with smooth progress animation
const LoadingIndicator = ({ progress }: { progress: number }) => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-700 font-medium text-lg">
            {progress < 100 ? 'Loading Portfolio...' : 'Almost there!'}
          </span>
          <span className="text-gray-500 font-mono text-sm">{progress}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-gray-400 text-sm">Preparing your experience...</span>
        </div>
      </div>
    </div>
  );
};

const PortfolioLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Simulate smooth progress for better UX
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        // Gradual slowdown as we approach completion
        const increment = prev < 60 ? 12 : prev < 80 ? 8 : prev < 90 ? 4 : 1;
        return Math.min(prev + increment, 90);
      });
    }, 250);

    // Actual prefetching with progress tracking
    const prefetchComponents = async () => {
      try {
        const componentPromises = [
          Navigation.prefetch(),
          Hero.prefetch(),
          About.prefetch(),
          Skills.prefetch(),
          Projects.prefetch(),
          Experience.prefetch(),
          Education.prefetch(),
          Contact.prefetch(),
          Footer.prefetch()
        ];

        // Track individual component loading progress
        let loadedCount = 0;
        const totalComponents = componentPromises.length;
        
        await Promise.all(
          componentPromises.map(promise => 
            promise.then(() => {
              loadedCount++;
              const actualProgress = Math.min(90, Math.floor((loadedCount / totalComponents) * 90));
              setLoadingProgress(prev => Math.max(prev, actualProgress));
            }).catch(err => {
              console.warn('Component prefetch failed:', err);
              loadedCount++;
              const actualProgress = Math.min(90, Math.floor((loadedCount / totalComponents) * 90));
              setLoadingProgress(prev => Math.max(prev, actualProgress));
            })
          )
        );

        // Complete the loading animation smoothly
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 400));
      } catch (error) {
        console.error('Error during component prefetching:', error);
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));
      } finally {
        clearInterval(progressInterval);
        setIsLoading(false);
      }
    };

    prefetchComponents();

    return () => clearInterval(progressInterval);
  }, [location]);

  return (
    <ThemeContext.Provider value="light">
      <div 
        className="min-h-screen bg-white"
        role="main"
        aria-label="Portfolio website content"
      >
        {isLoading && <LoadingIndicator progress={loadingProgress} />}
        
        {/* Content container with smooth fade-in transition */}
        <div 
          className={`transition-opacity duration-500 ease-in-out ${
            isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Suspense fallback={<LoadingIndicator progress={loadingProgress} />}>
            <Navigation />
            <main className="relative">
              <Hero />
              <section id="about" className="scroll-mt-16">
                <About />
              </section>
              <section id="experience" className="scroll-mt-16">
                <Experience />
              </section>
              <section id="education" className="scroll-mt-16">
                <Education />
              </section>
              <section id="skills" className="scroll-mt-16">
                <Skills />
              </section>
              <section id="projects" className="scroll-mt-16">
                <Projects />
              </section>
              <section id="contact" className="scroll-mt-16">
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