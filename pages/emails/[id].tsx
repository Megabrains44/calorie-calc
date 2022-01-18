import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAuth } from "../../atoms/userAuth";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
import Email from "../../types/email";
import User from "../../types/user";


interface ModifiedEmailProps {
    emailData: {

        sender: User;
        receiver: User;
        subject: string;
        message: string;
        sentAt: string ;
        id: string;
    }
}

const EmailViewer:NextPage<ModifiedEmailProps> = ({emailData}) => {
    const [isAuth, setIsAuth] = useState(false)
    const userInfo = useRecoilValue(userAuth)
    const router = useRouter()
    // const { id: emailId } = router.query

    useEffect(() => {
        if ((userInfo.id === emailData.receiver.id) || (userInfo.id === emailData.sender.id)){
            setIsAuth(true)
        }
    }, [userInfo])

    if (!isAuth){
        return (
            <div>Not authoritized</div>
        )
    } 
    return (
        <div className="bg-gray-100 h-screen">
            <Navbar />
            <header className="py-2 px-12 bg-white flex items-center gap-2">
                    <div onClick={() => router.back()} className="cursor-pointer text-xl rounded-full">⬅</div>
                    <div className="text-2xl font-bold">{emailData.subject}</div>
            </header>
            <div className="bg-white px-12 py-12">
                <div className="flex gap-3 items-start">

                    <Image className="rounded-full" src={emailData.sender.profilePicture} width={50} height={50}/>
                    <div>

                        <h2 className="font-semibold text-xl">{emailData.sender.name}</h2>
                        {emailData.message.split("\n").map((subMessage:string, idx) => {
                            return (
                                <p key={idx}>
                                    {!subMessage.length && <br />}
                                    {subMessage}
                                </p>
                            )
                        })}
                    </div>
                </div>
                
                {/* <pre className="font-sans">{emailData.message}</pre> */}
            </div>
        </div>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
    if (ctx.params){
        const id = ctx.params.id as string;
        const docRef = await getDoc(doc(db, "emails", id))
        if (docRef.exists()){
            const docData:Email = docRef.data() as Email;
            const clonedData = docData as any;
            const sentAtProperty:Date = clonedData.sentAt.toDate();
            
            clonedData.sentAt = sentAtProperty.toDateString()

            return {
                props: {
                    emailData: clonedData
                } // will be passed to the page component as props
            }
        }
    }
}

export default EmailViewer;