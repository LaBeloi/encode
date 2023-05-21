import { List, ListItem, Box, Button, Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { ListOfMessages } from "../../store/store";

export function Table() {
  const listOfMessages = useRecoilValue(ListOfMessages);
  
  return <List
    sx={{
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {listOfMessages.map((item, key) => 
      <ListItem key={key}>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 'auto',
            minWidth: '30rem',
            padding: '1rem',
          }}
        >
        <Box>{item.message}</Box>
        <Button variant="contained" onClick={() => console.log(item)}>Decode</Button>
        </Card>
      </ListItem>
    )}
  </List>
}