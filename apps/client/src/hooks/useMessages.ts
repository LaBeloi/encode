import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../context/axios";
import { Message } from '@prisma/client';
import { useLocalTokens } from "./useLocalTokens";

export function useMessages() {
  const [value] = useLocalTokens();
  const axios = useAxios();

  console.log(value);

  return useQuery(
    ['messages'],
    async () => {
      const { data } = await axios.get<Message[]>('/api/messages', {
        headers: {
          Authorization: `Bearer ${value?.access_token}`
        }
      });
      return data;
    }
  ) 
}