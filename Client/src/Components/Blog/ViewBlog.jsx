import { useState, useEffect } from "react";
import { FaPen, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useBlogs, useDeleteBlog, useUpdateBlog } from "../hooks/Blog";

const ViewBlog = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: updateBlog } = useUpdateBlog();

  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    author: "",
    createdAt: "",
    image: null,
  });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (error) toast.error("Failed to fetch blogs: " + error.message);
  }, [error]);

  const handleEditClick = (blog) => {
    if (!blog.id) {
      console.error("Blog has no ID:", blog);
      toast.error("Cannot edit blog: Invalid ID");
      return;
    }
    console.log("Editing blog:", blog);
    setEditingBlogId(blog.id);
    setEditFormData({
      title: blog.title || "",
      content: blog.content || "",
      author: blog.author || "",
      createdAt: blog.createdAt ? blog.createdAt.split("T")[0] : "",
      image: null,
    });
    setImagePreview(blog.image || null);
  };

  const handleCancelEdit = () => {
    setEditingBlogId(null);
    setEditFormData({
      title: "",
      content: "",
      author: "",
      createdAt: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File exceeds 5MB limit.");
      return;
    }
    setEditFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!editingBlogId) {
      toast.error("No blog selected for update");
      return;
    }
    if (!editFormData.title.trim() || !editFormData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", editFormData.title);
    formData.append("content", editFormData.content);
    formData.append("author", editFormData.author);
    formData.append("createdAt", editFormData.createdAt);
    if (editFormData.image) {
      formData.append("image", editFormData.image);
    }

    console.log("Updating blog ID:", editingBlogId);

    updateBlog(
      { id: editingBlogId, data: formData },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully!");
          handleCancelEdit();
        },
        onError: (error) => {
          toast.error(`Error updating blog: ${error.message}`);
          console.error("Update error:", error.response?.data || error);
        },
      }
    );
  };

  const handleDelete = (id) => {
    if (!id) {
      toast.error("Cannot delete blog: Invalid ID");
      return;
    }
    deleteBlog(
      { id },
      {
        onSuccess: () => {
          toast.success("Blog deleted successfully!");
        },
        onError: (error) => {
          toast.error(`Error deleting blog: ${error.message}`);
        },
      }
    );
  };

  if (isLoading) return <div>Loading blogs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="max-h-32 rounded-xl mb-4"
                />
              )}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  <FaPen /> Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingBlogId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white w-full max-w-lg rounded-xl p-8 relative"
          >
            <button
              type="button"
              onClick={handleCancelEdit}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

            <input
              type="text"
              name="title"
              value={editFormData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <textarea
              name="content"
              value={editFormData.content}
              onChange={handleChange}
              placeholder="Content"
              rows={4}
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <input
              type="text"
              name="author"
              value={editFormData.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <input
              type="date"
              name="createdAt"
              value={editFormData.createdAt}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 mb-4 border rounded-lg"
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

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewBlog;