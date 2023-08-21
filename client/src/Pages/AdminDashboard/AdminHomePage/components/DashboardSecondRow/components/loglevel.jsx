import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const LogLevelPieChart = () => {
  const [logLevelCounts, setLogLevelCounts] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/countByLevel")
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
    { name: "Fatal", value: logLevelCounts.F || 0 }
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#8B008B", "#FF5733", "#006400","#8B0000"];

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
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 60 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill={COLORS[index % COLORS.length]}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${data[index].name}: ${value} (${((value / data.reduce((sum, entry) => sum + entry.value, 0)) * 100).toFixed(2)}%)`}
                </text>
              );
            }}
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
