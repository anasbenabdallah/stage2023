const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
    ticketjira: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Use a regular expression to validate if the value is a valid URL
          const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)*$/;
          return urlPattern.test(value);
        },
        message: "Invalid Jira ticket URL format",
      },
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
