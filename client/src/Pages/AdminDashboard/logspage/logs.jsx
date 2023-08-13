import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditPopup from "./editlogspopup"; // Import the EditPopup component
import Pagination from "@mui/material/Pagination";
const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [editLogId, setEditLogId] = useState(null); // State to track the logId for editing
  const [matchingPairs, setMatchingPairs] = useState([]);
  const logsPerPage = 10;
  const matchingPairsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMatchingPairsPage, setCurrentMatchingPairsPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleMatchingPairsPageChange = (event, newPage) => {
    setCurrentMatchingPairsPage(newPage);
  };

  const handleGenerate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/matches/getmatches",
        {
          withCredentials: true,
        }
      );
      setMatchingPairs(response.data.matchingPairs);
    } catch (error) {
      console.error("Error generating data:", error);
    }
  };
  // Define the fetchLogs function outside of the useEffect hook
  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/log/getall", {
        withCredentials: true,
      });
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call the fetchLogs function inside the useEffect hook
    fetchLogs();
    handleGenerate();
  }, []);

  const handleEdit = (logId) => {
    // Open the edit popup by setting the editLogId state
    setEditLogId(logId);
  };

  const handleClosePopup = () => {
    // Close the edit popup by resetting the editLogId state
    setEditLogId(null);
  };

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("csvFile", file);

      await axios.post("http://localhost:8000/log/uploadAll", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Fetch the updated logs after the file upload
      fetchLogs();
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      {/* Add the button for CSV file upload */}
      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>pattern</TableCell>
            <TableCell>Jira Ticket</TableCell>
            <TableCell>Action</TableCell> {/* New column for Edit button */}
          </TableRow>
        </TableHead>
        <TableBody>
          {logs
            .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
            .map((log) => (
              <TableRow key={log._id}>
                <TableCell>{log.tag}</TableCell>
                <TableCell>{log.pattern}</TableCell>
                <TableCell>
                  {log.ticketjira && (
                    <a
                      href={log.ticketjira}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {log.ticketjira}
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(log._id)}
                    aria-label="edit"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(logs.length / logsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      {/* Render the EditPopup component within a Dialog */}
      <Dialog open={!!editLogId} onClose={handleClosePopup}>
        <DialogContent>
          {editLogId && (
            <EditPopup logId={editLogId} onClose={handleClosePopup} />
          )}
        </DialogContent>
      </Dialog>
      <Button variant="contained" onClick={handleGenerate}>
        Generate
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pattern</TableCell>
            <TableCell>Log Message</TableCell>
            <TableCell>Jira Ticket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matchingPairs
            .slice(
              (currentMatchingPairsPage - 1) * matchingPairsPerPage,
              currentMatchingPairsPage * matchingPairsPerPage
            )
            .map((pair, index) => (
              <TableRow key={index}>
                <TableCell>{pair.pattern}</TableCell>
                <TableCell>{pair.logMessage}</TableCell>
                <TableCell>
                  {pair.ticketjira && (
                    <a
                      href={pair.ticketjira}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {pair.ticketjira}
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(matchingPairs.length / matchingPairsPerPage)}
        page={currentMatchingPairsPage}
        onChange={handleMatchingPairsPageChange}
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </TableContainer>
  );
};

export default LogsTable;
