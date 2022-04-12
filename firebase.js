// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAFgzKWZUuQfWPaxKVnMGrpuua5aw0pVU0',
  authDomain: 'docs-copy-e7a7a.firebaseapp.com',
  projectId: 'docs-copy-e7a7a',
  storageBucket: 'docs-copy-e7a7a.appspot.com',
  messagingSenderId: '1079107281781',
  appId: '1:1079107281781:web:69850d2ac89bfc9cd5293c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }
