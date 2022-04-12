import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAFgzKWZUuQfWPaxKVnMGrpuua5aw0pVU0',
  authDomain: 'docs-copy-e7a7a.firebaseapp.com',
  projectId: 'docs-copy-e7a7a',
  storageBucket: 'docs-copy-e7a7a.appspot.com',
  messagingSenderId: '1079107281781',
  appId: '1:1079107281781:web:69850d2ac89bfc9cd5293c',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore(app)

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
