import { Box, ThemeProvider, colors, createTheme } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/not-found/NotFound";
import HomePage from './pages/home/Home';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarAlert } from "./components/SnackbarAlert/SnackbarAlert";
import { AxiosProvider } from "./context/axios";
import { Layout } from "./pages/layout/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: colors.purple[500]
    }
  }
})

export function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AxiosProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="encode" element={<Layout />}/>
              <Route path="login" element={<Login/>}/>
              <Route path="not-found" element={<NotFound />}/>
            
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
            <SnackbarAlert />
          </ThemeProvider>
        </AxiosProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}