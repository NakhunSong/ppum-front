import { TextButton } from 'components/common/Button/TextButton'
import Input from 'components/common/Input'
import { ReceiptItemFormType } from '../ReceiptForm/ReceiptForm'
import styles from './ReceiptItem.module.scss'

type ReceiptItemProps = {
  receiptItems: ReceiptItemFormType[],
  receiptItemForm: ReceiptItemFormType,
  onChange: Function,
  onClick: Function,
}

export default function ReceiptItem({
  receiptItems,
  receiptItemForm,
  onChange,
  onClick,
}: ReceiptItemProps) {

  return (receiptItems?.length !== 0 && (
    <div className={styles.wrapper}>
      {receiptItems.map((item, index) => {
        const { isEdit } = item
        return (
        <div
          key={`receipt_item_${index}`}
          className={styles.item_wrapper}
        >
          <div className={styles.item_wrapper_label}>
            <span>
              {`내역 ${index + 1}`}
            </span>
            <span className={styles.modify_button}>
              <TextButton
                onClick={(e) => onClick(e, item.id, isEdit)}
              >
                {!isEdit ? '수정' : '취소'}
              </TextButton>
            </span>
          </div>
          <div>
            <Input.InputWrapper marginBottom>
              {isEdit ? (
                <Input
                  type="text"
                  placeholder="항목명"
                  styleProps={{
                    backgroundColor: 'white',
                    border: '1px solid #0f4c81',
                    borderRadius: '2px',
                  }}
                  value={receiptItemForm.name}
                  onChange={onChange('name')}
                />
              ) : (
                <span>
                  상품명: {item.name}
                </span>
              )}
            </Input.InputWrapper>
            <Input.InputWrapper>
              {isEdit ? (
                <Input
                  type="number"
                  placeholder="금액"
                  styleProps={{
                    backgroundColor: 'white',
                    border: '1px solid #0f4c81',
                    borderRadius: '2px',
                  }}
                  value={receiptItemForm.prices}
                  onChange={onChange('prices')}
                />
              ) : (
                <span>
                  금액: {item.prices}
                </span>
              )}
            </Input.InputWrapper>
          </div>
        </div>
      )})}
    </div>)
  )
}