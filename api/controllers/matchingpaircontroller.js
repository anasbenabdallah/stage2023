const BigLog = require("../models/biglog.model");
const Log = require("../models/log.model");
const MatchingPair = require("../models/MatchingPair"); // Import your model here

async function getPatternsAndLogMessages(req, res) {
  try {
    const patterns = await Log.find({}, "_id pattern ticketjira");
    const logMessages = await BigLog.find({}, "_id logmessage");

    const matchingPairs = [];
    const processedLogMessages = new Set(); // Keep track of processed log messages

    patterns.forEach((pattern) => {
      logMessages.forEach((logMessage) => {
        if (
          logMessage.logmessage.includes(pattern.pattern) &&
          !processedLogMessages.has(logMessage.logmessage)
        ) {
          matchingPairs.push({
            pattern: pattern.pattern,
            patternId: pattern._id,
            logMessage: logMessage.logmessage,
            logMessageId: logMessage._id,
            ticketjira: pattern.ticketjira,
          });

          processedLogMessages.add(logMessage.logmessage); // Mark log message as processed
        }
      });
    });

    // Store matchingPairs in the database
    await MatchingPair.insertMany(matchingPairs);

    res.json({ matchingPairs });
  } catch (error) {
    console.error("Error retrieving unique patterns and log messages:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
}

module.exports = {
  getPatternsAndLogMessages,
};
