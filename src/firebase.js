// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmw119OpACtGXjh4qc7a0g4lAId27b5kM",
  authDomain: "voting-dapp-5dd6e.firebaseapp.com",
  projectId: "voting-dapp-5dd6e",
  storageBucket: "voting-dapp-5dd6e.appspot.com",
  messagingSenderId: "267899670758",
  appId: "1:267899670758:web:93e7dc166370e35190ab27",
  databaseURL:"https://voting-dapp-5dd6e-default-rtdb.firebaseio.com",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;