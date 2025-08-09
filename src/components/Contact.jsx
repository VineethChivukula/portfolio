import { useRef, useState, useEffect, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import {
  FaLinkedin,
  FaGithub,
  FaBlog,
  FaYoutube,
  FaInstagram
} from "react-icons/fa";

// Constants
const EMAILJS_CONFIG = {
  serviceId: "service_t1d4ykv",
  templateId: "template_njutz9s",
  userId: "Ni-1vSA5aeH7zH-eh",
};

const ANIMATION_CONFIG = {
  from: { opacity: 0, y: 50 },
  to: {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out",
  },
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 80%",
    end: "bottom top",
    toggleActions: "play none none none",
    markers: false,
  },
};

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/vineethchivukula",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/vineethchivukula",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.youtube.com/@vineethchivukula",
    icon: FaYoutube,
    label: "YouTube",
  },
  {
    href: "https://www.instagram.com/6nny.aep",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://vineethchivukula.hashnode.dev/",
    icon: FaBlog,
    label: "Blog",
  },
];

/**
 * Contact component renders a contact form with animations and handles form submission.
 *
 * The component uses the following libraries:
 * - `gsap` for animations
 * - `emailjs` for sending form data via email
 * Optimized with React.memo for better performance.
 *
 * The form includes fields for the user's name, email, and message. Upon submission,
 * the form data is sent using `emailjs`, and animations are triggered to provide
 * visual feedback to the user.
 *
 * @component
 * @example
 * return (
 *   <Contact />
 * )
 */
const Contact = memo(() => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Clear previous animations
    animationsRef.current.forEach(animation => animation.kill());
    animationsRef.current = [];

    const animation = gsap.fromTo(
      ".contact-title, .contact-form, .contact-info",
      ANIMATION_CONFIG.from,
      {
        ...ANIMATION_CONFIG.to,
        scrollTrigger: ANIMATION_CONFIG.scrollTrigger,
      }
    );

    animationsRef.current = [animation];

    return () => {
      animationsRef.current.forEach(animation => animation.kill());
    };
  }, []);

  const formSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    emailjs
      .sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form.current,
        EMAILJS_CONFIG.userId
      )
      .then(
        (result) => {
          console.log(result.text);
          gsap.to(".contact-form", {
            duration: 1,
            y: 20,
            opacity: 0,
            onComplete: () => {
              gsap.to(".thank-you", { opacity: 1, y: 0, duration: 1 });
              setTimeout(() => {
                gsap.to(".thank-you", {
                  opacity: 0,
                  y: 20,
                  duration: 1,
                  onComplete: () => {
                    form.current.reset();
                    gsap.to(".contact-form", {
                      opacity: 1,
                      y: 0,
                      duration: 1,
                      onComplete: () => {
                        setIsSubmitting(false);
                      },
                    });
                  },
                });
              }, 5000);
            },
          });
        },
        (error) => {
          console.error(error.text);
          setError("Failed to send message. Please try again.");
          setIsSubmitting(false);
        }
      );
  }, []);

  const handleInputChange = useCallback(() => {
    if (error) setError(null);
  }, [error]);

  return (
    <section
      id="contact"
      className="contact-section bg-purple-800 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto text-center">
        <h2 className="contact-title text-3xl sm:text-4xl font-bold mb-6">
          Contact Me
        </h2>
        <p className="contact-info text-base sm:text-lg mb-8 text-purple-300">
          Feel free to reach out to me for any queries or collaborations.
        </p>
        <form
          ref={form}
          className="contact-form max-w-md mx-auto"
          onSubmit={formSubmit}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="5"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full shadow-md w-full sm:w-auto transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div className="thank-you text-xl text-purple-400 mt-8 opacity-0">
          Thank you! I&#39;ll get back to you soon.
        </div>
        <div className="mt-8">
          <p>Find me on:</p>
          <div className="flex justify-center space-x-4 pt-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                className="text-white hover:text-purple-300 transition-colors duration-300"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={30} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
