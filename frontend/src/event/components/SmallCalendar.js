import dayjs from 'dayjs';
import React, { useState, useEffect, useContext } from 'react';
import { getMonth } from '../../util';
import GlobalContext from '../../context/GlobalContext';
import './SmallCalendar.css';

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCallendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return 'current';
    } else if (currDay === slcDay) {
      return 'selected';
    } else {
      return '';
    }
  }

// <span> ◀</span> ezek mehetnek css-el ::after ::before -ba

  return (
    <div className="smallcalendar">
      <header className="smallcalendar-header">
        <p className="smallcalendar-date">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <button className="smallcalendar-date-prev" onClick={handlePrevMonth}>
          <span> ◀</span>
        </button>
        <button className="smallcalendar-date-next" onClick={handleNextMonth}>
          <span>▶ </span>
        </button>
      </header>

      <div className="smallcalendar-month-table">
        <div className="smallcalendar-dayname">
          {currentMonth[0].map((day, i) => (
            <span key={i}>
              <div>{day.format('dd')}</div>
            </span>
          ))}
        </div>
        <div className="smallcalendar-day-number-frame">
          {currentMonth.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSmallCallendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  className={`smallcalendar-button ${getDayClass(day)}`}
                >
                  <span className="smallcalendar-day-number">
                    {day.format('DD')}
                  </span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
