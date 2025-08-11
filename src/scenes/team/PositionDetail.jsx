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
