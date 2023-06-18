// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { apiKey,appId } from '@env';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "gifted-chat-app-2bf90.firebaseapp.com",
  projectId: "gifted-chat-app-2bf90",
  storageBucket: "gifted-chat-app-2bf90.appspot.com",
  messagingSenderId: "719162473291",
  appId: appId,
  measurementId: "G-WT4B3J68FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// const analytics = getAnalytics(app);

export { db,auth };
