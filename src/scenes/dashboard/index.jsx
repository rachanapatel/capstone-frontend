// import React, { useState, useEffect } from 'react';
// import FullCalendar from "@fullcalendar/react";
// import { formatDate } from '@fullcalendar/core';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
// import Pagetitles from "../../Pagetitles";
// import axios from "axios"; 
// import ShiftForm from './ShiftForm';
// import EventDetailModal from './EventDetailModal';
// import './index.css';

// const Dashboard = ({ user }) => {
//   const [currentEvents, setCurrentEvents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [selectedDateInfo, setSelectedDateInfo] = useState(null);
//   const [eventDetailData, setEventDetailData] = useState(null);
//   const [showEventDetail, setShowEventDetail] = useState(false);

//   // Utility: parse "HH:MM:SS" duration string to milliseconds
//   function parseDurationToMs(durationStr) {
//     if (!durationStr) return 0;
//     const parts = durationStr.split(':'); // ["HH", "MM", "SS"]
//     if (parts.length !== 3) return 0;

//     const hours = parseInt(parts[0], 10);
//     const minutes = parseInt(parts[1], 10);
//     const seconds = parseInt(parts[2], 10);

//     return ((hours * 60 + minutes) * 60 + seconds) * 1000;
//   }

//   // Utility: format milliseconds duration to "HH:MM:SS"
//   function formatDuration(startISO, endISO) {
//     const diffMs = new Date(endISO) - new Date(startISO);
//     const totalSeconds = Math.floor(diffMs / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
//   }

//   // Fetch all saved events on mount or when user.company changes
//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const headers = { 'X-Company-ID': user.company };
//         const response = await axios.get("http://localhost:8000/dash/", { headers });

//         // Transform backend shifts to FullCalendar event format
//         const events = response.data.map(shift => {
//           const start = new Date(shift.starttime);
//           const durationMs = parseDurationToMs(shift.duration);
//           const end = new Date(start.getTime() + durationMs);

//           return {
//             id: shift.id,
//             title: shift.position?.title || 'Shift',
//             start: start.toISOString(),
//             end: end.toISOString(),
//             extendedProps: {
//               shiftStatus: shift.status,
//               recurring: shift.recurring,
//               position: shift.position?.id || null,
//               employee: shift.employee || null,
//             }
//           };
//         });

//         setCurrentEvents(events);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     }
//     fetchEvents();
//   }, [user.company]);

//   // Handle new event creation from date selection
//   const handleDateClick = (selected) => {
//     setSelectedDateInfo(selected);
//     setSelectedEvent(null);
//     setShowForm(true);
//   };

//   // Create new shift event and save to backend
//   // const handleCreateEvent = async (formData) => {
//   //   const calendarApi = selectedDateInfo.view.calendar;
//   //   calendarApi.unselect();

//   //   const startISO = selectedDateInfo.startStr;
//   //   const endISO = selectedDateInfo.endStr;

//   //   const newEvent = {
//   //     id: `temp-${Date.now()}`,
//   //     title: formData.position,
//   //     start: startISO,
//   //     end: endISO,
//   //     allDay: selectedDateInfo.allDay,
//   //     extendedProps: {
//   //       shiftStatus: formData.shiftStatus,
//   //       recurring: formData.recurring,
//   //       position: formData.position,
//   //       employee: formData.employee || null,
//   //     },
//   //   };

//   //   calendarApi.addEvent(newEvent);

//   //   try {
//   //     const headers = { 'X-Company-ID': user.company };
//   //     const res = await axios.post("http://localhost:8000/dash/", {
//   //       starttime: startISO,
//   //       duration: formatDuration(startISO, endISO),
//   //       status: formData.shiftStatus,
//   //       recurring: formData.recurring,
//   //       position: formData.position,
//   //       employee: formData.employee || null,
//   //     }, { headers });

//   //     // Replace temporary ID with backend-generated ID
//   //     newEvent.id = res.data.id;
//   //     setCurrentEvents(prev => [...prev, newEvent]);
//   //   } catch (error) {
//   //     console.error("Error saving shift:", error);
//   //     alert("Failed to save shift to backend.");
//   //     const event = calendarApi.getEventById(newEvent.id);
//   //     if (event) event.remove();
//   //   }

//   //   setShowForm(false);
//   // };
//   const handleCreateEvent = async (formData) => {
//     const calendarApi = selectedDateInfo.view.calendar;
//     calendarApi.unselect();
  
//     const startISO = selectedDateInfo.startStr;
//     const endISO = selectedDateInfo.endStr;
  
//     try {
//       const headers = { 'X-Company-ID': user.company };
//       // First create on backend and get real ID
//       const res = await axios.post("http://localhost:8000/dash/", {
//         starttime: startISO,
//         duration: formatDuration(startISO, endISO),
//         status: formData.shiftStatus,
//         recurring: formData.recurring,
//         position: formData.position,
//         employee: formData.employee || null,
//       }, { headers });
  
