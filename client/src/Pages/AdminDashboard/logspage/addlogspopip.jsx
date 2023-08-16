import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';

const AddLogsPopup = ({ open, onClose, onAdd }) => {
  const [tag, setTag] = useState('');
  const [pattern, setPattern] = useState('');
  const [ticketjira, setTicketJira] = useState('');

  const handleAdd = async () => {
    // Validate inputs here if needed
    const newLog = { tag, pattern, ticketjira };

    try {
      // Send a POST request to add the new log
      const response = await axios.post('http://localhost:8000/log/add', newLog, {
        withCredentials: true,
      });
      console.log(response.data); // Log the response for debugging purposes
      onAdd(); // Call the onAdd callback to trigger a data refresh
      onClose(); // Close the popup after successfully adding the log
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Log</DialogTitle>
      <DialogContent>
        <TextField
          label="Tag"
          fullWidth
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <TextField
          label="Pattern"
          fullWidth
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
        <TextField
          label="Ticket Jira"
          fullWidth
          value={ticketjira}
          onChange={(e) => setTicketJira(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLogsPopup;
