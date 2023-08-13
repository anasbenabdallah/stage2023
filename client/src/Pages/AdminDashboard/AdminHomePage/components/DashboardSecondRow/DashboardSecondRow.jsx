import React, { useState } from "react";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import IncomeAreaChart from "./components/IncomeAreaChart";
import MonthlyBarChart from "./components/MonthlyBarChart";
import TotalUsers from "./components/TotalUsers";
import LogCountLineChart from "./components/LogcountLinechart ";
import LogChart from "./components/loglevel";
import LogActivitiesHeatmap from "./components/logactiviesheatmap";
import TidPidScatterPlot from "./components/scatterplotpidvstid"
import Logmessagecount from "./components/Logmessagecount"

const DashboardSecondRow = () => {
  const [slot, setSlot] = useState("week");

  return (
    <div>
  <Grid container spacing={2}>
    <Grid item xs={12} md={5} lg={4}>
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <Stack spacing={2}>
            <Typography variant="h6" color="textSecondary">
              This Week Statistics
            </Typography>
            <Typography variant="h3">$7,650</Typography>
          </Stack>
          <Grid item xs={12}>
            <MonthlyBarChart />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <LogCountLineChart type="TID" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <TotalUsers />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ height: "100%" }}>
                  <LogCountLineChart type="PID" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={7} lg={8}>
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <IncomeAreaChart />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <LogChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <LogActivitiesHeatmap />
            </CardContent>
          </Card>
        </Grid>
        <TidPidScatterPlot />
        <Logmessagecount />  
      </Grid>
    </Grid>
  </Grid>
</div>

  );
};

export default DashboardSecondRow;
