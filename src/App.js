import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Element } from "react-scroll";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";
import WigglyCursor from "./components/WigglyCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

// Lazy load components that are not immediately visible
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Editing = lazy(() => import("./components/Editing"));
const Publications = lazy(() => import("./components/Publications"));
const Certifications = lazy(() => import("./components/Certifications"));
const Achievements = lazy(() => import("./components/Achievements"));
const Experience = lazy(() => import("./components/Experience"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

gsap.registerPlugin(ScrollTrigger);

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
);

/**
 * App component that serves as the main entry point for the portfolio application.
 *
 * This component manages the preloader state and prevents scrolling until the preloader is complete.
 * It renders various sections of the portfolio, each wrapped in an `Element` for scroll targeting.
 * Components are lazy-loaded for better performance.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  // Memoize the scroll prevention logic
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    if (!isPreloaderComplete) {
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isPreloaderComplete]);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
  }, []);

  return (
    <div className="font-poppins">
      <Preloader onComplete={handlePreloaderComplete} />
      <ScrollProgressBar isOpen={isPreloaderComplete} />
      <WigglyCursor />
      <Header />
      
      <Element name="hero">
        <Hero />
      </Element>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Element name="about">
          <About />
        </Element>
        
        <Element name="skills">
          <Skills />
        </Element>
        
        <Element name="projects">
          <Projects />
        </Element>
        
        <Element name="editing">
          <Editing />
        </Element>
        
        <Element name="publications">
          <Publications />
        </Element>
        
        <Element name="certifications">
          <Certifications />
        </Element>
        
        <Element name="achievements">
          <Achievements />
        </Element>
        
        <Element name="experience">
          <Experience />
        </Element>
        
        <Element name="testimonials">
          <Testimonials />
        </Element>
        
        <Element name="contact">
          <Contact />
        </Element>
        
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
