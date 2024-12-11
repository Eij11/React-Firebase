# Packages
- install react like usual
- `npm i react-router-dom`
- `npm i firebase`
- `npm i react-toastify` 
    

# Firebase Project
- create a firebase project
- once in Project Overview - click 'Web'
- Register App: react-firebase-contact 
    
    Then a config code will show. Copy it in your `firebase.js`

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZHVo32UySd-tmvuGMN9qFTGdiqlfsZ9A",
  authDomain: "react-firebase-contact-39d20.firebaseapp.com",
  projectId: "react-firebase-contact-39d20",
  storageBucket: "react-firebase-contact-39d20.firebasestorage.app",
  messagingSenderId: "226960434725",
  appId: "1:226960434725:web:236ff853c2b29e4b4341cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

- Then Continue to Console
- Create a realtime db


# App.jsx
- check App.jsx
-  see routing and toastify