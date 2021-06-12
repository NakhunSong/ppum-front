import classNames from "classnames";
import { getDateArray, useCalendar } from "hooks/useCalendar";
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from './Calendar.module.scss';

interface CalendarItemProps {
  children: JSX.Element;
  context: string;
  selected?: string;
  start?: boolean;
  end?: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const dayIndicators = ['일', '월', '화', '수', '목', '금', '토'];


function CalendarItem({
  children,
  context,
  selected,
  start,
  end,
  onClick,
}: CalendarItemProps) {
  return (
    <div className={classNames(styles.calendar_item, {
      [styles.gray]: context !== 'current',
      [styles.selected]: selected,
      [styles.start]: start,
      [styles.end]: end,
    })}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ArrowButton({ direction, onClick }) {
  const icon = direction === 'up' ? faAngleUp : faAngleDown;
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
      <div className={styles.calendar}>
        <div className={styles.calendar_header}>
          <div className={styles.current_year}>
            <span className={styles.current_year_number}>
              {calendar.currentYear}
            </span>
            <span className={styles.current_year_text}>
              년
            </span>
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
              const isStartMonthEqual = item.month === calendar?.start?.month;
              const isStartYearEqual = item.year === calendar?.start?.year;
              const isStartDateEqual = item.date === calendar?.start?.date;
              const isEndMonthEqual = item.month === calendar?.end?.month;
              const isEndYearEqual = item.year === calendar?.end?.year;
              const isEndDateEqual = item.date === calendar?.end?.date;
              return (
                <CalendarItem
                  key={`date_${index}`}
                  context={item.context}
                  start={isStartMonthEqual && isStartYearEqual && isStartDateEqual}
                  end={isEndMonthEqual && isEndYearEqual && isEndDateEqual}
                  onClick={() => onClickDate(item)}
                >
                  {item.date}
                </CalendarItem>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}