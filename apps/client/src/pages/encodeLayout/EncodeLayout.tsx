import { Box } from "@mui/material";
import { Encode } from "../encode/Encode";
import { Table } from "../table/Table";

export function EncodeLayout() {
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
    <Encode />
    <Table />
  </Box>
  )
}