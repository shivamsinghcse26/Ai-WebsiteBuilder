// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-website-builder-f8af2.firebaseapp.com",
  projectId: "ai-website-builder-f8af2",
  storageBucket: "ai-website-builder-f8af2.appspot.com",
  messagingSenderId: "774438834279",
  appId: "1:774438834279:web:f2b85ea5cdc71dc4b284c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}