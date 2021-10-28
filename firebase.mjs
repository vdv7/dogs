// our firebase file


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";



// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyC3-ROihbmjf1dUpeDTkcYxHNVxbxPRNng",
authDomain: "doggos-ad8fa.firebaseapp.com",
projectId: "doggos-ad8fa",
storageBucket: "doggos-ad8fa.appspot.com",
messagingSenderId: "108194192062",
appId: "1:108194192062:web:fa30087f3f0409b446dcef"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


//////////////////////////////////////////////
// exposed functionality for auth
window.isLoggedIn = function(){
    return auth.currentUser !== null;
}

window.login = function(email,password){
    return signInWithEmailAndPassword(auth, email, password);
}

window.signup = function(email,password){
    return createUserWithEmailAndPassword(auth, email, password);
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function( f ){
    onAuthStateChanged(auth, user => {
        f( user );
    });
}


//////////////////////////////////////////////
// exposed functionality for db
window.addComment = function(comment){
    return addDoc(collection(db, "comments"), {comment} );
}

window.forEachComment = function( f ){
    
}
