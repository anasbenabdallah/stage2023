import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const LogCountScatterPlot = ({ type }) => {
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
        Log Count Scatter Plot - {type === "TID" ? "Thread ID" : "Process ID"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="id"
            type="number"
            name={type}
            label={{ value: `${type}`, position: "insideBottomRight", dy: 10 }}
          />
          <YAxis
            dataKey="count"
            type="number"
            name="Log Count"
            label={{
              value: "Log Count",
              angle: -90,
              position: "insideLeft",
              dx: -5,
            }}
          />
          <Tooltip
            labelFormatter={(value) => `ID: ${value}`} // Customize the label format
            formatter={(value, name, entry) => [
              `${entry.payload.count} logs`, // Use entry.payload.count to display the count value
              name,
            ]}
          />
          <Scatter
            data={data}
            fill="#00FF00" // Green color for the scatter points
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogCountScatterPlot;
