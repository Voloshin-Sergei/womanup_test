// @ts-check

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';

import { Header } from './components/Header/Header';
import { TasksList } from './components/TasksList/TasksList';
import { PopUp } from './components/PopUp/PopUp';

import styles from './App.module.less';

function App() {
  /**
   * App state, initial state is empty array
   */
  const [todos, setTodos] = useState([]);

  /**
   * Fetch todos collection and set state
   */
  useEffect(() => {
    const q = query(collection(db, 'todos'));

    onSnapshot(q, (querySnapshot) => {
      let todosArray = [];

      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArray);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TasksList tasks={todos} />
      </main>
    </div>
  );
}

export default App;
