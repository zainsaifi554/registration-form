import { signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { auth,db } from "./firebase.js";


let User = localStorage.getItem("userID");
let displayName = localStorage.getItem("displayName")
if (!User) {
  console.log("no");
  window.location.replace("./form/signup/signUp.html")
  
}

let userID = localStorage.getItem("userID")




let addPostBtn = document.getElementById('add-post');
let allPostDiv = document.getElementById('allPosts');
let name = document.getElementById('displayName');

 let fullName = name.innerHTML = displayName
// console.log(fullName);

// let localuser = localStorage.getItem("displayName");

console.log('local.', displayName);
 
let createPost = async (text) => {
  try {
    
    const docRef = await addDoc(collection(db, "posts"), {
      postText: text,
      uid: userID,
      displayName: displayName
    });
    console.log("Document written with ID: ", docRef.id);
    console.log("Post Added");
    document.getElementById('post-inp').value = '';
    
    getAllPosts();
  } catch (error) {
    console.error(error);
  }
};

let getAllPosts = async (post) => {
  try {
    
    allPostDiv.innerHTML = ''; 
    
    const posts = await getDocs(collection(db, "posts"));
    posts.forEach((post) => {
      // let theAllPosts = document.createElement("div");
      // console.log(post.data());
      // console.log(theAllPosts);
      
      allPostDiv.innerHTML += `<div class="post-div"><h1 width:300px;>${post.data().postText} <h1></h1> </h1>
      </div>`;
      
    });
  } catch (error) {
    console.error(error);
  }
};

addPostBtn.addEventListener("click", () => {
  let postInp = document.getElementById('post-inp').value;
  

  createPost(postInp);
  
});


getAllPosts();








onAuthStateChanged(auth, (user) => {
   if (user) {
     
     const data = user;
     console.log('User is signed in.', user.uid);
     console.log('User is signed in.', user.displayName);
     let userName = localStorage.setItem("displayName", user.displayName);
    

     console.log(data)
     
   } else {
     console.log('User is not signed in')
   }
 });

let logout = ()=>{
    signOut(auth).then(() => {
   console.log('Signout')
   localStorage.removeItem("userID");
   localStorage.removeItem("displayName");

   window.location="./form/signup/signUp.html"
    }).catch((error) => {
  console.log(error)
    });
  }
  
  
  let logoutbtn = document.getElementById('logout');
 logoutbtn.addEventListener('click', logout)

