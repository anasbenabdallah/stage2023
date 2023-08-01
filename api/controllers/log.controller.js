const Log = require("../models/log.model");
const mongoose = require("mongoose");

// Add a log
async function addLog(req, res) {
    try {
      const {tag,pattern,ticketjira,} = req.body;
  
      const newLog = new Log({
        tag,
        pattern,
        ticketjira,
      });
  
      const savedLog = await newLog.save();
      res.status(201).json(savedLog);
    } catch (error) {
      res.status(500).json({ error: "Error adding the log: " + error.message });
    }
  }
  

// Edit a log
const editLog = async (req, res) => {
    const {tag,pattern,ticketjira,} = req.body;
    const logId = req.params.id;
  
    // Make sure the logId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(logId)) {
      return res.status(400).json({ error: "Invalid logId format." });
    }
  
    try {
      const log = await Log.findByIdAndUpdate(logId, {
        tag,
        pattern,
        ticketjira,
      }, { new: true });
  
      if (!log) {
        return res.status(500).json({ message: "Unable To Update The Log" });
      }
  
      res.status(200).json({ log });
    } catch (error) {
      // Log the specific error for debugging purposes
      console.error(error);
      res.status(500).json({ error: "An error occurred while editing the log." });
    }
  };
  async function getLogs(req, res) {
    try {
      const logs = await Log.find({}); // Retrieve all logs
      
      res.json(logs);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: "Error retrieving the logs." });
    }
  }
  
  
  

// Get logs by ID (log ID)
async function getLogsById(req, res) {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid log ID format." });
      }
  
      const log = await Log.findById(id);
  
      if (!log) {
        return res.status(404).json({ error: "Log not found." });
      }
  
      res.json(log);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: "Error retrieving the log." });
    }
  }

module.exports = {
  addLog,
  editLog,
  getLogsById,
  getLogs,
};

