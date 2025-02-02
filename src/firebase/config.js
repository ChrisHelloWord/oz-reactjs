import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCkvZBJAu-zLMVVErV2yZWg2TpgDGEKmyc",
    authDomain: "oz-reactjs.firebaseapp.com",
    projectId: "oz-reactjs",
    storageBucket: "oz-reactjs.firebasestorage.app",
    messagingSenderId: "797270351046",
    appId: "1:797270351046:web:409ffc4d2c811206ff8bc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
