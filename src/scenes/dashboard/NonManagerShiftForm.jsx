import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,} from "@mui/material";
import axios from "axios";
import './index.css';


const kBaseURL = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object({
  position: Yup.string().required('Position is required'),
  employee: Yup.string(),
  shiftStatus: Yup.string().required('Status is required'),
  recurring: Yup.boolean()
});


function NonManagerShiftForm({ onClose, onUpdate, user, shift = null}) {
    const [positions, setPositions] = useState([]);
    const [employees, setEmployees] = useState([]);
    console.log("shift prop:", shift); 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const headers = { 'X-Company-ID': user.company };
          const [positionsRes, employeesRes] = await Promise.all([
            axios.get(`${kBaseURL}/team/positions/`, { headers }),
            axios.get(`${kBaseURL}/team/employees/`, { headers }),
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
      <DialogTitle>{shift ? 'Update Shift' : 'Create Shift'}</DialogTitle>
      <DialogContent dividers>
        <Formik
          enableReinitialize
          initialValues={{
            position: shift?.position?.toString() || '',
            employee: shift?.employee?.toString() || '',
            shiftStatus: shift?.status || '',
            recurring: shift?.recurring || false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (shift) {
              onUpdate?.({ ...values, id: shift.id });
            }
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <label htmlFor="position">Position:</label>
                <Field
                  as="input"
                  name="position"
                  // value={values.position ? positions.find(p => p.id === parseInt(values.position))?.title : 'N/A'}
                  value={shift.positionStr || 'N/A'}
                  disabled
                />
              </div>
  
              <div>
                <label htmlFor="employee">Employee:</label>
                <Field
                  as="input"
                  name="employee"
                  // value={values.employee ? employees.find(e => e.id === parseInt(values.employee))?.name : 'Unassigned'}
                  value={shift?.employeeStr || 'Unassigned'}
                  disabled
                />
              </div>
  
              <div>
                <label htmlFor="shiftStatus">Shift Status:</label>
                <Field as="select" name="shiftStatus">
                  <option value="">Select shift status</option>
                  <option value="prop">Proposed</option>
                  <option value="acc">Accepted</option>
                  <option value="pref">Preferred</option>
                  <option value="rej">Rejected</option>
                </Field>
              </div>
  
              <div>
                <label>
                  <Field type="checkbox" name="recurring" disabled />
                  Recurring shift
                </label>
              </div>
  
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default NonManagerShiftForm