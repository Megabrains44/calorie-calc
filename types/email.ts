import { FieldValue, Timestamp } from "firebase/firestore";
import User from "./user";

export default interface Email{
    sender: User;
    receiver: User;
    subject: string;
    message: string;
    sentAt: Timestamp ;
    id: string;
}


