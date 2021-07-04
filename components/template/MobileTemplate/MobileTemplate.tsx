import styles from './MobileTemplate.module.scss';

export default function MobileTemplate({ children, header }) {
  return (
    <div className={styles.mobile_template_wrapper}>
      <header className={styles.mobile_template_header}>
        {header}
      </header>
      {children}
    </div>
  );
}