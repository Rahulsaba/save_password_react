import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/server/endPoint"
// User mutations
export const useCreateSocialMedia = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newUser) => {
      const response = await api?.socialmedia?.create(newUser)
      console.log(response, 'response');
      return response?.data
    },
    onSuccess: () => {
            // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["createsocialmedia"] })
    },
  })
}
export const useDeleteSocialMedia = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const response = await api?.socialmedia?.delete(id)
      console.log(response, 'response');
       return response?.data
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["createsocialmedia"] })
    },
  })
}


export const useGetSocialMedia = () => {
  return useQuery({
    queryKey: ["createsocialmedia"],
    queryFn: async () => {
      try {
        const response = await  api?.socialmedia?.getAll()
        // fetch(`http://localhost:5000/api/createmedia`);
         // ✅ Only here
      
        return response.data ?? [];
      } catch (error) {
        console.log(error, 'error');
        return []; // ✅ Always return something
      }
    },
  });
};