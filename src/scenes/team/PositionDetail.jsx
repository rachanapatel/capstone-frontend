const kBaseURL = import.meta.env.VITE_API_URL;

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box, } from '@mui/material';
import axios from 'axios';

function PositionDetail({ open, positionData, onClose, onUpdate, onDelete, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState(positionData || {});

  if (!positionData) return null;

  const handleEditClick = () => {
    setPosition(positionData); // reset to original data when editing
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPosition(positionData);
  };

  const handleSave = async () => {
    try {
      const headers = { 'X-Company-ID': user.company };
      const response = await axios.put(
        `${kBaseURL}/team/positions/${position.id}/`,
        position,
        { headers }
      );
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating position:', error);
      alert('Failed to update position');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Are you sure you want to delete the position "${position.title}"?`);
    if (!confirm) return;

    try {
      const headers = { 'X-Company-ID': user.company };
      await axios.delete(`${kBaseURL}/team/positions/${position.id}/`, { headers });
      onDelete(position.id);
    } catch (error) {
      console.error('Error deleting position:', error);
      alert('Failed to delete position');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Position' : 'Position Details'}</DialogTitle>
      <DialogContent dividers>
        {isEditing ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Position Title"
              name="title"
              value={position.title || ''}
              onChange={handleInputChange}
              fullWidth
            />
            {/* Add more editable fields here if needed */}
          </Box>
        ) : (
          <Box>
            <Typography><strong>Title:</strong> {position.title || 'N/A'}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {isEditing ? (
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Button onClick={handleEditClick}>Edit</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default PositionDetail;
