// import React from 'react';
// import { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import { formatDate } from '@fullcalendar/core';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
// import Pagetitles from "../../Pagetitles";
// import './index.css';
// import axios from "axios"; 
// import ShiftForm from './ShiftForm';

// const Dashboard = ( { user } ) => {
//   const [currentEvents, setCurrentEvents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedDateInfo, setSelectedDateInfo] = useState(null);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const headers = { 'X-Company-ID': user.company };
//         const response = await axios.get("http://localhost:8000/dash/", { headers });
//         // Assuming response.data is an array of event objects with start/end fields
//         setCurrentEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     }
//     fetchEvents();
//   }, [user.company]);
  

//   const handleDateClick = (selected) => {
//     setSelectedDateInfo(selected); // Store the clicked date info
//     setShowForm(true);             // Show the form
//   };
  
//   const handleCreateEvent = async (formData) => {
//     const calendarApi = selectedDateInfo.view.calendar;
//     calendarApi.unselect(); // clear selection

//   const newEvent = {
//     id: `${selectedDateInfo.dateStr}-${formData.title}`,
//     title: formData.title,
//     description: formData.description,
//     category: formData.category,
//     start: selectedDateInfo.startStr,
//     end: selectedDateInfo.endStr,
//     allDay: selectedDateInfo.allDay,
//   };

//   // Add event to calendar immediately (local UI feedback)
//   calendarApi.addEvent(newEvent);

//   // Create backend shift object
//   try {
//     await axios.post("http://localhost:8000/dash/", {
//       starttime: selectedDateInfo.startStr,
//       duration: calculateDuration(selectedDateInfo.startStr, selectedDateInfo.endStr),
//       status: formData.shiftStatus,  
//       recurring: formData.recurring,
//       position: formData.position,   
//       employee: formData.employee || null,      
//     });
//     console.log("Shift saved successfully.");
//   } catch (error) {
//     console.error("Error saving shift:", error);
//     alert("Failed to save shift to backend.");
//   }
// };

// function calculateDuration(start, end) {
//   const startDate = new Date(start);
//   const endDate = new Date(end);
//   const diffMs = endDate - startDate;

//   const diffSeconds = Math.floor(diffMs / 1000);
//   const hours = Math.floor(diffSeconds / 3600);
//   const minutes = Math.floor((diffSeconds % 3600) / 60);
//   const seconds = diffSeconds % 60;

//   return `PT${hours}H${minutes}M${seconds}S`; 
// }


//   const handleEventClick = (selected) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${selected.event.title}'`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   return (
//     <Box className="calendar-container">
//       <Pagetitles title="View Schedule" subtitle="Shift Scheduler" />
//       <Box className="calendar-layout">
//         {/* CALENDAR SIDEBAR */}
//         <Box className="calendar-sidebar">
//           <Typography variant="h5">Events</Typography>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem key={event.id} className="calendar-event">
//                 <ListItemText
//                   primary={event.title}
//                   secondary={
//                     <Typography>
//                       {formatDate(event.start, {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </Typography>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* CALENDAR */}
//         <Box className="calendar-view">
//           <FullCalendar
//             height="75vh"
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
//             }}
//             initialView="dayGridMonth"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             select={handleDateClick}
//             eventClick={handleEventClick}
//             eventsSet={(events) => setCurrentEvents(events)}
//           />
//           {showForm && selectedDateInfo && (
//             <ShiftForm
//               // dateInfo={selectedDateInfo}
//               user={user}
//               onClose={() => setShowForm(false)}
//               onCreate={handleCreateEvent}
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useMemo } from 'react';
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Pagetitles from "../../Pagetitles";
import axios from "axios"; 
import ShiftForm from './ShiftForm';
import './index.css';

