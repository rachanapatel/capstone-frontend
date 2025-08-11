import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colors } from "../../theme";
import { Link } from "react-router-dom";
import Pagetitles from "../../Pagetitles";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail";
import PositionDetail from "./PositionDetail";
import PositionForm from "../PositionForm";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Form from '../form/index';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Team = ({ user }) => {
  const theme = useTheme();
  const [teamData, setTeamData] = useState([]);
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

  // const kBaseURL='http://localhost:8000';
  const kBaseURL = 'https://ets-trial-backend.onrender.com';

  useEffect(() => {
    async function fetchTeamData() {
      try {
        // const response = await axios.get("http://localhost:8000/team/");
        const response = await axios.get(`${kBaseURL}/team/`);
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTeamData();
  }, []);


  const handleCellClick = (params, event) => {
    event.stopPropagation(); 
    if (params.field === "name" || params.field === "contact") {
      setSelectedEmployee(params.row);
      setShowEmployeeModal(true);
    } else if (params.field === "position") {
      setSelectedPosition(params.row.position);
      setShowPositionModal(true);
    }
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
        emp.position.id === updatedPosition.id
          ? { ...emp, position: updatedPosition }
          : emp
      )
    );
    setShowPositionModal(false);
    setSelectedPosition(null);
  };

  const handlePositionDelete = (deletedPositionId) => {
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

      <>
      <button onClick={handleOpenPositionForm}>Add Position</button>

      <Dialog
        open={showPositionFormModal}
        onClose={handleClosePositionForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create New Position
          <IconButton
            aria-label="close"
            onClick={handleClosePositionForm}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <PositionForm user={user} />
        </DialogContent>
      </Dialog>
    </>

    <>
      <button onClick={handleOpenNewEmployeeForm}>Add Employee</button>

      <Dialog
        open={showNewEmployeeForm}
        onClose={handleCloseNewEmployeeForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Create New Employee
          <IconButton
            aria-label="close"
            onClick={handleCloseNewEmployeeForm}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <PositionForm user={user} />
        </DialogContent>
      </Dialog>
    </>

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
