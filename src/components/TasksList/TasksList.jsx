// @ts-check

import React, { useState } from 'react';

import { Task } from '../Task/Task';
import { PopUp } from '../PopUp/PopUp';

import styles from './TasksList.module.less';

/**
 * @typedef PropType
 * @property {Array<{id: string, title: string, description: string, deadline: string, completed: boolean}>} tasks
 */

/**
 * @param {PropType} props
 * @returns {React.ReactElement}
 */
export const TasksList = (props) => {
  const { tasks } = props;

  /**
   * Condition of PopUp component, initial condition - false
   */
  const [isShow, setShow] = useState(false);

  /**
   * Set condition for PopUp component. Close or open popUp
   * @function handleShow
   */
  const handleShow = () => {
    setShow(!isShow);
  };

  return (
    <>
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
        <button onClick={handleShow} className={styles.addBtn}>
          <span>&#10011;</span>
        </button>
      </div>
      {isShow && <PopUp handleShow={handleShow} />}
    </>
  );
};
