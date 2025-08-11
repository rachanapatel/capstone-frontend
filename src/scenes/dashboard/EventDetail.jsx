import React, { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box,} from '@mui/material';
import ShiftForm from './ShiftForm';

function EventDetailModal({ open, eventData, onClose, onUpdate, onDelete, user }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!eventData) return null;

  console.log(eventData);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the shift for position "${eventData.position?.title || 'Unknown'}"?`)) {
      onDelete(eventData.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? 'Edit Shift' : 'Shift Details'}
      </DialogTitle>
      <DialogContent dividers>
        {isEditing ? (
          <ShiftForm
            shift={{
              id: eventData.id,
              position: eventData.position?.id || '',
              employee: eventData.employee?.id || '',
              shiftStatus: eventData.status || '',
              recurring: eventData.recurring || false,
            }}
            onClose={() => {
              setIsEditing(false);
              onClose(); 
            }}
            onUpdate={(updatedData) => {
              onUpdate(updatedData);
              setIsEditing(false);
            }}
            onDelete={() => {
              onDelete(eventData.id);
            }}
            user={user} 
          />
        ) : (
          <Box>
            <Typography><strong>Position:</strong> {eventData.position?.title || 'N/A'}</Typography>
            <Typography><strong>Employee:</strong> {eventData.employee?.name || 'Unassigned'}</Typography>
            <Typography><strong>Status:</strong> {eventData.status || 'N/A'}</Typography>
            <Typography><strong>Recurring:</strong> {eventData.recurring ? 'Yes' : 'No'}</Typography>
          </Box>
        )}
      </DialogContent>
      {!isEditing && (
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleEditClick} variant="contained">Edit</Button>
          <Button onClick={handleDeleteClick} color="error">Delete</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default EventDetailModal;