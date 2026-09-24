
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBZxa5B-rCl4IBOs6xGK-5miKxJbReypac",
  authDomain: "interviewiq-dfaf2.firebaseapp.com",
  projectId: "interviewiq-dfaf2",
  storageBucket: "interviewiq-dfaf2.firebasestorage.app",
  messagingSenderId: "605408902505",
  appId: "1:605408902505:web:37628226e1ce87dbdcd1f8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}