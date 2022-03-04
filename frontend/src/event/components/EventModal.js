import React, { useContext, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
import clock from '../../assets/clock.png';
import chartbar from '../../assets/chartbar.png';
import bookmark from '../../assets/bookmark.png';
import check from '../../assets/check.png';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './EventModal.css';
const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

export default function EventModal() {
  // érdemes sorbe rendezni ezeket, először funkciók utána változók, vagy fordítva
  const {
    setShowEventModal,
    dispatchCalEvent,
    setSelectedEvent,
    daySelected,
    selectedEvent,
  } = useContext(GlobalContext);
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const { sendRequest } = useHttpClient();

  const eventSubmitHandler = async (event) => {
    event.preventDefault();

    if (selectedEvent) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/events/${selectedEvent._id}`,
          'PATCH',
          JSON.stringify({
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );
        responseData.event.day = parseInt(responseData.event.day);
        dispatchCalEvent({ type: 'delete', payload: selectedEvent });
        dispatchCalEvent({ type: 'push', payload: responseData.event });
        setShowEventModal(false);
        setSelectedEvent(null);
      } catch (err) { }
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/events',
          'POST',
          JSON.stringify({
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );
        responseData.event.day = parseInt(responseData.event.day);
        dispatchCalEvent({ type: 'push', payload: responseData.event });
        setShowEventModal(false);
        setSelectedEvent(null);
      } catch (err) { }
    }
  };

  const eventDeleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/events/${selectedEvent._id}`,
        'Delete',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      dispatchCalEvent({ type: 'delete', payload: selectedEvent });
      setShowEventModal(false);
      setSelectedEvent(null);
    } catch (err) { }
  };

  return (
    <div className="event ">
      <form className="form">
        <header className="modal-header">
          <span className="icons pointer modal-menu-button">
            <img src={menu} alt="menu" />
          </span>
          {selectedEvent && (
            <span
              onClick={() => {
                eventDeleteHandler();
              }}
              className="pointer  modal-delete-button"
            >
              DELETE!
            </span>
          )}
          <span
            onClick={() => {
              setShowEventModal(false);
              setSelectedEvent(null);
            }}
            className="icons pointer modal-close-button"
          >
            <img src={close} alt="close" />
          </span>
        </header>

        <div className="modal-body">
          <img src={chartbar} alt="chartbar" className="modal-task-icon" />
          <input
            type="text"
            name="title"
            placeholder="Add a task"
            value={title}
            required
            className="nagybetu kekalahuzas modal-task-title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <img
            src={chartbar}
            alt="chartbar"
            className="modal-description-icon"
          />
          <input
            type="text"
            name="description"
            placeholder="Your name"
            value={description}
            required
            className="kekalahuzas model-input-description "
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <img src={clock} alt="clock" className="icons modal-time-icon" />
          <p className="modal-time">{daySelected.format('dddd, MMMM DD')}</p>

          <div className="modal-bookmark">
            <img
              className="modal-bookmark-icon"
              src={bookmark}
              alt="bookmark"
            />
            {labelsClasses.map((lblClass, i) => (
              <span
                key={i}
                onClick={() => setSelectedLabel(lblClass)}
                className={`${lblClass} circle model-label-circles `}
              >
                {selectedLabel === lblClass && (
                  <img
                    className={`${lblClass} chekes`}
                    src={check}
                    alt="check"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
        <footer className="modalfooter">
          <button
            type="submit"
            onClick={eventSubmitHandler}
            className="modal-save-button pointer"
          >
            SAVE
          </button>
        </footer>
      </form>
    </div>
  );
}
