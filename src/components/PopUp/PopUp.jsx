import styles from './PopUp.module.less';

export const PopUp = () => {
  return (
    <div className={styles.layer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.type}>add task</span>
          <span className={styles.close}>&#10005;</span>
        </div>
        <form className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="title" id="title">
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="description" id="description">
              Description
            </label>
            <input
              className={styles.input}
              type="text"
              id="description"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="date" id="date">
              Date end
            </label>
            <input className={styles.input} type="date" id="date" required />
          </div>
          <div className={styles.group}>
            <label className={styles.label} htmlFor="file" id="file">
              Upload file
            </label>
            <input className={`${styles.input} ${styles.file}`} type="file" id="file" />
          </div>
        </form>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.btn__confirm}`}>Add</button>
          <button className={`${styles.btn} ${styles.btn__cancel}`}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
