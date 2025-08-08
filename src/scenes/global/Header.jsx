import { useTheme } from "@mui/material";
// import { useContext } from "react";
import "./Header.css";
import { Box, IconButton, InputBase,} from "@mui/material";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from "@mui/icons-material/Logout";
// import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


const Header = ({ setUser }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // or navigate("/login") if that's your route
  };  
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
        <IconButton onClick={handleLogout} title="Log out">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
