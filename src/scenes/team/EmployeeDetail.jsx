import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress, Box,} from "@mui/material";
import axios from "axios";

function EmployeeDetailModal({ open, employeeId, onClose, onUpdated, onDeleted, user }) {
  const [loading, setLoading] = useState(false);
  const [positionsLoading, setPositionsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [positions, setPositions] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // corresponds to backend contact
  const [position, setPosition] = useState("");

  // Fetch positions list on open
  useEffect(() => {
    if (!open) return;

    async function fetchPositions() {
      setPositionsLoading(true);
      try {
        const headers = { "X-Company-ID": user.company };
        const res = await axios.get("http://localhost:8000/team/positions/", { headers });
        setPositions(res.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
        alert("Failed to load positions");
      } finally {
        setPositionsLoading(false);
      }
    }
    fetchPositions();
  }, [open, user.company]);

  // Fetch employee details when modal opens or employeeId changes
  useEffect(() => {
    if (!open || !employeeId) return;

    async function fetchEmployee() {
      setLoading(true);
      try {
        const headers = { "X-Company-ID": user.company };
        const res = await axios.get(`http://localhost:8000/team/employees/${employeeId}`, { headers });
        setEmployee(res.data);
        setName(res.data.name || "");
        setEmail(res.data.contact || "");
        setPosition(res.data.position || "");
      } catch (error) {
        console.error("Error fetching employee details:", error);
        alert("Failed to load employee data");
        onClose();
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [open, employeeId, user.company, onClose]);

  const handleSave = async () => {
    if (!name.trim() || !position) {
      alert("Please fill all required fields.");
      return;
    }
    setSaving(true);
    try {
      const headers = { "X-Company-ID": user.company };
      await axios.put(
        `http://localhost:8000/team/employees/${employeeId}`,
        {
          name,
          contact: email,
          position,
          company: employee.company, // keep company same
        },
        { headers }
      );
      alert("Employee updated successfully");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete employee "${name}"? This action cannot be undone.`)) return;
    setDeleting(true);
    try {
      const headers = { "X-Company-ID": user.company };
      await axios.delete(`http://localhost:8000/team/employees/${employeeId}`, { headers });
      alert("Employee deleted");
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Employee Details</DialogTitle>
      <DialogContent dividers>
        {(loading || positionsLoading) && (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CircularProgress />
          </Box>
        )}

        {!loading && !positionsLoading && (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled={saving || deleting}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              disabled={saving || deleting}
            />
            <TextField
              select
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
              margin="normal"
              required
              disabled={saving || deleting}
            >
              <MenuItem value="">
                <em>Select Position</em>
              </MenuItem>
              {positions.map((pos) => (
                <MenuItem key={pos.id} value={pos.id}>
                  {pos.title}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving || deleting}>
          Cancel
        </Button>
        <Button
          color="error"
          onClick={handleDelete}
          disabled={saving || deleting || loading || positionsLoading}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving || deleting || loading || positionsLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDetailModal;
