
import classNames from 'classnames';
import styles from './SwitchButton.module.scss';

export default function SwitchButton({
  leftText,
  rightText,
  selected,
  onClick,
}) {
  return (
    <div className={styles.wrapper}>
      <button
        className={classNames(styles.switch_button, {
          [styles.selected]: selected === 'start',
        })}
        onClick={() => onClick('start')}
      >
        {leftText}
      </button>
      <button
        className={classNames(styles.switch_button, {
          [styles.selected]: selected === 'end',
        })}
        onClick={() => onClick('end')}
      >
        {rightText}
      </button>
    </div>
  )
}