import dart from "../../assets/dart.png";
import schedule from "../../assets/schedule.png";
import google from "../../assets/google-maps.png";

function Hard({ difficulty, duration, location }) {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
            {/* Difficulty */}
            <div className="flex items-center space-x-4">
              <img 
                src={dart} 
                alt="Difficulty Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
              />
              <div>
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="text-lg font-medium text-gray-800">
                  {difficulty || "Moderate"}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center space-x-4">
              <img 
                src={schedule} 
                alt="Duration Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
              />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="text-lg font-medium text-gray-800">
                  {duration 
                    ? `${duration} day${duration > 1 ? "s" : ""}` 
                    : "1 day"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4">
              <img 
                src={google} 
                alt="Location Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
              />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium text-gray-800">
                  {location || "Unknown Location"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hard;