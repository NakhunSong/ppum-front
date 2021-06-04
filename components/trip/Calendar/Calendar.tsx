import classNames from "classnames";
import { useCalendar } from "hooks/useCalendar";
import { useEffect, useState } from "react"
import styles from './Calendar.module.scss';

interface DateArrayParams {
  firstDay: number;
  lastDay: number;
  currentDays: number;
  prevDays: number;
  nextDays?: number;
}

function getDateArray({
  firstDay,
  lastDay,
  currentDays,
  prevDays,
}: DateArrayParams) {
  const prevArray = Array.from({ length: firstDay }).map((e, i) => ({ context: 'prev', data: prevDays - i })).sort(() => -1);
  const nextArray = Array.from({ length: 6 - lastDay }).map((e, i) => ({ context: 'next', data: i + 1 }));
  const currentArray = Array.from({ length: currentDays }).map((e, i) => ({ context: 'current', data: i + 1 }));
  return [...prevArray, ...currentArray, ...nextArray];
}

function CalendarItem({ children, context }) {
  return (
    <div className={classNames(styles.calendar_item, {
      [styles.gray]: context !== 'current'
    })}>
      {children}
    </div>
  );
}

export default function Calendar() {
  const [calendar, dispatch] = useCalendar();
  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    const array = getDateArray({
      firstDay: calendar.currentFirstDay,
      lastDay: calendar.currentLastDay,
      currentDays: calendar.currentDays,
      prevDays: calendar.prevDays,
    });
    setDateArray(() => array);
  }, [calendar]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar}>
        <div className={styles.calendar_head}>
          <div className={styles.current_month}>
            <span className={styles.current_month_number}>
              {calendar.currentMonth}
            </span>
            <span className={styles.current_month_text}>
              월
            </span>
          </div>
        </div>
        <div className={styles.calendar_body}>
          {dateArray.map((item, index) => {
            return (
              <CalendarItem
                key={`date_${index}`}
                context={item.context}
              >
                {item.data}
              </CalendarItem>
            )
          })}
        </div>
      </div>
    </div>
  );
}