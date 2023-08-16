import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "../../../appStore";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: blueGrey[500],
  color: "white",
}));

const AdminNavbar = () => {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate("/adminDashboard");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack flexDirection="row" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, color: "black" }} // Set the color of the menu icon to white
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "black", // Set the color of the dashboard text to white
              }}
            >
              Sagemcom
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="large"
            edge="end"
            aria-label="homepage"
            onClick={handleHomePageClick}
          >
            Switch to Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNavbar;
