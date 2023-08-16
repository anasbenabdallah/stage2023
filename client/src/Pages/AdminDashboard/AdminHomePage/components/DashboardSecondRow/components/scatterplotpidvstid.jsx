import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const TidPidScatterPlot = () => {
  const [tidPidData, setTidPidData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/getTidPidData")
      .then((response) => {
        setTidPidData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching TID and PID data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Scatter Plot - TID vs. PID</h2>
      <ScatterChart
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="TID" name="Thread ID" />
        <YAxis type="number" dataKey="PID" name="Process ID" />
        <ZAxis range={[100]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="TID vs. PID"
          data={tidPidData}
          fill="#8884d8"
          shape="circle"
        />
      </ScatterChart>
    </div>
  );
};

export default TidPidScatterPlot;
