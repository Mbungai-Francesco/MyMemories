// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5QdA585hvMmBm4jCzCeoqdnXYykXNGOY",
  authDomain: "mymemory-7b9cf.firebaseapp.com",
  projectId: "mymemory-7b9cf",
  storageBucket: "mymemory-7b9cf.firebasestorage.app",
  messagingSenderId: "426842426601",
  appId: "1:426842426601:web:dba6682a31191c91283478",
  measurementId: "G-7JN9EQV1LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);