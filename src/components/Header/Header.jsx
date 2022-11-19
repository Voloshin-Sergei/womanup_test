import styles from './Header.module.less';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>ToDo</h1>
      </div>
      <div className={styles.infoContainer}></div>
    </header>
  );
};
