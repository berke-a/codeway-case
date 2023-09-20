// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA59aDjYSI8VA4CuCwirvWgtuahaDC5zZk",
  authDomain: "codeway-task-33a0d.firebaseapp.com",
  projectId: "codeway-task-33a0d",
  storageBucket: "codeway-task-33a0d.appspot.com",
  messagingSenderId: "771845127594",
  appId: "1:771845127594:web:12e67d561cddede3aeffd3",
  measurementId: "G-59PS8TNRK1"
};

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };