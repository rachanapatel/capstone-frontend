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


// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// function PositionDetail({ open, positionData, onClose, onUpdate, onDelete, user, onOpenEmployee }) {
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState("");
//   const [employees, setEmployees] = useState([]);

//   // Load position and employees when positionData changes or modal opens
//   useEffect(() => {
//     if (!open || !positionData) return;

//     setTitle(positionData.title || "");
//     setEditMode(false);

//     // Fetch employees for this position
//     async function fetchEmployees() {
//       try {
//         const headers = { "X-Company-ID": user.company };
//         const res = await axios.get("http://localhost:8000/team/employees/", {
//           headers,
//           params: { position: positionData.id },
//         });
//         setEmployees(res.data);
//       } catch (error) {
//         console.error("Error fetching employees for position:", error);
//         setEmployees([]);
//       }
//     }

//     fetchEmployees();
//   }, [open, positionData, user.company]);

//   const handleSave = async () => {
//     if (!title.trim()) {
//       alert("Position title cannot be empty");
//       return;
//     }
//     try {
//       const headers = { "X-Company-ID": user.company };
//       const res = await axios.put(
//         `http://localhost:8000/team/positions/${positionData.id}/`,
//         { title },
//         { headers }
//       );
//       onUpdate(res.data);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating position:", error);
//       alert("Failed to update position");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm(`Are you sure you want to delete position "${title}"?`)) return;
//     try {
//       const headers = { "X-Company-ID": user.company };
//       await axios.delete(`http://localhost:8000/team/positions/${positionData.id}/`, {
//         headers,
//       });
//       onDelete(positionData.id);
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
//         {employees.length > 0 ? (
//           <List dense>
//             {employees.map((emp) => (
//               <ListItem
//                 button={!!onOpenEmployee}
//                 key={emp.id}
//                 onClick={() => onOpenEmployee && onOpenEmployee(emp)}
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

import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme";
import { Link } from "react-router-dom";
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail";
import PositionDetail from "./PositionDetail";

const Team = ({ user }) => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const headers = { "X-Company-ID": user.company };
        const response = await axios.get("http://localhost:8000/team/employees/", { headers });
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTeamData();
  }, [user.company]);

  const handleEmployeeCellClick = (params) => {
    if (!params || !params.row) return;
    setSelectedEmployee(params.row);
    setShowEmployeeModal(true);
  };

  const handlePositionCellClick = (params) => {
    if (!params || !params.row || !params.row.position) return;
    setSelectedPosition(params.row.position);
    setShowPositionModal(true);
  };

  // Update team data after employee update
  const handleEmployeeUpdate = (updatedEmployee) => {
    setTeamData((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  // Remove employee from team data after delete
  const handleEmployeeDelete = (deletedEmployeeId) => {
    setTeamData((prev) => prev.filter((emp) => emp.id !== deletedEmployeeId));
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  // Update positions inside team data after position update
  const handlePositionUpdate = (updatedPosition) => {
    setTeamData((prev) =>
      prev.map((emp) =>
        emp.position.id === updatedPosition.id ? { ...emp, position: updatedPosition } : emp
      )
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  // Remove all employees assigned to deleted position
  const handlePositionDelete = (deletedPositionId) => {
    setTeamData((prev) => prev.filter((emp) => emp.position.id !== deletedPositionId));
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Team Member",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer", textDecoration: "underline", color: colors.greenAccent[300] }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "contact",
      headerName: "Contact Information",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer", textDecoration: "underline", color: colors.greenAccent[300] }}
        >
          {params.value?.title || ""}
        </span>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Pagetitles title="TEAM" subtitle="Roster" />

      <Box mb={2}>
        <Link to="/form">Add Employee</Link> | <Link to="/position">Add Position</Link>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "button": { fontFamily: "inherit" },
        }}
      >
        <DataGrid
          rows={teamData}
          columns={columns}
          getRowId={(row) => row.id}
          onCellClick={(params) => {
            if (params.field === "name") {
              handleEmployeeCellClick(params);
            } else if (params.field === "position") {
              handlePositionCellClick(params);
            }
          }}
        />
      </Box>

      {showEmployeeModal && selectedEmployee && (
        <EmployeeDetail
          open={showEmployeeModal}
          employeeData={selectedEmployee}
          onClose={() => {
            setShowEmployeeModal(false);
            setSelectedEmployee(null);
          }}
          onUpdate={handleEmployeeUpdate}
          onDelete={handleEmployeeDelete}
          user={user}
        />
      )}

      {showPositionModal && selectedPosition && (
        <PositionDetail
          open={showPositionModal}
          positionData={selectedPosition}
          onClose={() => {
            setShowPositionModal(false);
            setSelectedPosition(null);
          }}
          onUpdate={handlePositionUpdate}
          onDelete={handlePositionDelete}
          user={user}
        />
      )}
    </Box>
  );
};

export default Team;
