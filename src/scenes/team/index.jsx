// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { colors } from "../../theme";
// import { Link } from 'react-router-dom';
// import Pagetitles from "../../Pagetitles";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import EmployeeDetail from './EmployeeDetail';
// import PositionDetail from './PositionDetail';

// const Team = ({ user }) => {
//   const theme = useTheme();
//   const [teamData, setTeamData] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const [showPositionModal, setShowPositionModal] = useState(false);

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


//   const handleEmployeeRowClick = (params) => {
//     console.log('Row click params:', params);
//     if (!params || !params.row) {
//       console.error('params or params.row is missing!');
//       return;
//     }    
//     setSelectedEmployee(params.row);
//     setShowEmployeeModal(true);
//   };

//   const handlePositionClick = (position) => {
//     setSelectedPosition(position);
//     setShowPositionModal(true);
//   };

//   // Callbacks for Employee Modal updates/deletes
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

//   // Callbacks for Position Modal updates/deletes
//   const handlePositionUpdate = (updatedPosition) => {
//     // Update position title in all affected employees
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
//     // Remove position from employees or handle as needed
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
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "contact",
//       headerName: "Contact Information",
//       flex: 1,
//     },
//     {
//       field: "position",
//       headerName: "Position",
//       flex: 1,
//       // valueGetter: (params) => params.row.position?.title || '',
//       renderCell: (params) => {
//         return params.row?.position?.title || "";
//       },
//     },
//   ];
  

//   return (
//     <Box m="20px">
//       <Pagetitles title="TEAM" subtitle="Roster" />

//       <Box mb={2}>
//         <Link to="/form">Add Employee</Link> | <Link to="/position">Add Position</Link>
//       </Box>

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
//           "button": {
//             fontFamily: 'inherit',
//           }
//         }}
//       >

//       <Box onClick={() => console.log('Box clicked')}>
//         <DataGrid
//           rows={teamData}
//           columns={columns}
//           getRowId={(row) => row.id}
//           onRowClick={handleEmployeeRowClick}
//         />
//       </Box>

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


import { Box, Typography, useTheme } from "@mui/material";
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
        const response = await axios.get("http://localhost:8000/team/");
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTeamData();
  }, []);

  // Open employee modal on clicking name or contact cells
  const handleCellClick = (params, event) => {
    event.stopPropagation(); // prevent row click
    if (params.field === "name" || params.field === "contact") {
      setSelectedEmployee(params.row);
      setShowEmployeeModal(true);
    } else if (params.field === "position") {
      setSelectedPosition(params.row.position);
      setShowPositionModal(true);
    }
  };

  // Callbacks for Employee Modal updates/deletes
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

  // Callbacks for Position Modal updates/deletes
  const handlePositionUpdate = (updatedPosition) => {
    setTeamData((prev) =>
      prev.map((emp) =>
        emp.position.id === updatedPosition.id
          ? { ...emp, position: updatedPosition }
          : emp
      )
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const handlePositionDelete = (deletedPositionId) => {
    // Here you might want to handle employees with deleted positions differently
    setTeamData((prev) =>
      prev.filter((emp) => emp.position.id !== deletedPositionId)
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Team Member",
      flex: 1,
      cellClassName: "clickable-cell",
    },
    {
      field: "contact",
      headerName: "Contact Information",
      flex: 1,
      cellClassName: "clickable-cell",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      renderCell: (params) => {
        return params.row?.position?.title || "";
      },
      cellClassName: "clickable-cell",
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
          // Styling clickable cells with pointer cursor and underline on hover
          "& .clickable-cell": {
            cursor: "pointer",
            textDecoration: "underline",
            color: colors.greenAccent[300],
          },
        }}
      >
        <DataGrid
          rows={teamData}
          columns={columns}
          getRowId={(row) => row.id}
          onCellClick={handleCellClick}
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
