// @ts-check

import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { db } from '../../firebase';

import reversDate from '../../helpers/reversDate';
import isExpired from '../../helpers/isExpired';

import styles from './Task.module.less';

/**
 * @typedef PropType
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} deadline
 * @property {boolean} completed
 * @property {function} getId
 * @property {Array<string>} uploaded
 */

/** @param {PropType} props */
export const Task = (props) => {
  const { id, title, description, deadline, completed, uploaded, getId } = props;

  /**
   * Delete task from db
   * @async
   * @function handleDelete
   * @param {string} id task id
   */
  const handleTaskDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  /**
   * Task completion toggler
   * @async
   * @function toggleComplete
   * @param {string} id task id
   */
  const toggleComplete = async (id) => {
    await updateDoc(doc(db, 'todos', id), { completed: !completed });
  };

  const handleFileDelete = (fileName) => {
    // const desertRef = ref(storage, 'todos/');
    // deleteObject(desertRef);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checker}>
        <input className={styles.checkbox} type="checkbox" id="checkbox" name="checkbox" />
        <label
          onClick={() => toggleComplete(id)}
          className={`${styles.label} ${completed ? styles.checked : ''}`}
          htmlFor="checkbox"
        />
      </div>
      <div className={styles.info}>
        <span className={`${styles.date} ${isExpired(deadline) ? styles.date__expired : ''}`}>
          {reversDate(deadline)}
        </span>

        <div className={styles.wrapper}>
          <p
            onClick={() => getId(id)}
            className={`${styles.title} ${completed ? styles.done : ''}`}
          >
            {title}
          </p>
          <p className={styles.description}>{description}</p>
          {uploaded && (
            <ul>
              {uploaded.map((file) => (
                <li key={file} className={styles.file}>
                  <span className={styles.icon}>&#9729;</span>
                  <span className={styles.name}>{file.split('_')[1]}</span>
                  <button
                    onClick={() => handleFileDelete(file)}
                    className={`${styles.delete} ${styles.delete__file}`}
                  >
                    &#10006;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={() => handleTaskDelete(id)}
        className={`${styles.delete} ${styles.delete__task}`}
      >
        &#10006;
      </button>
    </div>
  );
};
