import axiosInstance from './Index';

// Fetch Blogs
export const fetchBlogs = async () => {
  const { data } = await axiosInstance.get('/blog/all/');
  return data;
};

// Add Blog
export const addBlog = async (formData) =>
  (await axiosInstance.post('/blog/add/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;

// Update Blog
export const updateBlog = async ({ blogId, updatedData }) =>
  (await axiosInstance.put(`/blog/update/${blogId}/`, updatedData)).data;

// Delete Blog
export const deleteBlog = async ({ id }) =>
  (await axiosInstance.delete(`/blog/delete/${id}/`)).data;
