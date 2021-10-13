import Scroller, { useScroller } from 'components/trip/Scroller'
import { useEffect } from 'react'
import styles from './ReceiptSelector.module.scss'

type ReceiptSelectorProps = {
  receipts: Array<any>,
  handleSelectReceipt: Function,
}

export default function ReceiptSelector({
  receipts,
  handleSelectReceipt,
}: ReceiptSelectorProps) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScroller()

  useEffect(() => {
    const selectedReceipt = receipts?.[selectedIndex] ?? null
    handleSelectReceipt(selectedReceipt)
  }, [receipts, selectedIndex])

  return (
    <Scroller
      targetRef={$target}
      scrollerRef={$scroller}
    >
      {receipts.map((receipt, index) => {
        const selected = selectedIndex === index
        const { name, prices } = receipt
        const ref = (el) => $items.current[index] = el
        return (
          <Scroller.Item
            key={`receipt_item_${index}`}
            ref={ref}
            selected={selected}
            gap="64px"
          >
            <div className={styles.item_inner_wrapper}>
              <div className={styles.name}>
                {name}
              </div>
              <div className={styles.price}>
                {prices}
              </div>
            </div>
          </Scroller.Item>
        )
      })}
    </Scroller>
  )
}