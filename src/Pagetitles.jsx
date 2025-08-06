import { Typography, Box } from "@mui/material";
// Import CSS file for styling
import './Pagetitles.css';

const Pagetitles = ({ title, subtitle }) => {
  return (
    <Box className="header-container">
      <Typography variant="h2" className="header-title">
        {title}
      </Typography>
      <Typography variant="h5" className="header-subtitle">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Pagetitles;
