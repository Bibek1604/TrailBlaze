const Map = ({ mapImage }) => {
  // Default image in case mapImage is not provided
  const defaultImage =
    "https://d3q9kdqrtloda.cloudfront.net/production/transformed-images/maps_googleapis_com/maps/api/27.7056583,85.347840614&markers=size:large%7Ccolor:0xe31837%7C27.7056583,85.3478406_c064b90135.png";

  return (
    <div className="relative">
      {/* Image */}
      <div className="relative z-10 w-[80%] md:w-[50%] shadow-lg rounded-lg overflow-hidden ml-66">
        <img
          src={mapImage || defaultImage} // Use mapImage from backend or fallback to default
          alt="Tourism Place"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Map;