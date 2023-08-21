import React from "react";
// material-ui
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import sagem from "../../../../src/images/sagemcom.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
      marginLeft: theme.drawerWidth,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  Typography: { color: "black" },
}));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" variant="outlined" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Avatar src={sagem} style={{ borderRadius: 0 }} />
          <Typography variant="h4" noWrap className={classes.Typography}>
            Sagem
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} columnGap={1}>
          <Button className={classes.Typography} component={Link} to="/login">
            Sign In
          </Button>
          <Button variant="contained" component={Link} to="/register">
            Sign Up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;
