const BigLog = require("../models/biglog.model");
const Log = require("../models/log.model");
const mongoose = require("mongoose");

async function getbigLogs(req, res) {
  try {
    const logs = await BigLog.find({}); // Retrieve all logs

    res.json(logs);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Error retrieving the logs." });
  }
}

async function getUniqueLogsAndCounts(req, res) {
  try {
    const logs = await BigLog.find({});

    const logCounts = {};
    logs.forEach((log) => {
      const logKey = log.logmessage;
      logCounts[logKey] = (logCounts[logKey] || 0) + 1;
    });

    const uniqueLogs = Object.keys(logCounts);

    res.json({
      logCounts,
      uniqueLogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving logs and counts." });
  }
}

module.exports = {
  getbigLogs,
  getUniqueLogsAndCounts,
};
