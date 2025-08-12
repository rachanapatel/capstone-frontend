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

const kBaseURL='http://localhost:8000';
// const kBaseURL = 'https://ets-trial-backend.onrender.com';

const NonManagerDash = ({ user }) => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);
    const [eventDetailData, setEventDetailData] = useState(null);
    const [showEventDetail, setShowEventDetail] = useState(false);
  
    
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const userId = savedUser ? savedUser.id : user.id;  
  
    console.log("User from localStorage:", savedUser);
    console.log("User's Position:", savedUser?.position);
  
    useEffect(() => {
      async function fetchEvents() {
        try {
          const headers = { 'X-Company-ID': user.company };
          const response = await axios.get(`${kBaseURL}/dash/`, { headers });
          const events = response.data
            .filter(shift => shift.employee?.id === userId)  
            .map(shift => ({
              id: shift.id,
              title: shift.position?.title || 'No Position',
              start: shift.starttime,
              end: new Date(new Date(shift.starttime).getTime() + parseDurationToMs(shift.duration)).toISOString(),
              allDay: false, 
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
    }, [user.company, userId]);

  function parseDurationToMs(durationStr) {
    const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
  
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
  
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
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
        // starttime: eventDetailData.starttime, 
        // duration: eventDetailData.duration,
        status: updatedData.shiftStatus,
        // recurring: updatedData.recurring,
        // position: updatedData.position,
        // employee: updatedData.employee || null,
      }, { headers });

      setCurrentEvents((prevEvents) => prevEvents.map(evt => {
        if (evt.id === updatedData.id) {
          return {
            ...evt,
            // title: updatedData.position,
            extendedProps: {
              ...evt.extendedProps,
              shiftStatus: updatedData.shiftStatus,
            //   recurring: updatedData.recurring,
            //   position: updatedData.position,
            //   employee: updatedData.employee || null,
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


  return (
    <Box className="calendar-container">
      <Pagetitles title="Your Schedule" 
      />
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
            // select={handleDateClick}
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
              user={user}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NonManagerDash;