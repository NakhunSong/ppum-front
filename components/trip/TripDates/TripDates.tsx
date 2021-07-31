import * as React from 'react'
import styles from './TripDates.module.scss'

type TripDateProps = {
  data: string,
}

const TripDates = React.memo(React.forwardRef<any, any>((props: TripDateProps, ref: any) => {
  const { data } = props
  return (
    <div
      className={styles.item_wrapper}
      ref={ref}
    >
      <div className={styles.item}>
        {data}
      </div>
    </div>
  )
}))

export default TripDates