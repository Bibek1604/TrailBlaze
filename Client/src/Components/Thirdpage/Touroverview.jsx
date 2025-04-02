function Touroverview({ overview, highlights }) {
  return (
    <div className="bg-white py-10">
      <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Tour Overview
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {overview || "No overview provided"}
        </p>

        {highlights?.length > 0 && (
          <>
            <h3 className="mt-10 text-2xl font-semibold text-gray-900">
              Tour Highlights
            </h3>
            <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
              {highlights.map((highlight) => (
                <li
                  key={highlight.id || highlight.title} // Use id if available
                  className="text-lg"
                >
                  {highlight.title || "Untitled Highlight"}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

export default Touroverview;