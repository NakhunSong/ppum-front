import Input from 'components/common/Input'
import styles from './ReceiptItem.module.scss'

export default function ReceiptItem({ receiptItems }) {
  return (receiptItems.length !== 0 && (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_label}>
        <span>
          영수증 내역
        </span>
      </div>
      {receiptItems.map((item, index) => (
        <div className={styles.item_wrapper}>
          <div className={styles.item_wrapper_label}>
            <span>
              {`내역 ${index + 1}`}
            </span>
          </div>
          <div>
            <Input.InputWrapper marginBottom>
              <Input
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                  borderRadius: '4px',
                }}
                value="" onChange={() => {}}
              />
            </Input.InputWrapper>
            <Input.InputWrapper>
              <Input
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                }}
                value="" onChange={() => {}}
              />
            </Input.InputWrapper>
          </div>
        </div>
      ))}
    </div>)
  )
}