import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsG4ws9geMOZDiIQ9lLwlDopGUYwBgBSc",
  authDomain: "my-truck-bcd1d.firebaseapp.com",
  projectId: "my-truck-bcd1d",
  storageBucket: "my-truck-bcd1d.firebasestorage.app",
  messagingSenderId: "177310607889",
  appId: "1:177310607889:web:921f764b641ad8c727dfb0",
  measurementId: "G-NWCYY9PE91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
