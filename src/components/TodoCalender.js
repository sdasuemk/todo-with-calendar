import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import {getTodos} from "../api"

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
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    

    function getFormattedDateString(inputTimeString) {
      // Step 1: Parse the input time string into a Date object
      const dateObject = new Date(inputTimeString);
    
      // Step 2: Extract the year, month, day, hours, and minutes
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
    
      // Step 3: Adjust the month value (since it is zero-based)
      const adjustedMonth = month + 1;
    
      // Step 4: Format the extracted values into the desired string format
      const formattedString = new Date(`${year}`, `${month}`, `${day}`, `${hours}`, `${minutes}`);
    
      return formattedString;
    }

    const getallTodos = async () => {
     try{
      setLoading(true);
      const response = await getTodos();
      if(response?.data){
        console.log("Event", response.data.todoList)
        let list = [];
        response.data.todoList.map((todo) =>{
          list.push({
            title: todo.title,
            start: getFormattedDateString(todo.start),
            end: getFormattedDateString(todo.end)
          });
        })
        setAllEvents([...list]) 
      }
     }
     catch(err){
      setLoading(true);
      //TODO
     }
     finally{
      setLoading(false)
     }
    }

    console.log('newEvent',newEvent)
    console.log("todoList",allEvents);
  
    // Click event handler for the date cells in the calendar
    const handleDateClick = (slotInfo) => {
      // Show the form and set the date for the new event
      setFormVisible(true);
      setNewEvent(slotInfo.start)
      // Console log the clicked date
      console.log('Clicked date:', slotInfo.start);
    };

    const isOpen = (open) => {
      if (open === false){
        setFormVisible(false);
      }
    };

    useEffect(() => {
      getallTodos()
    },[isFormVisible])


  return (
    <div>
      
       {
        loading? null : (
          <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }} // Adjust the height as needed
          views={[Views.WEEK]} // Display only the week view
          defaultView={Views.WEEK} // Set the default view to week view
          selectable // Enable date selection
          onSelectSlot={handleDateClick} // Handle date click event
        />
        )
       }
      
      {isFormVisible && <CreateModal selectedDate={newEvent} isOpen={isOpen}/>}
    </div>
  );
};

export default TodoCalender;
