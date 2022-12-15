import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAz4I_eLQ7uIUDne72fmPQUNIl6nI7nrJk",
    authDomain: "todoist-8e499.firebaseapp.com",
    databaseURL: "https://todoist-8e499-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todoist-8e499",
    storageBucket: "todoist-8e499.appspot.com",
    messagingSenderId: "772688819336",
    appId: "1:772688819336:web:2298307f829f70b3881b3d"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}