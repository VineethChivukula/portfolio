import { motion } from "framer-motion";

/**
 * Footer component that displays a footer section with copyright information and technologies used.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-6">
      <motion.div
        className="container mx-auto text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-base sm:text-lg">
          © {new Date().getFullYear()} Vineeth Chivukula. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm mt-2">
          Built using React, Tailwind CSS, GSAP, and Framer-motion.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
