

import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

import { db } from "../firebase.js";

let userID = localStorage.getItem("userID");
let myPostDiv = document.querySelector("#myPosts");




let updatePost = async (post_id, newText) => {
    try {
        if (newText === "") {
            console.log("No input provided for update.");
            alert("Post text cannot be empty."); 
            return;
        }

        await updateDoc(doc(db, "posts", post_id), {
            postText: newText,
        });
        console.log("Update done");
        getMyPosts(); 
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

let deletePost = async (post_id) => {
    try {
        await deleteDoc(doc(db, "posts", post_id));
        console.log(`Post ${post_id} deleted`);
        getMyPosts();
    } catch (error) {
        console.error(`Error deleting post ${post_id}:`, error);
    }
};

let getMyPosts = async () => {
    try {
        const q = query(collection(db, "posts"), where("uid", "==", userID));
        const querySnapshot = await getDocs(q);
        myPostDiv.innerHTML = '';

        querySnapshot.forEach((post) => {
            console.log(`Post ID: ${post.id}, Post Data:`, post.data());
            const postElement = document.createElement('div');
            postElement.id = "postText";
         
            postElement.innerHTML = `
                <span>${post.data().postText}</span><br/>
                <div id="edit_div-${post.id}" class="edit_div" style="display: none;">
                    <input type="text" id="edit-${post.id}" value="${post.data().postText}">
                    <button id='complete-${post.id}' class='complete-btn'></button>
                </div>
                
                <button id='update-${post.id}' class='update-btn'></button>
                <button id='delete-${post.id}' class='delete-btn'></button>
                <hr/>
            `;

            myPostDiv.appendChild(postElement);

            const editButton = document.getElementById(`update-${post.id}`);
            const deleteButton = document.getElementById(`delete-${post.id}`);
            const saveButton = document.getElementById(`complete-${post.id}`);
            const editDiv = document.getElementById(`edit_div-${post.id}`);
            const editInput = document.getElementById(`edit-${post.id}`);

            editButton.addEventListener("click", () => {
                editDiv.style.display = "flex";
                deleteButton.style.pointerEvents = "none";
                // editButton.style.pointerEvents = "none";
            });

            saveButton.addEventListener("click", () => {
                
                const newText = editInput.value;
                updatePost(post.id, newText);
                editDiv.style.display = "none";
            });
            editDiv.style.display = "none";
            deleteButton.addEventListener("click", () => {
                deletePost(post.id);
            });
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

getMyPosts();
































































// import {
//     addDoc,
//     collection,
//     getDocs,
//     query,
//     where,
//     updateDoc,
//     doc,
//     deleteDoc,
// } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// import { db } from "../firebase.js";

// let userID = localStorage.getItem("userID");
// let myPostDiv = document.querySelector("#myPosts");

// let updatePost = async (post_id) => {
//     console.log(`Updating post with ID: ${post_id}`);
//     // let editInp = document.querySelector("#edit");
    
//     try {
//         // let alt = prompt("Enter new post text:");
//         let editInp= document.getElementById('edit').value
       
//         if (editInp) {
//             await updateDoc(doc(db, "posts", post_id), {
                
//                 postText: editInp,
//             });
//             console.log("Update done");
//             // editInp.style.dispaly = "flex";
//             getMyPosts();
//         } else {
//             console.log("No input provided for update.");
//         }
//     } catch (error) {
//         console.error("Error updating post:", error);
//     }
// };

// let deletePost = async (post_id) => {
//     try {
//         await deleteDoc(doc(db, "posts", post_id));
//         console.log(`Post ${post_id} deleted`);
//         getMyPosts(); 
//     } catch (error) {
//         console.error(`Error deleting post ${post_id}:`, error);
//     }
// };

// let getMyPosts = async () => {
//     try {
//         const q = query(collection(db, "posts"), where("uid", "==", userID));
//         const querySnapshot = await getDocs(q);
//         myPostDiv.innerHTML = '';
//         querySnapshot.forEach((post) => {
//             console.log(`Post ID: ${post.id}, Post Data:`, post.data());
//             myPostDiv.innerHTML += `
//             <div id="postText" style="background: green;  border-radius:1em;
//              padding:10px;">
//              ${post.data().postText}<br>
//              <div id="edit_div" class="edit_div">
//               <input type="text" id="edit" >
//                <button class="${post.id}" id='complete'>save</button>
//               </div>
//             <button id='update-${post.id}' class='update-btn'>edit</button>
//             <button id='delete-${post.id}' class='delete-btn'>delete</button>
           
//             </div>
//             <br>`;
//         });
//         // editInp.style.dispaly = "none";


//         querySnapshot.forEach((post) => {
//             document.getElementById(`update-${post.id}`).addEventListener("click", () => {
//                 // console.log(`Edit button clicked for post ID: ${post.id}`);
//           let editDiv= document.querySelector("#edit_div")
//           let editInp= document.querySelector("#complete")
//           editInp.addEventListener("click", () =>{

//            let theId= editInp.classList[0]
//             updatePost(theId)
//           })
          
//           editDiv.style.display="flex"
//             console.log(editDiv,editInp)
//                 // updatePost(post.id); 
//                 // let editInput = document.getElementById(`edit`);
//                 // editInput.style.display = "block"; 
//             });
//            document.getElementById(`delete-${post.id}`).addEventListener("click", () => {
//                 console.log(`delete button clicked for post ID: ${post.id}`);
//                deletePost(post.id);
//            });
//         });
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//     }
// };

// getMyPosts();


