import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from '../api/Blog';

// Fetch All Blogs
export const useBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

// Fetch Single Blog
export const useBlog = (id) =>
  useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogs(id),
    enabled: !!id,
  });

// Add Blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

// Update Blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

// Delete Blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};
