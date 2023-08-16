import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/company/totalusers') // Update the endpoint to match your actual API route
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
      });
  }, []);

  const circularContainerStyles = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#C8C8C8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  };

  return (
    <div style={circularContainerStyles}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h6" color="#000000">
          Total Users
        </Typography>
        <Typography variant="h3">{totalUsers}</Typography>
      </div>
    </div>
  );
};

export default TotalUsers;
