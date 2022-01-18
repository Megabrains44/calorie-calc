import { atom } from "recoil";
import User from "../types/user";

export const userAuth = atom({
    key: 'userAuth',
    default: {} as User
})