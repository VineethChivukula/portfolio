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
 * App component that serves as the main entry point for the portfolio application.
 *
 * @component
 *
 * @example
 * return (
 *   <App />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * The App component manages the state of the preloader and prevents scrolling while the preloader is active.
 * It uses the `useEffect` hook to add and remove event listeners for preventing scroll events.
 * Once the preloader is complete, the scroll prevention is removed.
 *
 * @returns {JSX.Element} The main application component wrapped in a custom Scrollbar.
 *
 * @property {boolean} isPreloaderComplete - State to track if the preloader has completed.
 * @property {function} setIsPreloaderComplete - Function to update the state of the preloader.
 *
 * @function preventScroll - Event handler to prevent default scroll behavior.
 *
 * @listens wheel - Adds an event listener to prevent wheel scroll.
 * @listens touchmove - Adds an event listener to prevent touch scroll.
 *
 * @component Preloader - Displays a preloader animation and triggers `onComplete` callback when done.
 * @component ScrollProgressBar - Displays a progress bar indicating scroll position.
 * @component WigglyCursor - Adds a custom cursor effect.
 * @component Header - Displays the header section of the portfolio.
 * @component Hero - Displays the hero section.
 * @component About - Displays the about section.
 * @component Skills - Displays the skills section.
 * @component Projects - Displays the projects section.
 * @component Publications - Displays the publications section.
 * @component Certifications - Displays the certifications section.
 * @component Awards - Displays the awards section.
 * @component Experience - Displays the experience section.
 * @component Testimonials - Displays the testimonials section.
 * @component Contact - Displays the contact section.
 * @component Footer - Displays the footer section.
 */
const App = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    if (!isPreloaderComplete) {
      const preventScroll = (e) => e.preventDefault();
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });
      return () => {
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isPreloaderComplete]);

  return (
    <Scrollbar>
      <div className="font-poppins">
        <Preloader onComplete={() => setIsPreloaderComplete(true)} />
        <ScrollProgressBar />
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
