// src/components/ViewCategory.js
import { useCategories, useDeleteCategory, useUpdateCategory } from "../hooks/useCategory";
import { useState } from "react";
import toast from "react-hot-toast";

const ViewCategory = () => {
  const { data: categories, isLoading, isError } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();
  const updateCategoryMutation = useUpdateCategory();
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const handleDelete = (id) => {
    setDeleteCategoryId(id);
  };

  const confirmDelete = () => {
    if (deleteCategoryId) {
      toast.loading("Deleting category...", { id: "delete-toast" });
      deleteCategoryMutation.mutate(deleteCategoryId, {
        onSuccess: () => {
          toast.success(" Category deleted successfully!", {
            id: "delete-toast",
            duration: 3000,
          });
          setDeleteCategoryId(null);
        },
        onError: (error) => {
          console.error("Delete error:", error);
          toast.error(error.response?.data?.error || "❌ Failed to delete category.", {
            id: "delete-toast",
            duration: 3000,
          });
          setDeleteCategoryId(null);
        },
      });
    }
  };

  const handleEditStart = (category) => {
    setEditCategoryId(category.id);
    setEditName(category.name);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) {
      toast.error("⚠️ Category name cannot be empty!", { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", editName);

    toast.loading("Updating category...", { id: "update-toast" });
    updateCategoryMutation.mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          toast.success(" Category edited successfully!", {
            id: "update-toast",
            duration: 3000,
          });
          setEditCategoryId(null);
        },
        onError: (error) => {
          console.error("Update error:", error);
          toast.error(error.message || "❌ Failed to update category.", {
            id: "update-toast",
            duration: 3000,
          });
        },
      }
    );
  };

  if (isLoading) {
    return <p className="text-center text-gray-700">Loading categories...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load categories</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={
                  category.image
                    ? `http://127.0.0.1:8000${category.image}`
                    : "https://via.placeholder.com/300"
                }
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                {editCategoryId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Edit category name"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(category.id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        disabled={updateCategoryMutation.isLoading}
                      >
                        {updateCategoryMutation.isLoading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditCategoryId(null)}
                        className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Discover amazing places in this category.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Explore
                      </button>
                      <button
                        onClick={() => handleEditStart(category)}
                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                        disabled={deleteCategoryMutation.isLoading}
                      >
                        {deleteCategoryMutation.isLoading &&
                        deleteCategoryMutation.variables === category.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteCategoryId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteCategoryId(null)}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCategory;