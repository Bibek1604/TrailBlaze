import axiosInstance from './Index';

// Fetch details
export const fetchDetails = async () => {
  const response = await axiosInstance.get('/details/all/');
  return response.data;
};

// Add detail
export const addDetail = async (data) => {
  const response = await axiosInstance.post('details/add/', data);
  return response.data;
};

// Update detail
export const updateDetail = async (id, data) => {
  const response = await axiosInstance.put(`/details/update/${id}/`, data);
  return response.data;
};

// Delete detail
export const deleteDetail = async (id) => {
  const response = await axiosInstance.delete(`/details/delete/${id}/`);
  return response.data;
};

export const fetchDetailById = async (id) => {
  const response = await axiosInstance.get(`/details/place/${id}/`);
  return response.data;
};
