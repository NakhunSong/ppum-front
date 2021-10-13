import Portal from 'components/base/Portal'
import ScreenMask from "components/base/ScreenMask"
import styles from './Modal.module.scss'
import Button from '../Button'
import { useClickoutside } from 'hooks/useClickoutside'

export default function Modal({
  children,
  visible,
  onCancel,
}) {
  const { ref } = useClickoutside(onCancel)
  return (visible
    ? (
      <Portal>
        <ScreenMask>
          <div className={styles.wrapper}>
            <div 
              ref={ref}
              className={styles.content}
            >
              <div>
                <div>
                  {children}
                </div>
                <div className={styles.button_group}>
                  <Button>
                    확인
                  </Button>
                  <Button onClick={onCancel}>
                    취소
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScreenMask>
      </Portal>
    ) : null
  ) 
}