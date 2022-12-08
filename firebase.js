import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  initializeFirestore,
  setDoc,
  where,
} from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth'
// import { getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrG4b6YHzhTJpmnConkUXaSKzCUvQ6lC4",
  authDomain: "videotalker-2c3b8.firebaseapp.com",
  projectId: "videotalker-2c3b8",
  storageBucket: "videotalker-2c3b8.appspot.com",
  messagingSenderId: "27298978856",
  appId: "1:27298978856:web:740082eca855337612291d"
};
  
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})

export {
  db,
  where,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  addDoc,
  setDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
}