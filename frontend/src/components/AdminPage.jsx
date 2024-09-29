import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AppBar, Toolbar, Button, Typography, Container, Paper, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [venue, setVenue] = useState({
    Vimage: '',
    Vname: '',
    VType: '',
    VRating: '',
  });
  const navigate = useNavigate(); 
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/admin/Add', venue, {
        headers: {
          Authorization: `Bearer ${token}` // Ensure proper string interpolation
        }
      });

      toast.success(response.data.Msg); 
      setVenue({ Vimage: '', Vname: '', VType: '', VRating: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.Msg || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    toast.success('Logged out successfully!');
    navigate('/login'); 
  };

  const handleViewAnalytics = () => {
    toast.info('Redirecting to analytics...');
    navigate('/Dashboard');
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#11235A', width: '100%', top: 0 }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button style={{ color: '#fff', backgroundColor: '#1976d2', marginRight: '10px' }} onClick={handleViewAnalytics}>
            View Analytics
          </Button>
          <Button style={{ color: '#fff', backgroundColor: '#f44336' }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', marginTop: '64px' }}>
        <Paper elevation={3} style={{ padding: '2em', width: '400px' }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
            Add New Venue
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Venue Image URL"
                  name="Vimage"
                  value={venue.Vimage}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Venue Name"
                  name="Vname"
                  value={venue.Vname}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Venue Type"
                  name="VType"
                  value={venue.VType}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Venue Rating"
                  name="VRating"
                  type="number"
                  value={venue.VRating}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: '100%' }}
                >
                  Add Venue
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <ToastContainer /> {/* Include the ToastContainer to display notifications */}
    </>
  );
};

export default AdminPage; // Export the component
