import React from 'react';

const GlobalContext = React.createContext({
  // érdemes sorbe rendezni ezeket, először funkciók utána változók, vagy fordítva
  monthIndex: 0,
  smallCallendarMonth: 0,
  daySelected: null,
  showEventModal: false,
  savedEvents: [],
  selectedEvent: null,
  setMonthIndex: (index) => {},
  setSmallCallendarMonth: (index) => {},
  setDaySelected: (day) => {},
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  setSelectedEvent: () => {},
});

export default GlobalContext;
