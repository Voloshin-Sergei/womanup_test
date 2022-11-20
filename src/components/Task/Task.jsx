import styles from './Task.module.less';

export const Task = () => {
  return (
    <div className={styles.container}>
      <div className={styles.checker}>
        <input className={styles.checkbox} type="checkbox" id="checkbox" name="checkbox" />
        <label className={`${styles.label} `} htmlFor="checkbox" />
      </div>
      <div className={styles.info}>
        <span className={styles.date}>19 11 2022</span>

        <div className={styles.wrapper}>
          <p className={styles.title}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci alias nihil minus,
            animi impedit optio eligendi sint, ipsam hic nobis veritatis. Eveniet modi soluta rerum
            in consequatur, velit at commodi.
          </p>
          <div className={styles.file}>
            <span className={styles.icon}>&#9729;</span>
            <span className={styles.name}>velit at commodi.</span>
          </div>
        </div>
      </div>
      <span className={styles.delete}>&#10006;</span>
    </div>
  );
};
