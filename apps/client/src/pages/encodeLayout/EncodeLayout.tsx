import { Box } from "@mui/material";
import { Encode } from "../encode/Encode";
import { Table } from "../table/Table";
import { useMessages } from "../../hooks/useMessages";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ListOfMessages } from "../../store/store";
import { Logout } from "../logout/Logout";

export function EncodeLayout() {
  const setMessages = useSetRecoilState(ListOfMessages);
  const { data, isLoading } = useMessages();
  
  useEffect(() => {
    if (data && !isLoading) {
      setMessages(data)
    }
  }, [data, isLoading, setMessages])

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }}
  >
    <Logout />
    <Encode />
    <Table />
  </Box>
  )
}