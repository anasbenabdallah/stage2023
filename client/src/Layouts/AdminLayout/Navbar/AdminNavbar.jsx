import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

//import zustand
import { useAppStore } from "../../../appStore";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  color: "black",
}));

const AdminNavbar = () => {
  //open and close the drawer
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  //function to handle button click and route to homepage
  const handleHomePageClick = () => {
    navigate("/adminDashboard");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
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
