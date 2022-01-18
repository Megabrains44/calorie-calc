import { addDoc, collection, doc, DocumentData, getDoc, getDocs, limit, query, serverTimestamp, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { emailModal } from "../atoms/emailModal";
import { emailsState } from "../atoms/emailsState";
import { userAuth } from "../atoms/userAuth";
import { db } from "../firebase";
import Email from "../types/email";
import User from "../types/user";

async function validate(email: string) {
    const q = query(collection(db, "users"), where("email", "==", email), limit(1));
    
    const docsRef = await getDocs(q);
    const docRef = docsRef
    if (!docRef.empty){
        return docRef.docs[0].data();
    } else {
        return false
    }
}



const EmailCompose:FC = () => {
    const [subject, setSubject] = useState<string>('');
    const setIsModal = useSetRecoilState(emailModal)
    const [recipient, setRecipient] = useState<string>("")
    const [message, setMessage] = useState('');

    const [emails, setEmails] = useRecoilState(emailsState);
    const [error, setError] = useState<boolean>(false);
    const [errorLoader, setErrorLoader] = useState(false);

    const userInfo = useRecoilValue(userAuth)

    

    const handleSubmit = async () => {
        if (errorLoader) return;
        
        setErrorLoader(true)
        const res = await validate(recipient)
        const newEmail = {
            sender: userInfo,
            receiver: res as User,
            message,
            subject,
            sentAt: serverTimestamp()
        }
        if (res ){
            setIsModal(false)
            await addDoc(collection(db,"emails"), newEmail) // .id to get id
            // docRef.id
            setError(false)
        } else {
            setError(true)
        }
        setErrorLoader(false)
        // setEmails([...emails, newEmail])
    }
    
    
    useEffect(() => {
        console.log(message)
    },[message])

    return (
        <div className="fixed bg-[#0000003b] w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="w-[32rem] relative">
                <header className="rounded-t-lg  bg-gray-700 text-white py-2 px-3 font-bold w-full">{subject || "New email"} </header>
                <main className="bg-white flex flex-col">
                    <input value={recipient} onChange={e => setRecipient(e.target.value)} className="border-b-[1px] w-full px-2 py-2 focus:outline-none" type="email" placeholder="Recipient"/>
                    <input value={subject} onChange={e => setSubject(e.target.value)} className="border-b-[1px] w-full px-2 py-2 focus:outline-none" type="text" placeholder="Subjects"/>
                    <textarea onChange={e => setMessage(e.target.value)} value={message} className="h-80 focus:outline-none px-2 py-2" name="message" id="message-content" >
                        
                    </textarea>
                </main>
            <div className="cursor-pointer absolute top-1 right-3 text-white font-bold" onClick={() => setIsModal(false)}>x</div>
            <div role={'button'} onClick={handleSubmit} className={` transition absolute bottom-4 left-3 bg-blue-400 ${ errorLoader ? "opacity-40 cursor-default": "hover:bg-sky-200 opacity-100 cursor-pointer"} px-3 py-2`}>Submit</div>
            {error && <div className="text-red-800 absolute bottom-3 w-full text-center">⚠️ There was an error</div>}
            </div>
        </div>
    )
}

export default EmailCompose;