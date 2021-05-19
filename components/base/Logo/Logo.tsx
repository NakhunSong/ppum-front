import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image__wrapper}>
        <img
          className={styles.image}
          src="/images/logo_moving.gif"
        />
      </div>
    </div>
  );
}