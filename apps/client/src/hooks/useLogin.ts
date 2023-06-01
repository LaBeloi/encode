import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../context/axios";
import { User, UserResponse } from 'interfaces';
import { useNavigate } from "react-router-dom";
import { useLocalTokens } from "./useLocalTokens";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/store";

enum Target {
  'signup' = 'signup',
  'signin' = 'signin'
}

export function useLogin() {
  const [_, setValue] = useLocalTokens();
  const setUser = useSetRecoilState(UserAtom);
  const navigate = useNavigate();
  const axios = useAxios();
  
  return useMutation(
    ['login'],
    async (payload: {
      dto: User,
      target: keyof typeof Target
    }) => {
      const { data } = await axios.post<UserResponse>(`/api/auth/${payload.target}`, payload.dto)
      return data
    },
    {
      onSuccess: (data) => {
        setValue(data.tokens)
        setUser(data.user)
        navigate('/');
      }
    }
  )
}