import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Projects component that displays a list of project cards with animations.
 *
 * This component uses the GSAP library with the ScrollTrigger plugin to animate
 * the appearance of project cards as they come into view. Each project card
 * scales and rotates into place with a fade-in effect.
 *
 * @component
 * @example
 * return (
 *   <Projects />
 * )
 *
 * @returns {JSX.Element} The Projects component.
 */
const Projects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
          rotation: index % 2 === 0 ? -5 : 5,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    });
  }, []);

  const projects = [
    {
      title: "OpsBoard Development",
      description:
        "A Python-based Flask application using SQLAlchemy and MySQL for creating a database schema and complex APIs, integrated with WATI and Brevo APIs.",
    },
    {
      title: "Bank Statement Aggregator",
      description:
        "An application enabling the generation, management, and secure upload/download of bank statements to Amazon S3 using SQLAlchemy with MySQL.",
    },
    {
      title: "Data Structure Visualizer",
      description:
        "An interactive Data Structure Visualizer built with ReactJS and Material UI, featuring a theme toggle and a responsive sidebar.",
    },
    {
      title: "Zoom Attendance Tracker",
      description:
        "A tool for educators using the Zoom API and OAuth2 to automate attendance tracking and send email notifications.",
    },
    {
      title: "The Queen Collab",
      description:
        "A project on which I collaborated with highly skilled artists on Instagram to create an extraordinary art compilation.",
    },
  ];

  return (
    <section id="projects" className="bg-purple-800 text-white py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-purple-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-purple-300">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
