const express = require("express");
const companyRouter = express.Router();
const { getCompany } = require("../controllers/Company.controllers");
const {getTotalUsers} = require("../controllers/Company.controllers");


//imported controllers
const { approveCompany } = require("../controllers/admin.controllers");



//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

companyRouter.put("/approve/:id/", authenticateToken, approveCompany);
companyRouter.get("/totalusers", getTotalUsers);

companyRouter.get("/get/:id/", authenticateToken, getCompany);
companyRouter.get("/get/:id/", getCompany);

module.exports = companyRouter;
