import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalTokens } from "./useLocalTokens";
import { useAxios } from "../context/axios";
import { MessageRequest } from "interfaces";

export function useAddMessage() {
  const axios = useAxios();
  const [value] = useLocalTokens();
  const queryClient = useQueryClient();

  return useMutation(
    ['add-message'],
    async (message: MessageRequest) => {
      const response = await axios.post('/api/messages/create', message, {
        headers: {
          Authorization: `Bearer ${value?.access_token}`
        },
        
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