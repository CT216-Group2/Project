// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU7h4iyhzyxB79MAjC2K3mJ5IBDRTAMCk",
    authDomain: "softwareeng-project-1-25211.firebaseapp.com",
    projectId: "softwareeng-project-1-25211",
    storageBucket: "softwareeng-project-1-25211.appspot.com",
    messagingSenderId: "672958232472",
    appId: "1:672958232472:web:07aafda73b8efc59cfdded",
    measurementId: "G-G9XQL56S82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;