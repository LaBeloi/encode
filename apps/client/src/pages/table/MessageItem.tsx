import { ListItem, Card, Box, Button } from "@mui/material";
import { Message } from "@prisma/client";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Suspense, useState } from "react";
import { useRemoveMessage } from "../../hooks/useRemoveMessage";
import { useAxios } from "../../context/axios";
import { useLocalTokens } from "../../hooks/useLocalTokens";

interface MessageItemProp {
  item: Message,
  index: number,
}

export function MessageItem(props: MessageItemProp) {
  const axios = useAxios();
  const remove = useRemoveMessage();
  const [value] = useLocalTokens();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string>(props.item.message);
  const [isDecoded, setIsDecoded] = useState<boolean>(false);

  const decode = async (messageId: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get<string>(`/api/messages/${messageId}/decode`, {
        headers: {
          Authorization: `Bearer ${value?.access_token}`
        }
      })
      setText(data)
      setLoading(false);
    } catch (e) {
      console.log(e)
    }
  }

  const encode = () => setText(props.item.message);

  return (
    <Suspense fallback="loading...">
      <ListItem key={props.index}>
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
          <Box>{loading ? '...' : text}</Box>
          <Box>
            <Button 
              variant={isDecoded ? 'outlined' : 'contained'}
              disabled={loading}
              onClick={() => {
                isDecoded
                  ? encode()
                  : decode(props.item.id)
                setIsDecoded(!isDecoded)
              }}
            >
              Decode
            </Button>
            <Button onClick={() => remove.mutate(props.item.id)}><DeleteOutlineIcon/></Button>
          </Box>
        </Card>
      </ListItem>
    </Suspense>
  )
}