// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi0DKcZ5DSzgnAxtMEZOQvRFhJQDydrKU",
  authDomain: "cobalt-matrix-308909.firebaseapp.com",
  databaseURL: "https://cobalt-matrix-308909-default-rtdb.firebaseio.com",
  projectId: "cobalt-matrix-308909",
  storageBucket: "cobalt-matrix-308909.firebasestorage.app",
  messagingSenderId: "22542524964",
  appId: "1:22542524964:web:9e29c128be4c3ad81aeeb1",
  measurementId: "G-6JL7YX1B38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);