import React from 'react';
import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const PortfolioLayout = () => {
  const { refreshData } = useData();

  // Refresh data when portfolio loads to ensure latest data is displayed
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default PortfolioLayout;