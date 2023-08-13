import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, TextField, Button, DialogActions, DialogTitle } from '@mui/material';

const EditPopup = ({ logId, onClose }) => {
  const [logData, setLogData] = useState({
    tag: '',
    pattern: '',
    ticketjira: '',
 
  });

  useEffect(() => {
    // Fetch log data by ID when the component mounts
    async function fetchLogData() {
      try {
        const response = await axios.get(`http://localhost:8000/log/get/${logId}`, {
          withCredentials: true,
        });
        setLogData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLogData();
  }, [logId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogData({ ...logData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/log/${logId}`, logData, {
        withCredentials: true,
      });
      console.log(response.data); // Log the response for debugging purposes
      onClose(); // Close the edit popup after successfully saving the changes
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Log</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            fullWidth
            label="Tag"
            name="tag"
            value={logData.tag}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Pattern"
            name="pattern"
            value={logData.pattern}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Jira Ticket"
            name="ticketjira"
            value={logData.ticketjira}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
      
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleSave} color="primary">
          Save Changes
        </Button>
        <Button variant="outlined" onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPopup;
