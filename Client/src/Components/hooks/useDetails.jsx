// src/store/useDetailsStore.js
import create from 'zustand';
import axiosInstance from '../api/axiosInstance';

const useDetailsStore = create((set) => ({
  details: [],
  isLoading: false,
  error: null,

  // Fetch details
  fetchDetails: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/details/all/');
      set({ details: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Add detail
  addDetail: async (newDetail) => {
    try {
      const response = await axiosInstance.post('/details/add/', newDetail);
      set((state) => ({
        details: [...state.details, response.data],
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Update detail
  updateDetail: async (id, updatedDetail) => {
    try {
      const response = await axiosInstance.put(`/details/update/${id}/`, updatedDetail);
      set((state) => ({
        details: state.details.map((detail) =>
          detail.id === id ? { ...detail, ...response.data } : detail
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Delete detail
  deleteDetail: async (id) => {
    try {
      await axiosInstance.delete(`/details/delete/${id}/`);
      set((state) => ({
        details: state.details.filter((detail) => detail.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useDetailsStore;
