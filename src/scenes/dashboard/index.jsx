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

// const kBaseURL='http://localhost:8000';
const kBaseURL = import.meta.env.VITE_API_URL;


const Dashboard = ({ user }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  const [eventDetailData, setEventDetailData] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [positionMap, setPositionMap] = useState({});
  const [employeeMap, setEmployeeMap] = useState([]);

  const savedUser = JSON.parse(localStorage.getItem('user'));
  console.log("User from localStorage:", savedUser);
  console.log("User's Position:", savedUser.position);
  console.log("another test")

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
    async function fetchEmployees() {
      try {
        const headers = { 'X-Company-ID': user.company };
        const response = await axios.get(`${kBaseURL}/team/employees/`, { headers });
        const map = {};
        console.log("Fetched employees:", response.data);
        response.data.forEach(emp => {
          map[emp.id] = emp.name;
        });
        setEmployeeMap(map);
        console.log("Employee Map:", map);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    }
    fetchEmployees();
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
              position,  
              employee: shift.employee || null,
            }
          };
        }));
  
        setCurrentEvents(events);
        console.log("Event object:", events);
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
    setShowForm(true);
    setEventDetailData(null);
    setShowEventDetail(false);
  };

  const handleCreateEvent = async (formData) => {
    const calendarApi = selectedDateInfo.view.calendar;
    calendarApi.unselect();
  
    const startISO = selectedDateInfo.startStr;
    const endISO = selectedDateInfo.endStr;
  
    try {
      const headers = { 'X-Company-ID': user.company };
      const res = await axios.post(`${kBaseURL}/dash/`, {
        starttime: startISO,
        duration: calculateDuration(startISO, endISO),
        status: formData.shiftStatus,
        recurring: formData.recurring,
        position: formData.position,
        employee: formData.employee || null,
      }, { headers });
  
      const shift = res.data;
  
      const newEvent = {
        id: shift.id,
        // title: `${shift.position.title}${shift.employee ? ` - ${shift.employee.name}` : ''}`,
        title: positionMap[formData.position] || `Position ${formData.position}`,
        start: startISO,
        end: endISO,
        allDay: selectedDateInfo.allDay,
        extendedProps: {
          shiftStatus: shift.status,
          recurring: shift.recurring,
          position: shift.position,
          employee: shift.employee || null,
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

  const handleDeleteShift = async (idToDelete) => {
    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.delete(`${kBaseURL}/dash/${idToDelete}/`, { headers });

      setCurrentEvents((prevEvents) => prevEvents.filter(evt => evt.id !== idToDelete));
      alert('Shift deleted');
      handleCloseDetail();
    } catch (error) {
      console.error('Failed to delete shift:', error);
      alert('Failed to delete shift');
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