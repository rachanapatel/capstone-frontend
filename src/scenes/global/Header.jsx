// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
// import { theme } from "../../theme";
// import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";

// const Header = () => {
//     return <div>Header</div>
// };

// // export default Header;



import { useTheme } from "@mui/material";
// import { useContext } from "react";
import "./Header.css";
import { Box, IconButton, InputBase,} from "@mui/material";
// import {
//   LightModeOutlined as LightModeOutlinedIcon,
//   DarkModeOutlined as DarkModeOutlinedIcon,
//   NotificationsOutlined as NotificationsOutlinedIcon,
//   SettingsOutlined as SettingsOutlinedIcon,
//   PersonOutlined as PersonOutlinedIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";


import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {
  const theme = useTheme();
  return (
    <Box className="header">
      {/* SEARCH BAR */}
      {/* <Box className="search-bar">
        <InputBase className="search-input" placeholder="Search" />
        <IconButton type="button" className="search-button">
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box className="icon-group">
        <IconButton> <CircleNotificationsIcon /> </IconButton>
        <IconButton> <ManageAccountsIcon /> </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
