import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDetails } from '../api/Details';

const DetailsPage = () => {
  const { 
    data: details, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['details'],
    queryFn: fetchDetails,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
  });

  console.log("Fetched details:", details);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-xl text-red-500">
          Error loading details: {error.message}
        </p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-xl">No tour details available</p>
      </div>
    );
  }

  // Normalize to array
  const detailsArray = Array.isArray(details) ? details : [details];

  // Helper function to render object properties
  const renderObject = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') return <span>{String(obj) || 'N/A'}</span>;
    return (
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(obj).map(([key, value]) => (
          <div key={`${prefix}${key}`} className="flex gap-2">
            <strong className="capitalize">{key.replace('_', ' ')}:</strong>
            {typeof value === 'object' && value !== null ? (
              renderObject(value, `${prefix}${key}-`)
            ) : (
              <span>{String(value) || 'N/A'}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render arrays
  const renderArray = (arr, title) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return (
      <div className="mt-4">
        {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
        <ul className="list-disc pl-6 space-y-2">
          {arr.map((item, index) => (
            <li key={index}>
              {typeof item === 'object' ? renderObject(item) : String(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Helper function to render images
  const renderImages = (detail) => {
    // Check for various image field formats
    const images = [];
    
    // Check for individual image fields (image1, image2, etc.)
    for (let i = 1; i <= 5; i++) {
      if (detail[`image${i}`]) {
        images.push(detail[`image${i}`]);
      }
    }
    
    // Check for an images array
    if (Array.isArray(detail.images)) {
      images.push(...detail.images);
    }

    if (images.length === 0) return null;

    return (
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imgSrc, index) => (
            <img
              key={index}
              src={`http://127.0.0.1:8000${imgSrc}`} // Adjust base URL as needed
              alt={`Tour image ${index + 1}`}
              className="w-full h-48 object-cover rounded-md"
              onError={(e) => {
                e.target.style.display = 'none'; // Hide broken images
                console.log(`Failed to load image: ${imgSrc}`);
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tour Details</h1>

      {detailsArray.map((detail, index) => (
        <div 
          key={detail.id || index}
          className="bg-white shadow-lg rounded-lg p-6 mb-6"
        >
          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            {detail.title || `Tour #${detail.id || index + 1}`}
          </h2>

          {/* Basic Information */}
          <section className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>ID:</strong> {detail.id || 'N/A'}</p>
                <p><strong>Place:</strong> {detail.place?.name || detail.place || 'N/A'}</p>
                <p><strong>Category:</strong> {detail.category?.name || detail.category || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Additional Details */}
          <section className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Additional Details</h3>
            <div className="space-y-4">
              {Object.entries(detail).map(([key, value]) => {
                if (['id', 'title', 'place', 'category', 'image1', 'image2', 'image3', 'image4', 'image5', 'images'].includes(key)) return null;
                
                return (
                  <div key={key}>
                    {Array.isArray(value) ? (
                      renderArray(value, key.replace('_', ' '))
                    ) : typeof value === 'object' && value !== null ? (
                      <>
                        <h4 className="font-medium capitalize">{key.replace('_', ' ')}</h4>
                        {renderObject(value)}
                      </>
                    ) : (
                      <p>
                        <strong className="capitalize">{key.replace('_', ' ')}:</strong> {String(value) || 'N/A'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Images Section */}
          {renderImages(detail)}
        </div>
      ))}
    </div>
  );
};

export default DetailsPage;