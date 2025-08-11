// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { colors } from "../../theme";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import Header from "../global/Header";
// import { Link } from 'react-router-dom';
// import Pagetitles from "../../Pagetitles";
// import { useState, useEffect } from "react";
// import axios from "axios";

  

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
//     // {
//     //   field: "accessLevel",
//     //   headerName: "Access Level",
//     //   flex: 1,
//     //   renderCell: ({ row: { access } }) => {
//     //     return (
//     //       <Box
//     //         width="60%"
//     //         m="0 auto"
//     //         p="5px"
//     //         display="flex"
//     //         justifyContent="center"
//     //         borderRadius="4px"
//     //       >
//     //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//     //         {access === "manager" && <SecurityOutlinedIcon />}
//     //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//     //           {access}
//     //         </Typography>
//     //       </Box>
//     //     );
//     //   },
//     // },
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
//             <Link to="/form">Add Employee</Link> | <Link to="/position">Add Position</Link>
//             </div>

//         <DataGrid rows={teamData} columns={columns} />
//       </Box>
//     </Box>
//   );
// };

// export default Team;


// const rows = [
//     {
//       id: 1,
//       name: "John Doe",
//       position: "Manager",
//       email: "johndoe@example.com",
//       accessLevel: "manager"},
//     {id: 2,
//         name: "Jane Smith",
//       position: "Cashier",
//       email: "janesmith@example.com",
//       accessLevel: "user",
//     },
//     {
//       id: 3,
//       name: "Sam Smith",
//       position: "Cashier",
//       email: "sam@example.com",
//       accessLevel: "user",
//     },
//   ];


import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme";
import Header from "../global/Header";
import { Link } from "react-router-dom";
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetail from './EmployeeDetail'

const Team = ({ user }) => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);

  // For modal state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch team data function
  const fetchTeamData = async () => {
    try {
      const headers = { "X-Company-ID": user.company };
      const response = await axios.get("http://localhost:8000/team/employees/", { headers });
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on mount and after updates/deletes
  useEffect(() => {
    fetchTeamData();
  }, [user.company]);

  // Handle row click to open modal
  const handleRowClick = (params) => {
    setSelectedEmployeeId(params.id);
    setModalOpen(true);
  };

  // Modal callbacks
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleEmployeeUpdated = () => {
    fetchTeamData();
  };

  const handleEmployeeDeleted = () => {
    fetchTeamData();
  };

  const columns = [
    {
      field: "name",
      headerName: "Team Member",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Contact Information",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      type: "text",
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => params.row.position?.title || "", // assuming position is an object with title
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
          <Link to="/form">Add Employee</Link> | <Link to="/position">Add Position</Link>
        </div>

        <DataGrid
          rows={teamData}
          columns={columns}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id} // ensure unique id from backend
        />
      </Box>

      {modalOpen && selectedEmployeeId && (
        <EmployeeDetail
          open={modalOpen}
          employeeId={selectedEmployeeId}
          onClose={handleModalClose}
          onUpdated={handleEmployeeUpdated}
          onDeleted={handleEmployeeDeleted}
          user={user}
        />
      )}
    </Box>
  );
};

export default Team;
