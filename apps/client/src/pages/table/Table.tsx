import { List } from "@mui/material";
import { useRecoilValue } from "recoil";
import { ListOfMessages } from "../../store/store";
import { MessageItem } from "./MessageItem";

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
    {listOfMessages.map((item) => <MessageItem key={item.id} index={item.id} item={item} />)}
  </List>
}