import classNames from 'classnames';
import { useCallback } from 'react';
import styles from './MainButton.module.scss';

interface MainButtonProps {
  children: string;
  disabled?: boolean;
  onClick: Function;
}

export default function MainButton({
  children,
  disabled,
  onClick,
}: MainButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);
  return (
    <button
      className={classNames(styles.wrapper, {
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}