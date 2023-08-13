
const Company = require("../models/company.model");
const companySchema = require("../models/company.model");

const bcrypt = require("bcryptjs");



const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).select("-password");
    res.json(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};




const approveCompany = async (req, res) => {
  try {
    console.log("zzz  ", req.body.companyId);
    const updatedCompany = await companySchema.findByIdAndUpdate(
      req.body.companyId,
      {
        verified: true,
      },
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  
  approveCompany,
  getCompanies,
};
