import Input from 'components/common/Input'
import styles from './ReceiptInfo.module.scss'

export default function ReceiptInfo({ receipt }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_label}>
        <span>
          영수증
        </span>
      </div>
      <div className={styles.info_wrapper}>
        <Input.InputWrapper marginBottom>
          <Input
            styleProps={{
              backgroundColor: 'white',
              border: '1px solid #0f4c81',
              borderRadius: '2px',
            }}
            placeholder="장소명"
            value={receipt.name}
            onChange={() => {}}
          />
        </Input.InputWrapper>
        <Input.InputWrapper>
          <Input
            styleProps={{
              backgroundColor: 'white',
              border: '1px solid #0f4c81',
              borderRadius: '2px',
            }}
            placeholder="총 금액"
            value={receipt.prices}
            onChange={() => {}}
          />
        </Input.InputWrapper>
      </div>
    </div>
  )
}