import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import "../styles/Preloader.css";
import vLogo from "../assets/vlogo.png";

/**
 * Preloader component that displays a loading animation before transitioning out.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onComplete - Callback function to be called when the preloader animation completes.
 *
 * @example
 * <Preloader onComplete={() => console.log('Preloader completed')} />
 *
 * @returns {JSX.Element} The Preloader component.
 */
const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const loaderRef = useRef(null);
  const loader1Ref = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const loader = loaderRef.current;
    const loader1 = loader1Ref.current;
    const logo = logoRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.set(preloader, { opacity: 1 });

    tl.to(logo, { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to(logo, { opacity: 0.5, duration: 0.5, ease: "power2.inOut" })
      .to(logo, { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to(logo, { opacity: 0.5, duration: 0.5, ease: "power2.inOut" })
      .to(logo, { opacity: 1, duration: 0.5, ease: "power2.inOut" });

    tl.fromTo(
      loader1,
      { width: "0%" },
      { width: "100%", duration: 2.5, ease: "power2.inOut" },
      "-=2.5"
    )
      .to([logo, loader1, loader], {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loader1.style.width = "0";
        },
      })
      .to(preloader, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-logo-container">
        <img
          src={vLogo}
          alt="Vineeth Logo"
          className="preloader-logo"
          ref={logoRef}
        />
      </div>
      <div className="loader" ref={loaderRef}>
        <div ref={loader1Ref} className="loader-1 bar"></div>
      </div>
    </div>
  );
};

Preloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Preloader;
