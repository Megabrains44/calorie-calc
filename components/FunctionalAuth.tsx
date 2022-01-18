import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAuth } from "../atoms/userAuth";
import { db } from "../firebase";
import User from "../types/user";

const FunctionalAuth:FC = () => {
    const [userInfo, setUserInfo] = useRecoilState(userAuth)
    async function addUserToDatabase(user:User) {
        const newUser:User = {
          name: user.name,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture
        }
        
        const userDocRef = doc(db, "users", user.id.toString())
        const userCheck = await getDoc(userDocRef);
        if (userCheck.exists()) return;
        return await setDoc(userDocRef, newUser)
      }
    useEffect(() => {
        const auth = getAuth();
        getRedirectResult(auth).then(result => {
          if (result){
    
            const { user } = result;
            const newUser = {
              profilePicture: user.photoURL as string,
              name: user.displayName as string,
              email: user.email as string,
              id: user.uid as string,
            }
            console.log('new user')
            addUserToDatabase(newUser)
          }
        })
    
    
        auth.onAuthStateChanged((user) => {
          if (user){
            console.log('auth changed')
            setUserInfo({
              profilePicture: user.photoURL as string,
              name: user.displayName as string,
              email: user.email as string,
              id: user.uid as string
            })
          } else {
            
            
            signInWithRedirect(auth, new GoogleAuthProvider())
            
    
          }
        })
    }, [])
    return (
        <>
        </>
    )
}

export default FunctionalAuth;