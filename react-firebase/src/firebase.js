// Modern Firebase v9+ modular syntax
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  child,
  remove,
  update,
  get,
} from "firebase/database"; //IMPORT HERE

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZHVo32UySd-tmvuGMN9qFTGdiqlfsZ9A",
  authDomain: "react-firebase-contact-39d20.firebaseapp.com",
  projectId: "react-firebase-contact-39d20",
  storageBucket: "react-firebase-contact-39d20.firebasestorage.app",
  messagingSenderId: "226960434725",
  appId: "1:226960434725:web:236ff853c2b29e4b4341cc",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database, ref, push, onValue, child, remove, update, get }; //EXPORT HERE
