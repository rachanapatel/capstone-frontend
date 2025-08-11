import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, IconButton, Typography,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function EmployeeDetail({ open, employeeData, onClose, onUpdate, onDelete, user }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [positionId, setPositionId] = useState(null);
  const [positions, setPositions] = useState([]);


  useEffect(() => {
    if (!open || !employeeData) return;

    setName(employeeData.name || "");
    setContact(employeeData.contact || "");
    setPositionId(employeeData.position?.id || null);
    setEditMode(false);


    async function fetchPositions() {
      try {
        const headers = { "X-Company-ID": user.company };
        const res = await axios.get("http://localhost:8000/team/positions/", {
          headers,
        });
        setPositions(res.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setPositions([]);
      }
    }

    fetchPositions();
  }, [open, employeeData, user.company]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    if (!positionId) {
      alert("Please select a position");
      return;
    }

    try {
      const headers = { "X-Company-ID": user.company };
      const payload = {
        name,
        contact,
        position_id: positionId,
      };
      console.log("Updating employee with payload:", payload);
      console.log("Using headers:", headers);
      const res = await axios.put(
        `http://localhost:8000/team/employees/${employeeData.id}/`,
        payload,
        { headers }
      );
      onUpdate(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating employee:", error);
      if (error.response) {
        console.error("Backend validation errors:", error.response.data);
      }
      alert("Failed to update employee");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete employee "${name}"?`)) return;
    try {
      const headers = { "X-Company-ID": user.company };
      await axios.delete(`http://localhost:8000/team/employees/${employeeData.id}/`, {
        headers,
      });
      onDelete(employeeData.id);
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    }
  };

  if (!employeeData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? "Edit Employee" : "Employee Details"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              variant="outlined"
              margin="normal"
              type="email"
            />
            <TextField
              select
              fullWidth
              label="Position"
              value={positionId || ""}
              onChange={(e) => setPositionId(e.target.value)}
              variant="outlined"
              margin="normal"
            >
              {positions.map((pos) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.title}
                </MenuItem>
              ))}
            </TextField>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {employeeData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Contact: {employeeData.contact || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Position: {employeeData.position?.title || "N/A"}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onClose}>Close</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDetail;