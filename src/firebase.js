import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCxaJzdat5zOS3NNl-96nvX8tCm4WjFU-g',
  authDomain: 'todo-83917.firebaseapp.com',
  projectId: 'todo-83917',
  storageBucket: 'todo-83917.appspot.com',
  messagingSenderId: '254953883405',
  appId: '1:254953883405:web:282b0e35d2f073ad2c1244',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
