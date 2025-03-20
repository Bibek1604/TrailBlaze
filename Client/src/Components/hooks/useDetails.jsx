import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDetails,
  addDetail,
  updateDetail,
  deleteDetail,
} from '../api/Details';

// Fetch all details
export const useDetails = () => {
  return useQuery(['details'], fetchDetails);
};

// Add detail
export const useAddDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(addDetail, {
    onSuccess: () => queryClient.invalidateQueries(['details']),
  });
};

// Update detail
export const useUpdateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateDetail(id, data), {
    onSuccess: () => queryClient.invalidateQueries(['details']),
  });
};

// Delete detail
export const useDeleteDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDetail, {
    onSuccess: () => queryClient.invalidateQueries(['details']),
  });
};
