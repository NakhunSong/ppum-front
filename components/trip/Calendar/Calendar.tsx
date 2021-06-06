import classNames from "classnames";
import { useCalendar } from "hooks/useCalendar";
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from './Calendar.module.scss';

interface DateArrayParams {
  firstDay: number;
  lastDay: number;
  currentYear: number;
  currentMonth: number;
  currentDays: number;
  prevYear: number;
  prevMonth: number;
  prevDays: number;
  nextYear: number;
  nextMonth: number;
  nextDays?: number;
}

interface CalendarItemProps {
  children: JSX.Element;
  context: string;
  selected?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const dayIndicators = ['일', '월', '화', '수', '목', '금', '토'];

function getDateArray({
  firstDay,
  lastDay,
  currentYear,
  currentMonth,
  currentDays,
  prevYear,
  prevMonth,
  prevDays,
  nextYear,
  nextMonth,
}: DateArrayParams) {
  const prevArray = Array.from({ length: firstDay }).map((e, i) => ({
    context: 'prev',
    date: prevDays - i,
    month: prevMonth,
    year: prevYear,
  })).sort(() => -1);
  const nextArray = Array.from({ length: 6 - lastDay }).map((e, i) => ({
    context: 'next',
    date: i + 1,
    month: nextMonth,
    year: nextYear,
  }));
  const currentArray = Array.from({ length: currentDays }).map((e, i) => ({
    context: 'current',
    date: i + 1,
    month: currentMonth,
    year: currentYear,
  }));
  return [...prevArray, ...currentArray, ...nextArray];
}

function CalendarItem({ children, context, selected }: CalendarItemProps) {
  return (
    <div className={classNames(styles.calendar_item, {
      [styles.gray]: context !== 'current',
      [styles.selected]: selected,
    })}>
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

export default function Calendar() {
  const [calendar, dispatch] = useCalendar();
  const [dateArray, setDateArray] = useState([]);

  useEffect(() => {
    const array = getDateArray({
      firstDay: calendar.currentFirstDay,
      lastDay: calendar.currentLastDay,
      currentYear: calendar.currentYear,
      currentMonth: calendar.currentMonth,
      currentDays: calendar.currentDays,
      prevYear: calendar.prevYear,
      prevMonth: calendar.prevMonth,
      prevDays: calendar.prevDays,
      nextYear: calendar.prevYear,
      nextMonth: calendar.prevMonth,
    });
    setDateArray(() => array);
  }, [calendar]);

  const handleArrowButton = useCallback((direction) => {
    dispatch({
      type: `calendar/${direction}`,
    });
  }, []);

  const handleClickCalendarItem = useCallback(item => {
    dispatch({
      type: 'calendar/SELECT_DATE',
      payload: { data: item },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar}>
        <div className={styles.calendar_header}>
          {/* <div>
            schedule
          </div> */}
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
                onClick={() => handleArrowButton('PREV')}
              />
              <ArrowButton
                direction="down"
                onClick={() => handleArrowButton('NEXT')}
              />
            </div>
          </div>
          <div className={styles.calendar_main_body}>
            {dateArray.map((item, index) => {
              return (
                <CalendarItem
                  key={`date_${index}`}
                  context={item.context}
                  onClick={() => handleClickCalendarItem(item)}
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