//       const newEvent = {
//         id: res.data.id,  // Use real backend ID here
//         title: formData.position,
//         start: startISO,
//         end: endISO,
//         allDay: selectedDateInfo.allDay,
//         extendedProps: {
//           shiftStatus: formData.shiftStatus,
//           recurring: formData.recurring,
//           position: formData.position,
//           employee: formData.employee || null,
//         },
//       };
  
//       // Now add to calendar with the proper ID
//       calendarApi.addEvent(newEvent);
//       setCurrentEvents(prev => [...prev, newEvent]);
//     } catch (error) {
//       console.error("Error saving shift:", error);
//       alert("Failed to save shift to backend.");
//     }
  
//     setShowForm(false);
//   };
  
//   // Handle updating an existing event
//   const handleUpdateEvent = async (formData) => {
//     if (!selectedEvent) return;

//     const startISO = selectedEvent.start.toISOString();
//     const endISO = selectedEvent.end.toISOString();

//     try {
//       const headers = { 'X-Company-ID': user.company };
//       await axios.put(`http://localhost:8000/dash/${selectedEvent.id}/`, {
//         starttime: startISO,
//         duration: formatDuration(startISO, endISO),
//         status: formData.shiftStatus,
//         recurring: formData.recurring,
//         position: formData.position,
//         employee: formData.employee || null,
//       }, { headers });

//       selectedEvent.setProp('title', formData.position);
//       selectedEvent.setExtendedProp('shiftStatus', formData.shiftStatus);
//       selectedEvent.setExtendedProp('recurring', formData.recurring);
//       selectedEvent.setExtendedProp('position', formData.position);
//       selectedEvent.setExtendedProp('employee', formData.employee || null);

//       setShowForm(false);
//       setSelectedEvent(null);
//     } catch (error) {
//       console.error("Error updating shift:", error);
//       alert("Failed to update shift on backend.");
//     }
//   };

//   // Delete event from backend and calendar
//   const handleDeleteEvent = async () => {
//     if (!selectedEvent) return;

//     if (!window.confirm(`Are you sure you want to delete the shift for position "${selectedEvent.title}"?`)) return;

//     try {
//       const headers = { 'X-Company-ID': user.company };
//       await axios.delete(`http://localhost:8000/dash/${selectedEvent.id}/`, { headers });

//       selectedEvent.remove();
//       setShowForm(false);
//       setSelectedEvent(null);
//     } catch (error) {
//       console.error("Error deleting shift:", error);
//       alert("Failed to delete shift on backend.");
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
//             eventClick={(info) => {
//               setSelectedEvent(info.event);
//               setSelectedDateInfo(null);
//               setShowForm(true);
//             }}
//             events={currentEvents}
//             // eventsSet={(events) => setCurrentEvents(events)}
//           />

//           {showForm && (
//             <ShiftForm
//               user={user}
//               onClose={() => {
//                 setShowForm(false);
//                 setSelectedEvent(null);
//                 setSelectedDateInfo(null);
//               }}
//               onCreate={handleCreateEvent}
//               onUpdate={handleUpdateEvent}
//               onDelete={handleDeleteEvent}
//               shift={selectedEvent ? {
//                 id: selectedEvent.id,
//                 position: selectedEvent.extendedProps.position,
//                 employee: selectedEvent.extendedProps.employee || '',
//                 shiftStatus: selectedEvent.extendedProps.shiftStatus,
//                 recurring: selectedEvent.extendedProps.recurring || false,
//               } : null}
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
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
import EventDetail from './EventDetail'
import './index.css';

