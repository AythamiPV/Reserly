// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6JEJQXkk6xVi7NMTsw4KwVVjI8bnre1E",
    authDomain: "reserly-24515.firebaseapp.com",
    projectId: "reserly-24515",
    storageBucket: "reserly-24515.firebasestorage.app",
    messagingSenderId: "660321730194",
    appId: "1:660321730194:web:f2734fde0c49d5aab6704b",
    measurementId: "G-0J51SHBLPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);