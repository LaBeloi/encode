import { Container, Card, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from './notFound.module.css';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Container 
      maxWidth="xs"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 6 
      }}
    >
      <Card className={classes.card} elevation={3} sx={{ padding: 4 }}>
        <Typography>
          Resource not found!
        </Typography>
        <Button
          onClick={() => navigate('/', { replace: true })}
          variant="outlined"
        >
          Go Home
        </Button>
      </Card>
    </Container>
  )
}