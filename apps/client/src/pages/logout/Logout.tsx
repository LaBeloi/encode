import { Button } from "@mui/material";
import { useLocalTokens } from "../../hooks/useLocalTokens";
import { useLogout } from "../../hooks/useLogout";

export function Logout() {
  const [value] = useLocalTokens();
  const { mutate } = useLogout();

  return (
    <Button
      sx={{
        position: 'fixed',
        top: '3rem',
        left: '3rem',
      }}
      variant="contained" 
      onClick={() => mutate(value?.refresh_token ?? '')}
    >
      Logout
    </Button>
  )
}