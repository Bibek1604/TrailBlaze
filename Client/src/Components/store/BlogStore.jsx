import { create } from 'zustand';

const useBlogStore = create((set) => ({
  selectedBlog: null,
  setSelectedBlog: (blog) => set({ selectedBlog: blog }),
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
}));

export default useBlogStore;
