// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT1nWeLiQHYx2lqRwkGeQ216lotGogB5g",
  authDomain: "novo-laboratorio-clinico.firebaseapp.com",
  projectId: "novo-laboratorio-clinico",
  storageBucket: "novo-laboratorio-clinico.appspot.com",
  messagingSenderId: "862077888786",
  appId: "1:862077888786:web:dacdef546b0fdba7bfebcb",
  measurementId: "G-M3MNPYPF3X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export default app;