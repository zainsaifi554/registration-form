import { signInWithEmailAndPassword,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'

// import { auth,db } from '../../firebase.js'

import { auth } from '../../firebase.js'

let User = localStorage.getItem("userID");
if (User) {
  console.log("no");
  window.location.replace("../../index.html")
  
}




let displayName = localStorage.getItem("displayName")

console.log("name",displayName)
onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    console.log('User is signed in.', uid);
    window.location="../../index.html"
  } else {
    console.log('User is not signed in')
  }
});
console.log(auth,"abc")
let email =document.getElementById("email")
let password = document.getElementById("password")


let signIn =()=>{
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    localStorage.setItem("userID", user.uid);
    let userName = localStorage.setItem("displayName", user.displayName);
    // window.location="../../index.html"
   
  })
    .catch((error) => {
     const errorCode = error.code
      const errorMessage = error.message;
      console.log(errorMessage,errorCode);
    });

 }
 document.getElementById("submit").addEventListener("click",signIn)


