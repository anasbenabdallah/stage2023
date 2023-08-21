const express = require("express");
const biglogRouter = express.Router();
const BigLog = require("../models/biglog.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Log = require("../models/log.model");
const csv = require("csvtojson");
const {
  getbigLogs,
  deleteAllBigLogs,
  getUniqueLogsAndCounts,
  getPatternsAndLogMessages,
  
} = require("../controllers/biglog.controller");

//
const uploadsDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Assuming you want to keep the original filename
  },
});

const upload = multer({
  storage,
});

//

biglogRouter.get("/getlogmessage", getUniqueLogsAndCounts);

biglogRouter.get("/getall/:pageNumber", getbigLogs);
biglogRouter.delete("/delete",deleteAllBigLogs);

biglogRouter.post('/uploadAll', upload.single('txtFile'), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const lines = fileContent.trim().split('\n');

    const logArray = [];

    // Assuming your text format is consistent as in your example
    lines.forEach((line) => {
      const match = line.match(/(\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}\.\d{3})\s+(\d+)\s+(\d+)\s+([A-Z])\s+([^:]+):(.*)/);
      if (match) {
        const [ _, date, timestamp, TID, PID, loglevel, component, logmessage] = match; // Use "_" to skip the full match
        logArray.push({
          date: date, // Combine date and timestamp
          timestamp: timestamp,
          TID,
          PID,
          loglevel,
          component,
          logmessage,
        });
      }
    });
    await BigLog.insertMany(logArray);

    return res.json('Data added successfully to MongoDB.');
  } catch (error) {
    console.error('Error parsing text file:', error);
    res.status(500).json({ error: 'Error parsing text file.' });
  }
});




/// this for pie chart of Log level
biglogRouter.get("/countByLevel", async (req, res) => {
  try {
    const levelCounts = await BigLog.aggregate([
      {
        $group: {
          _id: "$loglevel",
          count: { $sum: 1 },
        },
      },
    ]);

    const levelCountMap = {};
    levelCounts.forEach((levelCount) => {
      levelCountMap[levelCount._id] = levelCount.count;
    });

    res.json(levelCountMap);
  } catch (error) {
    console.error("Error fetching log level counts:", error);
    res.status(500).json({ error: "Error fetching log level counts." });
  }
});

biglogRouter.get("/countByTID", async (req, res) => {
  try {
    const tidCounts = await BigLog.aggregate([
      {
        $group: {
          _id: "$TID",
          count: { $sum: 1 },
        },
      },
    ]);

    const tidCountMap = {};
    tidCounts.forEach((tidCount) => {
      tidCountMap[tidCount._id] = tidCount.count;
    });

    res.json(tidCountMap);
  } catch (error) {
    console.error("Error fetching log count by TID:", error);
    res.status(500).json({ error: "Error fetching log count by TID." });
  }
});

// Similar endpoint for PID count
biglogRouter.get("/countByPID", async (req, res) => {
  try {
    const pidCounts = await BigLog.aggregate([
      {
        $group: {
          _id: "$PID",
          count: { $sum: 1 },
        },
      },
    ]);

    const pidCountMap = {};
    pidCounts.forEach((pidCount) => {
      pidCountMap[pidCount._id] = pidCount.count;
    });

    res.json(pidCountMap);
  } catch (error) {
    console.error("Error fetching log count by PID:", error);
    res.status(500).json({ error: "Error fetching log count by PID." });
  }
});

biglogRouter.get("/getLogActivities", async (req, res) => {
  try {
    const logActivities = await BigLog.aggregate([
      {
        $group: {
          _id: {
            month: { $month: { $dateFromString: { dateString: { $concat: ["2023-", "$date", "T", "$timestamp"] }, format: "%Y-%m-%dT%H:%M:%S.%L" } } },
            dayOfWeek: { $dayOfWeek: { $dateFromString: { dateString: { $concat: ["2023-", "$date", "T", "$timestamp"] }, format: "%Y-%m-%dT%H:%M:%S.%L" } } },
          },
          activityCount: { $sum: 1 },
        },
      },
    ]);

    res.json(logActivities);
  } catch (error) {
    console.error("Error fetching log activities:", error);
    res.status(500).json({ error: "Error fetching log activities." });
  }
});

biglogRouter.get("/getTidPidData", async (req, res) => {
  try {
    const tidPidData = await BigLog.find({}, "TID PID"); // Fetch TID and PID data
    res.json(tidPidData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving TID and PID data." });
  }
});

biglogRouter.get("/matchingLogs", async (req, res) => {
  try {
    const logs = await BigLog.find({});
    const patterns = await Log.find({});

    const matchedLogs = [];

    for (const log of logs) {
      for (const pattern of patterns) {
        const regex = new RegExp(pattern.pattern.replace(/ /g, ".*"), "i");
        if (regex.test(log.logmessage)) {
          const matchedLog = {
            ...log.toObject(),
            ticketjira: pattern.ticketjira,
          };
          matchedLogs.push(matchedLog);
          break; // Stop checking other patterns for this log
        }
      }
    }

    res.json(matchedLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error matching logs." });
  }
});
biglogRouter.get("/search", async (req, res) => {
  try {
    const { logMessage, logLevel } = req.query;

    let query = {};

    if (logMessage) {
      query.logmessage = { $regex: logMessage, $options: "i" }; // Case-insensitive search
    }

    if (logLevel) {
      query.loglevel = logLevel;
    }

    const logs = await BigLog.find(query);

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving logs." });
  }
});
// Search logs by log message
biglogRouter.get("/search", async (req, res) => {
  try {
    const { logMessage, logLevel } = req.query;

    let query = {
      logmessage: { $regex: logMessage, $options: "i" }, // Case-insensitive search
    };

    if (logLevel) {
      query.loglevel = logLevel;
    }

    const logs = await BigLog.find(query);

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving logs." });
  }
});

module.exports = biglogRouter;
