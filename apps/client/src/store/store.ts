import { atom } from "recoil";
import { Message } from '@prisma/client';
import { SnackbarProps } from "@mui/material";
import { SnackbarAlertSeverity } from "../components/SnackbarAlert/SnackbarAlert";

export type SnackbarStateProps = Pick<
  SnackbarProps,
  'open' | 'message' | 'autoHideDuration'
> & {title?: string, severity: SnackbarAlertSeverity}

export const ListOfMessages = atom<Message[]>({
  key: 'listOfMessages',
  default: []
})

export const SnackbarState = atom<SnackbarStateProps>({
  key: 'snack-bar',
  default: {
    open: false,
    severity: 'info'
  }
})