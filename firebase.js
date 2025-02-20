
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js'

  import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js'

  import { getAuth,signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'
  
  const firebaseConfig = {
    apiKey: "AIzaSyD185O4GFVsKZJcO2CDxZUgt49qHY-TTPY",
    authDomain: "register-user-55ec0.firebaseapp.com",
    projectId: "register-user-55ec0",
    storageBucket: "register-user-55ec0.firebasestorage.app",
    messagingSenderId: "768958565612",
    appId: "1:768958565612:web:5be0a03e657aedcf7029c9",
    measurementId: "G-ZBSEEX987L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)



const provider = new GoogleAuthProvider();

export{db,auth,provider,signInWithPopup,GoogleAuthProvider}