// lib/firebase.ts
import firebase from "firebase/compat/app";  // Use compat version
import "firebase/compat/auth";  // Import auth

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the auth instance and GoogleAuthProvider
export const firebaseAuth = firebase.auth();  // The auth instance
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();  // Google Auth Provider
