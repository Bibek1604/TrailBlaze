import dart from "../../assets/dart.png";
import schedule from "../../assets/schedule.png";
import google from "../../assets/google-maps.png";
function Hard() {
  return (
    <div>
      <div className="max-w-screen-lg px-4 py-8 mx-auto bg-white rounded-md">
        <div className="flex items-center justify-between mb-8 space-x-8">
          <div className="flex items-center">
            <img src={dart} alt="Difficulty" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">Hard</span>
          </div>
          <div className="flex items-center">
            <img src={schedule} alt="Duration" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">
              1day
            </span>
          </div>
          <div className="flex items-center">
            <img src={google} alt="Location" className="w-12 h-12" />
            <span className="ml-3 text-lg font-medium text-gray-700">
              Kathmandu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hard;
