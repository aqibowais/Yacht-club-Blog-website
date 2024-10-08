import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyDZKdNbGO_yzKgbulvkVpX4fEZkhIuL-DM",
  authDomain: "yacht-club-ac507.firebaseapp.com",
  projectId: "yacht-club-ac507",
  storageBucket: "yacht-club-ac507.appspot.com",
  messagingSenderId: "634974582483",
  appId: "1:634974582483:web:c3dc1f694362f2dff5c626",
  measurementId: "G-JR5RR1SEFN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
export { db, doc, getDoc, getDocs, addDoc, collection, getFirestore };
export { storage, getDownloadURL, ref, uploadBytes, uploadBytesResumable };
