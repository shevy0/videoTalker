import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrG4b6YHzhTJpmnConkUXaSKzCUvQ6lC4",
  authDomain: "videotalker-2c3b8.firebaseapp.com",
  projectId: "videotalker-2c3b8",
  storageBucket: "videotalker-2c3b8.appspot.com",
  messagingSenderId: "27298978856",
  appId: "1:27298978856:web:740082eca855337612291d"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true, merge: true });

export { 
  firebase 
};