"use client"
import { useContext, createContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { Auth, auth, db } from '../firebase'; 
import { setUserId } from 'firebase/analytics';
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

const Authcontext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      const rewards=[]
      if (!userDoc.exists()) {
        // New user, create Firestore document
        const userData = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          reviewPoints: 500,
          redeemedrewards:[]
        };

        await setDoc(doc(db, "users", result.user.uid), userData);
      }

      console.log("User signed in successfully:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <Authcontext.Provider value={{ user, googleSignIn, logOut }}>{children}</Authcontext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(Authcontext);
};
