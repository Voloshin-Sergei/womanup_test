// @ts-check

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { getStorage, ref, listAll } from 'firebase/storage';
import { db } from './firebase';

import { Header } from './components/Header/Header';
import { TasksList } from './components/TasksList/TasksList';

import styles from './App.module.less';

/**
 * @returns {React.ReactElement}
 */
function App() {
  /**
   * App state, tasks list, initial state is empty array
   */
  const [todos, setTodos] = useState([]);

  /**
   * App state, files list, initial state is empty array
   */
  const [files, setFiles] = useState([]);
  console.log(files);
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

    const storage = getStorage();
    const listRef = ref(storage, 'todos');
    const fileArray = [];

    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          fileArray.push(item.name);
        });
        setFiles(fileArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TasksList tasks={todos} files={files} />
      </main>
    </div>
  );
}

export default App;
