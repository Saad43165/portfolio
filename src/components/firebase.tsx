// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_LkZTHBHkTmPhjp50ex1gR_UTyf172i4",
  authDomain: "portfolio-4cd62.firebaseapp.com",
  projectId: "portfolio-4cd62",
  storageBucket: "portfolio-4cd62.firebasestorage.app",
  messagingSenderId: "966235641839",
  appId: "1:966235641839:web:727ea3e5cbfb905df6081a",
  measurementId: "G-9T0YJE43F3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
