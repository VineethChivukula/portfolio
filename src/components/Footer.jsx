import { motion } from "framer-motion";
import { memo, useMemo } from "react";

/**
 * Footer component that displays a footer section with copyright information and technologies used.
 * Optimized with React.memo for better performance.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-purple-900 text-white py-6">
      <motion.div
        className="container mx-auto text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-base sm:text-lg">
          © {currentYear} Vineeth Chivukula. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm mt-2">
          Built using React, Tailwind CSS, GSAP, and Framer-motion.
        </p>
      </motion.div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
