
import firebase from 'firebase/app';
import 'firebase/firestore';  // Si vas a usar Firestore
import 'firebase/auth';        // Si vas a usar Firebase Auth


const firebaseConfig = {
  apiKey: "AIzaSyCXg6Dx-r--AYXDHgkVt07-UKK56AIOTEk",
  authDomain: "team-rocket-prod2.firebaseapp.com",
  databaseURL: "https://team-rocket-prod2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "team-rocket-prod2",
  storageBucket: "team-rocket-prod2.appspot.com",
  messagingSenderId: "977220676190",
  appId: "1:977220676190:web:dc63c4123cb200809f22cf",
  measurementId: "G-6DE7MDL1GF"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // Si ya está inicializada, usa esa instancia.
  }
  
  export default firebase;