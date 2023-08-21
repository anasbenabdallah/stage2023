import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, InputLabel, Select, MenuItem,

} from '@mui/material';


import Pagination from '@mui/material/Pagination';

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [searchLogMessage, setSearchLogMessage] = useState('');
  const [filterLogLevel, setFilterLogLevel] = useState('');
  const [projectName, setProjectName] = useState('');
  const [open, setOpen] = useState(false); // State for the pop-up window


  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('txtFile', file);

      setOpen(true); // Open the pop-up window

      await axios.post('http://localhost:8000/biglog/uploadAll', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchLogs();
    } catch (error) {
      console.error('Error uploading Text file:', error);
    }
  };
  
  const handleConfirmProject = () => {
    setOpen(false); // Close the pop-up window
    // Save the project name and fetch logs again
    localStorage.setItem('projectName', projectName);
    fetchLogs();
  };

  const fetchLogs = async (page) => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(`http://localhost:8000/biglog/getall/${page}`, {
        withCredentials: true,
      });
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.get('http://localhost:8000/biglog/search', {
        params: {
          logMessage: searchLogMessage,
          logLevel: filterLogLevel,
        },
        withCredentials: true,
      });
  
      setLogs(response.data);
    } catch (error) {
      console.error('Error searching logs:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const storedProjectName = localStorage.getItem('projectName');
    if (storedProjectName) {
      setProjectName(storedProjectName);
    }
    fetchLogs();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteAllLogs = async () => {
    try {
      await axios.delete('http://localhost:8000/biglog/delete', {
        withCredentials: true,
      });
      fetchLogs(currentPage); // Refresh logs after deletion
    } catch (error) {
      console.error('Error deleting all logs:', error);
    }
  };
  const deletematchesButtonStyle = {
    backgroundColor: "#DC143C", 
    color: "#000000", 
  };
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <TextField
  label="Search Log Message"
  variant="outlined"
  size="small"
  value={searchLogMessage}
  onChange={(e) => setSearchLogMessage(e.target.value)}
  style={{  fontSize: '0.8em',width: '120px' }} // Adjust the width as needed
/>

    <FormControl variant="outlined" size="small" style={{ marginLeft: '10px', width: '150px' }}>
  <InputLabel  style={{ fontSize: '0.8em' }}>Filter by Log Level</InputLabel>
  <Select
    value={filterLogLevel}
    onChange={(e) => setFilterLogLevel(e.target.value)}
    label="Filter by Log Level"
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="I">I</MenuItem>
    <MenuItem value="W">W</MenuItem>
    <MenuItem value="D">D</MenuItem>
    <MenuItem value="E">E</MenuItem>
    <MenuItem value="V">V</MenuItem>
    <MenuItem value="F">F</MenuItem>
  </Select>
</FormControl>

    <Button variant="contained" onClick={handleSearch} style={{ fontSize: '0.8em', marginLeft: '10px' }}>
      Search
    </Button>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <Button variant="contained" component="label" style={{ fontSize: '0.9em', padding: '0.5em' }}>
    Upload Txt
    <input type="file" accept="*" hidden onChange={handleFileUpload} />
  </Button>
  <Button
    variant="contained"
    color="secondary"
    onClick={handleDeleteAllLogs}
    style={{ ...deletematchesButtonStyle, fontSize: '0.9em', padding: '0.5em', marginLeft: '10px' }}
  >
    Delete All Logs
  </Button>
</div>

</div>

      <Table>
        <TableHead>
        <TableRow>
        <TableCell colSpan={7} align="center" style={{ borderBottom: 'none', paddingTop: '1em' }}>
  <div style={{ backgroundColor: '#5F9EA0', padding: '0.5em', borderRadius: '5px' }}>
    <span style={{ fontSize: '0.8em', fontWeight: 'bold' }}>Confirmed Project Name:</span>
    <span style={{ fontSize: '1.2em', fontWeight: 'bold', marginLeft: '0.5em' }}>{projectName}</span>
  </div>
</TableCell>


  </TableRow>
  <TableRow>
    <TableCell>Date</TableCell>
    <TableCell>Timestamp</TableCell>
    <TableCell>TID</TableCell>
    <TableCell>PID</TableCell>
    <TableCell>Log Level</TableCell>
    <TableCell>Component</TableCell>
    <TableCell>Log Message</TableCell>
  </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            logs
              .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
              .map((log, index) => (
                <TableRow key={log._id}>
                  <TableCell style={{ width: '10%' }}>{log.date}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.TID}</TableCell>
                  <TableCell>{log.PID}</TableCell>
                  <TableCell>{log.loglevel}</TableCell>
                  <TableCell>{log.component}</TableCell>
                  <TableCell>{log.logmessage}</TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter Project Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the project name for the uploaded logs.
          </DialogContentText>
          <TextField
            label="Project Name"
            variant="outlined"
            size="small"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmProject} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Pagination
        count={Math.ceil(logs.length / logsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
      />
    </TableContainer>
  );
};

export default LogsTable;
