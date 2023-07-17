import React, {useState} from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import CreateButton from './CreateButton'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import CreateModal from './CreateModal';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Event 1',
    start: new Date(2023, 6, 18, 10, 0),
    end: new Date(2023, 6, 18, 12, 0),
  },
  {
    title: 'Event 2',
    start: new Date(2023, 6, 16, 14, 0),
    end: new Date(2023, 6, 16, 16, 0),
  },
  // Add more events as needed
];

const TodoCalender = () => {
  // Calculate the start and end dates of the current week
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  // Filter events to include only those within the current week
  const eventsThisWeek = events.filter(event =>
    event.start >= startOfWeek && event.end <= endOfWeek
  );

    // State to handle form visibility and new event data
    const [isFormVisible, setFormVisible] = useState(false);
    const [newEvent, setNewEvent] = useState(null);

    console.log('newEvent',newEvent)
  
    // Click event handler for the date cells in the calendar
    const handleDateClick = (slotInfo) => {
      // Show the form and set the date for the new event
      setFormVisible(true);
      setNewEvent(slotInfo.start)
      
  
      // Console log the clicked date
      console.log('Clicked date:', slotInfo.start);
    };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }} // Adjust the height as needed
        views={[Views.WEEK]} // Display only the week view
        defaultView={Views.WEEK} // Set the default view to week view
        selectable // Enable date selection
        onSelectSlot={handleDateClick} // Handle date click event
      />
      {isFormVisible && <CreateModal selectedDate={newEvent} isOpen={true}/>}
    </div>
  );
};

export default TodoCalender;
