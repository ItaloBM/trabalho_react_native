import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYh4g1BnyWzMuvbtbC5Xs_6lnV9Bv76e4",
  authDomain: "gamesquadconnect.firebaseapp.com",
  projectId: "gamesquadconnect",
  storageBucket: "gamesquadconnect.appspot.com",
  messagingSenderId: "741240661644",
  appId: "1:741240661644:web:79a1f4ad7e024504c6fda9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
