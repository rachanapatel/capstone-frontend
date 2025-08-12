// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { colors } from "../../theme";
// import { Link } from "react-router-dom";
// import Pagetitles from "../../Pagetitles";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import EmployeeDetail from "./EmployeeDetail";
// import PositionDetail from "./PositionDetail";
// import PositionForm from "../PositionForm";
// import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// import Form from '../form/index';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const Team = ({ user }) => {
//   const theme = useTheme();
//   const [teamData, setTeamData] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const [showPositionModal, setShowPositionModal] = useState(false);
//   const [showPositionFormModal, setShowPositionFormModal] = useState(false);
//   const handleOpenPositionForm = () => setShowPositionFormModal(true);
//   const handleClosePositionForm = () => setShowPositionFormModal(false);  
//   const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);
//   const handleOpenNewEmployeeForm = () => setShowNewEmployeeForm(true);
//   const handleCloseNewEmployeeForm = () => setShowNewEmployeeForm(false); 

//   const kBaseURL='http://localhost:8000';
//   // const kBaseURL = 'https://ets-trial-backend.onrender.com';

//   useEffect(() => {
//     async function fetchTeamData() {
//       try {
//         // const response = await axios.get("http://localhost:8000/team/");
//         const response = await axios.get(`${kBaseURL}/team/`);
//         const filteredData = response.data.filter(employee => employee.companyId === user.company);
//         setTeamData(filteredData.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchTeamData();
//   }, []);


//   const handleCellClick = (params, event) => {
//     event.stopPropagation(); 
//     if (params.field === "name" || params.field === "contact") {
//       setSelectedEmployee(params.row);
//       setShowEmployeeModal(true);
//     } else if (params.field === "position") {
//       setSelectedPosition(params.row.position);
//       setShowPositionModal(true);
//     }
//   };

//   const handleEmployeeUpdate = (updatedEmployee) => {
//     setTeamData((prev) =>
//       prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
//     );
//     setShowEmployeeModal(false);
//     setSelectedEmployee(null);
//   };

//   const handleEmployeeDelete = (deletedEmployeeId) => {
//     setTeamData((prev) => prev.filter((emp) => emp.id !== deletedEmployeeId));
//     setShowEmployeeModal(false);
//     setSelectedEmployee(null);
//   };

//   const handlePositionUpdate = (updatedPosition) => {
//     setTeamData((prev) =>
//       prev.map((emp) =>
//         emp.position.id === updatedPosition.id
//           ? { ...emp, position: updatedPosition }
//           : emp
//       )
//     );
//     setShowPositionModal(false);
//     setSelectedPosition(null);
//   };

//   const handlePositionDelete = (deletedPositionId) => {
//     setTeamData((prev) =>
//       prev.filter((emp) => emp.position.id !== deletedPositionId)
//     );
//     setShowPositionModal(false);
//     setSelectedPosition(null);
//   };

//   const columns = [
//     {
//       field: "name",
//       headerName: "Team Member",
//       flex: 1,
//       cellClassName: "clickable-cell",
//     },
//     {
//       field: "contact",
//       headerName: "Contact Information",
//       flex: 1,
//       cellClassName: "clickable-cell",
//     },
//     {
//       field: "position",
//       headerName: "Position",
//       flex: 1,
//       renderCell: (params) => {
//         return params.row?.position?.title || "";
//       },
//       cellClassName: "clickable-cell",
//     },
//   ];

//   return (

//     <Box m="20px">
//       <Pagetitles title="TEAM" subtitle="Roster" />

//       <Box mb={2}>
//         <Link to="/form">Add Employee</Link> | <Link to="/position">Add Position</Link>
//       </Box>

//       <>
//       <button onClick={handleOpenPositionForm}>Add Position</button>

//       <Dialog
//         open={showPositionFormModal}
//         onClose={handleClosePositionForm}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           Create New Position
//           <IconButton
//             aria-label="close"
//             onClick={handleClosePositionForm}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <PositionForm user={user} />
//         </DialogContent>
//       </Dialog>
//     </>

