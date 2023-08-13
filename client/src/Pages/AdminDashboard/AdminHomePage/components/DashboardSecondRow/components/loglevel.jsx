import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
///  this is the pie chart that will show the frquency of every log levrl i w d e v
const LogLevelPieChart = () => {
  const [logLevelCounts, setLogLevelCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/countByLevel") // Replace with your actual backend API endpoint
      .then((response) => {
        setLogLevelCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching log level counts:", error);
      });
  }, []);

  const data = [
    { name: "Info", value: logLevelCounts.I || 0 },
    { name: "Warning", value: logLevelCounts.W || 0 },
    { name: "Debug", value: logLevelCounts.D || 0 },
    { name: "Error", value: logLevelCounts.E || 0 },
    { name: "Verbose", value: logLevelCounts.V || 0 },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#888888", "#FF5733", "#33FF8F"];


  return (
    <div>
      <h2>Log Level Pie Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={50}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend align="right" layout="vertical" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogLevelPieChart;
