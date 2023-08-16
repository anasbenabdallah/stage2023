const express = require("express");
const adminRouter = express.Router();

const { isAdmin } = require("../middlewares/isAdmin.middleware");
const {

  getCompanies,
  approveCompany,
} = require("../controllers/admin.controllers");


adminRouter.get("/Companies", isAdmin, getCompanies);

adminRouter.post("/appCompany", approveCompany);

module.exports = adminRouter;
