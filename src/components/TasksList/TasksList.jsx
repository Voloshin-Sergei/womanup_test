import { Task } from '../Task/Task';

import styles from './TasksList.module.less';

export const TasksList = () => {
  return (
    <div className={styles.container}>
      <Task />
      <Task />
      <Task />
      <Task />
      <button className={styles.addBtn}>
        <span>&#10011;</span>
      </button>
    </div>
  );
};
