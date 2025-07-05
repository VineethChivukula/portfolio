import { motion } from "framer-motion";
import { memo } from "react";
import profilePic from "../assets/hero.jpg";

/**
 * Hero component renders a section with a profile picture, name, and description.
 * It includes animations for the section and the profile picture.
 * Optimized with React.memo for better performance.
 *
 * @component
 * @example
 * return (
 *   <Hero />
 * )
 *
 * @returns {JSX.Element} A section element with profile information and animations.
 */
const Hero = memo(() => {
  return (
    <section className="bg-purple-900 text-white pt-24 md:pt-24 pb-12 md:pb-24 flex items-center justify-center">
      <motion.div
        className="container mx-auto text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src={profilePic}
          alt="Profile"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full mx-auto mb-3 shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          loading="eager" // Since this is above the fold
        />
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2">
          Vineeth Chivukula
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-purple-300 mb-4">
          Associate Software Engineer @Accenture
        </p>
        <p className="text-base sm:text-lg md:text-xl text-purple-400">
          Building scalable applications and solving problems through code.
        </p>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
