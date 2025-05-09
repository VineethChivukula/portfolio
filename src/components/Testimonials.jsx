import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sujinaAvatar from "../assets/sujina.jpg";
import upendraAvatar from "../assets/upendra.jpg";
import yogithaAvatar from "../assets/yogitha.jpg";
import hariAvatar from "../assets/hari.jpg";
import saiAvatar from "../assets/sai.jpg";

/**
 * An array of testimonial objects.
 * Each testimonial contains information about a person who has provided a review.
 *
 * @typedef {Object} Testimonial
 * @property {string} name - The name of the person giving the testimonial.
 * @property {string} image - The URL of the person's image.
 * @property {string} role - The role or job title of the person.
 * @property {string} review - The testimonial or review provided by the person.
 *
 * @type {Testimonial[]}
 */
const testimonials = [
  {
    name: "Sujina Pradeep",
    image: sujinaAvatar,
    role: "Technology Education Senior Analyst at Accenture",
    review:
      "Vineeth is a very enthusiastic learner. He has a very clear vision as to what he  wants to achieve in life. He always strives for the best and puts in a lot of hard work to get there. The best quality in him is his willingness to accept a challenge. I have seen him experimenting with his codes so that it gives better results. He is a determined young leader and I see a very bright future ahead of him.",
  },
  {
    name: "Upendra Gulipilli",
    image: upendraAvatar,
    role: "Co-Founder & CTO at Frontlines EduTech",
    review:
      "Vineeth's exceptional expertise in Python and Flask, combined with his proactive approach, clean code, and invaluable problem-solving skills, made him an outstanding tech intern, and I highly recommend him for any tech or development role.",
  },
  {
    name: "Yogitha Akkineni",
    image: yogithaAvatar,
    role: "Associate Consultant at Microsoft",
    review:
      "Vineeth excels in full-stack development, specializing in Node.js, microservices, and diverse frameworks, delivering efficient, scalable solutions.",
  },
  {
    name: "Avvaru Hari Sai Babu",
    image: hariAvatar,
    role: "Business Technology Analyst at Deloitte Tax",
    review:
      "A dedicated, passionate coder with consistent growth in web development and cybersecurity.",
  },
  {
    name: "Sai Yarlagadda",
    image: saiAvatar,
    role: "Senior Associate Software Engineer at AT&T",
    review:
      "A passionate coder with a strong drive for quality, problem-solving, and innovation, making him a valuable team asset.",
  },
];

const Testimonials = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const testimonialsCards = document.querySelectorAll(".testimonial-card");

    testimonialsCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section id="testimonials" className="bg-purple-900 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6">
          What people in the industry say about me?
        </h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white text-purple-900 rounded-lg shadow-lg p-6 m-4 max-w-sm w-full sm:w-auto"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
              <p className="mt-4">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
