const express = require("express");
const router = express.Router();
// ==============================|| Imported routes ||============================== //
const authRouter = require("./auth.user.router");

const adminRouter = require("./admin.router");
const logRouter = require("./log.router.js");
const biglogRouter = require("./biglog.router");
const companyRouter = require("./company.router");
const matchingpairRouter = require("./matchingpair.router");

router.use("/auth", authRouter);
router.use("/matches", matchingpairRouter);

router.use("/company", companyRouter);
router.use("/log", logRouter);
router.use("/biglog", biglogRouter);

router.use("/admin", adminRouter);

module.exports = router;