//     <>
//       <button onClick={handleOpenNewEmployeeForm}>Add Employee</button>

//       <Dialog
//         open={showNewEmployeeForm}
//         onClose={handleCloseNewEmployeeForm}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           Create New Employee
//           <IconButton
//             aria-label="close"
//             onClick={handleCloseNewEmployeeForm}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <PositionForm user={user} />
//         </DialogContent>
//       </Dialog>
//     </>

//       <Box
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
          
//           "& .clickable-cell": {
//             cursor: "pointer",
//             textDecoration: "underline",
//             color: colors.greenAccent[300],
//           },
//         }}
//       >
//         <DataGrid
//           rows={teamData}
//           columns={columns}
//           getRowId={(row) => row.id}
//           onCellClick={handleCellClick}
//           disableSelectionOnClick
//         />
//       </Box>

//       {showEmployeeModal && selectedEmployee && (
//         <EmployeeDetail
//           open={showEmployeeModal}
//           employeeData={selectedEmployee}
//           onClose={() => {
//             setShowEmployeeModal(false);
//             setSelectedEmployee(null);
//           }}
//           onUpdate={handleEmployeeUpdate}
//           onDelete={handleEmployeeDelete}
//           user={user}
//         />
//       )}

//       {showPositionModal && selectedPosition && (
//         <PositionDetail
//           open={showPositionModal}
//           positionData={selectedPosition}
//           onClose={() => {
//             setShowPositionModal(false);
//             setSelectedPosition(null);
//           }}
//           onUpdate={handlePositionUpdate}
//           onDelete={handlePositionDelete}
//           user={user}
//         />
//       )}
//     </Box>
//   );
// };

// export default Team;


/* */

// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { colors } from "../../theme";
// import { Link } from 'react-router-dom';
// import Pagetitles from "../../Pagetitles";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const Team = () => {
//   const theme = useTheme();
//   const [teamData, setTeamData] = useState([]);
//   useEffect(() => {
//     async function fetchTeamData() {
//       try {
//         const response = await axios.get("http://localhost:8000/team/");
//         setTeamData(response.data); // store the data to be used in DataGrid
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }    
//     fetchTeamData();
//   }, []);


//   const columns = [
//     {
//       field: "name",
//       headerName: "Team Member",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "email",
//       headerName: "Contact Information",
//       flex: 1,
//     },
//     {
//       field: "position",
//       headerName: "Position",
//       type: "text",
//       headerAlign: "left",
//       align: "left",
//     },    
//   ];

//   return (
//     <Box m="20px">
//       <Pagetitles title="TEAM" subtitle="Roster" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//         }}
//       >
//         <div>
//             <Link to="/team/employees/new">Add Employee</Link> | <Link to="/team/positions/new">Add Position</Link>
//             </div>

//         <DataGrid rows={teamData} columns={columns} />
//       </Box>
//     </Box>
//   );
// };

// export default Team;

// import { Box, Typography, useTheme, IconButton, Menu, MenuItem } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { colors } from "../../theme";
// import { Link } from 'react-router-dom';
// import Pagetitles from "../../Pagetitles";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EmployeeDetail from './EmployeeDetail'; // Import your modal component
// import PositionDetail from './PositionDetail'; // Import the modal for Position editing

// const Team = ( {user} ) => {
//   const theme = useTheme();
//   const [teamData, setTeamData] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null); // For the menu
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const [showPositionModal, setShowPositionModal] = useState(false);

//   const handleOpenMenu = (event, employee) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedEmployee(employee); // Set employee when menu opens
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setSelectedEmployee(null);
//   };

//   const handleViewEmployee = () => {
//     setShowEmployeeModal(true);
//     handleCloseMenu();
//   };

//   const handleEditEmployee = () => {
//     setShowEmployeeModal(true); // Implement employee edit modal here
//     handleCloseMenu();
//   };

//   const handleEditPosition = () => {
//     setShowPositionModal(true);
//     handleCloseMenu();
//   };

