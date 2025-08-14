// import { useTheme } from "@mui/material";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <MenuItem
      active={selected === title}
      className="menu-item"
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ user }) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box className="sidebar">
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            className="menu-toggle"
          >
            {!isCollapsed && (
              <Box className="menu-header">
                <Typography variant="h3" className="menu-title">
                  {/* MENU  */}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box className="user-info">
              <Box className="user-image">
                {/* <img
                  alt="profile-user"
                  src="../../assets/user.png"
                  className="profile-pic"
                /> */}
              </Box>
              <Box className="user-text">
                <Typography variant="h2" className="username">
                  {/* Manager Owner */}
                </Typography>
                <Typography variant="h5" className="user-role">
                  {/* Manager Admin */}
                </Typography>
              </Box>
            </Box>
          )}

          <Box className={isCollapsed ? "" : "menu-section"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" className="section-title">
              TEAM
            </Typography>
            <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            {user.is_manager && (
              <>
              <Item title="New Member" to="/team/employees/new" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
              <Item title="New Position" to="/team/positions/new" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />

              </>
            )}


            <Typography variant="h6" className="section-title">
              PLAN
            </Typography>
            
            <Item title="View Templates" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="History" to="/archive" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected}/>

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;