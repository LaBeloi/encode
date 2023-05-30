import { ThemeProvider, colors, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { EncodeLayout } from "./pages/encodeLayout/EncodeLayout";
import { Login } from "./pages/login/Login";

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
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<EncodeLayout />} />
          <Route path="login" element={<Login/>}/>
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  )
}