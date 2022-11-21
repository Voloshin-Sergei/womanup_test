import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

import styles from './PopUp.module.less';

/**
 * @typedef PropType
 * @property {function} handleShow
 */

/**
 * @param {PropType} props
 * @returns {React.ReactElement}
 */
export const PopUp = (props) => {
  const { handleShow } = props;

  /**
   * State for title input value, initial state is empty string
   */
  const [title, setTitle] = useState('');
  /**
   * State for description input value, initial state is empty string
   */
  const [description, setDescription] = useState('');
  /**
   * State for deadline date input value, initial state is empty string
   */
  const [deadline, setDeadline] = useState('');

  /**
   * Set condition for input elements
   * @function handleInput
   * @param {events} e
   */
  const handleInput = (e) => {
    switch (e.target.id) {
      case 'title':
        setTitle(e.target.value);
        break;

      case 'description':
        setDescription(e.target.value);
        break;
      case 'date':
        setDeadline(e.target.value);
        break;

      default:
        break;
    }
  };

  /**
   * Add new task to db. Close PopUp
   * @async
   * @function addTask
   * @param {string} title task title
   * @param {string} description task description
   * @param {string} deadline task deadline date
   */
  const addTask = async (title, description, deadline) => {
    if (title === '' || description === '' || deadline === '') {
      return;
    }

    await addDoc(collection(db, 'todos'), {
      title,
      description,
      deadline,
      completed: false,
    });

    handleShow();
  };

  return (
    <div className={styles.layer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.type}>add task</span>
          <span onClick={handleShow} className={styles.close}>
            &#10005;
          </span>
        </div>
        <form className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="title" id="title">
              Title
            </label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              type="text"
              id="title"
              placeholder="Enter task title"
              required
              value={title}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="description" id="description">
              Description
            </label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              type="text"
              id="description"
              placeholder="Enter task description"
              required
              value={description}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="date" id="date">
              Date end
            </label>
            <input
              onChange={(e) => handleInput(e)}
              className={styles.input}
              type="date"
              id="date"
              required
              value={deadline}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="file" id="file">
              Upload file
            </label>
            <input className={`${styles.input} ${styles.file}`} type="file" id="file" />
          </div>
        </form>
        <div className={styles.buttons}>
          <button
            onClick={() => addTask(title, description, deadline)}
            className={`${styles.btn} ${styles.btn__confirm}`}
          >
            Add
          </button>
          <button onClick={handleShow} className={`${styles.btn} ${styles.btn__cancel}`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
