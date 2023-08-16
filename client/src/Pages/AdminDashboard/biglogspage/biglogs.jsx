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
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import Pagination from '@mui/material/Pagination';

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [searchLogMessage, setSearchLogMessage] = useState('');
  const [filterLogLevel, setFilterLogLevel] = useState('');


  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('txtFile', file);

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
    fetchLogs();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
    />
    <FormControl variant="outlined" size="small" style={{ marginLeft: '10px', width: '150px' }}>
  <InputLabel>Filter by Log Level</InputLabel>
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

    <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '10px' }}>
      Search
    </Button>
  </div>
  <div>
    <Button variant="contained" component="label">
      Upload Txt
      <input type="file" accept="*" hidden onChange={handleFileUpload} />
    </Button>
  </div>
</div>

      <Table>
        <TableHead>
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
