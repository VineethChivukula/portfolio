import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  "Python",
  "Java",
  "Spring",
  "JavaScript",
  "React.js",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Node.js",
  "Flask",
  "API Development",
  "MySQL",
  "Machine Learning",
  "Deep Learning",
  "Data Structures",
  "Algorithms",
  "Video Editing",
];

/**
 * Skills component that displays a list of skills with animations.
 *
 * This component uses the GSAP library to animate the appearance of skill items
 * when they come into view. The animations are triggered by the ScrollTrigger plugin.
 *
 * @component
 * @example
 * return (
 *   <Skills />
 * )
 *
 * @returns {JSX.Element} The rendered Skills component.
 */
const Skills = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".skill-item",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      className="skills-section bg-purple-900 text-white py-20"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item bg-purple-700 px-4 py-2 m-2 rounded-full text-white shadow-md cursor-pointer text-sm sm:text-base"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
