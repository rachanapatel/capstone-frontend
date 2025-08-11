import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,} from "@mui/material";
import axios from "axios";
import './index.css';

const validationSchema = Yup.object({
  position: Yup.string().required('Position is required'),
  employee: Yup.string(),
  shiftStatus: Yup.string().required('Status is required'),
  recurring: Yup.boolean()
});

function ShiftForm({ onClose, onCreate, onUpdate, onDelete, user, shift = null }) {
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

  const handleDelete = async () => {
    if (!shift?.id) return;
    try {
      await axios.delete(`http://localhost:8000/dash/${shift.id}/`);
      onDelete?.(shift.id);
      onClose();
    } catch (err) {
      console.error('Error deleting shift:', err);
      alert('Failed to delete shift');
    }
  };

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
            } else {
              onCreate(values);
            }
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div>
                <label htmlFor="position">Position:</label>
                <Field
                  as="select"
                  name="position"
                  onChange={(e) => {
                    setFieldValue('position', e.target.value);
                    setFieldValue('employee', ''); 
                  }}
                >
                  <option value="">Select position</option>
                  {positions.map((pos) => {
                    const matchingEmployee = employees.find(
                      emp => emp.id === parseInt(values.employee)
                    );
                    const employeePositionId = matchingEmployee ? matchingEmployee.position : null;
                    const isSelectable = !values.employee || pos.id === employeePositionId;
                    return (
                      <option key={pos.id} value={pos.id} disabled={!isSelectable}>
                        {pos.title}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
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
                <ErrorMessage name="shiftStatus" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="employee">Employee:</label>
                <Field
                  as="select"
                  name="employee"
                  onChange={(e) => setFieldValue('employee', e.target.value)}
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => {
                    const hasPosition = !values.position || emp.position === parseInt(values.position);
                    return (
                      <option key={emp.id} value={emp.id} disabled={!hasPosition}>
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
                {shift && (
                  <Button onClick={handleDelete} color="error">
                    Delete
                  </Button>
                )}
                <Button type="submit" variant="contained">
                  {shift ? 'Save Changes' : 'Save'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ShiftForm;