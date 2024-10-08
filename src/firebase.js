// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import authentication

const firebaseConfig = {
  apiKey: "AIzaSyDURP2On3sw2BbHG-Obpi2VFUt_3i_B5xw",
  authDomain: "lawproject2-a5dc3.firebaseapp.com",
  projectId: "lawproject2-a5dc3",
  storageBucket: "lawproject2-a5dc3.appspot.com",
  messagingSenderId: "496353516544",
  appId: "1:496353516544:web:6a5d60d6b82291ef3acce5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize authentication

export { db, auth };
