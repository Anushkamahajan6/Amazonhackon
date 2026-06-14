import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjcTHadhkP6EPLyUj7fKfwggVqoOCowzA",
    authDomain: "second-life-commerce.firebaseapp.com",
    projectId: "second-life-commerce",
    storageBucket: "second-life-commerce.firebasestorage.app",
    messagingSenderId: "615356862259",
    appId: "1:615356862259:web:45acdf7267fc8f28d0b846",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();