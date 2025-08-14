import { Box, Typography, useTheme, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme";
import { Link } from 'react-router-dom';
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from "react";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmployeeDetail from './EmployeeDetail'; 
import PositionDetail from './PositionDetail'; 
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PositionForm from "../PositionForm";
import Form from '../form/index';
import CreateEmployee from "./CreateEmployee";

const kBaseURL = import.meta.env.VITE_API_URL;
const NonManagerTeamView = ( {user} ) => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // For the menu
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);

  const [showPositionFormModal, setShowPositionFormModal] = useState(false);
  const handleOpenPositionForm = () => setShowPositionFormModal(true);
  const handleClosePositionForm = () => setShowPositionFormModal(false);  
  const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);
  const handleOpenNewEmployeeForm = () => setShowNewEmployeeForm(true);
  const handleCloseNewEmployeeForm = () => setShowNewEmployeeForm(false); 



  const handleOpenMenu = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee); 
    setSelectedPosition(employee.position); 
  };


  const handleViewEmployee = () => {
    setShowEmployeeModal(true);
    handleCloseMenu();
  };


  const handleViewPosition = () => {
    setShowPositionModal(true);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = (newEmployee) => {
    setTeamData((prev) => [...prev, newEmployee]);
  };

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const headers = { 'X-Company-ID': user.company };
        const response = await axios.get(`${kBaseURL}/team/employees/`, { headers });
        setTeamData(response.data);
        console.log('Submitting:', response.data, 'headers: ', headers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // try {
    //   const headers = { 'X-Company-ID': user.company };
    //   const response = await axios.get(`${kBaseURL}/team/}
    //     maybe I could send user.company in request body (see /team/ url TeamListView Serializer)
        
    fetchTeamData();
  }, []);

  const flattenedData = teamData.map(emp => ({
    ...emp,
    positionTitle: emp.position?.title || "N/A",
  }));
  

  const columns = [
    {
      field: "name",
      headerName: "Team Member",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact Information",
      flex: 1,
    },

    {
      field: "positionTitle",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "options",
      headerName: "Options",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={(event) => handleOpenMenu(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Pagetitles title="TEAM" subtitle="Roster" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        // width="80%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
        }}
      >

      <Box mb={2}>


    </Box> 

        {/* <DataGrid rows={teamData} columns={columns} /> */}
        <DataGrid rows={flattenedData} columns={columns} />


        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleViewEmployee}>View/Edit Employee</MenuItem>
          <MenuItem onClick={handleViewPosition}>View/Edit Position</MenuItem>
        </Menu>

        {/* Modals for viewing and editing */}
        {showEmployeeModal && selectedEmployee && (
          <EmployeeDetail
            open={showEmployeeModal}
            employeeData={selectedEmployee}
            onClose={() => setShowEmployeeModal(false)}      
            onUpdate={(updatedEmployee) => {
              setTeamData((prev) =>
                prev.map((emp) =>
                  emp.id === updatedEmployee.id ? updatedEmployee : emp
                )
              );
              setShowEmployeeModal(false);
            }}
            onDelete={(deletedId) => {
              setTeamData((prev) => prev.filter((emp) => emp.id !== deletedId));
              setShowEmployeeModal(false);
            }}                
            user={user}
          />
        )}

        {showPositionModal && selectedPosition && (
          <PositionDetail
            open={showPositionModal}
            positionData={selectedPosition}
            onClose={() => setShowPositionModal(false)}
            onUpdate={(updatedPosition) => {
              setTeamData((prev) =>
                prev.map((emp) =>
                  emp.position?.id === updatedPosition.id
                    ? { ...emp, position: updatedPosition }
                    : emp
                )
              );
              setShowPositionModal(false);
            }}
            // NEED TO ADD PROPER DELETE
            onDelete={(id) => {
              setShowPositionModal(false);
            }}            
            user={user}
          />
        )}
      </Box>
    </Box>
  );
};

export default NonManagerTeamView;