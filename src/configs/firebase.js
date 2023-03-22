import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAefCQxR4cBsoe9n5O9Yp34qbGmrBkstyQ",
    authDomain: "olx-clone-16d51.firebaseapp.com",
    projectId: "olx-clone-16d51",
    storageBucket: "olx-clone-16d51.appspot.com",
    messagingSenderId: "946333827779",
    appId: "1:946333827779:web:7cbbcd548eaa042ed79876",
    measurementId: "G-4TMD0SDRYZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;