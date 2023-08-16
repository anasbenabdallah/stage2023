const BigLog = require("../models/biglog.model");
const Log = require("../models/log.model");
const MatchingPair = require("../models/MatchingPair"); // Import your model here

async function getPatternsAndLogMessages(req, res) {
  try {
    const patterns = await Log.find({}, "_id pattern ticketjira");
    const logMessages = await BigLog.find({}, "_id logmessage");

    const matchingPairs = [];

    for (const pattern of patterns) {
      const matchingLogMessages = logMessages.filter((logMessage) =>
        logMessage.logmessage.includes(pattern.pattern)
      );

      for (const logMessage of matchingLogMessages) {
        matchingPairs.push({
          pattern: pattern.pattern,
          patternId: pattern._id,
          logMessage: logMessage.logmessage,
          logMessageId: logMessage._id,
          ticketjira: pattern.ticketjira,
        });
      }
    }

    // Store matchingPairs in the database
    await MatchingPair.insertMany(matchingPairs);

    res.json({ matchingPairs });
  } catch (error) {
    console.error("Error retrieving unique patterns and log messages:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
}
const deleteAllMatchingPairs = async (req, res) => {
  try {
    const deleteResult = await MatchingPair.deleteMany();

    if (deleteResult.deletedCount > 0) {
      return res.status(200).json({
        message: `${deleteResult.deletedCount} matching pairs deleted successfully`,
      });
    } else {
      return res.status(404).json({ message: "No matching pairs found to delete" });
    }
  } catch (error) {
    console.error("Error deleting matching pairs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getPatternsAndLogMessages,
  deleteAllMatchingPairs,
};

