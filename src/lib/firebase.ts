// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS3IgTtPbeJYsSG4qo-em7dLx9N5U0RGE",
  authDomain: "image-to-prompt-d3acc.firebaseapp.com",
  projectId: "image-to-prompt-d3acc",
  storageBucket: "image-to-prompt-d3acc.firebasestorage.app",
  messagingSenderId: "43661154935",
  appId: "1:43661154935:web:57197a9debfa80766c8472",
  measurementId: "G-0ES490Q4WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;