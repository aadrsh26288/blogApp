import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDcavsSGqc79JAdwqkKaZUFDeOjvNHcaTU",
  authDomain: "blogapp-1df4a.firebaseapp.com",
  projectId: "blogapp-1df4a",
  storageBucket: "blogapp-1df4a.appspot.com",
  messagingSenderId: "704116008940",
  appId: "1:704116008940:web:2e0deafc5c04f2174702c9",
  measurementId: "G-05EE315WZV"
};


export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db =getFirestore(app)