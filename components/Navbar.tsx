import { getAuth } from "firebase/auth";
import Image from "next/image";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms/userAuth";

// <reference>


const Navbar:FC = () => {
    
    const userInfo = useRecoilValue(userAuth)
    const [isDropped, setIsDropped] = useState(false)
    
    return (
        <nav className="px-4 py-4 flex items-center justify-between">
            <div className="flex gap-8 items-center">
                <h1 className=" font-roboto text-4xl text-gray-600">J-mail</h1>
                <input 
                    placeholder="Search Inbox" 
                    className="h-12 px-5 focus:bg-white focus:shadow-xl focus:outline-none grow-1 md:w-[400px]  bg-gray-200 rounded" 
                    type="search" 
                    name="gmail-search" 
                    id="gmail-search-input" 
                />
                

            </div>
            <div className="relative">
                <Image onClick={() => setIsDropped(!isDropped)} width={50} height={50} className="rounded-full" src={userInfo.profilePicture || "https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg"} />
                {isDropped && <div className="bg-white w-40 absolute right-0 z-10 shadow">
                    <div className="cursor-pointer p-3 " onClick={() => getAuth().signOut()}>↳ Log Out</div>
                </div>}
            </div>
        </nav>
    )
}



export default Navbar;