import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import React, { FC, useEffect, useState } from 'react'
import EmailMessage from '../../components/EmailMessage'
import EmailCompose from '../../components/EmailCompose'
import { useRecoilState, useRecoilValue } from 'recoil'
import { emailModal } from '../../atoms/emailModal'
import { emailsState } from '../../atoms/emailsState'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, QueryDocumentSnapshot, setDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'

import {browserLocalPersistence, getAuth, getRedirectResult, GoogleAuthProvider, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithRedirect} from "firebase/auth"
import Email from '../../types/email'
import { userAuth } from '../../atoms/userAuth'
import User from '../../types/user'
const Emails: NextPage = () => {
  const isModal = useRecoilValue(emailModal);
  const [emails, setEmails] = useRecoilState(emailsState);
  const [userInfo, setUserInfo] = useRecoilState(userAuth)
  
  
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) return;
    const q = query(collection(db,'emails'), where("receiver", "==", userInfo))
    const q2 = collection(db, 'emails')
    return onSnapshot(q, (snapshot) => {
      const emails:Email[] = [];
      snapshot.forEach(doc => {
       emails.push({...doc.data(), id: doc.id} as Email)
      })
      console.log(emails)
      setEmails(emails)
    })
  }, [userInfo])


  return (
    <div>
      <Navbar />
      <main className='flex'>

      <Sidebar selected='inbox'/>
      <div className='flex-1 overflow-x-hidden'>
        {[...emails]
        .sort((a,b) => b.sentAt.toDate().getTime() - a.sentAt.toDate().getTime())
        // .filter(email => email.receiver.id === userInfo.id)
        .map(email => <EmailMessage key={email.id} id={email.id} subject={email.subject} message={email.message}  sender={email.sender.name} />)}
      </div>
      </main>
      {isModal && <EmailCompose />}
    </div>
  )
}

export default Emails;
