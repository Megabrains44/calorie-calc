import { atom } from "recoil";
import Email from "../types/email";


export const emailsState = atom({
    key: 'emailsState',
    default: [] as Email[]
})