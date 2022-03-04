import React, { useState, useContext, useEffect } from 'react';
import Month from '../components/Month';
import SideBar from '../components/SideBar';
import CalendarHeader from '../components/CalendarHeader';
import GlobalContext from '../../context/GlobalContext';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { getMonth } from '../../util';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import './Calendar.css';

export default function Calendar() {
  const auth = useContext(AuthContext);
  const [currentMonth, setCurentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    console.log(`monthIndex: ${monthIndex}`);
    setCurentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const { savedEvents, dispatchCalEvent } = useContext(GlobalContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  /* HERRE YOU MUST COMMENT OUT TO FETCH DATA FROM BACKEND*/

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/events',
          'GET',
          null,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );

        savedEvents.map((response) => {
          // ezekből szerintem hiányzik a return, nem tudom lecsekkolni most, hogy csinál e valamit a nélkül
          return dispatchCalEvent({ type: 'delete', payload: response });
        });

        responseData.events.map((elem) => {
          // ezekből szerintem hiányzik a return, nem tudom lecsekkolni most, hogy csinál e valamit a nélkül
          return elem.day = parseInt(elem.day);
        });

        responseData.events.map((response) => {
          // ezekből szerintem hiányzik a return, nem tudom lecsekkolni most, hogy csinál e valamit a nélkül
          return dispatchCalEvent({ type: 'push', payload: response });
        });
      } catch (err) {}
    };
    fetchUsers();
      // a linter szerint ezek hiányoztak még az effectnek
  }, [auth.token, dispatchCalEvent, savedEvents, sendRequest]);

  /* END HERRE YOU MUST COMMENT OUT TO FETCH DATA FROM BACKEND*/

  return (
    <React.Fragment>
      <ErrorModal error={error} onlClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="aside">
        <CalendarHeader />
        <SideBar />
      </div>
      <main className="main">
        <Month month={currentMonth} />
      </main>
    </React.Fragment>
  );
}
