import styles from './MobileTemplate.module.scss'

type MobileTemplateProps = {
  children: any,
  header?: JSX.Element,
}

export default function MobileTemplate({ children, header }: MobileTemplateProps) {
  return (
    <div className={styles.mobile_template_wrapper}>
      {header && (
        <header className={styles.mobile_template_header}>
          {header}
        </header>
      )}
      {children}
    </div>
  )
}