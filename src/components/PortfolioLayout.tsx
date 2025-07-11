import React, { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy load components
const Navigation = lazy(() => import('./Navigation'));
const Hero = lazy(() => import('./Hero'));
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Experience = lazy(() => import('./Experience'));
const Education = lazy(() => import('./Education'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));

// Theme context
const ThemeContext = React.createContext('light');

const PortfolioLayout = () => {
  const location = useLocation();

  // Scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ThemeContext.Provider value="light">
      <div 
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
        role="main"
        aria-label="Portfolio website content"
      >
        <Suspense fallback={<div className="loading-spinner mx-auto mt-12" aria-live="polite">Loading...</div>}>
          <Navigation />
          <main>
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
    </ThemeContext.Provider>
  );
};

export default PortfolioLayout;
export { ThemeContext };