import { useState } from "react";
import { FaUpload, FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory, MdDescription } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useCategories } from "../hooks/useCategory";
import { useAddPlace } from "../hooks/usePlace";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast only

const AddPlace = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [timetotravel, setTimeToTravel] = useState("");

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();
  const { mutate: addPlace, isLoading: isAdding } = useAddPlace();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !description || !category || !image || !timetotravel) {
      toast.error("⚠️ Please fill all fields!", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("timetotravel", timetotravel);

    console.log("Submitting FormData:", { name, location, description, category, image, timetotravel });

    toast.loading("Adding place...", { id: "add-place-toast" });
    addPlace(formData, {
      onSuccess: () => {
        toast.success(" Place added successfully!", { id: "add-place-toast", duration: 3000 });
        setName("");
        setLocation("");
        setDescription("");
        setCategory("");
        setImage(null);
        setImagePreview(null);
        setTimeToTravel("");
      },
      onError: (error) => {
        const errorMsg = error.response?.data?.detail || error.message || "Unknown error";
        toast.error(`❌ Failed to add place: ${errorMsg}`, { id: "add-place-toast", duration: 3000 });
        console.error("Error details:", error.response?.data || error);
      },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" /> Add Place
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Place Name</label>
          <div className="flex items-center border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Enter place name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <div className="flex items-center border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <div className="flex items-start border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300">
            <MdDescription className="text-gray-500 mr-2 mt-1" />
            <textarea
              className="w-full outline-none min-h-[100px]"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <div className="flex items-center border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300">
            <MdCategory className="text-gray-500 mr-2" />
            <select
              className="w-full outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              {isCategoriesLoading ? (
                <option disabled>Loading categories...</option>
              ) : categoriesError ? (
                <option disabled>Error loading categories</option>
              ) : categories?.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Time to Travel</label>
          <div className="flex items-center border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300">
            <BsClock className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="e.g., 2 days"
              value={timetotravel}
              onChange={(e) => setTimeToTravel(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <FaUpload className="text-gray-600 mb-2 text-3xl" />
                <span className="text-gray-600">Click to upload</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold ${
            isAdding ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaPlusCircle className="text-white" />
          {isAdding ? "Submitting..." : "Submit"}
        </button>

        <Link to="/viewPlace">
          <button
            type="button"
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold"
          >
            View Places
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddPlace;