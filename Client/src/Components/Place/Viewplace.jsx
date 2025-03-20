import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { usePlaces, useAddPlace, useUpdatePlace, useDeletePlace } from "../hooks/usePlace";
import toast from "react-hot-toast"; // Import toast only

const SAMPLE_PHOTO = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80";

function Viewplace() {
  const { data: places, isLoading, isError } = usePlaces();
  const { mutate: addPlace } = useAddPlace();
  const { mutate: updatePlace } = useUpdatePlace();
  const { mutate: deletePlace } = useDeletePlace();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    category: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    if (editingPlace) {
      toast.loading("Updating place...", { id: "update-place-toast" });
      updatePlace(
        { id: editingPlace.id, data },
        {
          onSuccess: () => {
            toast.success("✅ Place updated successfully!", { id: "update-place-toast", duration: 3000 });
            closeModal();
          },
          onError: (error) => {
            const errorMsg = error.response?.data?.detail || error.message || "Unknown error";
            toast.error(`❌ Failed to update place: ${errorMsg}`, { id: "update-place-toast", duration: 3000 });
          },
        }
      );
    } else {
      toast.loading("Adding place...", { id: "add-place-toast" });
      addPlace(data, {
        onSuccess: () => {
          toast.success("✅ Place added successfully!", { id: "add-place-toast", duration: 3000 });
          closeModal();
        },
        onError: (error) => {
          const errorMsg = error.response?.data?.detail || error.message || "Unknown error";
          toast.error(`❌ Failed to add place: ${errorMsg}`, { id: "add-place-toast", duration: 3000 });
        },
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      toast.loading("Deleting place...", { id: "delete-place-toast" });
      deletePlace(id, {
        onSuccess: () => {
          toast.success("✅ Place deleted successfully!", { id: "delete-place-toast", duration: 3000 });
        },
        onError: (error) => {
          const errorMsg = error.response?.data?.detail || error.message || "Unknown error";
          toast.error(`❌ Failed to delete place: ${errorMsg}`, { id: "delete-place-toast", duration: 3000 });
        },
      });
    }
  };

  const openModal = (place = null) => {
    setEditingPlace(place);
    setFormData(
      place
        ? { name: place.name, location: place.location, description: place.description, category: place.category, image: null }
        : { name: "", location: "", description: "", category: "", image: null }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlace(null);
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error fetching places</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places?.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={place.image ? `http://127.0.0.1:8000/${place.image}` : SAMPLE_PHOTO}
              alt={place.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{place.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{place.location}</p>
              <p className="text-gray-500 mt-2 line-clamp-2">{place.description}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => openModal(place)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(place.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <FaTrash /> Delete
                </button>
              </div>
              <Link
                to={`/details/${place.id}`}
                className="mt-2 block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingPlace ? "Edit Place" : "Add Place"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 outline-none min-h-[100px]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg p-2 outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingPlace ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewplace;