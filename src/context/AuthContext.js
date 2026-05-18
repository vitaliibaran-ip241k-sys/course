import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role: userData.role || "user",

          createdAt: currentUser.metadata.creationTime
        });
      } else {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role: "user",
        });
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return unsubscribe;
}, []);

  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};