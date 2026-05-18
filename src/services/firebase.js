// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD96sN6MxUDhHCHNwD0sHP5k1T0ckVoTqc",
  authDomain: "ec-reading.firebaseapp.com",
  projectId: "ec-reading",
  appId: "1:150942702:web:d5792df8b51cdadf7614ff",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);