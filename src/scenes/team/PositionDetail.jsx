// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, Typography, IconButton,} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// function PositionDetail({ open, positionId, onClose, onUpdated, user, onOpenEmployee }) {
//   const [positionData, setPositionData] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState("");

//   // Fetch position details and employees when positionId changes or modal opens
//   useEffect(() => {
//     if (!open || !positionId) return;

//     async function fetchData() {
//       try {
//         const headers = { "X-Company-ID": user.company };

//         // Fetch position info
//         const posRes = await axios.get(
//           `http://localhost:8000/team/positions/${positionId}`,
//           { headers }
//         );
//         setPositionData(posRes.data);
//         setTitle(posRes.data.title || "");

//         // Fetch employees linked to this position
//         const empRes = await axios.get("http://localhost:8000/team/employees/", {
//           headers,
//           params: { position: positionId }, // assuming backend can filter by position ID
//         });
//         setEmployees(empRes.data);
//       } catch (error) {
//         console.error("Error fetching position or employees:", error);
//       }
//     }

//     fetchData();
//   }, [open, positionId, user.company]);

//   const handleSave = async () => {
//     if (!title.trim()) {
//       alert("Position title cannot be empty");
//       return;
//     }
//     try {
//       const headers = { "X-Company-ID": user.company };
//       await axios.put(
//         `http://localhost:8000/team/positions/${positionId}`,
//         { title },
//         { headers }
//       );
//       setEditMode(false);
//       onUpdated(); // notify parent to refresh list or update UI
//     } catch (error) {
//       console.error("Error updating position:", error);
//       alert("Failed to update position");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm(`Are you sure you want to delete position "${title}"?`)) return;
//     try {
//       const headers = { "X-Company-ID": user.company };
//       await axios.delete(`http://localhost:8000/team/positions/${positionId}`, {
//         headers,
//       });
//       onUpdated(); // notify parent to refresh
//       onClose();
//     } catch (error) {
//       console.error("Error deleting position:", error);
//       alert("Failed to delete position");
//     }
//   };

//   if (!positionData) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         {editMode ? "Edit Position" : "Position Details"}
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent dividers>
//         {editMode ? (
//           <TextField
//             fullWidth
//             label="Position Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             variant="outlined"
//             margin="normal"
//           />
//         ) : (
//           <Typography variant="h6" gutterBottom>
//             {title}
//           </Typography>
//         )}

//         <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
//           Employees in this Position:
//         </Typography>
//         {employees.length ? (
//           <List dense>
//             {employees.map((emp) => (
//               <ListItem
//                 button={!!onOpenEmployee}
//                 key={emp.id}
//                 onClick={() => onOpenEmployee && onOpenEmployee(emp.id)}
//               >
//                 <ListItemText primary={emp.name} />
//               </ListItem>
//             ))}
//           </List>
//         ) : (
//           <Typography color="text.secondary">No employees assigned.</Typography>
//         )}
//       </DialogContent>

//       <DialogActions>
//         {editMode ? (
//           <>
//             <Button onClick={() => setEditMode(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSave}>
//               Save
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button onClick={onClose}>Close</Button>
//             <Button color="error" onClick={handleDelete}>
//               Delete
//             </Button>
//             <Button variant="contained" onClick={() => setEditMode(true)}>
//               Edit
//             </Button>
//           </>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default PositionDetail;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function PositionDetail({ open, positionData, onClose, onUpdate, onDelete, user, onOpenEmployee }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [employees, setEmployees] = useState([]);

  // Load position and employees when positionData changes or modal opens
  useEffect(() => {
    if (!open || !positionData) return;

    setTitle(positionData.title || "");
    setEditMode(false);

    // Fetch employees for this position
    async function fetchEmployees() {
      try {
        const headers = { "X-Company-ID": user.company };
        const res = await axios.get("http://localhost:8000/team/employees/", {
          headers,
          params: { position: positionData.id },
        });
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees for position:", error);
        setEmployees([]);
      }
    }

    fetchEmployees();
  }, [open, positionData, user.company]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Position title cannot be empty");
      return;
    }
    try {
      const headers = { "X-Company-ID": user.company };
      const res = await axios.put(
        `http://localhost:8000/team/positions/${positionData.id}/`,
        { title },
        { headers }
      );
      onUpdate(res.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating position:", error);
      alert("Failed to update position");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete position "${title}"?`)) return;
    try {
      const headers = { "X-Company-ID": user.company };
      await axios.delete(`http://localhost:8000/team/positions/${positionData.id}/`, {
        headers,
      });
      onDelete(positionData.id);
      onClose();
    } catch (error) {
      console.error("Error deleting position:", error);
      alert("Failed to delete position");
    }
  };

  if (!positionData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? "Edit Position" : "Position Details"}
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
          <TextField
            fullWidth
            label="Position Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        ) : (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Employees in this Position:
        </Typography>
        {employees.length > 0 ? (
          <List dense>
            {employees.map((emp) => (
              <ListItem
                button={!!onOpenEmployee}
                key={emp.id}
                onClick={() => onOpenEmployee && onOpenEmployee(emp)}
              >
                <ListItemText primary={emp.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No employees assigned.</Typography>
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

export default PositionDetail;
