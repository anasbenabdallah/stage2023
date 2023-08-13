const express = require("express");
const matchingpairRouter = express.Router();

const {
  getPatternsAndLogMessages,
} = require("../controllers/matchingpaircontroller");
matchingpairRouter.get("/getmatches", getPatternsAndLogMessages);

module.exports = matchingpairRouter;
