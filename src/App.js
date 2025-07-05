import { useState, useEffect } from "react";
import { Element } from "react-scroll";
import Header from "./components/Header";
import Hero from "./components/Hero";
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
import WigglyCursor from "./components/WigglyCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

/**
 * App component that serves as the main entry point for the portfolio application.
 *
 * This component manages the preloader state and prevents scrolling until the preloader is complete.
 * It renders various sections of the portfolio, each wrapped in an `Element` for scroll targeting.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

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

  return (
    <div className="font-poppins">
      <Preloader onComplete={() => setIsPreloaderComplete(true)} />
      <ScrollProgressBar isOpen={isPreloaderComplete} />
      <WigglyCursor />
      <Header />
      <Element name="hero">
        {" "}
        {/* Marks the scroll target for Hero section */}
        <Hero />
      </Element>
      <Element name="about">
        {" "}
        {/* Marks the scroll target for About section */}
        <About />
      </Element>
      <Element name="skills">
        {" "}
        {/* Marks the scroll target for Skills section */}
        <Skills />
      </Element>
      <Element name="projects">
        {" "}
        {/* Marks the scroll target for Projects section */}
        <Projects />
      </Element>
      <Element name="editing">
        {" "}
        {/* Marks the scroll target for Editing section */}
        <Editing />
      </Element>
      <Element name="publications">
        {" "}
        {/* Marks the scroll target for Publications section */}
        <Publications />
      </Element>
      <Element name="certifications">
        {" "}
        {/* Marks the scroll target for Certifications section */}
        <Certifications />
      </Element>
      <Element name="achievements">
        {" "}
        {/* Marks the scroll target for Achievements section */}
        <Achievements />
      </Element>
      <Element name="experience">
        {" "}
        {/* Marks the scroll target for Experience section */}
        <Experience />
      </Element>
      <Element name="testimonials">
        {" "}
        {/* Marks the scroll target for Testimonials section */}
        <Testimonials />
      </Element>
      <Element name="contact">
        {" "}
        {/* Marks the scroll target for Contact section */}
        <Contact />
      </Element>
      <Footer />
    </div>
  );
};

export default App;
