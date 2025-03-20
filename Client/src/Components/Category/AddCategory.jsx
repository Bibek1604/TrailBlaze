// src/components/AddCategory.js
import { useState } from "react";
import { FaUpload, FaPlusCircle } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAddCategory } from "../hooks/useCategory";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const addCategoryMutation = useAddCategory();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!name || !image) {
      toast.error("⚠️ Please fill all fields!", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    addCategoryMutation.mutate(formData, {
      onSuccess: () => {
        toast.success(" Category added successfully!", { duration: 3000 });
        setName("");
        setImage(null);
        setPreview(null);
        document.getElementById("fileInput").value = "";
        navigate("/viewCategory");
      },
      onError: (error) => {
        console.error("Add error:", error);
        toast.error("❌ Failed to add category. Please try again.", { duration: 3000 });
      },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          <MdCategory className="text-blue-500" /> Add Category
        </h2>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Category Name</label>
          <div className="flex items-center border rounded-lg p-3 focus-within:ring focus-within:ring-blue-300 focus-within:border-blue-500">
            <MdCategory className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100">
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <FaUpload className="text-gray-600 mb-2 text-3xl" />
                <span className="text-gray-600">Click to upload</span>
              </>
            )}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={addCategoryMutation.isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold ${
            addCategoryMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaPlusCircle className="text-white" />
          {addCategoryMutation.isLoading ? "Submitting..." : "Submit"}
        </button>

        <Link to="/viewCategory">
          <button
            type="button"
            className="w-full bg-gradient-to-r mt-6 from-blue-500 to-blue-700 text-white p-3 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold"
          >
            See Added Category
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddCategory;