import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCategories } from '../hooks/useCategory';
import { Link } from 'react-router-dom';

function MapofNepal() {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const { data: categories, isLoading, isError, error } = useCategories();

  console.log('useCategories state:', { isLoading, isError, error, categories });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-150 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading categories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-150 flex items-center justify-center">
        <p className="text-red-500 text-lg">Failed to load categories: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-150">
      <div className="min-h-screen backdrop-blur-sm bg-gray-25">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-6xl font-bold font-['Cinzel'] mb-4 relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-700 to-green-700 drop-shadow-[0_0_15px_rgba(220,200,77,0.3)]">
                  Places to go
                </span>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-amber-600/0 via-green-700 to-green-700/0"></div>
              </h1>
            </motion.div>
            <motion.p
              className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto font-['Crimson_Text'] italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover the hidden gems and iconic destinations across Nepal's diverse landscapes
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredRegion(category.id)}
                onHoverEnd={() => setHoveredRegion(null)}
                className="group cursor-pointer relative"
              >
                <Link to={`/categories/${category.id}/trails`}>
                  <motion.div
                    className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: 4 }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`http://127.0.0.1:8000/${category.image}`}
                        alt={category.name} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/300')} 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                      <div className="absolute bottom-0 p-4 w-full">
                        <h3 className="text-lg font-bold mb-1 text-white font-['Cinzel']">{category.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapofNepal;