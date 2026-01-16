
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc6FyFIO4q_868XaIqddMnQCHVVtXc-hg",
  authDomain: "basket-7c6f3.firebaseapp.com",
  projectId: "basket-7c6f3",
  storageBucket: "basket-7c6f3.firebasestorage.app",
  messagingSenderId: "179738319659",
  appId: "1:179738319659:web:c2d77117834a31bb42436e",
  measurementId: "G-K3BMWFKNY9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
