import { Header } from './components/Header/Header';
import { TasksList } from './components/TasksList/TasksList';

import styles from './App.module.less';

function App() {
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
