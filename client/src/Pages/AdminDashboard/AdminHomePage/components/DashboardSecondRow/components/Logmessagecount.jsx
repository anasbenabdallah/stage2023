import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LogCountsScatterPlot = () => {
  const [logCounts, setLogCounts] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0); // State for total logs

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/getlogmessage")
      .then((response) => {
        setLogCounts(response.data.logCounts);
        setTotalLogs(response.data.totalLogs); // Set total logs from response
      })
      .catch((error) => {
        console.error("Error fetching log counts:", error);
      });
  }, []);

  const logCountsData = Object.entries(logCounts).map(
    ([logMessage, count]) => ({
      logMessage,
      count,
    })
  );

  return (
    <div>
      <h2>Log Message Count </h2>
      <h5>Total Messages: {totalLogs}</h5> {/* Display total messages */}
      <ScatterChart width={800} height={400}>
        <CartesianGrid />
        <XAxis dataKey="logMessage" type="category" />
        <YAxis dataKey="count" />
        <Tooltip
          labelFormatter={(value) => `Log Message: ${value}`}
          formatter={(value) => [`${value.toString()} occurrences`, "Count"]}
        />
        <Legend />
        <Scatter data={logCountsData} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default LogCountsScatterPlot;
