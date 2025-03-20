import { useState } from "react";
import { FaPen, FaUser, FaImage, FaAlignLeft, FaCalendarAlt } from "react-icons/fa";
import { useAddBlog } from "../hooks/Blog";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Blog = () => {
  const { mutate: addBlog, isLoading } = useAddBlog();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null,  // Single file
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [imagePreview, setImagePreview] = useState(null);  // Single preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Take only the first file
    if (file && file.size > 5 * 1024 * 1024) {  // 5MB limit
      toast.error("File exceeds 5MB limit.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim() || !formData.image) {
      toast.error("All fields, including an image, are required.");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("author", formData.author);
    submitData.append("createdAt", formData.createdAt);
    submitData.append("image", formData.image);  // Single image

    console.log("Submitting:", { title: formData.title, author: formData.author, image: formData.image.name });

    addBlog(submitData, {
      onSuccess: () => {
        toast.success("Blog published successfully!");
        setFormData({
          title: "",
          content: "",
          author: "",
          image: null,
          createdAt: new Date().toISOString().split("T")[0],
        });
        setImagePreview(null);
      },
      onError: (error) => {
        toast.error(`Failed to publish blog: ${error.message}`);
        console.error("Error details:", error.response?.data || error);
      },
    });
  };

  return (
    <div className="max-w-4xl px-6 py-12 mx-auto bg-gray-50">
      <div className="relative p-10 overflow-hidden bg-white shadow-lg rounded-3xl">
        <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Write Your Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            <div className="w-full lg:w-1/2">
              <label className="flex items-center text-sm font-medium text-gray-600">
                <FaPen className="mr-2 text-gray-500" /> Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full px-5 py-4 mt-2 text-xl border border-gray-300 shadow-sm rounded-xl"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="flex items-center text-sm font-medium text-gray-600">
                <FaUser className="mr-2 text-gray-500" /> Written By
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="block w-full px-5 py-4 mt-2 text-xl border border-gray-300 shadow-sm rounded-xl"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <FaAlignLeft className="mr-2 text-gray-500" /> Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="4"
              className="block w-full px-5 py-4 mt-2 text-xl border border-gray-300 shadow-sm rounded-xl"
            ></textarea>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <FaCalendarAlt className="mr-2 text-gray-500" /> Created At
            </label>
            <input
              type="date"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              required
              className="block w-full px-5 py-4 mt-2 text-xl border border-gray-300 shadow-sm rounded-xl"
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-600">
              <FaImage className="mr-2 text-gray-500" /> Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full px-5 py-4 mt-2 text-xl border border-gray-300 shadow-sm rounded-xl"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-32 rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Blog"}
            </button>
            <Link to="/viewblog">
              <button
                type="button"
                className="px-6 py-3 text-white bg-blue-500 rounded-lg"
              >
                View Blog
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;