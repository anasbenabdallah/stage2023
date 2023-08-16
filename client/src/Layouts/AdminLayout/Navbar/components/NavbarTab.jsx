import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";

const tabStyles = { p: 3 };

const NavbarTab = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Set the value of the selected tab to -1 if the location changes to a route that is not in the navbar
    const paths = ["/adminDashboard", "/users", "/companies"];
    if (!paths.includes(location.pathname)) {
      setValue(-1);
    }
  }, [location.pathname]);
  const myData = JSON.parse(localStorage.getItem("user"));
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Home"
          component={Link}
          to="adminDashboard"
          sx={{ ...tabStyles }}
        />
        <Tab label="users" component={Link} to="users" sx={{ ...tabStyles }} />

        <Tab
          label="companies"
          component={Link}
          to="companies"
          sx={{ ...tabStyles }}
        />
      </Tabs>
    </Box>
  );
};
export default NavbarTab;
