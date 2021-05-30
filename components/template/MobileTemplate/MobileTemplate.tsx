import styles from './MobileTemplate.module.scss';

export default function MobileTemplate({ children }) {
  return (
    <div className={styles.mobile_template_wrapper}>
      {children}
    </div>
  );
}