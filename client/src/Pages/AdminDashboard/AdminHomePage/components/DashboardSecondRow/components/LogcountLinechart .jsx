import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const LogCountLineChart = ({ type }) => {
  const [logCounts, setLogCounts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/biglog/countBy${type}`)
      .then((response) => {
        setLogCounts(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching log count by ${type}:`, error);
      });
  }, [type]);

  const data = Object.entries(logCounts).map(([id, count]) => ({
    id,
    count,
  }));

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>
        Log Count Line Chart - {type === "TID" ? "Thread ID" : "Process ID"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            label={{ value: `${type}`, position: "insideBottomRight", dy: 10 }}
          />
          <YAxis
            label={{
              value: "Log Count",
              angle: -90,
              position: "insideLeft",
              dx: -10,
            }}
          />
          <Tooltip
            labelFormatter={(value) => `ID: ${value}`} // Customize the label format
            formatter={(value, name) => [`${value} logs`, name]} // Customize the value format
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#00FF00" // Green color for the line
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogCountLineChart;
