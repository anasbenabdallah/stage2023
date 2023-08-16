const express = require("express");
const matchingpairRouter = express.Router();

const {
  getPatternsAndLogMessages,
  deleteAllMatchingPairs,
} = require("../controllers/matchingpaircontroller");
matchingpairRouter.get("/getmatches", getPatternsAndLogMessages);
matchingpairRouter.delete("/delete-matches", deleteAllMatchingPairs);


module.exports = matchingpairRouter;
