import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSZBWSUzqxZ1J4GuFKe1aTHPkVyaBTNT4",
    authDomain: "nexct-housing.firebaseapp.com",
    projectId: "nexct-housing",
    storageBucket: "nexct-housing.appspot.com",
    messagingSenderId: "702981314534",
    appId: "1:702981314534:web:16b24e0393b40377936827"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()