import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem,} from "@mui/material";
import axios from "axios";

const kBaseURL = import.meta.env.VITE_API_URL;

const PastShiftsTable = ({ user }) => {
  const [positionMap, setPositionMap] = useState({});
  const [employeeMap, setEmployeeMap] = useState({});
  const [shifts, setShifts] = useState([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingShifts, setLoadingShifts] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");

  const headers = { "X-Company-ID": user.company };
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const posRes = await axios.get(`${kBaseURL}/team/positions/`, { headers });
        const posMap = {};
        posRes.data.forEach((p) => (posMap[p.id] = p.title));
        setPositionMap(posMap);
      } catch (error) {
        console.error("Failed to load positions:", error);
      } finally {
        setLoadingPositions(false);
      }
    };
    fetchPositions();
  }, [user.company]);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const empRes = await axios.get(`${kBaseURL}/team/employees/`, { headers });
        const empMap = {};
        empRes.data.forEach((e) => (empMap[e.id] = e.name));
        setEmployeeMap(empMap);
      } catch (error) {
        console.error("Failed to load employees:", error);
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, [user.company]);


  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftRes = await axios.get(`${kBaseURL}/dash/`, { headers });
        const today = new Date();
        const pastShifts = shiftRes.data.filter((s) => new Date(s.starttime) < today);
        setShifts(pastShifts);
      } catch (error) {
        console.error("Failed to load shifts:", error);
      } finally {
        setLoadingShifts(false);
      }
    };
    fetchShifts();
  }, [user.company]);

  const loading = loadingPositions || loadingEmployees || loadingShifts;


  const formatDuration = (duration) => {
    const [h, m] = duration.split(":");
    return `${parseInt(h)}h ${parseInt(m)}m`;
  };

  const formatTime = (isoString) =>
    new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const starttime = params.row?.starttime;
        return starttime ? formatDate(starttime) : "";
      },
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
      renderCell: (params) => {
        const positionId = params.value;
        return positionMap[positionId] || "Unknown";
      },
    },
    {
      field: "employee",
      headerName: "Employee",
      flex: 1,
      renderCell: (params) => {
        const employeeId = params.value;
        return employeeMap[employeeId] || "Unassigned";
      },
    },
    {
      field: "timeRange",
      headerName: "Time",
      flex: 1.5,
      renderCell: (params) => {
        const { duration, starttime } = params.row || {};
        if (!duration || !starttime) return "";
  
        const start = formatTime(starttime);
        const [h = 0, m = 0, s = 0] = duration.split(":").map(Number);
        const end = new Date(new Date(starttime).getTime() + ((h * 60 + m) * 60 + s) * 1000);
        return `${start} - ${formatTime(end)}`;
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      renderCell: (params) => {
        const duration = params.value;
        return duration ? formatDuration(duration) : "";
      },
    },
  ];

  const filterShiftsByDate = (shifts) => {
    const now = new Date();
    if (dateFilter === "last7") {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return shifts.filter((s) => new Date(s.starttime) >= sevenDaysAgo);
    }
    if (dateFilter === "last30") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return shifts.filter((s) => new Date(s.starttime) >= thirtyDaysAgo);
    }
    return shifts; 
  };

  const filteredRows = filterShiftsByDate(shifts);
  

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h3" 
      gutterBottom
      >
        HISTORY
      </Typography>


        <Box mb={2} width="200px" mt={4}>
            <FormControl fullWidth>
              <InputLabel>Date Filter</InputLabel>
              <Select
                value={dateFilter}
                label="Date Filter"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="all">All time</MenuItem>
                <MenuItem value="last7">Last 7 days</MenuItem>
                <MenuItem value="last30">Last 30 days</MenuItem>
              </Select>
            </FormControl>
          </Box>


      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default PastShiftsTable;