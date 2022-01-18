// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnc9huieKahngc6A7H9HtcB1X9b7-ZBjY",
  authDomain: "jmail-feed.firebaseapp.com",
  projectId: "jmail-feed",
  storageBucket: "jmail-feed.appspot.com",
  messagingSenderId: "411630963194",
  appId: "1:411630963194:web:1c4e2dcf8d8db3bf287c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export {db,app}