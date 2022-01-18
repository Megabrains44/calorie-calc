import Link from "next/link";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { emailModal } from "../atoms/emailModal";


const ComposeButton:FC = () => {
    const [isModal, setIsModal] = useRecoilState(emailModal);

    return (
        <button onClick={() => setIsModal(true)}  className="transition shadow-xl px-6 py-4 rounded-full hover:shadow-2xl hover:bg-gray-200">+ Compose </button>
    )
}

interface TabItemProps{
    label: string;
    selected: boolean;
    link: string;
}

const TabItem:FC<TabItemProps> = ({label, selected = false, link}) => {
    return (
        <Link href={link}>
            <div className={`${!selected ? "hover:bg-gray-200" : ""} cursor-pointer w-11/12 ${selected ? "bg-red-100" : ""} py-1 px-6 rounded-r-full`}>
                <div className={`${selected ? "text-red-900 font-bold " : "text-black"}`}>{label}</div>
                <div></div>
            </div>
        </Link>
    )
}


interface SidebarProps{
    selected: string;
}

const Sidebar:FC<SidebarProps> = ({selected = "inbox"}) => {

    return (
        <div className="w-64 px-2">
            <ComposeButton />
            {/* Tabs  */}
            <div className="mt-4">

                {/* Inbox */}
                {/* Sent */}
                <TabItem label="Inbox" selected={selected === "inbox"} link="/emails"/>
                <TabItem label="Sent" selected={selected === "sent"} link="/sent" />
            </div>
            
        </div>
    )
}

export default Sidebar;