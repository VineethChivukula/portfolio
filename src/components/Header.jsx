import { motion, useCycle } from "framer-motion";
import PropTypes from "prop-types";
import vLogo from "../assets/vlogo.png";
import { Link } from "react-scroll";

/**
 * Header component that includes a logo, desktop navigation, and a mobile navigation menu.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @description
 * The Header component includes:
 * - A logo that is draggable and has hover and tap animations.
 * - A desktop navigation menu with links to various sections of the portfolio.
 * - A hamburger menu icon for mobile view that toggles the mobile navigation menu.
 * - A mobile navigation menu that slides in and out with animation.
 *
 * @requires useCycle from 'framer-motion'
 * @requires motion from 'framer-motion'
 * @requires Link from 'react-scroll'
 * @requires MenuToggle from './MenuToggle'
 * @requires Navigation from './Navigation'
 * @requires vLogo from '../assets/vLogo.png'
 */
const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        stiffness: 200,
        damping: 40,
      },
    },
  };

  return (
    <header className="bg-purple-950 text-white py-4 shadow-lg fixed w-full z-20">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <motion.h1
          className="text-3xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, color: "#ffeb3b" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              drag
              dragConstraints={{ top: 0, bottom: 0, left: -50, right: 50 }}
              whileDrag={{ scale: 1.2, rotate: 10 }}
              className="inline-block"
            >
              <img src={vLogo} alt="Vineeth Logo" className="h-10 w-10" />
            </motion.div>
          </motion.a>
        </motion.h1>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            "About",
            "Skills",
            "Projects",
            "Publications",
            "Certifications",
            "Awards",
            "Experience",
            "Testimonials",
            "Contact",
          ].map((link) => (
            <motion.div
              key={link}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: -50, right: 50 }}
              whileDrag={{ scale: 1.2, rotate: 10 }}
              className="inline-block"
            >
              <Link
                to={link.toLowerCase()}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="text-white cursor-pointer hover:text-purple-300"
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden z-30">
          <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed top-0 left-0 bottom-0 w-64 bg-purple-800 text-white z-20 md:hidden ${
          isOpen ? "shadow-lg" : ""
        }`}
      >
        <Navigation toggleOpen={toggleOpen} />
      </motion.nav>
    </header>
  );
};

export default Header;

const MenuToggle = ({ toggle, isOpen }) => (
  <button
    onClick={toggle}
    className="text-white focus:outline-none"
    aria-label="Toggle menu"
  >
    <motion.div className="space-y-1">
      <motion.div
        className="h-1 w-6 bg-white rounded"
        animate={
          isOpen ? { rotate: 45, x: 0, y: 8 } : { rotate: 0, x: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="h-1 w-6 bg-white rounded"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="h-1 w-6 bg-white rounded"
        animate={
          isOpen ? { rotate: -45, x: 0, y: -8 } : { rotate: 0, x: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  </button>
);

MenuToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const Navigation = ({ toggleOpen }) => {
  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <motion.ul
      className="flex flex-col items-center justify-center h-full space-y-6 text-lg"
      variants={navVariants}
    >
      {[
        "About",
        "Skills",
        "Projects",
        "Publications",
        "Certifications",
        "Awards",
        "Experience",
        "Testimonials",
        "Contact",
      ].map((link) => (
        <motion.li key={link} variants={itemVariants}>
          <Link
            to={link.toLowerCase()}
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            className="text-white cursor-pointer hover:text-purple-300"
            onClick={() => toggleOpen()}
          >
            {link}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

Navigation.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
};
