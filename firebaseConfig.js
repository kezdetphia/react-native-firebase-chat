// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import { isOmittedExpression } from "typescript";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore,collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu3se3nFWUCI0YKBkRu-kLSeTaWmHiMUY",
  authDomain: "firechat-cff88.firebaseapp.com",
  projectId: "firechat-cff88",
  storageBucket: "firechat-cff88.appspot.com",
  messagingSenderId: "499405312968",
  appId: "1:499405312968:web:87fab1477d330c4553a6fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')