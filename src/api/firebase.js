// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfKnzyL1m1WAchZsJouMgvUFyHJMlfJT0",
    authDomain: "accommodateme-f4887.firebaseapp.com",
    projectId: "accommodateme-f4887",
    storageBucket: "accommodateme-f4887.appspot.com",
    messagingSenderId: "209447308173",
    appId: "1:209447308173:web:f977c7cacb12b909784bc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
export default app;
