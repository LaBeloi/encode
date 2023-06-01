import { Box, Typography } from "@mui/material";
import { Encode } from "../encode/Encode";
import { Table } from "../table/Table";
import { useMessages } from "../../hooks/useMessages";
import { Suspense, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ListOfMessages } from "../../store/store";

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
    <Suspense fallback="loading...">
      <Encode />
      <Table />
    </Suspense>
  </Box>
  )
}