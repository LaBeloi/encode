import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NumberField from "../../components/Number/Number";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SnackbarState, UserAtom } from "../../store/store";
import CustomSelect from "../../components/Select/Select";
import {CipherTypes} from '@prisma/client';
import { useAddMessage } from "../../hooks/useAddMessage.ts";


export function Encode() {
  const setSnackBar = useSetRecoilState(SnackbarState);
  const user = useRecoilValue(UserAtom);
  const { mutate } = useAddMessage();
  const [isCaesar, setIsCaesar] = useState<boolean>(false);
  const [message,setMessage] = useState<string>('');
  const [type, setType] = useState<string>();
  const [shift, setShift] = useState<number>();

  useEffect(() => {
    setIsCaesar(!!(type && type === CipherTypes.Caesar))
  }, [type])

  const add = async () => {
    if (message && type) {
      if (type === CipherTypes.Caesar && !shift) {
        setSnackBar({
          open: true,
          title: 'Validation error',
          message: <Typography>Shift: shift required in Caesar coding type</Typography>,
          severity: 'error',
        })
      } else {
        await mutate({
          userId: user.id,
          message,
          coding_type: type as CipherTypes,
          shift: shift ?? 0
        })
        setIsCaesar(false);
        setMessage('');
        setType(undefined);
        setShift(0)
      }
    } else {
      setSnackBar({
        open: true,
        title: 'Validation error',
        message: <Typography>
          Message: is required;
          Type: is required
        </Typography>,
        severity: 'error',
      })
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