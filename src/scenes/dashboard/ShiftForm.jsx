// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import './index.css';
// import axios from "axios"; 


// // ✅ Yup validation schema
// const validationSchema = Yup.object({
//   position: Yup.string().required('Position is required'),
//   employee: Yup.string(),
//   shiftStatus: Yup.string().required('Status is required'),
//   recurring: Yup.boolean()
// });


// function ShiftForm({ onClose, onCreate, user }) {
//     useEffect(() => {
//         console.log("ShiftForm user:", user);
//       }, [user]);    

//   const [positions, setPositions] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedPosition, setSelectedPosition] = useState('');

  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { 'X-Company-ID': user.company };
//         const [positionsRes, employeesRes] = await Promise.all([
//           axios.get('http://localhost:8000/team/positions/', { headers }),
//           axios.get('http://localhost:8000/team/employees/', { headers }),
//         ]);
  
//         setPositions(positionsRes.data);
//         setEmployees(employeesRes.data);
//         console.log("Fetched positions:", positionsRes.data);
//         console.log("Fetched employees:", employeesRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [user.company]);
  

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>Create Shift</DialogTitle>
//       <DialogContent dividers>
//         <Formik
//           initialValues={{
//             position: '',
//             employee: '',
//             shiftStatus: '',
//             recurring: false,
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log("Submitting shift form values:", values);
//             onCreate(values); 
//             onClose();        
//           }}
//         >
//           <Form>
//             <div>
//               <label htmlFor="position">Position:</label>
//               <Field as="select" name="position">
//                 <option value="">Select position</option>
//                 {positions.map((pos) => (
//                   <option key={pos.id} value={pos.id}>
//                     {pos.title}
//                   </option>
//                 ))}
//               </Field>
//               <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
//             </div>
//             <div>
//               <label htmlFor="shift-status">Shift Status:</label>
//               <Field as="select" name="shiftStatus">
//                 <option value="">Select shift status</option>
//                 <option value="prop">Proposed</option>
//                 <option value="acc">Accepted</option>
//                 <option value="pref">Preferred</option>
//                 <option value="rej">Rejected</option>
//               </Field>
//               <ErrorMessage name="shiftStatus" component="div" style={{ color: 'red' }} />
//             </div>
//             <div>
//               <label htmlFor="employee">Employee:</label>
//               <Field as="select" name="employee">
//                 <option value="">Select employee</option>
//                 {employees.map((emp) => (
//                   <option key={emp.id} value={emp.id}>
//                     {emp.name}
//                   </option>
//                 ))}
//               </Field>
//             </div>
//             <div>
//               <label>
//                 <Field type="checkbox" name="recurring" />
//                 Recurring shift
//               </label>
//               <ErrorMessage name="recurring" component="div" style={{ color: 'red' }} />
//             </div>            
//             <DialogActions>
//               <Button onClick={onClose}>Cancel</Button>
//               <Button type="submit" variant="contained">Save</Button>
//             </DialogActions>
//           </Form>
//         </Formik>
//       </DialogContent>
//     </Dialog>
//   );
// }


// export default ShiftForm



import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import './index.css';

const validationSchema = Yup.object({
  position: Yup.string().required('Position is required'),
  employee: Yup.string(),
  shiftStatus: Yup.string().required('Status is required'),
  recurring: Yup.boolean()
});

function ShiftForm({ onClose, onCreate, user }) {
  const [positions, setPositions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');


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
            shiftStatus: '',
            recurring: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onCreate(values);
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <label htmlFor="position">Position:</label>
                {/* <Field
                  as="select"
                  name="position"
                  onChange={(e) => {
                    const val = e.target.value;
                    setFieldValue('position', val);
                    setSelectedPosition(val);
                    setFieldValue('employee', ''); // reset employee on position change
                  }}
                  value={values.position}
                >
                  <option value="">Select position</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.title}
                    </option>
                  ))}
                </Field> */}
                {/* <ErrorMessage name="position" component="div" style={{ color: 'red' }} /> */}
                <Field as="select" name="position" value={values.position}
                onChange={(e) => {
                    const val = e.target.value;
                    setFieldValue('position', val);
                    setSelectedPosition(val);
                }}>
                <option value="">Select position</option>
                {positions.map((pos) => {
                    const matchingEmployee = employees.find(emp => emp.id === parseInt(selectedEmployee));
                    const employeePositionId = matchingEmployee ? matchingEmployee.position : null;

                    const isSelectable =
                    selectedEmployee === '' || pos.id === employeePositionId;

                    return (
                    <option
                        key={pos.id}
                        value={pos.id}
                        disabled={!isSelectable}
                    >
                        {pos.title}
                    </option>
                    );
                })}
                </Field>
              </div>
              <div>
                <label htmlFor="shiftStatus">Shift Status:</label>
                <Field as="select" name="shiftStatus" value={values.shiftStatus}>
                  <option value="">Select shift status</option>
                  <option value="prop">Proposed</option>
                  <option value="acc">Accepted</option>
                  <option value="pref">Preferred</option>
                  <option value="rej">Rejected</option>
                </Field>
                <ErrorMessage name="shiftStatus" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="employee">Employee:</label>
                {/* <Field as="select" name="employee" value={values.employee}>
                  <option value="">Select employee</option>
                  {employees.map((emp) => {
                    // Assumes employee.positions is an array of position IDs (numbers)
                    // const hasPosition =
                    //   selectedPosition === '' ||
                    //   (emp.positions && emp.positions.includes(parseInt(selectedPosition)));
                    const hasPosition =
                      selectedPosition === '' ||
                      emp.position === parseInt(selectedPosition);                      
                    return (
                      <option
                        key={emp.id}
                        value={emp.id}
                        disabled={!hasPosition}
                      >
                        {emp.name}
                      </option>
                    );
                  })}
                </Field> */}
                <Field as="select" name="employee" value={values.employee}
                onChange={(e) => {
                    const val = e.target.value;
                    setFieldValue('employee', val);
                    setSelectedEmployee(val);
                }}>
                <option value="">Select employee</option>
                {employees.map((emp) => {
                    const hasPosition =
                    selectedPosition === '' || emp.position === parseInt(selectedPosition);
                    return (
                    <option
                        key={emp.id}
                        value={emp.id}
                        disabled={!hasPosition}>
                        {emp.name}
                    </option>
                    );
                })}
                </Field>
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="recurring" />
                  Recurring shift
                </label>
              </div>

              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ShiftForm;
