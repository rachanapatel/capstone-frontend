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
// import ShiftForm from './ShiftForm';
import NonManagerShiftForm from './NonManagerShiftForm';
// import EventDetail from './EventDetail'
import NonManagerDetail from './NonManagerDetail'
import './index.css';


const kBaseURL = import.meta.env.VITE_API_URL;


const NonManagerDash = ({ user }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [eventDetailData, setEventDetailData] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [positionMap, setPositionMap] = useState({});
  const [employeeMap, setEmployeeMap] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem('user'));
  const userId = savedUser ? savedUser.id : user.id; 
  console.log("User from localStorage:", savedUser);
  console.log("User's Position:", savedUser.position);
  console.log("user id", userId)

  
  // console.log("User from localStorage:", savedUser);
  console.log("User's Position here:", savedUser?.position);


  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const headers = { 'X-Company-ID': user.company };
        const res = await axios.get(`${kBaseURL}/team/positions/`, { headers });
        const map = {};
        res.data.forEach(pos => {
          map[pos.id] = pos.title;
        });
        setPositionMap(map);
        console.log("Position Map:", map);
      } catch (error) {
        console.error("Failed to fetch positions", error);
      }
    };
    fetchPositions();
  }, []);



  useEffect(() => {
    async function fetchEvents() {
      try {
        const headers = { 'X-Company-ID': user.company };
        const response = await axios.get(`${kBaseURL}/dash/`, { headers });
  
        const events = await Promise.all(response.data.map(async (shift) => {
          let position = shift.position;
  
          // If position is just an ID, fetch the full position object
          if (position && typeof position === 'number') {
            const positionRes = await axios.get(`${kBaseURL}/team/positions/${position}/`, { headers });
            position = positionRes.data;
          }
  
          return {
            id: shift.id,
            title: position?.title || 'No Position',
            start: shift.starttime,
            end: new Date(new Date(shift.starttime).getTime() + parseDurationToMs(shift.duration)).toISOString(),
            allDay: false, 
            extendedProps: {
              shiftStatus: shift.status,
              recurring: shift.recurring,
              position,  // Now position is the full object
              // employee: shift.employee?.id,
              employee: shift.employee || null,
            }
          };
        }));
        const filteredEvents = events.filter(event => 
          // event.extendedProps.employee !== null && 
          event.extendedProps.employee === user.id
        );
        
        setCurrentEvents(filteredEvents);
        console.log("Filtered Event object:", filteredEvents);
  
        // setCurrentEvents(events);
        // console.log("Event object:", events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  
    fetchEvents();
  }, [user.company]);
  

  
  function parseDurationToMs(durationStr) {
    // Assumes durationStr is "HH:MM:SS"
    const parts = durationStr.split(':');
    if (parts.length !== 3) return 0;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  }
  

  const handleDateClick = (selected) => {
    setSelectedDateInfo(selected);
    // setShowForm(true);
    setEventDetailData(null);
    setShowEventDetail(false);
  };


  const handleEventClick = async (clickInfo) => {
    const shiftId = clickInfo.event.id;
    try {
      const headers = { 'X-Company-ID': user.company };
      const response = await axios.get(`${kBaseURL}/dash/${shiftId}/`, { headers });
      setEventDetailData(response.data);
      setShowEventDetail(true);
      setShowForm(false);
      setSelectedDateInfo(null);
    } catch (error) {
      console.error('Failed to fetch shift details:', error);
      alert('Failed to load shift data');
    }
  };

  const handleCloseDetail = () => {
    setShowEventDetail(false);
    setEventDetailData(null);
  };

  const handleUpdateShift = async (updatedData) => {
    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.put(`${kBaseURL}/dash/${updatedData.id}/`, {
        starttime: eventDetailData.starttime, 
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
            // title: updatedData.position,
            title: positionMap[updatedData.position] || `Position ${updatedData.position}`,
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

  const today = new Date();

  const upcomingEvents = currentEvents
            .filter(event => new Date(event.start) >= today)
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .slice(0, 10);  


  return (
    <Box className="calendar-container">
      <Pagetitles title="View Schedule" subtitle="Shift Scheduler" />
      <Box className="calendar-layout">

        {/* CALENDAR SIDEBAR */}
        <Box className="calendar-sidebar">
          <Typography variant="h5">Upcoming</Typography>
          <List>
            {upcomingEvents.map((event) => (
              <ListItem key={event.id} className="calendar-event">
                <ListItemText
                  primary={`${positionMap[event.position] || event.title} - ${employeeMap[event.extendedProps.employee] || 'Unassigned'}`}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      {": "}
                      {new Date(event.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {new Date(event.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
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
            // selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />

          {showForm && selectedDateInfo && (
            <NonManagerShiftForm
              user={user}
              onClose={() => {
                setShowForm(false);
                setSelectedDateInfo(null);
              }}
              onUpdate={handleUpdateShift}
            />
          )}

          {showEventDetail && eventDetailData && (
            <
            NonManagerDetail
              open={showEventDetail}
              eventData={eventDetailData}
              onClose={handleCloseDetail}
              onUpdate={handleUpdateShift}
              user={user}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NonManagerDash;
