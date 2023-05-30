import { Card, Container } from "@mui/material";
import { LoginForm } from "./LoginForm";

export function Login() {
  return (
    <Container 
      maxWidth="xs"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 6 
      }}
    >
      <Card elevation={3} sx={{ padding: 4 }}>
          <LoginForm/>
      </Card>
    </Container>
  )
}