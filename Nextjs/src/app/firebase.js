// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeS7flVSqNPekUUUFaYVfcURmPOxF0yXA",
    authDomain: "rreward-a82b8.firebaseapp.com",
    projectId: "rreward-a82b8",
    storageBucket: "rreward-a82b8.appspot.com",
    messagingSenderId: "655366098459",
    appId: "1:655366098459:web:9fe81e07191dca405b72be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database=getDatabase(app);
export {database};
const db = getFirestore(app);
export {db};

export const storage = getStorage(app); 