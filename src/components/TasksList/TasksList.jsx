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
   * Id edit task, initial condition - empty string
   */
  const [editTaskId, setEditTaskId] = useState('');

  /**
   * Set condition for PopUp component. Close or open popUp.
   * Set condition for task id state to empty string
   * @function handleShow
   */
  const handleShow = () => {
    setShow(!isShow);
    setEditTaskId('');
  };

  /**
   * Get id for edit task and set this
   * @function handleShow
   * @param {string} id
   */
  const getId = (id) => {
    setEditTaskId(id);
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
            getId={getId}
          />
        ))}
        <button onClick={handleShow} className={styles.addBtn}>
          <span>&#10011;</span>
        </button>
      </div>
      {isShow && <PopUp editTaskId={editTaskId} handleShow={handleShow} />}
    </>
  );
};
