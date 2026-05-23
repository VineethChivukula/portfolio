import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experience = [
  {
    title: "Data Engineer",
    organization: "Accenture",
    location: "Telangana, India",
    date: "Oct 2024 – Present",
    description:
      "Engineered an end-to-end scalable 6-layer DBT pipeline in Snowflake (Data Vault 2.0) processing 100M+ rows of Oracle Fusion financial data. Delivered 20+ DBT models using the client's coding standards and custom macros within an agile framework. ptimized the financial reporting layer by implementing a star schema, cutting the PowerBI semantic model size by 75% and boosting performance. Translated complex business requirements into Source-to-Target Mappings for over 15+ DBT models.",
  },
  {
    title: "Technical Assistance Support Intern",
    organization: "Frontlines EduTech (FLM)",
    location: "Remote",
    date: "Jul 2024 – Sep 2024",
    description:
      "Built OpsBoard using Flask for 1M+ learners by creating & using 7 REST APIs for session/course management. Automated multi-channel notifications via WATI & Brevo APIs, reducing manual outreach and enabling real-time updates for new courses. Automated Zoom attendance tracking via Zoom API and cron jobs, reducing manual data entry by 90% with direct database ingestion.",
  },
  {
    title: "Academic Support Volunteer",
    organization: "Make A Difference Organization",
    location: "Vijayawada, Andhra Pradesh",
    date: "Dec 2022 – Jun 2023",
    description:
      "Mentored 10+ at-risk youth by implementing customized learning plans in mathematics, significantly improving their academic performance.",
  },
];

/**
 * Experience component that displays a list of volunteer experiences with animations.
 *
 * This component uses GSAP for animations and Framer Motion for initial heading animation.
 * It registers the ScrollTrigger plugin from GSAP to animate the volunteer cards as they come into view.
 *
 * @component
 * @example
 * return (
 *   <Experience />
 * )
 *
 * @returns {JSX.Element} The Experience component.
 */
const Experience = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const volunteerCards = document.querySelectorAll(".volunteer-card");

    volunteerCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="bg-purple-800 text-white py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        <div className="flex flex-wrap justify-center">
          {experience.map((experience, index) => (
            <div
              key={index}
              className="volunteer-card bg-white text-purple-900 rounded-lg shadow-lg p-6 m-4 max-w-sm w-full sm:w-auto"
            >
              <h3 className="text-xl font-semibold">{experience.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {experience.organization}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {experience.location}
              </p>
              <p className="text-sm text-gray-500">{experience.date}</p>
              <p className="mt-4">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
