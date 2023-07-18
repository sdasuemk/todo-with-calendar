import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { getTodos, completeTodo, deleteTodo } from '../api';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import CreateModal from './CreateModal';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TodoCalender = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const showAlert = (severity, message) => {
    setAlertData({ severity, message });
  };

  const clearAlert = () => {
    setAlertData(null);
  };

  function getFormattedDateString(inputTimeString) {
    const dateObject = new Date(inputTimeString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedString = new Date(
      `${year}`,
      `${month}`,
      `${day}`,
      `${hours}`,
      `${minutes}`
    );
    return formattedString;
  }

  const getallTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      if (response?.data) {
        let list = [];
        response.data.todoList.map((todo) => {
          list.push({
            title: todo.title,
            start: getFormattedDateString(todo.start),
            end: getFormattedDateString(todo.end),
            complete: todo.completed,
            id: todo._id,
          });
          return null;
        });
        setAllEvents([...list]);
      }
    } catch (err) {
      setLoading(true);
      showAlert(
        'error',
        'Failed to fetch your todos. Please try again after sometime.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (slotInfo) => {
    const currentDate = new Date();
    if (slotInfo.start < currentDate) {
      alert('You cannot create events in the past.');
      return;
    }
    setFormVisible(true);
    setNewEvent(slotInfo.start);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: event.complete ? 'green' : 'grey',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black',
      border: '1px solid #ccc',
      display: 'block',
    };

    return {
      style,
    };
  };

  const handleComplete = async (event) => {
    try {
      const data = { completed: true };
      await completeTodo(event.id, data);

      setAllEvents((prevEvents) =>
        prevEvents.map((prevEvent) =>
          prevEvent.id === event.id
            ? { ...prevEvent, complete: true }
            : prevEvent
        )
      );
      showAlert('success', 'Todo completed successfully.');
    } catch (err) {
      showAlert('error', 'Failed to complete todo. Please try again.');
    }
  };

  const handleDelete = async (event) => {
    try {
      await deleteTodo(event.id);

      setAllEvents((prevEvents) =>
        prevEvents.filter((prevEvent) => prevEvent.id !== event.id)
      );
      showAlert('success', 'Todo deleted successfully.');
    } catch (error) {
      showAlert('error', 'Failed to delete todo. Please try again.');
    }
  };

  const isOpen = (open) => {
    if (open === false) {
      setFormVisible(false);
    }
  };

  const isCreated = (created) => {
    if (created === 'success') {
      showAlert('success', 'Todo is created successfully.');
    }
    if (created === 'error') {
      showAlert('error', 'Failed to create todo. Please try again.');
    }
  };

  useEffect(() => {
    getallTodos();
  }, [isFormVisible]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px',
        }}
      >
        <h1>AWESOME TO-DO APP</h1>
      </div>

      <Stack sx={{ width: '100%' }} spacing={2}>
        {alertData && (
          <Alert severity={alertData.severity} onClose={clearAlert}>
            {alertData.message}
          </Alert>
        )}
      </Stack>
      {loading ? null : (
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={[Views.WEEK]}
          defaultView={Views.WEEK}
          selectable
          onSelectSlot={handleDateClick}
          eventPropGetter={eventStyleGetter}
          components={{
            event: ({ event }) => (
              <div style={{ marginRight: '10px' }}>
                <strong>{event.title}</strong>
                <br />
                <span style={{ margin: '10px' }}>
                  {event.complete ? null : (
                    <FiCheckCircle
                      className="green-icon"
                      onClick={() => handleComplete(event)}
                      style={{ color: 'green' }}
                    />
                  )}
                </span>
                <span style={{ margin: '10px' }}>
                  {event.complete ? null : (
                    <FiTrash2
                      className="red-icon"
                      onClick={() => handleDelete(event)}
                      style={{ color: 'red' }}
                    />
                  )}
                </span>
              </div>
            ),
          }}
        />
      )}

      {isFormVisible && (
        <CreateModal
          selectedDate={newEvent}
          isOpen={isOpen}
          isCreated={isCreated}
        />
      )}

      <div>
        <p>NOTE: Click on a timeslot column to create todo.</p>
      </div>
    </div>
  );
};

export default TodoCalender;
