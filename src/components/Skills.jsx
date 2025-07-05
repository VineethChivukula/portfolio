import { useEffect, memo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Constants
const SKILLS = [
  "Python",
  "Java",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "API Development",
  "MySQL",
  "Machine Learning",
  "Deep Learning",
  "Data Structures",
  "Video Editing",
];

const ANIMATION_CONFIG = {
  from: { opacity: 0, y: 50 },
  to: {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power3.out",
  },
  scrollTrigger: {
    trigger: ".skills-section",
    start: "top 80%",
    end: "bottom 40%",
    toggleActions: "play none none reverse",
    markers: false,
  },
};

/**
 * Skills component that displays a list of skills with animations.
 *
 * This component uses the GSAP library to animate the appearance of skill items
 * when they come into view. The animations are triggered by the ScrollTrigger plugin.
 * Optimized with React.memo for better performance.
 *
 * @component
 * @example
 * return (
 *   <Skills />
 * )
 *
 * @returns {JSX.Element} The rendered Skills component.
 */
const Skills = memo(() => {
  const animationRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.fromTo(
      ".skill-item",
      ANIMATION_CONFIG.from,
      {
        ...ANIMATION_CONFIG.to,
        scrollTrigger: ANIMATION_CONFIG.scrollTrigger,
      }
    );

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <section
      id="skills"
      className="skills-section bg-purple-900 text-white py-20"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center">
          {SKILLS.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="skill-item bg-purple-700 px-4 py-2 m-2 rounded-full text-white shadow-md cursor-pointer text-sm sm:text-base hover:bg-purple-600 transition-colors duration-300"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
