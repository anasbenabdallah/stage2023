import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const LogActivitiesCalendarHeatmap = () => {
  const [logActivities, setLogActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/biglog/getLogActivities")
      .then((response) => {
        setLogActivities(response.data);
        console.log("Fetched log activities:", response.data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error fetching log activities:", error);
      });
  }, []);

  // Format data for calendar heatmap
  const heatmapData = logActivities.map((activity) => {
    const { month, dayOfWeek, hourOfDay } = activity._id; // Extract fields from _id
    return {
      date: new Date(2023, month - 1, dayOfWeek, hourOfDay), // Convert to valid Date object
      count: activity.activityCount,
      id: activity._id // Include the full _id object for the tooltip
    };
  });

  const customTooltipDataAttrs = (value) => {
    if (!value) {
      return {
        "data-tip": "No activity",
      };
    }

    return {
      "data-tip": `${value.date} - ${value.count || "No"} activity
                    _id: ${JSON.stringify(value.id)}`, // Include the _id object
    };
  };

  return (
    <div>
      <h2>Log Activities Calendar Heatmap</h2>
      <div style={{ width: "100%", height: "auto" }}>
        <CalendarHeatmap
          startDate={new Date(2023, 0)} // Start from January 2023
          endDate={new Date(2023, 11)} // Up to December 2023
          values={heatmapData}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-green`; // Set the class for green color
          }}
          tooltipDataAttrs={customTooltipDataAttrs}
          showWeekdayLabels={true}
          titleForValue={(value) =>
            value ? `${value.count} activities` : "No activity"
          }
        />
      </div>
    </div>
  );
};

export default LogActivitiesCalendarHeatmap;
