import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASSE_API_KEY,
  authDomain: "my-universal-clipboard.firebaseapp.com",
  projectId: "my-universal-clipboard",
  storageBucket: "my-universal-clipboard.firebasestorage.app",
  messagingSenderId: "1000441271211",
  appId: "1:1000441271211:web:04d23748fa759fafbab8ee",
  measurementId: "G-26580F8H4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getFirebaseConfig() {
    return db
}