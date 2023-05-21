import { ThemeProvider, colors, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { EncodeLayout } from "./pages/encodeLayout/EncodeLayout";

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
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  )
}