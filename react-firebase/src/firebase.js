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

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database, ref, push, onValue, child, remove, update, get }; //EXPORT HERE
