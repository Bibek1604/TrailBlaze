import nepalImage from '../../assets/manang.jpg'; // Update the path to the image
import sunriseImage from '../../assets/sunset.png'; // Add a sunrise image for the background

const NepalTitle = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${sunriseImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-100 to-rose-300 opacity-60"></div>

      {/* Nepal Text with background image and shadow for more clarity */}
      <div
        className="relative z-10 text-[12rem] md:text-[15rem] lg:text-[18rem] font-extrabold uppercase text-transparent bg-clip-text animate-fadeIn shadow-lg"
        style={{
          backgroundImage: `url(${nepalImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitBackgroundClip: 'text',
        }}
      >
        नेपाल
      </div>

      {/* Subtext */}
      <div className="relative z-10 mt-4 text-center animate-fadeInUp">
        <p className="text-lg italic font-medium text-gray-600 md:text-xl">Official Website of</p>
        <h2 className="text-2xl font-bold text-gray-700 md:text-3xl lg:text-4xl drop-shadow-lg">Nepal Tourism Board</h2>
      </div>
    </div>
  );
};

export default NepalTitle;
