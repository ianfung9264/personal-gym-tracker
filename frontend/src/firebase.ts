// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxlpyl8l7aYGtoxwbN_UWGE-yH2uSu_6g",
  authDomain: "fir-auth-84d5b.firebaseapp.com",
  projectId: "fir-auth-84d5b",
  storageBucket: "fir-auth-84d5b.appspot.com",
  messagingSenderId: "604288596005",
  appId: "1:604288596005:web:f87c966f6fbc62e18d67cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app
