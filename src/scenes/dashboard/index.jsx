import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Pagetitles from "../../Pagetitles";
import './index.css';
import axios from "axios"; 
import { useEffect} from 'react';

// ✅ Yup validation schema
const validationSchema = Yup.object({
  position: Yup.string()
    .required('Position is required')
    .min(1, 'Position must be at least 1 character'),
  employee: Yup.string(),
  shift_status: Yup.string()
    .required('Status is required'),
  recurring: Yup.boolean()
});


function ShiftForm({ onClose, onCreate, user }) {

  const [positions, setPositions] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'X-Company-ID': user.company };
  
        const [positionsRes, employeesRes] = await Promise.all([
          axios.get('http://localhost:8000/team/positions/', { headers }),
          axios.get('http://localhost:8000/team/employees/', { headers }),
        ]);
  
        setPositions(positionsRes.data);
        setEmployees(employeesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [user.company]);
  


  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Create Shift</DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            position: '',
            employee: '',
            shift_status: '',
            recurring: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onCreate(values); 
            onClose();        
          }}
        >
          <Form>
            {/* <div>
              <label htmlFor="position">Position:</label>
              <Field as="select" name="position">
              </Field>
              <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
            </div> */}

            <div>
              <label htmlFor="position">Position:</label>
              <Field as="select" name="position">
                <option value="">Select position</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
            </div>


            
            <div>
              <label htmlFor="shift-status">Shift Status:</label>
              <Field as="select" name="shiftStatus">
                <option value="">Select shift status</option>
                <option value="active">Proposed</option>
                <option value="inactive">Accepted</option>
                <option value="pending">Preferred</option>
                <option value="pending">Rejected</option>
              </Field>
              <ErrorMessage name="shiftStatus" component="div" style={{ color: 'red' }} />
            </div>
            {/* <div>
              <label htmlFor="employee">Employee:</label>
              <Field type="text" name="employee" />
            </div> */}
            <div>
              <label htmlFor="employee">Employee:</label>
              <Field as="select" name="employee">
                <option value="">Select employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </Field>
              {/* <ErrorMessage name="employee" component="div" style={{ color: 'red' }} /> */}
            </div>
            <div>
              <label>
                <Field type="checkbox" name="recurring" />
                Recurring shift
              </label>
              <ErrorMessage name="recurring" component="div" style={{ color: 'red' }} />
            </div>            
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}



const Dashboard = () => {
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
      status: "prop", // default for now
      recurring: false, // or formData.recurring if you have that
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
