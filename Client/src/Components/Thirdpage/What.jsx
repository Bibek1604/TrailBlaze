import { Link } from "react-router-dom";

function What({ included, itinerary }) {
  return (
    <div className="bg-gray-100 py-12">
      <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        {/* What's Included Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            What’s Included
          </h2>
          {included && Object.keys(included).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4">
                {Object.entries(included)
                  .slice(0, Math.ceil(Object.keys(included).length / 2))
                  .map(([key, value], idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-3 h-3 mt-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                      <span className="ml-3 text-gray-700">{value}</span>
                    </li>
                  ))}
              </ul>
              <ul className="space-y-4">
                {Object.entries(included)
                  .slice(Math.ceil(Object.keys(included).length / 2))
                  .map(([key, value], idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-3 h-3 mt-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                      <span className="ml-3 text-gray-700">{value}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No inclusions specified.</p>
          )}
        </div>

        {/* Itinerary Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Itinerary
          </h2>
          {itinerary?.length > 0 ? (
            <div className="relative border-l-2 border-gray-300">
              {itinerary.map((item) => (
                <div
                  key={item.id || item.title} // Use id if available
                  className="relative pl-8 mb-8 last:mb-0"
                >
                  <div className="absolute w-5 h-5 rounded-full bg-orange-500 -left-2.5 top-1"></div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {`${item.day || "Day 1"}: ${item.title || "Untitled Itinerary"}`}
                  </h3>
                  <p className="mt-2 text-gray-700">
                    {item.description || "No description provided"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No itinerary available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default What;