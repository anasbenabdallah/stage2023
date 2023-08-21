const mongoose = require('mongoose');

const biglogSchema = new mongoose.Schema({
  ProjectName:{ type: String, required:false },
  date: { type: String, required: true },
  timestamp: { type: String, required: true },
  TID: { type: String, required: true },//Thread ID
  PID: { type: String, required: true },// Process ID
  loglevel: {
    type: String,
    required: true,
    enum: ['I', 'W', 'D', 'E', 'V','F'] // Allowed values for loglevel
  },
  component: { type: String, required: true },
  logmessage: { type: String, required: true }
});

const Log = mongoose.model('bigLog', biglogSchema);

module.exports = Log;
