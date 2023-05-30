import { Button, Box } from "@mui/material";
import { useState } from "react";

export function LoginForm() {
  const [signup, setSignup] = useState(true);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {
        signup
          ? <p>test1</p>
          : <p>test2</p>
      }
      <Button variant="outlined" onClick={() => setSignup(false)}>SignIn</Button>
      <Button variant="contained" onClick={() => setSignup(true)}>SignUp</Button>
    </Box>
  )
}