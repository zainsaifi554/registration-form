import { signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
  addDoc,
  collection,
  getDocs,

  
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { auth,db } from "./firebase.js";


let User = localStorage.getItem("userID");
let postName = localStorage.getItem("displayName")
if (!User) {
  console.log("no");
  window.location.replace("./form/signup/signUp.html")
  
}

let userID = localStorage.getItem("userID")




let addPostBtn = document.getElementById('add-post');
let allPostDiv = document.getElementById('allPosts');
let name = document.getElementById('displayName');

 let fullName = name.innerHTML = postName+' '+'is logged in'
 name.style.backgroundColor = "black";
 name.style.padding = "10px";


console.log('local.', fullName);
 
let createPost = async (text) => {
  try {
    
    const docRef = await addDoc(collection(db, "posts"), {
      postText: text,
      uid: userID,
      displayName: postName
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
    
      
      allPostDiv.innerHTML += `<div class="post-div"><span>${"Create post by"+"  " +"("+post.data().displayName +")" }</span><br><br><h1 width:300px;>${post.data().postText}  </h1>
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
  logoutbtn.innerHTML ='logout'+' '+ postName
 logoutbtn.addEventListener('click', logout)

