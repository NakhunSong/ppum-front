import Input from 'components/common/Input'
import { useMemo } from 'react'
import { Mode, ReceiptType } from 'types/receipt.type'
import styles from './ReceiptInfo.module.scss'

type ReceiptInfoType = {
  mode: Mode,
  receipt: ReceiptType,
  onChange: Function,
}

export default function ReceiptInfo({
  mode,
  receipt,
  onChange,
}: ReceiptInfoType) {
  const isRelevantReceipt = useMemo(() => {
    return mode === 'create_receipt' || mode === 'modify_receipt'
  }, [mode])

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
              <div className={styles.info_text}>
                장소: {receipt.name}
              </div>
            )}
        </Input.InputWrapper>
        <Input.InputWrapper>
          {isRelevantReceipt
            ? (
              <Input
                type="number"
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                  borderRadius: '2px',
                }}
                placeholder="총 금액"
                value={receipt.prices}
                onChange={(e) => onChange(e, 'prices')}
              />
            ) : (
              <div className={styles.info_text}>
                총 금액: {receipt.prices}
              </div>
            )}
        </Input.InputWrapper>
      </div>
    </div>
  )
}