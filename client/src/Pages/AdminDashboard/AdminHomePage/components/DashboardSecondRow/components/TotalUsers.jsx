import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon from MUI

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch('http://localhost:8000/company/totalusers') // Update the endpoint to match your actual API route
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.totalUsers);
        setLoading(false); // Data has been loaded, set loading to false
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  const circularContainerStyles = {
    width: '200px', // Make the circle bigger
    height: '200px', // Make the circle bigger
    borderRadius: '50%',
    backgroundColor: '#20B2AA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    position: 'relative', // Position relative for circular progress
  };

  const circularProgressStyles = {
    position: 'absolute', // Position absolute for circular progress
    zIndex: 1, // Place the progress above the content
    color: '#DB7093',  
  };


  const iconStyles = {
    width: '80%', // Adjust the size of the icon
    height: 'auto', // Maintain aspect ratio
  };

  return (
    <div style={circularContainerStyles}>
      {/* Circular Progress */}
      {loading && (
        <CircularProgress
          style={circularProgressStyles}
          size={150}
          thickness={2}
        />
      )}

      {/* Content */}
      {!loading && (
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <Avatar style={{ width: '80px', height: '80px', marginBottom: '10px', backgroundColor: 'transparent' }}>
            <PersonIcon style={{ width: '100%', height: '100%' }} />
          </Avatar>
          <Typography variant="h5" color="#000000">
            Total Users
          </Typography>
          <Typography variant="h2">{totalUsers}</Typography>
        </div>
      )}
    </div>
  );
};

export default TotalUsers;
