import classNames from "classnames"
// import { getDateArray, useCalendar } from "hooks/useCalendar"
// import { useCallback, useEffect, useState } from "react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import styles from './Calendar.module.scss'
import { combineDateInfo } from "lib/helpers/trip/calendar"

interface CalendarItemProps {
  children: JSX.Element,
  context: string,
  selected?: string,
  start?: boolean,
  end?: boolean,
  between?: boolean,
  onClick: React.MouseEventHandler<HTMLDivElement>,
}

const dayIndicators = ['일', '월', '화', '수', '목', '금', '토']


function CalendarItem({
  children,
  context,
  selected,
  start,
  end,
  between,
  onClick,
}: CalendarItemProps) {
  return (
    <div className={classNames(styles.calendar_item_wrapper, {
      [styles.calendar_item_start]: start,
      [styles.calendar_item_end]: end,
      [styles.calendar_item_between]: between,
    })}
      onClick={onClick}
    >
      <div className={classNames(styles.calendar_item, {
        [styles.gray]: context !== 'current',
        [styles.selected]: selected,
        [styles.start]: start,
        [styles.end]: end,
      })}>
        {children}
      </div>
    </div>
  )
}

function ArrowButton({ direction, onClick }) {
  const icon = direction === 'up' ? faAngleUp : faAngleDown
  return (
    <FontAwesomeIcon
      className={styles.arrow_button}
      icon={icon}
      onClick={onClick}
    />
  )
}

export default function Calendar({
  calendar,
  dateArray,
  onClickDate,
  onClickMonth,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar_main}>
        <div className={styles.calendar_main_head}>
          <div className={styles.current_month}>
            <span className={styles.current_month_number}>
              {calendar.currentMonth}
            </span>
            <span className={styles.current_month_text}>
              월
            </span>
          </div>
          <div className={styles.calendar_button_wrapper}>
            <ArrowButton
              direction="up"
              onClick={() => onClickMonth('PREV')}
            />
            <ArrowButton
              direction="down"
              onClick={() => onClickMonth('NEXT')}
            />
          </div>
        </div>
        <div className={styles.calendar_main_body}>
          {dateArray.map((item, index) => {
            const { date: startD, month: startM, year: startY } = calendar?.start ?? {}
            const { date: endD, month: endM, year: endY } = calendar?.end ?? {}
            const { date: itemD, month: itemM, year: itemY } = item ?? {}
            const isStart = itemD === startD && itemM === startM && itemY === startY
            const isEnd = itemD === endD && itemM === endM && itemY === endY
            const startDate = +combineDateInfo(startY, startM, startD) 
            const endDate = +combineDateInfo(endY, endM, endD) 
            const betweenDate = +combineDateInfo(itemY, itemM, itemD) 
            const isBetween = startDate < betweenDate && betweenDate < endDate
            return (
              <CalendarItem
                key={`date_${index}`}
                context={item.context}
                start={isStart}
                end={isEnd}
                between={isBetween}
                onClick={() => onClickDate(item)}
              >
                {item.date}
              </CalendarItem>
            )
          })}
        </div>
      </div>
      <div className={styles.calendar}>
      </div>
    </div>
  );
}

type CalendarHeaderProps = {
  year?: any,
}

function CalendarHeader({ year }: CalendarHeaderProps) {
  return (
    <div className={styles.calendar_header}>
      <div className={styles.current_year}>
        <span className={styles.current_year_number}>
          {/* {calendar.currentYear} */}
          {year ?? 'SCHEDULER'}
        </span>
        {year && (
          <span className={styles.current_year_text}>
            년
          </span>
        )}
      </div>
      <div className={styles.calendar_indicators}>
        {dayIndicators.map((item, index) => (
          <div
            key={`indicator_${index}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.header = CalendarHeader