import React, { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../../context/GlobalContext';

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter((evt) => {
      return dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY');
    });
    setDayEvents(events);
  }, [savedEvents, day]);

  function getCurrentDayClass() {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'current'
      : '';
  }

  // <div className="day egesz"> sose vegyítsd a nyelveket, vagy legyen angol, vagy végig magyar
  return (
    <div className="day egesz">
      <header className=" day-header">
        {rowIdx === 0 && <p className="">{day.format('ddd').toUpperCase()}</p>}
        {rowIdx > 0 && (
          <div className={`bottom-line  ${getCurrentDayClass()}`}>
            {' '}
            {day.format('DD')}
          </div>
        )}
      </header>

      <div
        className={`pointer day-inner ${rowIdx === 0}`}
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);
            }}
            className={`${evt.label}-label day-event fontsize18 white-color`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
