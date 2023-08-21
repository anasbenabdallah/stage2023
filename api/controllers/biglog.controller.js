const BigLog = require("../models/biglog.model");
const Log = require("../models/log.model");
const mongoose = require("mongoose");

async function getbigLogs(req, res) {
  try {
    const page = req.params.pageNumber || 1; // Get the requested page from the URL parameter
    const logsPerPage = 500; // Number of logs per page
    const skipCount = (page - 1) * logsPerPage; // Calculate how many logs to skip

    const logs = await BigLog.find({}).skip(skipCount).limit(logsPerPage); // Retrieve logs for the specified page

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
    let totalLogs = 0; // Initialize totalLogs counter

    logs.forEach((log) => {
      const logKey = log.logmessage;

      if (!logCounts.hasOwnProperty(logKey)) {
        logCounts[logKey] = 1;
      } else {
        logCounts[logKey]++;
      }

      totalLogs++; // Increment totalLogs for each log message
    });

    const uniqueLogs = Object.keys(logCounts);

    res.json({
      logCounts,
      totalLogs, // Include the total number of log messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving logs and counts." });
  }
}
async function deleteAllBigLogs(req, res) {
  try {
    const result = await BigLog.deleteMany({}); // Delete all big logs

    res.json({ message: `${result.deletedCount} big logs deleted.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting big logs." });
  }
}

module.exports = {
  getbigLogs,
  getUniqueLogsAndCounts,
  deleteAllBigLogs,
};
