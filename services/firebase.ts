
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD64OQhXSHNHxZGARDbSCm4lWf3_LsjXEY",
  authDomain: "milkshakeicecream-abab9.firebaseapp.com",
  projectId: "milkshakeicecream-abab9",
  storageBucket: "milkshakeicecream-abab9.firebasestorage.app",
  messagingSenderId: "166989200544",
  appId: "1:166989200544:web:11e15062f2c5bd03e65dc5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};