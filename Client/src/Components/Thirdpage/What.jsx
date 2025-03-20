
import { Link } from "react-router-dom";
function What() {
  return (
    <div>
      <div className="w-full bg-white">
        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What is included</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Beverages, drinking water, morning tea, and buffet lunch</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Local taxes</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Hotel pickup and drop-off by air-conditioned minivan</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Insurance</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Soft drinks</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Tour guide</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Towel</span>
              </li>
              <li className="flex items-start">
                <span className="w-3 h-3 mt-1 bg-red-500 rounded-full"></span>
                <span className="ml-3 text-gray-700">Alcoholic beverages</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Itinerary</h2>
          <div className="border-l border-gray-300">
            {[
              {
                day: "Day 1",
                title: "Airport Pick Up",
                description:
                  "Arrival at the airport, and transfer directly to the hotel for check-in.",
              },
              {
                day: "Day 2",
                title: "Temples & River Cruise",
                description:
                  "Explore iconic temples and relax during a scenic river cruise.",
              },
              {
                day: "Day 3",
                title: "Massage & Overnight Train",
                description:
                  "Enjoy a traditional massage and board an overnight train to your next destination.",
              },
              {
                day: "Day 4",
                title: "Holy Bath at Pashupatinath",
                description:
                  "Participate in the spiritual experience of taking a holy bath in the Bagmati River, a revered ritual at Pashupatinath.",
              },
              {
                day: "Day 5",
                title: "Khao Sok National Park",
                description:
                  "Discover stunning landscapes and immerse yourself in nature.",
              },
            ].map((itinerary, idx) => (
              <div className="relative pl-6 mb-8" key={idx}>
                <div className="absolute w-6 h-6 rounded-full bg-orange -left-3"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{`${itinerary.day}: ${itinerary.title}`}</h3>
                  <p className="mt-5 text-gray-700">{itinerary.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default What;
