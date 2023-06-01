import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../context/axios";
import { useLocalTokens } from "./useLocalTokens";

export function useLogout() {
  const [ _, setValue ] = useLocalTokens();
  const navigate = useNavigate();
  const axios = useAxios();

  return useMutation(
    async (refresh_token: string) => {
      (await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      }))
    },
    {
      onSuccess: () => {
        setValue({
          refresh_token: "",
          access_token: ""
        })
        navigate('/')
      }
    }
  )
}