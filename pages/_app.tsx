import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import User from '../types/user'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { getAuth, getRedirectResult } from 'firebase/auth'
import { db } from '../firebase'
import FunctionalAuth from '../components/FunctionalAuth'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
        <FunctionalAuth />
        <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