const Dashboard = ({ user }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const headers = { 'X-Company-ID': user.company };
        const response = await axios.get("http://localhost:8000/dash/", { headers });
        setCurrentEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, [user.company]);

  const handleDateClick = (selected) => {
    setSelectedDateInfo(selected);
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleCreateEvent = async (formData) => {
    const calendarApi = selectedDateInfo.view.calendar;
    calendarApi.unselect();

    const newEvent = {
      id: `temp-${Date.now()}`,
      title: formData.position,
      start: selectedDateInfo.startStr,
      end: selectedDateInfo.endStr,
      allDay: selectedDateInfo.allDay,
      extendedProps: {
        shiftStatus: formData.shiftStatus,
        recurring: formData.recurring,
        position: formData.position,
        employee: formData.employee || null,
      },
    };

    calendarApi.addEvent(newEvent);

    try {
      const headers = { 'X-Company-ID': user.company };
      const res = await axios.post("http://localhost:8000/dash/", {
        starttime: selectedDateInfo.startStr,
        duration: calculateDuration(selectedDateInfo.startStr, selectedDateInfo.endStr),
        status: formData.shiftStatus,
        recurring: formData.recurring,
        position: formData.position,
        employee: formData.employee || null,
      }, { headers });

      newEvent.id = res.data.id;
      setCurrentEvents((prev) => [...prev, newEvent]);
    } catch (error) {
      console.error("Error saving shift:", error);
      alert("Failed to save shift to backend.");
      const event = calendarApi.getEventById(newEvent.id);
      if (event) event.remove();
    }

    setShowForm(false);
  };

  const calculateDuration = (start, end) => {
    const diffMs = new Date(end) - new Date(start);
    const diffSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    return `PT${hours}H${minutes}M${seconds}S`;
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setSelectedDateInfo(null);
    setShowForm(true);
  };

  const handleUpdateEvent = async (formData) => {
    if (!selectedEvent) return;

    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.put(`http://localhost:8000/dash/${selectedEvent.id}/`, {
        starttime: selectedEvent.start.toISOString(),
        duration: calculateDuration(selectedEvent.start.toISOString(), selectedEvent.end.toISOString()),
        status: formData.shiftStatus,
        recurring: formData.recurring,
        position: formData.position,
        employee: formData.employee || null,
      }, { headers });

      selectedEvent.setProp('title', formData.position);
      selectedEvent.setExtendedProp('shiftStatus', formData.shiftStatus);
      selectedEvent.setExtendedProp('recurring', formData.recurring);
      selectedEvent.setExtendedProp('position', formData.position);
      selectedEvent.setExtendedProp('employee', formData.employee || null);

      setShowForm(false);
      setSelectedEvent(null);

    } catch (error) {
      console.error("Error updating shift:", error);
      alert("Failed to update shift on backend.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    if (!window.confirm(`Are you sure you want to delete the shift for position "${selectedEvent.title}"?`)) return;

    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.delete(`http://localhost:8000/dash/${selectedEvent.id}/`, { headers });
      selectedEvent.remove();
      setShowForm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting shift:", error);
      alert("Failed to delete shift on backend.");
    }
  };

  // Memoize events to avoid triggering eventsSet loop
  const memoizedEvents = useMemo(() => currentEvents, [currentEvents]);

  return (
    <Box className="calendar-container">
      <Pagetitles title="View Schedule" subtitle="Shift Scheduler" />
      <Box className="calendar-layout">
        <Box className="calendar-sidebar">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem key={event.id} className="calendar-event">
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box className="calendar-view">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={memoizedEvents} // ✅ stable reference
          />

          {showForm && (
            <ShiftForm
              user={user}
              shift={selectedEvent ? {
                id: selectedEvent.id,
                position: selectedEvent.extendedProps.position,
                employee: selectedEvent.extendedProps.employee || '',
                status: selectedEvent.extendedProps.shiftStatus,
                recurring: selectedEvent.extendedProps.recurring || false,
              } : selectedDateInfo ? null : null}
              onClose={() => {
                setShowForm(false);
                setSelectedEvent(null);
                setSelectedDateInfo(null);
              }}
              onCreate={handleCreateEvent}
              onUpdate={handleUpdateEvent}
              onDelete={handleDeleteEvent}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
