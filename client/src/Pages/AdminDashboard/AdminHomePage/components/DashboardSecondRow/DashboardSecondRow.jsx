import React from "react";
import { Card, CardContent, Grid } from "@mui/material";

import TotalUsers from "./components/TotalUsers";
import LogCountLineChart from "./components/LogcountLinechart ";
import LogChart from "./components/loglevel";
import LogActivitiesHeatmap from "./components/logactiviesheatmap";
import TidPidScatterPlot from "./components/scatterplotpidvstid";
import Logmessagecount from "./components/Logmessagecount";

const DashboardSecondRow = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <LogCountLineChart type="TID" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <TotalUsers />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <LogCountLineChart type="PID" />
            </CardContent>
          </Card>
        </Grid>
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
             <TidPidScatterPlot />
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
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Logmessagecount />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardSecondRow;
