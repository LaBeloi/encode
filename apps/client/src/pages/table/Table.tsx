import { List } from "@mui/material";
import { useRecoilValue } from "recoil";
import { ListOfMessages } from "../../store/store";
import { MessageItem } from "./MessageItem";
import { Suspense } from "react";

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
    <Suspense fallback={"list loading ..."}>
    {listOfMessages.map((item, index) => <MessageItem index={index} item={item} />)}
    </Suspense>
  </List>
}