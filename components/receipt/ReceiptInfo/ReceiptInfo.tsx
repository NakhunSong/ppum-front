import classNames from 'classnames'
import Input from 'components/common/Input'
import { useCallback, useMemo } from 'react'
import { Mode, ReceiptType } from 'types/receipt.type'
import styles from './ReceiptInfo.module.scss'

type ReceiptInfoType = {
  mode: Mode,
  receipt: ReceiptType,
  onChange: Function,
  handleChangeMode: (mode: Mode) => void,
}

export default function ReceiptInfo({
  mode,
  receipt,
  onChange,
  handleChangeMode,
}: ReceiptInfoType) {
  const isRelevantReceipt = useMemo(() => {
    return mode === 'add_receipt' || mode === 'modify_receipt'
  }, [mode])
  const handleClickName = useCallback((e) => {
    e.stopPropagation()
    handleChangeMode('modify_receipt')
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_label}>
        <span>
          영수증
        </span>
      </div>
      <div className={styles.info_wrapper}>
        <Input.InputWrapper marginBottom>
          {isRelevantReceipt
            ? (
              <Input
                type="text"
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                  borderRadius: '2px',
                }}
                placeholder="장소명"
                value={receipt.name}
                onChange={(e) => onChange(e, 'name')}
              />
            ) : (
              <div
                className={classNames(
                  styles.info_text,
                  styles.info_text_name,
                )}
                onClick={handleClickName}
              >
                장소: {receipt.name}
              </div>
            )}
        </Input.InputWrapper>
        <Input.InputWrapper>
          <div className={styles.info_text} onClick={() => console.log('hih')}>
            총 금액: {receipt.prices}
          </div>
        </Input.InputWrapper>
      </div>
    </div>
  )
}