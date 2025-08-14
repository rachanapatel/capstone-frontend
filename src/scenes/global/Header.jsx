import { useTheme } from "@mui/material";
import "./Header.css";
import { Box, IconButton, InputBase,} from "@mui/material";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from "@mui/icons-material/Logout";
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { useTheme } from "@mui/material/styles"
import SearchIcon from '@mui/icons-material/Search';;


const Header = ({ setUser }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); 
  };  
  return (
    <Box className="header">
      {/* <Box className="search-bar">
        <InputBase className="search-input" placeholder="Search" />
        <IconButton type="button" className="search-button">
          <SearchIcon />
        </IconButton>
      </Box> */}

      <Box className="icon-group">
        {/* <IconButton className="icon"> <CircleNotificationsIcon /> </IconButton> */}
        <IconButton className="icon"> <CircleNotificationsOutlinedIcon /> </IconButton>
        {/* <IconButton className="icon"> <ManageAccountsIcon /> </IconButton> */}
        <IconButton className="icon"> <ManageAccountsOutlinedIcon /></IconButton>
        <IconButton className="icon" onClick={handleLogout} title="Log out">
          <LogoutIcon />
        </IconButton>
        {/* <IconButton className="icon"> <LogoutOutlinedIcon /></IconButton> */}
      </Box>
    </Box>
  );
};

export default Header;