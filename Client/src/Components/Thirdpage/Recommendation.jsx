function Recommendation() {
  return (
    <div>
      <section className="max-w-screen-xl px-6 py-10 mx-auto">
        <h2 className="mt-10 mb-10 text-4xl font-bold text-orange">Our Recommendations</h2>

        {/* Recommended Places Section */}
        <div className="mb-12 space-y-8">
          <h3 className="text-3xl font-semibold text-gray-900">Places to Visit</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50">
              <img
                src="https://fulltimeexplorer.com/wp-content/uploads/2019/06/Most-Beautiful-places-of-Nepal-1-1.jpg"
                alt="Place 1"
                className="object-cover w-full h-64 mb-4 rounded-md"
              />
              <h4 className="text-xl font-semibold text-gray-800">Manang</h4>
              <p className="mt-2 text-gray-600">
                Known for its scenic beauty and mountainous landscapes, Manang is a must-visit place. It offers breathtaking views, unique culture, and access to incredible trekking paths.
              </p>
            </div>
            <div className="flex flex-col p-6 rounded-lg shadow-lg bg-gray-50">
              <img
                src="https://mustangnepal.com/wp-content/uploads/2022/01/things-todo.jpg"
                alt="Place 2"
                className="object-cover w-full h-64 mb-4 rounded-md"
              />
              <h4 className="text-xl font-semibold text-gray-800">Mustang</h4>
              <p className="mt-2 text-gray-600">
                Mustang is famous for its rich history, monasteries, and mystical landscapes. Explore the Tibetan influences, discover ancient caves, and admire the mesmerizing beauty of the region.
              </p>
            </div>
          </div>
        </div>

        {/* Must-Try Food Section */}
        <div className="mb-12 space-y-8">
          <h3 className="text-2xl font-semibold text-gray-900">Must-Try Foods</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">1. Dal Bhat</span>
              <p className="text-gray-500">
                A staple food in Nepal, Dal Bhat consists of lentil soup served with rice, vegetables, and pickles.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">2. Momos</span>
              <p className="text-gray-500">
                These delicious Tibetan dumplings are filled with vegetables or meat and are a popular snack across Nepal.
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">3. Sel Roti</span>
              <p className="text-gray-500">
                A traditional Nepali sweet, Sel Roti is a crispy rice doughnut enjoyed during festivals and special occasions.
              </p>
            </li>
          </ul>
        </div>

        {/* Recommended Guide Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Our Recommended Guide</h3>
          <div className="flex items-center p-6 mt-6 rounded-lg shadow-lg bg-gray-50">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Guide"
              className="object-cover w-24 h-24 rounded-full"
            />
            <div className="ml-6">
              <h4 className="text-xl font-semibold text-gray-800">Rajesh Khadka</h4>
              <p className="mt-2 text-gray-600">
                With over 10 years of experience in guiding tourists around the Himalayan region, Rajesh is known for his detailed knowledge and friendly approach. Whether you're a trekker or simply exploring, Rajesh will make your journey unforgettable.
              </p>
            </div>
          </div>
        </div>

        {/* Your Recommendation Section */}
        <div className="mt-12 space-y-8">
          <h3 className="text-3xl font-semibold text-gray-900">Your Recommendation</h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800">Pashupatinath Temple</h4>
            <p className="mt-2 text-gray-600">
              Pashupatinath is one of the holiest temples in Nepal, offering a truly spiritual experience. Known for its incredible architecture and the holy bath in the Bagmati River, it’s a must-visit for anyone looking to connect with Nepal's rich cultural heritage.
            </p>
            <a
              href="/pashupatinath"
              className="mt-4 inline-block text-orange font-semibold hover:text-orange-700"
            >
              Learn More
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Recommendation;
