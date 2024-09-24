import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const certifications = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    date: "May 2024",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/vineethchivukula/E5D8D79E95FF06C4?sharingId",
    description:
      "Earned certification demonstrating foundational knowledge of AI and machine learning on Microsoft Azure.",
  },
];

/**
 * Certifications component that displays a list of certification cards with animations.
 *
 * This component uses GSAP for animations and ScrollTrigger for triggering animations
 * when the certification cards come into view. Each card animates from an initial state
 * of opacity 0, scale 0.5, and rotate -10 to opacity 1, scale 1, and rotate 0.
 *
 * @component
 * @example
 * return (
 *   <Certifications />
 * )
 *
 * @returns {JSX.Element} The rendered Certifications component.
 */
const Certifications = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const certificationCards = document.querySelectorAll(".certification-card");

    certificationCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.5,
          rotate: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
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
    <section id="certifications" className="bg-purple-800 text-white py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>
        <div className="flex flex-wrap justify-center">
          {certifications.map((certification, index) => (
            <div
              key={index}
              className="certification-card bg-white text-purple-900 rounded-lg shadow-lg p-6 m-4 max-w-sm w-full sm:w-auto"
            >
              <h3 className="text-xl font-semibold">{certification.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{certification.date}</p>
              <p className="text-sm text-gray-500 mb-4">
                {certification.description}
              </p>
              <a
                href={certification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline hover:text-purple-500"
              >
                View Credential
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
