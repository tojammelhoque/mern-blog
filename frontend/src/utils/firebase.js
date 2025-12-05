
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-66bff.firebaseapp.com",
  projectId: "mern-blog-66bff",
  storageBucket: "mern-blog-66bff.firebasestorage.app",
  messagingSenderId: "768724444948",
  appId: "1:768724444948:web:743ba7952745bb21998401",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
