import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, memo } from "react";
import PropTypes from "prop-types";
import "../styles/ScrollProgressBar.css";

/**
 * ScrollProgressBar component displays a progress bar that scales based on the scroll position.
 * Optimized with React.memo for better performance.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - A flag indicating whether the component is open.
 *
 * @returns {JSX.Element} A motion.div element representing the progress bar.
 *
 * @example
 * <ScrollProgressBar isOpen={true} />
 */
const ScrollProgressBar = memo(({ isOpen }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!isOpen) {
      window.dispatchEvent(new Event("scroll"));
    }
  }, [isOpen]);

  return <motion.div className="progress-bar" style={{ scaleX }} />;
});

ScrollProgressBar.displayName = 'ScrollProgressBar';

ScrollProgressBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default ScrollProgressBar;
