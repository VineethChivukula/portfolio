import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import {
  FaLinkedin,
  FaGithub,
  FaBlog,
  FaYoutube,
} from "react-icons/fa";

/**
 * Contact component renders a contact form with animations and handles form submission.
 *
 * The component uses the following libraries:
 * - `gsap` for animations
 * - `emailjs` for sending form data via email
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
const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".contact-title, .contact-form, .contact-info",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none none",
          markers: false,
        },
      }
    );
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_t1d4ykv",
        "template_njutz9s",
        form.current,
        "Ni-1vSA5aeH7zH-eh"
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
          console.log(error.text);
          setIsSubmitting(false);
        }
      );
  };

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
          <div className="mb-4">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 rounded bg-purple-700 text-white placeholder-purple-300"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full shadow-md w-full sm:w-auto"
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
            <a
              href="https://www.linkedin.com/in/vineethchivukula"
              className="text-white hover:text-purple-300"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://github.com/vineethchivukula"
              className="text-white hover:text-purple-300"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://www.youtube.com/@vineethchivukula"
              className="text-white hover:text-purple-300"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} />
            </a>
            <a
              href="https://vineethchivukula.hashnode.dev/"
              className="text-white hover:text-purple-300"
              aria-label="Blog"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBlog size={30} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
