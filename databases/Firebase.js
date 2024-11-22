import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyCYh4g1BnyWzMuvbtbC5Xs_6lnV9Bv76e4",
  authDomain: "gamesquadconnect.firebaseapp.com",
  projectId: "gamesquadconnect",
  storageBucket: "gamesquadconnect.appspot.com",
  messagingSenderId: "741240661644",
  appId: "1:741240661644:web:79a1f4ad7e024504c6fda9",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Para autenticação com persistência usando AsyncStorage
const auth = getAuth(app);

// Configurar persistência
auth.setPersistence(AsyncStorage)
  .then(() => {
    // Agora o estado de autenticação será persistido
    console.log('Persistência configurada!');
  })
  .catch((error) => {
    console.error('Erro ao configurar persistência:', error);
  });

const db = getFirestore(app);

export { auth, db };
