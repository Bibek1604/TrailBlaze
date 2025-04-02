function Recommendation({ places, foods, guide, recommendation }) {
  return (
    <div className="bg-gray-100 py-12">
      <section className="max-w-screen-xl mx-auto px-6">
        <h2 className="mb-12 text-3xl sm:text-4xl font-bold text-orange-600 text-center">
          Our Recommendations
        </h2>

        {/* Recommended Places Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Places to Visit</h3>
          {places?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <div
                  key={place.id || place.name} // Use id if available from backend
                  className="flex flex-col p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={place.image || "https://via.placeholder.com/300"}
                    alt={place.name || "Unnamed Place"}
                    className="object-cover w-full h-56 rounded-md mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">
                    {place.name || "Unnamed Place"}
                  </h4>
                  <p className="mt-2 text-gray-600 line clamp-3">
                    {place.description || "No description provided"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No recommended places available.</p>
          )}
        </div>

        {/* Must-Try Food Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Must-Try Foods</h3>
          {foods?.length > 0 ? (
            <ul className="space-y-4">
              {foods.map((food) => (
                <li
                  key={food.id || food.name} // Use id if available
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {food.name || "Unnamed Food"}
                  </span>
                  <p className="text-gray-600">
                    {food.description || "No description provided"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">No must-try foods available.</p>
          )}
        </div>

        {/* Recommended Guide Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Guides</h3>
          {guide?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {guide.map((guideItem) => (
                <div
                  key={guideItem.id || guideItem.name}
                  className="flex items-center p-5 rounded-lg shadow-md bg-white"
                >
                  <img
                    src={guideItem.image || "https://via.placeholder.com/100"}
                    alt={guideItem.name || "Unnamed Guide"}
                    className="object-cover w-20 h-20 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {guideItem.name || "Unnamed Guide"}
                    </h4>
                    <p className="mt-1 text-gray-600">
                      {guideItem.description || "No description provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No recommended guides available.</p>
          )}
        </div>

        {/* Personalized Recommendation Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personalized Recommendation</h3>
          {recommendation?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {recommendation.map((rec) => (
                <div
                  key={rec.id || rec.name}
                  className="bg-white p-5 rounded-lg shadow-md"
                >
                  <img
                    src={rec.image || "https://via.placeholder.com/300"}
                    alt={rec.name || "Unnamed Recommendation"}
                    className="object-cover w-full h-48 rounded-md mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-800">
                    {rec.name || "Unnamed Recommendation"}
                  </h4>
                  <p className="mt-2 text-gray-600">
                    {rec.description || "No description provided"}
                  </p>
                  <a
                    href={rec.link || "#"}
                    className="mt-3 inline-block text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No personalized recommendations available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Recommendation;