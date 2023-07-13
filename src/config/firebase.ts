import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS0MNL2OzahmrlhHRD9TveCiRSJyC3ywM",
  authDomain: "cbs-project-cff6c.firebaseapp.com",
  projectId: "cbs-project-cff6c",
  storageBucket: "cbs-project-cff6c.appspot.com",
  messagingSenderId: "29412904184",
  appId: "1:29412904184:web:da1387c519aa9c53e83f0d",
  measurementId: "G-STSBHKR203",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
