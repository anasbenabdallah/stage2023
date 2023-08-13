const mongoose = require("mongoose");

const matchingPairSchema = new mongoose.Schema({
  pattern: {
    type: String,
    required: true,
  },
  patternId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming ObjectId type
    ref: "Log", // Reference to Log model
    required: true,
  },
  logMessage: {
    type: String,
    required: true,
  },
  logMessageId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming ObjectId type
    ref: "bigLog", // Reference to BigLog model
    required: true,
  },
  ticketjira: {
    type: String,
    required: false,
  },
});

const MatchingPair = mongoose.model("MatchingPair", matchingPairSchema);

module.exports = MatchingPair;
