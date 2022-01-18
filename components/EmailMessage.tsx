import Link from "next/link";
import React, { FC, useEffect } from "react";





interface EmailMessage{
    sender: string;
    id: string;
    subject: string;
    message: string;    
    
}
const EmailMessage:FC<EmailMessage> = ({sender, subject, message, id}) => {
   

   
    return (
        <Link href={"/emails/" + id}>
        <div className='relative w-full cursor-pointer transition hover:drop-shadow-xl bg-gray-100 p-4 border-t-[1px]'>
            <div className='flex'>
                
                {/* Sender Name */}
                <div className='basis-40'>{sender}</div>
    
                {/* Subject */}
                <div className='font-semibold'>{subject}
                    <span> - </span>
                </div>
    
                {/* Content splitified */}
                <div className='flex-1 text-gray-500 whitespace-nowrap max-w-full overflow-hidden'> {message}</div>
            </div>
        </div>
        </Link>
    )
}
export default EmailMessage;  