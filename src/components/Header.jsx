import { motion, useCycle } from "framer-motion";
import PropTypes from "prop-types";
import vLogo from "../assets/vlogo.png";
import { Link } from "react-scroll";
import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import { NAVIGATION_LINKS, SCROLL_CONFIG } from "../constants";

// Animation variants
const SIDEBAR_VARIANTS = {
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

/**
 * Header component that includes a logo, desktop navigation, and a mobile navigation menu.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 *
 * @example
 * return (
 *   <Header />
 * )
 *
 * @description
 * The Header component uses the `useCycle` hook to toggle the state of the sidebar (open/closed).
 * It also uses `useRef` to reference the sidebar element and `useEffect` to handle clicks outside the sidebar.
 * Optimized with React.memo and useCallback for better performance.
 *
 * The component includes:
 * - A logo with animation effects.
 * - Desktop navigation links with drag and hover effects.
 * - A hamburger menu icon for mobile view.
 * - A mobile navigation menu that slides in and out.
 *
 * @dependencies
 * - `useCycle` from `framer-motion`
 * - `useRef` and `useEffect` from `react`
 * - `motion` from `framer-motion`
 * - `Link` from `react-scroll`
 *
 * @props None
 */
const Header = memo(() => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const sidebarRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleOpen(false);
    }
  }, [toggleOpen]);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggle = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

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
          <motion.a onClick={handleLogoClick}>
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
          {NAVIGATION_LINKS.map((link) => (
            <motion.div
              key={link}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: -50, right: 50 }}
              whileDrag={{ scale: 1.2, rotate: 10 }}
              className="inline-block"
            >
              <Link
                to={link.toLowerCase()}
                {...SCROLL_CONFIG}
                className="text-white cursor-pointer hover:text-purple-300"
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden z-30">
          <MenuToggle toggle={handleToggle} isOpen={isOpen} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.nav
        ref={sidebarRef}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={SIDEBAR_VARIANTS}
        className={`fixed top-0 left-0 bottom-0 w-64 bg-purple-800 text-white z-20 md:hidden ${
          isOpen ? "shadow-lg" : ""
        }`}
      >
        <Navigation toggleOpen={toggleOpen} />
      </motion.nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

const MenuToggle = memo(({ toggle, isOpen }) => (
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
));

MenuToggle.displayName = 'MenuToggle';
MenuToggle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const Navigation = memo(({ toggleOpen }) => {
  const navVariants = useMemo(() => ({
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  }), []);

  const handleLinkClick = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  return (
    <motion.ul
      className="flex flex-col items-center justify-center h-full space-y-6 text-lg"
      variants={navVariants}
    >
      {NAVIGATION_LINKS.map((link) => (
        <motion.li key={link} variants={itemVariants}>
          <Link
            to={link.toLowerCase()}
            {...SCROLL_CONFIG}
            className="text-white cursor-pointer hover:text-purple-300"
            onClick={handleLinkClick}
          >
            {link}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
});

Navigation.displayName = 'Navigation';
Navigation.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
};
