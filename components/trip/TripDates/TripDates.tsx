import classNames from 'classnames'
import * as React from 'react'
import styles from './TripDates.module.scss'

type TripDateProps = {
  data: string,
  selected: boolean,
}

const TripDates = React.memo(React.forwardRef((props: TripDateProps, ref: any) => {
  const { data, selected } = props
  return (
    <div
      className={classNames(styles.item_wrapper, {
        [styles.selected]: selected,
      })}
      ref={ref}
    >
      <div className={styles.item}>
        {data}
      </div>
    </div>
  )
}))

export default TripDates