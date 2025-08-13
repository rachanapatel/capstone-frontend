import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, } from "@mui/material";
  
// const kBaseURL='http://localhost:8000';
const kBaseURL = import.meta.env.VITE_API_URL;

  const AddPositionDialog = ({ user, onClose, onPositionCreated }) => {
    const [title, setTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);
  
    const handleSubmit = async () => {
      if (!title.trim()) return;
  
      setSubmitting(true);
      try {
        const response = await axios.post(`${kBaseURL}/team/positions/`, {
          title,
          company: user.company,
        });
        onPositionCreated(response.data); 
      } catch (error) {
        console.error("Error creating position:", error);
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Add New Position</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Position Title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddPositionDialog;