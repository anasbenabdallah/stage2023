const express = require("express");
const logRouter = express.Router();
const Log = require("../models/log.model");
const multer =require("multer")
const fs = require('fs');
const { addLog } = require("../controllers/log.controller");
const path = require("path");
const csv=require("csvtojson")
//imported controllers
const { editLog } =  require("../controllers/log.controller");
const { getLogsById } =  require("../controllers/log.controller");
const { getLogs } =  require("../controllers/log.controller");
//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");
//
const uploadsDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Assuming you want to keep the original filename
  }
});

const upload = multer({
  storage
});

//
logRouter.post("/add", authenticateToken, addLog);
logRouter.get("/getall", authenticateToken, getLogs);
logRouter.put("/:id/", authenticateToken, editLog);
logRouter.get("/get/:id/", authenticateToken, getLogsById);
logRouter.post("/uploadAll", upload.single("csvFile"), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const rows = fileContent.trim().split('\n').filter(Boolean);
    const columns = rows[0].split(';').map(column => column.trim()); // Use semicolon as the separator
    const jsonArray = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(';').map(value => value.trim()); // Use semicolon as the separator
      const obj = {};
      columns.forEach((column, index) => {
        if (column) {
          obj[column] = values[index]; // Ignore empty column headers
        }
      });
      jsonArray.push(obj);
    }

    await Log.insertMany(jsonArray); // Use await to wait for the promise to resolve

    return res.json("Data added successfully to MongoDB.");
  } catch (error) {
    console.error("Error parsing CSV:", error);
    res.status(500).json({ error: "Error parsing CSV file." });
  }
});

module.exports = logRouter;
