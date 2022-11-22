import styles from './Header.module.less';

/**
 * @returns {React.ReactElement}
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>ToDo</h1>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.divider}></div>
      </div>
    </header>
  );
};

export default Header;
