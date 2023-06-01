import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { FieldError, User } from "interfaces";
import { useSetRecoilState } from "recoil";
import { SnackbarState } from "../../store/store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const setSnackBar = useSetRecoilState(SnackbarState);
  const login = useLogin();
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FieldError[] = [];
    if (!username || username.length <= 2) {
      errors.push({
        field: 'Username',
        error: 'should exists and be longer than 2 letters'
      })
    }
    if (!password || password.length <=4) {
      errors.push({
        field: 'Password',
        error: 'should exists and be longer than 4 symbols'
      })
    }
    if (!email || !emailRegex.test(email)) {
      errors.push({
        field: 'Email',
        error: 'should exists and be email'
      })
    }

    if (errors.length) {
      return setSnackBar({
        open: true,
        title: 'Validation error',
        message: errors.map((er, index) => (
          <Typography key={index}>{er.field}: {er.error}</Typography>
        )),
        severity: 'error',
      })
    }
    
    const user: User = {
      username,
      password,
      email
    }
    if (isSignup) {
      login.mutate({
        dto: user,
        target: 'signup'
      })
    } else {
      login.mutate({
        dto: user,
        target: 'signin'
      })
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      onSubmit={onSubmit}
    >
      <TextField 
          label="Username"
          sx={{
            marginBottom: '2rem'
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <TextField 
        label="Email"
        sx={{
          marginBottom: '2rem'
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField 
          label="Password"
          sx={{
            marginBottom: '2rem'
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <Button type="submit" variant="outlined" onClick={() => setIsSignup(false)}>SignIn</Button>
      <Button type="submit" variant="contained" onClick={() => setIsSignup(true)}>SignUp</Button>
    </Box>
  )
}