import { Autocomplete, SxProps, TextField } from "@mui/material";

interface CustomSelectProps {
  values: string[],
  onChange: (value: string) => void,
  value: string,
  sx?: SxProps
}

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Autocomplete
      {...props}
      disableListWrap
      options={props.values}
      onChange={(_, value) => props.onChange(value ?? "")}
      value={props.value ?? ""}
      fullWidth
      size="medium"
      renderInput={(params) => <TextField {...params} />}
    />
  )
}