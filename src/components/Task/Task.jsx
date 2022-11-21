// @ts-check

import { doc, deleteDoc } from 'firebase/firestore';
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
 */

/** @param {PropType} props */
export const Task = (props) => {
  const { id, title, description, deadline, completed } = props;

  /**
   * Delete task from db
   * @async
   * @function handleDelete
   * @param {string} id task id
   */
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.checker}>
        <input className={styles.checkbox} type="checkbox" id="checkbox" name="checkbox" />
        <label
          className={`${styles.label} ${completed ? styles.checked : ''}`}
          htmlFor="checkbox"
        />
      </div>
      <div className={styles.info}>
        <span className={`${styles.date} ${isExpired(deadline) ? styles.date__expired : ''}`}>
          {reversDate(deadline)}
        </span>

        <div className={styles.wrapper}>
          <p className={`${styles.title} ${completed ? styles.done : ''}`}>{title}</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.file}>
            <span className={styles.icon}>&#9729;</span>
            <span className={styles.name}>velit at commodi.</span>
          </div>
        </div>
      </div>
      <span onClick={() => handleDelete(id)} className={styles.delete}>
        &#10006;
      </span>
    </div>
  );
};
