import React from 'react';
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Pagetitles from "../../Pagetitles";
import './index.css';
import axios from "axios"; 
import ShiftForm from './ShiftForm';

const Dashboard = ( { user } ) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);
  
  const handleDateClick = (selected) => {
    setSelectedDateInfo(selected); // Store the clicked date info
    setShowForm(true);             // Show the form
  };

const handleCreateEvent = async (formData) => {
  const calendarApi = selectedDateInfo.view.calendar;
  calendarApi.unselect(); // clear selection

  const newEvent = {
    id: `${selectedDateInfo.dateStr}-${formData.title}`,
    title: formData.title,
    description: formData.description,
    category: formData.category,
    start: selectedDateInfo.startStr,
    end: selectedDateInfo.endStr,
    allDay: selectedDateInfo.allDay,
  };

  // Add event to calendar immediately (local UI feedback)
  calendarApi.addEvent(newEvent);

  // Create backend shift object
  try {
    await axios.post("http://localhost:8000/dash/", {
      starttime: selectedDateInfo.startStr,
      duration: calculateDuration(selectedDateInfo.startStr, selectedDateInfo.endStr),
      status: formData.shiftStatus,  
      recurring: formData.recurring,
      position: formData.position,   
      employee: formData.employee || null,      
    });
    console.log("Shift saved successfully.");
  } catch (error) {
    console.error("Error saving shift:", error);
    alert("Failed to save shift to backend.");
  }
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


  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
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
            eventsSet={(events) => setCurrentEvents(events)}
          />
          {showForm && selectedDateInfo && (
            <ShiftForm
              // dateInfo={selectedDateInfo}
              user={user}
              onClose={() => setShowForm(false)}
              onCreate={handleCreateEvent}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;