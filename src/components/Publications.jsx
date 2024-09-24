import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const publications = [
  {
    title:
      "Vegetation Classification Using Landsat 8 Remote Sensing Data and a Sequential Convolutional Neural Network",
    conference:
      "5th International Conference On Data, Engineering, And Applications (IDEA-2k24)",
    publisher: "Springer",
    status: "Accepted",
  },
  {
    title:
      "Identification Of Salt-Affected Soils In The Coastal Area Of Krishna District, Andhra Pradesh, Using Remote Sensing Data And Machine Learning Techniques",
    journal:
      "Informatyka, Automatyka, Pomiary W Gospodarce I Ochronie Środowiska (IAPGOS)",
    publisher: "Scopus Indexed Journal",
    status: "Published",
    link: "https://doi.org/10.35784/iapgos.5903",
  },
  {
    title: "Rice Crop Disease Detection Using Explainable AI",
    conference:
      "2023 Global Conference On Information Technologies And Communications (GCITC)",
    publisher: "IEEE",
    status: "Published",
    link: "https://doi.org/10.1109/gcitc60406.2023.10425857",
  },
];

/**
 * Publications component that displays a list of publication cards with animations.
 *
 * This component uses the GSAP library for scroll-triggered animations and Framer Motion for initial heading animation.
 *
 * @component
 * @example
 * return (
 *   <Publications />
 * )
 *
 * @returns {JSX.Element} The Publications component.
 *
 * @requires gsap
 * @requires ScrollTrigger
 * @requires motion
 *
 * @description
 * The Publications component fetches a list of publications and displays them in a card format. Each card includes the title, conference/journal, publisher, and a link to the publication. The cards are animated to fade in and slide up when they enter the viewport.
 */
const Publications = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const publicationCards = document.querySelectorAll(".publication-card");

    publicationCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
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
    <section id="publications" className="bg-purple-900 text-white py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Publications
        </motion.h2>
        <div className="flex flex-wrap justify-center">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="publication-card bg-white text-purple-900 rounded-lg shadow-lg p-6 m-4 max-w-sm w-full sm:w-auto"
            >
              <h3 className="text-xl font-semibold">{publication.title}</h3>
              <p className="text-sm text-gray-500">
                {publication.conference || publication.journal}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {publication.publisher}
              </p>
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline hover:text-purple-500"
              >
                {publication.status}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
