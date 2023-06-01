import { SxProps, TextField } from "@mui/material";
import { useState } from "react";

interface NumberProps {
  label?: string,
  disabled?: boolean,
  sx?: SxProps,
  onChange: (value: number) => void
}

export default function NumberField(props: NumberProps) {
  const [value, setValue] = useState<string>('');

  return <TextField
    {...props}
    onKeyDownCapture={(e) => {
      if (e.key === 'Enter') {
        props.onChange(Number(value))
      }
      if (e.key === 'e') {
        e.preventDefault()
      }
    }}
    type="number"
    fullWidth
    size="small"
    value={Number.isNaN(value) ? '' : value}
    onChange={(e) => {
      setValue(e.target.value)}}
    autoComplete="off"
    onBlur={() => {
      props.onChange(Number(value))
    }}
    onWheel={(e) => (e.target as HTMLInputElement).blur()} // disable default scroll behavior
  />
}