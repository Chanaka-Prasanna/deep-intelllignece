// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd3QPgQn8gxWsLwiCsBK6CZ182Oplh80I",
  authDomain: "deep-intelligence.firebaseapp.com",
  projectId: "deep-intelligence",
  storageBucket: "deep-intelligence.firebasestorage.app",
  messagingSenderId: "365168466207",
  appId: "1:365168466207:web:ba31a421f942efc90eb82a",
  measurementId: "G-2SL8XMLLPS",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
