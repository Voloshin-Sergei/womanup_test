// @ts-check

import { Task } from '../Task/Task';

import styles from './TasksList.module.less';

/**
 * @typedef PropType
 * @property {Array<{id: string, title: string, description: string, deadline: string, completed: boolean}>} tasks
 */

/** @param {PropType} props */
export const TasksList = (props) => {
  const { tasks } = props;

  return (
    <div className={styles.container}>
      {tasks.map(({ id, title, description, deadline, completed }) => (
        <Task
          key={id}
          id={id}
          title={title}
          description={description}
          deadline={deadline}
          completed={completed}
        />
      ))}
      <button className={styles.addBtn}>
        <span>&#10011;</span>
      </button>
    </div>
  );
};
