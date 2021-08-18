import Scroller, { useScrollBox } from 'components/trip/Scroller'
import styles from './ReceiptSelector.module.scss'

type ReceiptSelectorProps = {
  receipts: Array<any>,
}

export default function ReceiptSelector({ receipts }: ReceiptSelectorProps) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScrollBox()

  return (
    <Scroller
      targetRef={$target}
      scrollerRef={$scroller}
    >
      {receipts.map((receipt, index) => {
        const selected = selectedIndex === index
        const { name, prices } = receipt
        return (
          <Scroller.item
            key={`receipt_item_${index}`}
            ref={(el) => $items.current[index] = el}
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
          </Scroller.item>
        )
      })}
    </Scroller>
  )
}