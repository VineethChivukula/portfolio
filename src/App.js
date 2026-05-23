// Import App styles
import "./App.css";

// Import React tools
import { useState, useEffect, useCallback } from "react";

// Import GSAP tools
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Import Custom components
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Editing from "./components/Editing";
import Publications from "./components/Publications";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";
import WigglyCursor from "./components/WigglyCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

/**
 * App component that serves as the main entry point for the portfolio application.
 *
 * This component manages the preloader state and prevents scrolling until the preloader is complete.
 * It renders various sections of the portfolio, each wrapped in an `div` for scroll targeting.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  // Prevent scrolling while preloader is active
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

  // Create ScrollSmoother after preloader finishes
  useGSAP(() => {
    if (isPreloaderComplete) {
      const smoother = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1,
      });

      return () => {
        smoother.kill();
      };
    }
  }, [isPreloaderComplete]);

  return (
    <div className="font-poppins">
      <Preloader onComplete={handlePreloaderComplete} />
      <ScrollProgressBar isOpen={isPreloaderComplete} />
      <WigglyCursor />
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div id="hero">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="editing">
            <Editing />
          </div>
          <div id="publications">
            <Publications />
          </div>
          <div id="certifications">
            <Certifications />
          </div>
          <div id="achievements">
            <Achievements />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
