import styles from './Logo.module.scss';

console.log('styles: ', styles);

export default function Logo() {
  return (
    <div className={styles.container}>
      <div className={styles.image_wrapper}>
        <img
          className={styles.logo_image}
          src="images/logo.svg"
          alt=""
        />
      </div>
    </div>
  )
}