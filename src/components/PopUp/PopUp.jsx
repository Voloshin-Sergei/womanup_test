import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import uniqid from 'uniqid';

import styles from './PopUp.module.less';

/**
 * @typedef PropType
 * @property {function} handleShow
 * @property {string} editTaskId
 */

/**
 * @param {PropType} props
 * @returns {React.ReactElement}
 */
export const PopUp = (props) => {
  const { handleShow, editTaskId = '' } = props;

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
   * State for file, initial state is null
   */
  const [fileUpload, setFileUpload] = useState(null);

  /**
   * State for uploaded files, initial state is empty array
   */
  const [uploaded, setUploaded] = useState([]);

  /**
   * State for prefix, initial state is empty string
   */
  const [prefix, setPrefix] = useState('');

  /**
   * Fetch task data from db and set state for inputs values
   * @async
   * @function getTask
   * @param {string} id task id
   */
  const getTask = (id) => {
    if (id) {
      const unsub = onSnapshot(doc(db, 'todos', id), (doc) => {
        setTitle(doc.data().title);
        setDescription(doc.data().description);
        setDeadline(doc.data().deadline);
        setUploaded(doc.data().uploaded);
      });
    }
    return;
  };

  /**
   * Used uniqid library, set unique string to uploaded file
   * @function getPrefix
   */
  const getPrefix = () => {
    const prefix = uniqid();
    setPrefix(prefix);
  };

  /**
   * Callback for getTask function
   */
  useEffect(() => {
    getTask(editTaskId);
    getPrefix();
  }, [editTaskId]);

  useEffect(() => {});

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
   * Set file to file state
   * @function handleFileInput
   * @param {events} e event
   */
  const handleFileInput = (e) => {
    setFileUpload(e.target.files[0]);
    setUploaded([...uploaded, `${prefix}_${e.target.files[0].name}`]);
  };

  /**
   * Upload file to storage
   * @function uploadFile
   */
  const uploadFile = () => {
    if (fileUpload == null) {
      return;
    }

    const fileRef = ref(storage, `todos/${prefix}_${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload);

    if (editTaskId) {
      updateDoc(doc(db, 'todos', editTaskId), {
        uploaded: [...uploaded],
      });
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
      uploaded,
    });

    uploadFile();
    handleShow();
  };

  /**
   * Edit task in db. Close PopUp
   * @async
   * @function editTask
   */
  const editTask = async () => {
    if (title === '' || description === '' || deadline === '') {
      return;
    }

    await updateDoc(doc(db, 'todos', editTaskId), { title, description, deadline });
    uploadFile();
    handleShow();
  };

  return (
    <div className={styles.layer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.type}>{editTaskId ? 'edit task' : 'add task'}</span>
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
            <input
              onChange={(e) => handleFileInput(e)}
              className={`${styles.input} ${styles.file}`}
              type="file"
              id="file"
            />
          </div>
        </form>
        <div className={styles.buttons}>
          {editTaskId ? (
            <button onClick={editTask} className={`${styles.btn} ${styles.btn__confirm}`}>
              Done
            </button>
          ) : (
            <button
              onClick={() => addTask(title, description, deadline)}
              className={`${styles.btn} ${styles.btn__confirm}`}
            >
              Add
            </button>
          )}

          <button onClick={handleShow} className={`${styles.btn} ${styles.btn__cancel}`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
