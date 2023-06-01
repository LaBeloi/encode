import axios, { AxiosError } from 'axios';
import React, { FC, PropsWithChildren, useContext } from 'react';
import { useSetRecoilState } from 'recoil';
import { SnackbarState } from '../store/store';
import { Typography } from '@mui/material';

const axiosClient = axios.create();

const AxiosContext = React.createContext(axiosClient);

export function useAxios() {
  return useContext(AxiosContext);
}

export const AxiosProvider: FC<PropsWithChildren> = (props) => {
  const setSnackBar = useSetRecoilState(SnackbarState);
  
  axiosClient.interceptors.response.use(
    (res) => res,
    (e) => {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          console.log(e)
          window.location.href = '/login';
          return;
        }
        if (e.response?.status === 403) {
          setSnackBar({
            open: true,
            title: 'Forbidden!',
            message: (
              <Typography component="p">
                You don't have permission to perform the action
              </Typography>
            ),
            severity: 'error',
          });
          throw e;
        }
        if (e.response?.status === 404) {
          window.location.href = '/not-found';
          return;
        }
        setSnackBar({
          open: true,
          title:
            'Oups! Something went wrong...',
          message: (
            <Typography component="p">
              Please, check your internet connection.
            </Typography>
          ),
          severity: 'error',
        });
        throw e;
      }
    }
  )

  return (
    <AxiosContext.Provider value={axiosClient}>
      {props.children}
    </AxiosContext.Provider>
  )
}