import { useEffect, memo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Constants for GSAP animations
const ANIMATION_CONFIG = {
  heading: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
    trigger: { start: "top 90%", end: "bottom 60%", scrub: true, toggleActions: "play reverse play reverse" }
  },
  paragraph: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 1.5, ease: "power3.out" },
    trigger: { start: "top 90%", end: "bottom 60%", scrub: true, toggleActions: "play reverse play reverse" }
  },
  button: {
    from: { opacity: 0, rotation: -15 },
    to: { opacity: 1, rotation: 0, duration: 1, ease: "power3.out" },
    trigger: { start: "top 90%", end: "bottom 60%", scrub: true, toggleActions: "play reverse play reverse" }
  }
};

const RESUME_URL = "https://drive.google.com/file/d/1l3CLBdfO_6W3PI6YvbZuF0Sg0lnSNqLd/view?usp=sharing";

/**
 * About component that displays information about the user.
 *
 * This component uses GSAP animations with ScrollTrigger to animate the appearance
 * of the heading, paragraph, and button elements as they come into view.
 * Optimized with React.memo for better performance.
 *
 * @component
 * @example
 * return (
 *   <About />
 * )
 *
 * @returns {JSX.Element} The rendered About component.
 */
const About = memo(() => {
  const animationsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Clear previous animations
    animationsRef.current.forEach(animation => animation.kill());
    animationsRef.current = [];

    // Heading animation
    const headingAnimation = gsap.fromTo(
      ".about-heading",
      ANIMATION_CONFIG.heading.from,
      {
        ...ANIMATION_CONFIG.heading.to,
        scrollTrigger: {
          trigger: ".about-heading",
          ...ANIMATION_CONFIG.heading.trigger,
        },
      }
    );

    // Paragraph animation
    const paragraphAnimation = gsap.fromTo(
      ".about-paragraph",
      ANIMATION_CONFIG.paragraph.from,
      {
        ...ANIMATION_CONFIG.paragraph.to,
        scrollTrigger: {
          trigger: ".about-paragraph",
          ...ANIMATION_CONFIG.paragraph.trigger,
        },
      }
    );

    // Button animation
    const buttonAnimation = gsap.fromTo(
      ".about-button",
      ANIMATION_CONFIG.button.from,
      {
        ...ANIMATION_CONFIG.button.to,
        scrollTrigger: {
          trigger: ".about-button",
          ...ANIMATION_CONFIG.button.trigger,
        },
      }
    );

    animationsRef.current = [headingAnimation, paragraphAnimation, buttonAnimation];

    return () => {
      animationsRef.current.forEach(animation => animation.kill());
    };
  }, []);

  return (
    <section
      id="about"
      className="about-section bg-purple-800 text-white py-20"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="about-heading text-3xl sm:text-4xl font-bold mb-6">
          About Me
        </h2>
        <p className="about-paragraph text-base sm:text-lg text-purple-300 max-w-3xl mx-auto leading-relaxed">
          I am Vineeth Chivukula, a Software Engineer with a passion for
          building scalable applications and solving challenging problems using
          technology, and I also enjoy video editing as a hobby. With a strong
          background in Python, Java, and React.js, I specialize in developing
          efficient APIs and intuitive user interfaces. My projects range from
          automating workflows to creating data visualization tools that enhance
          user experience.
        </p>
        <div className="mt-8 about-button">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Vineeth's Resume"
          >
            <button className="bg-purple-700 hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg transition-colors duration-300">
              Download Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
