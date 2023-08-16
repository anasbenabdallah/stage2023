import { Box, Grid, Stack } from "@mui/material";
import React from "react";

import DashboardSecondRow from "./components/DashboardSecondRow/DashboardSecondRow";

const AdminDashboard = () => {
  return (
    <div>
      <Stack spacing={2}>
        <DashboardSecondRow />
      </Stack>
    </div>
  );
};

export default AdminDashboard;
