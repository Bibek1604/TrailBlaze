import { useEffect, useRef, useState } from "react";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";

const Design = () => {
  const carouselDom = useRef(null);

  const timeAutoNext = 5000; // Auto change every 5 seconds

  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in"); // To handle fade in/out animation

  const thumbnails = [img2, img3, img4]; // List of images
  const titles = ["Sarmoli", "Majestic Peaks", "Serene Valley"]; // Titles for images
  const descriptions = [
    "The enchanting Himalayan haven",
    "Majestic snow-capped mountains",
    "A peaceful valley with pristine beauty",
  ]; // Descriptions for images

  useEffect(() => {
    const thumbnailInterval = setInterval(() => {
      handleNext();
    }, timeAutoNext);

    return () => {
      clearInterval(thumbnailInterval);
    };
  }, [activeThumbnail]);

  const handleNext = () => {
    setFadeClass("fade-out"); // Start fade-out animation
    setTimeout(() => {
      setActiveThumbnail((prev) => (prev + 1) % thumbnails.length); // Change the image
      setFadeClass("fade-in"); // Start fade-in animation
    }, 500); // Delay to let fade-out complete
  };

  const handleThumbnailClick = (index) => {
    setFadeClass("fade-out"); // Start fade-out animation
    setTimeout(() => {
      setActiveThumbnail(index); // Change the image to clicked thumbnail
      setFadeClass("fade-in"); // Start fade-in animation
    }, 500);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Main Image Section */}
      <div className={`relative w-full h-full ${fadeClass}`} ref={carouselDom}>
        <img
          src={thumbnails[activeThumbnail]}
          alt={`main-img${activeThumbnail + 1}`}
          className="object-cover w-full h-full"
        />
        {/* Caption Section */}
        <div className="absolute inset-x-0 text-center text-white bottom-10">
          <h2 className="text-4xl font-bold">{titles[activeThumbnail]}</h2>
          <p className="mt-2 text-xl">{descriptions[activeThumbnail]}</p>
        </div>
      </div>

      {/* Thumbnail Section */}
      <div className="absolute flex flex-col items-center gap-4 transform -translate-y-1/2 top-1/2 right-5">
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            className={`
                            w-[80px] h-[120px] cursor-pointer rounded-lg
                            overflow-hidden border-2
                            ${
                              activeThumbnail === index
                                ? "border-orange-500"
                                : "border-transparent"
                            }
                            hover:opacity-80 transition-opacity
                        `}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={thumb}
              alt={`thumb${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .fade-in {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.5s ease-in, transform 0.5s ease-in;
        }

        .fade-out {
          opacity: 0;
          transform: translateX(-10px); /* Move left slightly during fade out */
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Design;
