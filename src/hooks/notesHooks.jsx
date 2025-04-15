import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/server/endPoint"
// User mutations
export const useCreateNotes = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (newNotes) => {
            console.log(newNotes, 'newNotes');
            const response = await api?.notes?.create(newNotes)
            console.log(response, 'response');
            return response?.data
        },
        onSuccess: () => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: ["createnotes"] })
        },
    })
}

export const useGetNotes = () => {
  return useQuery({
    queryKey: ["createnotes"],
    queryFn: async () => {
      try {
        const response = await  api?.notes?.getAll()
     
        return response.data ?? [];
      } catch (error) {
        console.log(error, 'error');
        return []; // ✅ Always return something
      }
    },
  });
};