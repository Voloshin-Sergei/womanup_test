import { useEffect } from 'react';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

import { Header } from './components/Header/Header';
import { TasksList } from './components/TasksList/TasksList';
import { PopUp } from './components/PopUp/PopUp';

import styles from './App.module.less';

function App() {
  useEffect(() => {
    const q = query(collection(db, 'todos'));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(todosArray);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TasksList />
      </main>
    </div>
  );
}

export default App;
