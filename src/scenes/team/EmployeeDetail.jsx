// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, CircularProgress, Box,} from "@mui/material";
// import axios from "axios";

// function EmployeeDetail({ open, employeeId, onClose, onUpdated, onDeleted, user }) {
//   const [loading, setLoading] = useState(false);
//   const [positionsLoading, setPositionsLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [positions, setPositions] = useState([]);
//   const [employee, setEmployee] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(""); // corresponds to backend contact
//   const [position, setPosition] = useState("");

//   // Fetch positions list on open
//   useEffect(() => {
//     if (!open) return;

//     async function fetchPositions() {
//       setPositionsLoading(true);
//       try {
//         const headers = { "X-Company-ID": user.company };
//         const res = await axios.get("http://localhost:8000/team/positions/", { headers });
//         setPositions(res.data);
//       } catch (error) {
//         console.error("Error fetching positions:", error);
//         alert("Failed to load positions");
//       } finally {
//         setPositionsLoading(false);
//       }
//     }
//     fetchPositions();
//   }, [open, user.company]);

//   // Fetch employee details when modal opens or employeeId changes
//   useEffect(() => {
//     if (!open || !employeeId) return;

//     async function fetchEmployee() {
//       setLoading(true);
//       try {
//         const headers = { "X-Company-ID": user.company };
//         const res = await axios.get(`http://localhost:8000/team/employees/${employeeId}`, { headers });
//         setEmployee(res.data);
//         setName(res.data.name || "");
//         setEmail(res.data.contact || "");
//         setPosition(res.data.position || "");
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//         alert("Failed to load employee data");
//         onClose();
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchEmployee();
//   }, [open, employeeId, user.company, onClose]);

//   const handleSave = async () => {
//     if (!name.trim() || !position) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     setSaving(true);
//     try {
//       const headers = { "X-Company-ID": user.company };
//       await axios.put(
//         `http://localhost:8000/team/employees/${employeeId}`,
//         {
//           name,
//           contact: email,
//           position,
//           company: employee.company, // keep company same
//         },
//         { headers }
//       );
//       alert("Employee updated successfully");
//       onUpdated();
//       onClose();
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       alert("Failed to update employee");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm(`Delete employee "${name}"? This action cannot be undone.`)) return;
//     setDeleting(true);
//     try {
//       const headers = { "X-Company-ID": user.company };
//       await axios.delete(`http://localhost:8000/team/employees/${employeeId}`, { headers });
//       alert("Employee deleted");
//       onDeleted();
//       onClose();
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//       alert("Failed to delete employee");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Employee Details</DialogTitle>
//       <DialogContent dividers>
//         {(loading || positionsLoading) && (
//           <Box display="flex" justifyContent="center" alignItems="center" p={2}>
//             <CircularProgress />
//           </Box>
//         )}

//         {!loading && !positionsLoading && (
//           <>
//             <TextField
//               label="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//               disabled={saving || deleting}
//             />
//             <TextField
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//               disabled={saving || deleting}
//             />
//             <TextField
//               select
//               label="Position"
//               value={position}
//               onChange={(e) => setPosition(e.target.value)}
//               fullWidth
//               margin="normal"
//               required
//               disabled={saving || deleting}
//             >
//               <MenuItem value="">
//                 <em>Select Position</em>
//               </MenuItem>
//               {positions.map((pos) => (
//                 <MenuItem key={pos.id} value={pos.id}>
//                   {pos.title}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} disabled={saving || deleting}>
//           Cancel
//         </Button>
//         <Button
//           color="error"
//           onClick={handleDelete}
//           disabled={saving || deleting || loading || positionsLoading}
//         >
//           Delete
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handleSave}
//           disabled={saving || deleting || loading || positionsLoading}
//         >
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default EmployeeDetail;
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function EmployeeDetail({ open, employeeData, onClose, onUpdate, onDelete, user }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [positionId, setPositionId] = useState(null);
  const [positions, setPositions] = useState([]);

  // Load employee details and positions when modal opens or employeeData changes
  useEffect(() => {
    if (!open || !employeeData) return;

    setName(employeeData.name || "");
    setContact(employeeData.contact || "");
    setPositionId(employeeData.position?.id || null);
    setEditMode(false);

    // Fetch positions for company dropdown
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
        position: positionId,
      };
      const res = await axios.put(
        `http://localhost:8000/team/employees/${employeeData.id}/`,
        payload,
        { headers }
      );
      onUpdate(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating employee:", error);
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
