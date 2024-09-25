import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import Certifications from "./components/Certifications";
import Awards from "./components/Awards";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WigglyCursor from "./components/WigglyCursor";
import { Scrollbar } from "smooth-scrollbar-react";
import ScrollProgressBar from "./components/ScrollProgressBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

/**
 * App component that manages the preloader state and prevents scrolling until the preloader is complete.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 *
 * @returns {JSX.Element} The rendered App component.
 *
 * @description
 * The App component initializes with a preloader and prevents user scrolling until the preloader is complete.
 * It uses the `useState` hook to manage the preloader state and the `useEffect` hook to add and remove event listeners
 * for preventing scroll events. Once the preloader is complete, the scroll prevention is removed.
 *
 * @function
 * @name App
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
    <Scrollbar>
      <div className="font-poppins">
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />
        <ScrollProgressBar isOpen={isPreloaderComplete} />
        <WigglyCursor />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Certifications />
        <Awards />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </Scrollbar>
  );
};

export default App;
