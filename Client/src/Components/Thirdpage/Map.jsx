const Map = () => {
  return (
    <div className="relative">
      {/* Image */}
      <div className="relative z-10 w-[80%] md:w-[50%] shadow-lg rounded-lg overflow-hidden ml-66">
        <img
          src="https://d3q9kdqrtloda.cloudfront.net/production/transformed-images/maps_googleapis_com/maps/api/27.7056583,85.347840614&markers=size:large%7Ccolor:0xe31837%7C27.7056583,85.3478406_c064b90135.png" // Replace with your image URL
          alt="Tourism Place"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Map;
