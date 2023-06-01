import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../context/axios";
import { User } from 'interfaces';
import { useNavigate } from "react-router-dom";
import { useLocalTokens } from "./useLocalTokens";

enum Target {
  'signup' = 'signup',
  'signin' = 'signin'
}

export function useLogin() {
  const [_, setValue] = useLocalTokens();
  const navigate = useNavigate();
  const axios = useAxios();
  
  return useMutation(
    async (payload: {
      dto: User,
      target: keyof typeof Target
    }) => {
      const { data } = await axios.post(`/api/auth/${payload.target}`, payload.dto)
      return data
    },
    {
      onSuccess: (data) => {
        setValue(data)
        navigate('/');
      }
    }
  )
}