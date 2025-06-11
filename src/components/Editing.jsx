import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Editing component that displays a list of video edits with animations.
 *
 * This component uses GSAP for animations and registers the ScrollTrigger plugin to animate the video cards as they come into view.
 * It displays a section with embedded YouTube videos showcasing editing skills.
 *
 * @component
 * @example
 * return (
 *   <Editing />
 * )
 *
 * @returns {JSX.Element} The Editing component.
 */
const Editing = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".video-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const videos = [
    {
      title: "Sample Edit 1",
      url: "https://youtube.com/embed/dC-LjNmaHsI?si=KKG7GT1gC4-pAYSd",
    },
    {
      title: "Sample Edit 2",
      url: "https://youtube.com/embed/f_2k-T1g9ek?si=-Tq3NlL4PMfsAvW9",
    },
    {
      title: "Sample Edit 3",
      url: "https://youtube.com/embed/rkwQ5KGbvw4?si=IdlHJ2T_ogs62z-7",
    },
  ];

  return (
    <section
      id="videos"
      className="video-section bg-purple-800 text-white py-20"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Editing</h2>
        <div className="flex flex-wrap justify-center">
          {videos.map((video, index) => (
            <div
              key={index}
              className="video-card bg-purple-700 p-4 m-4 rounded-lg w-full max-w-md shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <div className="relative w-full overflow-hidden pt-[111.11%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Editing;
