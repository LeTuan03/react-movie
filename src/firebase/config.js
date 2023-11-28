// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJf6eKXYxDETX-7Hr1Y_Z_H3QJB7iKlHE",
  authDomain: "moonnetfix.firebaseapp.com",
  projectId: "moonnetfix",
  storageBucket: "moonnetfix.appspot.com",
  messagingSenderId: "871753060728",
  appId: "1:871753060728:web:a208c4763bdbebba027888",
  measurementId: "G-QS8FN438SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db , auth }
