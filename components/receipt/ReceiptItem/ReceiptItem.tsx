import Input from 'components/common/Input'
import styles from './ReceiptItem.module.scss'

export default function ReceiptItem({ receiptItems, onChange }) {
  return (receiptItems.length !== 0 && (
    <div className={styles.wrapper}>
      {receiptItems.map((item, index) => (
        <div
          key={`receipt_item_${index}`}
          className={styles.item_wrapper}
        >
          <div className={styles.item_wrapper_label}>
            <span>
              {`영수증 내역 ${index + 1}`}
            </span>
          </div>
          <div>
            <Input.InputWrapper marginBottom>
              <Input
                placeholder="항목명"
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                  borderRadius: '2px',
                }}
                value={item.name}
                onChange={(e) => onChange(e, 'name', item.id)}
              />
            </Input.InputWrapper>
            <Input.InputWrapper>
              <Input
                placeholder="금액"
                styleProps={{
                  backgroundColor: 'white',
                  border: '1px solid #0f4c81',
                  borderRadius: '2px',
                }}
                value={item.prices}
                onChange={(e) => onChange(e, 'prices', item.id)}
              />
            </Input.InputWrapper>
          </div>
        </div>
      ))}
    </div>)
  )
}