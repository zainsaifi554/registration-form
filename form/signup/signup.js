
import { createUserWithEmailAndPassword,onAuthStateChanged,  updateProfile  } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
import { collection, addDoc, getDoc, updateDoc, setDoc,doc } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'
import { auth,db, provider,signInWithPopup,GoogleAuthProvider} from '../../firebase.js'

let User = localStorage.getItem("userID");
// if (User) {
//   console.log("no");
//   window.location.replace("../../index.html")
  
// }

onAuthStateChanged(auth,  (user) => {
    if (user) {
      
      const uid = user.uid;
      let userdata = localStorage.setItem("userID", uid);
      // localStorage.setItem("displayName", (user.displayName))
      
      console.log('User is signed in.', uid);
      window.location="../../index.html"
    } else {
      console.log('User is not signed in')
    }
  });
  
  
  
  
  let signUp = async()=>{
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let userName = document.getElementById("name").value
    let phone = document.getElementById("phone").value
    
    
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed up 
      const user = userCredential.user;
      
      updateProfile(auth.currentUser, {
        displayName: userName,
        phoneNumber: phone
      }).then(() => {
        // localStorage.setItem("displayName", userName)
        // Profile updated!
        console.log("Profile updated")
       
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error)
        // ...
      });
    
      console.log(user)
      const docRef = await addDoc(collection(db, "users"), {
        displayName:userName,
        email:email,
        password: password,
        phoneNumber:phone,
       
        
      });
 
      
     
  console.log("Document written with ID: ", docRef.id);
    // window.location="../../index.html"
  })
  .catch((error) => {
   
    const errorMessage = error.message;
    console.log(errorMessage)
  
  });

}
// await setDoc(doc(db, `users`, uid), {
//   displayName: userName,
//   email: email,
//   userID : uid,
// });

// await updateDoc(docRef, {
//   "displayName":userName,
 
// });







let signUpBtn = document.getElementById("add")

signUpBtn.addEventListener("click",signUp)

let signUpWithGoogle =()=>{


    signInWithPopup(auth, provider)
   .then(async(result) => {
     
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     
     const user = result.user;

     
     const docRef = await addDoc(collection(db, "users"), {
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
    })
    window.location.replace("../../index.html")
      console.log('success',docRef.id)
    
   }).catch((error) => {
     
     const errorCode = error.code;
     const errorMessage = error.message;
     const email = error.customData.email;
     const credential = GoogleAuthProvider.credentialFromError(error);
    
   });
 
 }
 let signUpGoogle = document.getElementById('google')
 signUpGoogle.addEventListener('click',signUpWithGoogle)