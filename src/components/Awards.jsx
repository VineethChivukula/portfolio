import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const awards = [
  {
    title: "Tech Expressway Merit Holder Award",
    description:
      "Achieved the highest performance in the cohort during the JAVA ASE Techgenics training at Accenture.",
    date: "Dec 2024",
  },
  {
    title: "LeetCode Bug Fix",
    description:
      "Reported a wrong solution in LeetCode’s Merge-Intervals problem; awarded 100 LeetCoins.",
    date: "Aug 2024",
  },
  {
    title: "GATE 2024",
    description: "Ranked 2852 in GATE DA 2024 with a score of 468.",
    date: "Mar 2024",
  },
  {
    title: "NPTEL Top 1%",
    description: "Secured top 1% in the IIoT course on NPTEL.",
    date: "Nov 2023",
  },
  {
    title: "Amazon MLSS Participant",
    description:
      "Attended Amazon MLSS’23 and gained practical knowledge on various topics related to Machine Learning.",
    date: "Sep 2023",
  },
  {
    title: "GATE 2023",
    description: "Ranked 6751 in GATE CSE 2023 with a score of 404.",
    date: "Mar 2023",
  },
  {
    title: "AP EAMCET 2020",
    description: "Ranked 267 in AP EAMCET 2020 with a score of 136.",
    date: "Oct 2020",
  },
];

/**
 * Awards component that displays a list of awards with animations.
 *
 * This component uses GSAP and ScrollTrigger to animate the appearance of award cards
 * as they come into view. Each card fades in and moves up slightly when scrolled into view.
 *
 * @component
 * @example
 * // Example usage:
 * <Awards />
 *
 * @returns {JSX.Element} The rendered Awards component.
 *
 * @requires gsap
 * @requires ScrollTrigger
 * @requires react
 * @requires framer-motion
 *
 * @description
 * The component fetches a list of awards and displays them in a responsive grid layout.
 * Each award card contains a title, date, and description. The cards are animated using
 * GSAP's ScrollTrigger plugin to create a smooth scrolling effect.
 */
const Awards = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const awardCards = document.querySelectorAll(".award-card");

    awardCards.forEach((card) => {
      const animation = gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
            toggleActions: "play reverse play reverse",
            markers: false,
            stagger: {
              amount: 0.3,
              from: "end",
            },
          },
        }
      );

      return () => {
        animation.kill();
      };
    });
  }, []);

  return (
    <section id="awards" className="bg-purple-900 text-white py-20">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Honors and Awards
        </motion.h2>
        <div className="flex flex-wrap justify-center">
          {awards.map((award, index) => (
            <div
              key={index}
              className="award-card bg-white text-purple-900 rounded-lg shadow-lg p-6 m-4 max-w-sm w-full sm:w-auto"
            >
              <h3 className="text-xl font-semibold">{award.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{award.date}</p>
              <p className="text-sm text-gray-500">{award.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
