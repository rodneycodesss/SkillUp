// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4t1pQqOsHoMyvvBRe1NNy7nGA6mbGBRs",
  authDomain: "skillup256.firebaseapp.com",
  projectId: "skillup256",
  storageBucket: "skillup256.appspot.com",
  messagingSenderId: "570348580624",
  appId: "1:570348580624:web:a82122b310b48f810d3f95",
  measurementId: "G-DVFJX9R9PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only run analytics if supported (avoids crash on server)
let analytics;
isSupported().then((supported) => {
  if (supported) analytics = getAnalytics(app);
});

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
