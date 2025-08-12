import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography, CircularProgress,} from "@mui/material";
import axios from "axios";

const kBaseURL='http://localhost:8000';
// const kBaseURL = 'https://ets-trial-backend.onrender.com';

export default function EmployeeModal({ employeeId, open, onClose }) {
  const [mode, setMode] = useState("view"); // 'view' | 'edit' | 'addPosition'
  const [loading, setLoading] = useState(false);

  const [employee, setEmployee] = useState(null);
  const [positions, setPositions] = useState([]);

  // Form state for editing employee
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    position: "",
  });

  // Form state for new position
  const [newPositionName, setNewPositionName] = useState("");
  const [positionSubmitting, setPositionSubmitting] = useState(false);

  // Fetch employee and positions on open or employeeId change
  useEffect(() => {
    if (!employeeId || !open) return;

    setLoading(true);
    const fetchEmployee = axios.get(`${kBaseURL}/team/employees/${employeeId}`);
    const fetchPositions = axios.get(`${kBaseURL}/team/positions/`);

    Promise.all([fetchEmployee, fetchPositions])
      .then(([empRes, posRes]) => {
        setEmployee(empRes.data);
        setPositions(posRes.data);

        setFormData({
          name: empRes.data.name,
          contact: empRes.data.contact,
          position: empRes.data.position,
        });
      })
      .catch((err) => {
        console.error("Failed to load employee or positions", err);
      })
      .finally(() => setLoading(false));
  }, [employeeId, open]);

  // Handlers for employee form inputs
  const handleInputChange = (field) => (e) => {
    setFormData((f) => ({ ...f, [field]: e.target.value }));
  };

  // Handle employee update submission
  const handleSave = () => {
    setLoading(true);
    axios
      .put(`/team/employees/${employeeId}`, formData)
      .then((res) => {
        setEmployee(res.data);
        setMode("view");
      })
      .catch((err) => {
        console.error("Failed to update employee", err);
        alert("Failed to update employee. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  // Handle employee deletion
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete employee "${employee?.name}"?`
      )
    ) {
      setLoading(true);
      axios
        .delete(`/team/employees/${employeeId}`)
        .then(() => {
          onClose(true); // pass true to indicate deletion happened
        })
        .catch((err) => {
          console.error("Failed to delete employee", err);
          alert("Failed to delete employee. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  // Handlers for Add Position form
  const handleAddPositionSubmit = () => {
    if (!newPositionName.trim()) return;

    setPositionSubmitting(true);
    axios
      .post(`/team/positions`, { name: newPositionName.trim() })
      .then((res) => {
        const newPos = res.data;
        setPositions((prev) => [...prev, newPos]);
        setFormData((f) => ({ ...f, position: newPos.id }));
        setNewPositionName("");
        setMode("edit");
      })
      .catch((err) => {
        console.error("Failed to add position", err);
        alert("Failed to add position. Please try again.");
      })
      .finally(() => setPositionSubmitting(false));
  };

  // Render helpers
  if (!open) return null;

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "view"
          ? "Employee Details"
          : mode === "edit"
          ? "Edit Employee"
          : "Add New Position"}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <CircularProgress />
          </div>
        ) : mode === "view" ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Name:</strong> {employee?.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Contact:</strong> {employee?.contact || "-"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Position:</strong>{" "}
              {positions.find((p) => p.id === employee?.position)?.name || "-"}
            </Typography>
          </>
        ) : mode === "edit" ? (
          <>
            <TextField
              label="Name"
              value={formData.name}
              onChange={handleInputChange("name")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact"
              value={formData.contact}
              onChange={handleInputChange("contact")}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Position"
              value={formData.position || ""}
              onChange={handleInputChange("position")}
              fullWidth
              margin="normal"
            >
              {positions.map((pos) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.name}
                </MenuItem>
              ))}
              <MenuItem
                value="add-new-position"
                onClick={() => setMode("addPosition")}
                style={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                + Add New Position
              </MenuItem>
            </TextField>
          </>
        ) : mode === "addPosition" ? (
          <>
            <TextField
              label="New Position Name"
              value={newPositionName}
              onChange={(e) => setNewPositionName(e.target.value)}
              fullWidth
              margin="normal"
              disabled={positionSubmitting}
            />
          </>
        ) : null}
      </DialogContent>

      <DialogActions>
        {mode === "view" && (
          <>
            <Button onClick={() => onClose(false)}>Close</Button>
            <Button variant="contained" onClick={() => setMode("edit")}>
              Edit
            </Button>
          </>
        )}

        {mode === "edit" && (
          <>
            <Button onClick={() => setMode("view")}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              Save
            </Button>
          </>
        )}

        {mode === "addPosition" && (
          <>
            <Button onClick={() => setMode("edit")} disabled={positionSubmitting}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddPositionSubmit}
              disabled={positionSubmitting}
            >
              {positionSubmitting ? "Saving..." : "Save Position"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
