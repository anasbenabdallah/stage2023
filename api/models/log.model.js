const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: false,
    },
    pattern: {
      type: String,
      required: false,
    },
    ticketjira: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          // Use a regular expression to validate if the value is a valid URL
          const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)*$/;
          const isValidUrl = urlPattern.test(value) || value === "_" || value === "";
          return isValidUrl;
        },
        message: "Invalid Jira ticket URL format",
      },
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
