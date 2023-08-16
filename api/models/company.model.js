const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      maxLength: 255,
      trim: true,
      unique: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
  
  
    verified: { type: Boolean, default: false },
   
    role: { type: String, default: "company" },
   
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