const Dashboard = ({ user }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);

  // New state for event details modal
  const [eventDetailData, setEventDetailData] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);

  // // Fetch all saved events on mount
  // useEffect(() => {
  //   async function fetchEvents() {
  //     try {
  //       const headers = { 'X-Company-ID': user.company };
  //       const response = await axios.get("http://localhost:8000/dash/", { headers });
  //       setCurrentEvents(response.data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   }
  //   fetchEvents();
  // }, [user.company]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const headers = { 'X-Company-ID': user.company };
        const response = await axios.get("http://localhost:8000/dash/", { headers });
  
        // Transform backend shifts into FullCalendar event objects
        const events = response.data.map(shift => ({
          id: shift.id,
          title: shift.position?.title || 'No Position',
          start: shift.starttime,
          end: new Date(new Date(shift.starttime).getTime() + parseDurationToMs(shift.duration)).toISOString(),
          allDay: false, // or true if your shifts are all-day
          extendedProps: {
            shiftStatus: shift.status,
            recurring: shift.recurring,
            position: shift.position?.id,
            employee: shift.employee?.id,
          }
        }));
  
        setCurrentEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  
    fetchEvents();
  }, [user.company]);
  
  function parseDurationToMs(durationStr) {
    // Example input: "PT1H30M0S" (1 hour 30 mins)
    // Parse with regex:
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
  
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
  
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  }
  

  // Handle new event creation from date selection
  const handleDateClick = (selected) => {
    setSelectedDateInfo(selected);
    setShowForm(true);
    setEventDetailData(null);
    setShowEventDetail(false);
  };

  // Create new shift event and save to backend
  const handleCreateEvent = async (formData) => {
    const calendarApi = selectedDateInfo.view.calendar;
    calendarApi.unselect();

    const startISO = selectedDateInfo.startStr;
    const endISO = selectedDateInfo.endStr;

    try {
      const headers = { 'X-Company-ID': user.company };
      const res = await axios.post("http://localhost:8000/dash/", {
        starttime: startISO,
        duration: calculateDuration(startISO, endISO),
        status: formData.shiftStatus,
        recurring: formData.recurring,
        position: formData.position,
        employee: formData.employee || null,
      }, { headers });

      const newEvent = {
        id: res.data.id,
        title: formData.position,
        start: startISO,
        end: endISO,
        allDay: selectedDateInfo.allDay,
        extendedProps: {
          shiftStatus: formData.shiftStatus,
          recurring: formData.recurring,
          position: formData.position,
          employee: formData.employee || null,
        },
      };

      calendarApi.addEvent(newEvent);
      setCurrentEvents(prev => [...prev, newEvent]);
    } catch (error) {
      console.error("Error saving shift:", error);
      alert("Failed to save shift to backend.");
    }

    setShowForm(false);
  };

  // Calculate ISO8601 duration string for backend
  function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate - startDate;

    const diffSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    return `PT${hours}H${minutes}M${seconds}S`; 
  }

  // When clicking on existing event, fetch details and open detail modal
  const handleEventClick = async (clickInfo) => {
    const shiftId = clickInfo.event.id;
    try {
      const headers = { 'X-Company-ID': user.company };
      const response = await axios.get(`http://localhost:8000/dash/${shiftId}/`, { headers });
      setEventDetailData(response.data);
      setShowEventDetail(true);
      setShowForm(false);
      setSelectedDateInfo(null);
    } catch (error) {
      console.error('Failed to fetch shift details:', error);
      alert('Failed to load shift data');
    }
  };

  // Close detail modal
  const handleCloseDetail = () => {
    setShowEventDetail(false);
    setEventDetailData(null);
  };

  // Update shift handler passed to modal and form
  const handleUpdateShift = async (updatedData) => {
    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.put(`http://localhost:8000/dash/${updatedData.id}/`, {
        starttime: eventDetailData.starttime, // keep existing starttime
        duration: eventDetailData.duration,
        status: updatedData.shiftStatus,
        recurring: updatedData.recurring,
        position: updatedData.position,
        employee: updatedData.employee || null,
      }, { headers });

      setCurrentEvents((prevEvents) => prevEvents.map(evt => {
        if (evt.id === updatedData.id) {
          return {
            ...evt,
            title: updatedData.position,
            extendedProps: {
              ...evt.extendedProps,
              shiftStatus: updatedData.shiftStatus,
              recurring: updatedData.recurring,
              position: updatedData.position,
              employee: updatedData.employee || null,
            }
          };
        }
        return evt;
      }));

      alert('Shift updated');
      handleCloseDetail();
    } catch (error) {
      console.error('Failed to update shift:', error);
      alert('Failed to update shift');
    }
  };

  // Delete shift handler passed to modal
  const handleDeleteShift = async (idToDelete) => {
    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.delete(`http://localhost:8000/dash/${idToDelete}/`, { headers });

      setCurrentEvents((prevEvents) => prevEvents.filter(evt => evt.id !== idToDelete));
      alert('Shift deleted');
      handleCloseDetail();
    } catch (error) {
      console.error('Failed to delete shift:', error);
      alert('Failed to delete shift');
    }
  };

  return (
    <Box className="calendar-container">
      <Pagetitles title="View Schedule" subtitle="Shift Scheduler" />
      <Box className="calendar-layout">

        {/* CALENDAR SIDEBAR */}
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

        {/* CALENDAR */}
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
            events={currentEvents}
          />

          {showForm && selectedDateInfo && (
            <ShiftForm
              user={user}
              onClose={() => {
                setShowForm(false);
                setSelectedDateInfo(null);
              }}
              onCreate={handleCreateEvent}
            />
          )}

          {showEventDetail && eventDetailData && (
            <EventDetail
              open={showEventDetail}
              eventData={eventDetailData}
              onClose={handleCloseDetail}
              onUpdate={handleUpdateShift}
              onDelete={handleDeleteShift}
              user={user}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
