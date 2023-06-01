import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import NumberField from "../../components/Number/Number";
import { useRecoilState } from "recoil";
import { ListOfMessages } from "../../store/store";
import CustomSelect from "../../components/Select/Select";
import { XOR } from "../../../xor.ts";
import { Caesar } from "../../../caesar.ts";
import {CipherTypes, Message} from '@prisma/client';


export function Encode() {
  const [listOfMessages, addToListOFMessages] = useRecoilState(ListOfMessages);
  const [isCaesar, setIsCaesar] = useState<boolean>(false);
  const [message,setMessage] = useState<string>('');
  const [type, setType] = useState<string>();
  const [shift, setShift] = useState<number>();

  useEffect(() => {
    setIsCaesar(!!(type && type === CipherTypes.Caesar))
  }, [type])

  // TODO: change logic
  const add = () => {
    if (message && type) {
      const cipher = type as CipherTypes

      const result: Message = {
        userId: '1251236127324324234723',
        shift: 0,
        id: '8639420234523402346',
        message,
        coding_type: cipher
      }
      if (type === CipherTypes.Caesar) {
        result.shift = shift ?? 0
        console.log(Caesar(message, shift ?? 0));
      } else {
        console.log(XOR(message))
      }
      addToListOFMessages([...listOfMessages, result])
      setIsCaesar(false);
      setMessage('');
      setType(undefined);
      setShift(0)
    }
  }

  return <Box
  sx={{
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}
  >
    <TextField 
      label="Paste string to encode"
      sx={{
        marginBottom: '2rem'
      }}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <CustomSelect
      value={type ?? ""}
      values={Object.values(CipherTypes)}
      onChange={setType}
      sx={{ marginBottom: '2rem' }}
    />
    {isCaesar && 
        <NumberField
          sx={{ marginBottom: '2rem' }}
          label="Choose number of shifts to encode"
          onChange={(value) => setShift(value)}
        />
      }
    <Button 
      onClick={add}
      variant="contained"
    >
      Add
    </Button>
  </Box>
}