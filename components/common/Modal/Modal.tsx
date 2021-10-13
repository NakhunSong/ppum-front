import Portal from 'components/base/Portal'
import ScreenMask from "components/base/ScreenMask"
import styles from './Modal.module.scss'
import Button from '../Button'
import { useClickoutside } from 'hooks/useClickoutside'
import { MouseEventHandler } from 'react'

type ModalProp = {
  children: React.ReactElement | string,
  visible: boolean,
  onCancel: MouseEventHandler,
  onOk: MouseEventHandler,
}

export default function Modal({
  children,
  visible,
  onCancel,
  onOk,
}: ModalProp) {
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
                  <Button onClick={onOk}>
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