import React from "react";
import HomeHeader from "./header/homeHeader";
import HomeContent from "./content/HomeContent";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 0,
    [theme.breakpoints.down("lg")]: {
      padding: "20px 2%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0%",
    },
  },
  gridItem: {
    padding: "0px 50px",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 20px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "0px",
      padding: "0px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
      padding: "0px 0px",
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Stack className={classes.root}>
        <HomeHeader />
        <HomeContent />
      </Stack>
    </div>
  );
};

export default LandingPage;
