"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share2 } from "lucide-react";
import { useBlogs } from "../hooks/Blog";

const FrontBlog = () => {
  const scrollContainerRef = useRef(null);
  const { data, isLoading, error } = useBlogs();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading blogs: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-600">No blogs available.</div>;
  }

  // Map API data to match the expected structure
  const posts = data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content || "No description available.",
    author: {
      name: item.author || "Unknown Author",
      image: item.authorImage || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
    },
    image: item.image || "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=600&fit=crop", // Use item.image from API
    likes: item.likes || 0,
    comments: item.comments || 0,
    date: item.date || "Recent",
    category: item.category || "General",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
            <p className="mt-1 text-gray-500">Discover amazing travel experiences</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Blog Posts Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex-shrink-0 w-[350px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-white/90 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=600&fit=crop"; // Fallback if image fails
                    }}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{post.author.name}</h3>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>

                {/* Post Title & Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.content}</p>

                {/* Interaction Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                  <button
                    className="text-gray-600 hover:text-green-500 transition-colors duration-200"
                    aria-label="Share post"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        div {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default FrontBlog; 