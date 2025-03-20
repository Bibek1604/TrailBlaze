import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, Mountain, Filter } from 'lucide-react';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';

// Use Vite's import.meta.env for environment variables
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const fetchPlacesByCategory = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/api/places/?category=${categoryId}`, {
    headers: {
      'Content-Type': 'application/json',
      // Add authentication headers if needed
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }
  return response.json();
};

function Trails() {
  const { categoryId } = useParams();

  const { data: places, isLoading, isError, error } = useQuery({
    queryKey: ['places', categoryId],
    queryFn: () => fetchPlacesByCategory(categoryId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading trails...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  // Get category name from the first place (assuming all places share the same category)
  const categoryName = places.length > 0 ? places[0].category.name : 'Unknown Category';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">Discover {categoryName}</h1>
              <p className="text-xl mb-8">Explore the majestic trails and immerse yourself in Nepal's beauty</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  Duration
                </h3>
                <div className="space-y-2">
                  {['1', '2-4', '4-6', '6-10'].map((duration) => (
                    <label key={duration} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-600">{duration} days</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="lg:w-3/4">
            <div className="grid gap-6">
              {places.length === 0 ? (
                <p className="text-center text-gray-600">No trails found for this category.</p>
              ) : (
                places.map((place) => (
                  <div
                    key={place.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img
                          src={place.image ? `${BASE_URL}${place.image}` : 'https://via.placeholder.com/300'}
                          alt={place.name}
                          className="h-full w-full object-cover"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          {place.location}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                        <p className="text-gray-600 mb-4">{place.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Mountain className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-600">{place.category.name}</span>
                            </div>
                          </div>
                          <Link to={`/details/${place.id}`}>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Trails;