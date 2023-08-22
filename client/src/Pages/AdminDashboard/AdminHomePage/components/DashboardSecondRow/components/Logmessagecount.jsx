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
  const [totalLogs, setTotalLogs] = useState(0);
  const [filterThreshold, setFilterThreshold] = useState(50); // State for filter threshold

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/getlogmessage")
      .then((response) => {
        setLogCounts(response.data.logCounts);
        setTotalLogs(response.data.totalLogs);
      })
      .catch((error) => {
        console.error("Error fetching log counts:", error);
      });
  }, []);

  const filteredLogCounts = Object.entries(logCounts)
    .filter(([_, count]) => count > filterThreshold)
    .map(([logMessage, count]) => ({
      logMessage,
      count,
    }));

  const handleFilterChange = (event) => {
    setFilterThreshold(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h2>Log Message Count</h2>
      <div>
        <label>Count greater then : </label>
        <input
          type="number"
          value={filterThreshold}
          onChange={handleFilterChange}
        />
      </div>
      <h5>Total Messages: {totalLogs}</h5>
      <ScatterChart width={800} height={400}>
        <CartesianGrid />
        <XAxis dataKey="logMessage" type="category" />
        <YAxis dataKey="count" />
        <Tooltip
          labelFormatter={(value) => `Log Message: ${value}`}
          formatter={(value) => [`${value.toString()} occurrences`, "Count"]}
        />
        <Legend />
        <Scatter data={filteredLogCounts} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default LogCountsScatterPlot;
