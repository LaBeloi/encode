import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useLocalTokens } from "./useLocalTokens";
import { useAxios } from "../context/axios";

export function useRemoveMessage() {
  const axios = useAxios();
  const [value] = useLocalTokens();
  const queryClient = useQueryClient();

  return useMutation(
    ['remove-message'],
    async (messageId: string) => {
      const response = await axios.delete(`/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${value?.access_token}`
        }
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['messages'])
      }
    }
  )
}