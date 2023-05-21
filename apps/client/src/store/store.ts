import { atom } from "recoil";
import { MessageItem } from "../pages/encode/Encode";

export const ListOfMessages = atom<MessageItem[]>({
  key: 'listOfMessages',
  default: []
})