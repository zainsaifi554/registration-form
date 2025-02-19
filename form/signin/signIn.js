
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

import { auth } from '../../firebase.js';

// Check if a user is already logged in
const User = localStorage.getItem("userID");
if (User) {
  console.log("User is already logged in.");
  window.location.replace("../../index.html");
}

//Check the user status
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      console.log('User is signed in.', uid);
      window.location = "../../index.html";
  } else {
      console.log('User is not signed in');
  }
});

const email = document.getElementById("email");
const password = document.getElementById("password");
const errorDiv = document.getElementById("error"); // Add an element in your HTML to display errors

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log("User Signed In", user);
          localStorage.setItem("userID", user.uid);
          localStorage.setItem("displayName", user.displayName);
          window.location = "../../index.html";
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Sign-in Error:", errorCode, errorMessage);
          displayError(errorMessage);
      });
};

// Function to display error messages
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}
document.getElementById("submit").addEventListener("click", signIn);