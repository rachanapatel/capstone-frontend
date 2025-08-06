// const Dashboard = () => {
//     return <div>Dashboard</div>

// };

// export default Dashboard;


// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import { formatDate } from '@fullcalendar/core';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
// import Pagetitles from "../../Pagetitles";
// import Header from "../global/header";
// // import { tokens } from "../../theme";

// // Import the CSS file
// // import './Calendar.css';
// import './index.css';

// const Dashboard = () => {
//   const theme = useTheme();
// //   const colors = tokens(theme.palette.mode);
//   const [currentEvents, setCurrentEvents] = useState([]);

//   const handleDateClick = (selected) => {
//     const title = prompt("Please enter a new title for your event");
//     const calendarApi = selected.view.calendar;
//     calendarApi.unselect();

//     if (title) {
//       calendarApi.addEvent({
//         id: `${selected.dateStr}-${title}`,
//         title,
//         start: selected.startStr,
//         end: selected.endStr,
//         allDay: selected.allDay,
//       });
//     }
//   };

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
//       <Pagetitles title="Dashboard" subtitle="Full Calendar Interactive Page" />

//       <Box className="calendar-header">
//         {/* CALENDAR SIDEBAR */}
//         <Box className="calendar-sidebar" style={{ backgroundColor: colors.primary[400] }}>
//           <Typography className="calendar-sidebar-title">Events</Typography>
//           <List>
//             {currentEvents.map((event) => (
//               <ListItem key={event.id} className="calendar-event-item" style={{ backgroundColor: colors.greenAccent[500] }}>
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
//         <Box className="calendar-calendar-container">
//           <FullCalendar
//             height="75vh"
//             plugins={[
//               dayGridPlugin,
//               timeGridPlugin,
//               interactionPlugin,
//               listPlugin,
//             ]}
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
//             // initialEvents={[
//             //   {
//             //     id: "12315",
//             //     title: "All-day event",
//             //     date: "2022-09-14",
//             //   },
//             //   {
//             //     id: "5123",
//             //     title: "Timed event",
//             //     date: "2022-09-28",
//             //   },
//             // ]}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// ✅ Yup validation schema
const validationSchema = Yup.object({
  position: Yup.string()
    .required('Position is required')
    .min(1, 'Position must be at least 1 character'),
  employee: Yup.string(),
  shift_status: Yup.string()
    .required('Status is required'),
  recurring: Yup.boolean()
    // .oneOf([true], 'You must accept the terms'),
});

function ShiftForm() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Shift Form</h2>
      <Formik
        initialValues={{
          position: '',
          employee: '',
          shift_status: '',
          recurring: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form>

            <div>
              <label htmlFor="position">Position:</label>
              <Field type="text" name="position" />
              <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="shift-status">Shift Status:</label>
              <Field type="text" name="email" />
              <ErrorMessage name="shift-status" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="employee">Employee:</label>
              <Field type="text" name="employee" />
              {/* <ErrorMessage name="password" component="div" style={{ color: 'red' }} /> */}
            </div>

            <div>
              <label>
                <Field type="checkbox" name="recurring" />
                Recurring shift
              </label>
              <ErrorMessage name="recurring" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}

// export default ShiftForm;




import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Pagetitles from "../../Pagetitles";
import Header from "../global/header";
import './index.css';


// import { useState } from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
// import Header from "../../components/Header";
// import './Calendar.css'; // Import CSS file



// class Shift(models.Model):
//     shift_status_options = {"prop": "Proposed", 
//                       "acc": "Accepted", 
//                       "pref": "Preferred", 
//                       "rej" : "Rejected"}
//     duration = models.DurationField()
//     starttime = models.DateTimeField()
//     status = models.CharField(choices=shift_status_options, default="prop")
//     recurring = models.BooleanField(default=False)
// # deleting a position deletes associated shifts BUT deleting an employee just sets the employee to null (bc its optional)
//     employee = models.ForeignKey(Employee, related_name='shifts', on_delete=models.SET_NULL, null=True, blank=True)
//     position = models.ForeignKey(Position, related_name='shifts', on_delete=models.CASCADE) 


const Dashboard = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

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
      <Pagetitles title="Calendar" subtitle="Shift Scheduler" />

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
            // initialEvents={[
            //   { id: "12315", title: "All-day event", date: "2022-09-14" },
            //   { id: "5123", title: "Timed event", date: "2022-09-28" },
            // ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
