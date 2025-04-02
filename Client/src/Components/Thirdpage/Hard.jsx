import dart from "../../assets/dart.png";
import schedule from "../../assets/schedule.png";
import google from "../../assets/google-maps.png";

function Hard({ difficulty, duration, location }) {
  return (
    <div>
      <div className="max-w-screen-lg px-4 py-8 mx-auto bg-white rounded-md">
        <div className="flex items-center justify-between mb-8 space-x-8">
          {/* Difficulty */}
          <div className="flex items-center">
            <img src={dart} alt="Difficulty" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">
              {difficulty || "Moderate"} {/* Fallback to default */}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center">
            <img src={schedule} alt="Duration" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">
              {duration ? `${duration} day${duration > 1 ? "s" : ""}` : "1 day"} {/* Format duration */}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <img src={google} alt="Location" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">
              {location || "Unknown Location"} {/* Fallback to default */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hard;