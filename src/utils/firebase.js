import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDFcwADq7wdpCoav5AkZaTqssUK-2w4fw",
  authDomain: "ice-cream-343de.firebaseapp.com",
  projectId: "ice-cream-343de",
  storageBucket: "ice-cream-343de.appspot.com",
  messagingSenderId: "400638459582",
  appId: "1:400638459582:web:c3fe0b277304c35d8068ef",
  measurementId: "G-4RGJ9KBF6H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, app, fireDB };