//   useEffect(() => {
//     async function fetchTeamData() {
//       try {
//         const response = await axios.get("http://localhost:8000/team/");
//         setTeamData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchTeamData();
//   }, []);

//   const columns = [
//     {
//       field: "name",
//       headerName: "Team Member",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Contact Information",
//       flex: 1,
//     },
//     {
//       field: "position",
//       headerName: "Position",
//       type: "text",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "options",
//       headerName: "Options",
//       renderCell: (params) => {
//         return (
//           <IconButton
//             onClick={(event) => handleOpenMenu(event, params.row)}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         );
//       },
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Pagetitles title="TEAM" subtitle="Roster" />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//         }}
//       >
//         <div>
//           <Link to="/team/employees/new">Add Employee</Link> | 
//           <Link to="/team/positions/new">Add Position</Link>
//         </div>

//         <DataGrid rows={teamData} columns={columns} />

//         {/* Menu for options */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//         >
//           <MenuItem onClick={handleViewEmployee}>View Employee</MenuItem>
//           <MenuItem onClick={handleEditEmployee}>Edit Employee</MenuItem>
//           <MenuItem onClick={handleEditPosition}>Edit Position</MenuItem>
//         </Menu>

//         {/* Modals for viewing and editing */}
//         {showEmployeeModal && selectedEmployee && (
//           <EmployeeDetail
//             open={showEmployeeModal}
//             employeeData={selectedEmployee}
//             onClose={() => setShowEmployeeModal(false)}
//           />
//         )}

//         {showPositionModal && selectedPosition && (
//           <PositionDetail
//             open={showPositionModal}
//             positionData={selectedPosition}
//             onClose={() => setShowPositionModal(false)}
//           />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Team;


import { Box, Typography, useTheme, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme";
import { Link } from 'react-router-dom';
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from "react";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import EmployeeDetail from "./EmployeeDetail"; // adjust path as needed
import PositionDetail from "./PositionDetail"; // adjust path as needed

const Team = ({ user }) => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showPositionModal, setShowPositionModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const headers = { "X-Company-ID": user.company };
        const response = await axios.get("http://localhost:8000/team/", { headers });
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTeamData();
  }, [user.company]);

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleViewEditEmployee = () => {
    const employee = teamData.find((row) => row.id === menuRowId);
    if (employee) {
      setSelectedEmployee(employee);
      setShowEmployeeModal(true);
    }
    handleMenuClose();
  };

  const handleViewEditPosition = () => {
    const employee = teamData.find((row) => row.id === menuRowId);
    if (employee && employee.position) {
      setSelectedPosition(employee.position);
      setShowPositionModal(true);
    }
    handleMenuClose();
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    setTeamData((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const handleEmployeeDelete = (deletedEmployeeId) => {
    setTeamData((prev) => prev.filter((emp) => emp.id !== deletedEmployeeId));
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const handlePositionUpdate = (updatedPosition) => {
    setTeamData((prev) =>
      prev.map((emp) =>
        emp.position?.id === updatedPosition.id
          ? { ...emp, position: updatedPosition }
          : emp
      )
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const handlePositionDelete = (deletedPositionId) => {
    setTeamData((prev) =>
      prev.map((emp) =>
        emp.position?.id === deletedPositionId
          ? { ...emp, position: null }
          : emp
      )
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Team Member",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Contact Information",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      valueGetter: (params) => params.row.position?.title || "",
    },
    {
      field: "options",
      headerName: "Options",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.id)}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuRowId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleViewEditEmployee}>View/Edit Employee</MenuItem>
            <MenuItem onClick={handleViewEditPosition} disabled={!params.row.position}>
              View/Edit Position
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Pagetitles title="TEAM" subtitle="Roster" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <div>
          <Link to="/team/employees/new">Add Employee</Link> |{" "}
          <Link to="/team/positions/new">Add Position</Link>
        </div>

        <DataGrid
          rows={teamData}
          columns={columns}
          getRowId={(row) => row.id}
          disableSelectionOnClick
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
