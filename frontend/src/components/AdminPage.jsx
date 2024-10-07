import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Paper, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPage.css';

const AdminPage = () => {
  const [venue, setVenue] = useState({
    Vimage: '',
    Vname: '',
    VType: '',
    VRating: '',
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [facilityDetails, setFacilityDetails] = useState([]);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
  };  

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getvenue');
        setFacilityDetails(response.data.Findvenue);
      } catch (error) {
        toast.error('Error fetching venues.');
      }
    };
    fetchVenues();
  }, [handleSubmit]);

  const handleEditClick = (facility) => {
    setVenue({
        Vimage: facility.Vimage,
        Vname: facility.Vname,
        VType: facility.VType,
        VRating: facility.VRating,
    });
    setEditId(facility.id); 
    console.log("editId before setting:", facility.id);
    setEditing(true);
    setOpen(true); 
};


  const handleChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };


  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/admin/Add', venue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.Msg);
      setFacilityDetails([...facilityDetails, response.data.NewVenue]);
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.Msg || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async () => {
    console.log('editId before update:', editId);
    if (!editId) {
      toast.error('No venue selected for update.');
      return; 
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/admin/edit/${editId}`, venue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Venue Updated Successfully");
      const updatedFacilities = facilityDetails.map(facility =>
        facility.id === editId ? response.data.updatedVenue : facility
      );
      setFacilityDetails(updatedFacilities);
      setEditing(false);
      setEditId(null);
      handleClose();
    } catch (error) {
      const errorMessage = error.response?.data?.Msg || 'Something went wrong';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (Name) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/delete/${Name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Venue deleted successfully");
      const updatedFacilities = facilityDetails.filter(facility => facility.Vname !== Name);
      setFacilityDetails(updatedFacilities);
    } catch (error) {
      toast.error('Error deleting venue.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null); 
    resetForm(); 
  };

  const resetForm = () => {
    setEditing(false); 
    setEditId(null); 
    setVenue({ Vimage: '', Vname: '', VType: '', VRating: '' }); 
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
          <Button 
            style={{ color: '#fff', backgroundColor: '#f44336' }} 
            onClick={() => navigate('/login')}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '80px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '2em', marginBottom: '2em' }}>
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
                      {editing ? 'Update Venue' : 'Add Venue'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <div 
              className="user-whole-card" 
              style={{ overflowX: 'auto', whiteSpace: 'nowrap', maxHeight: 'calc(100vh - 200px)' }}
            >
              {facilityDetails.map((facility) => (
                <div 
                  key={facility.id} 
                  className="user-search-card" 
                  style={{ display: 'inline-block', marginRight: '10px' }}
                >
                  <img 
                    src={facility.Vimage} 
                    className="search-card-img" 
                    alt={facility.Vname} 
                     
                  />
                  <div className="user-search-card-details">
                    <p>{facility.Vname}</p>
                    <p>Type: {facility.VType}</p>
                    <p>Rating: {facility.VRating}</p>
                    <div className="button-div">
                      <button onClick={() => handleEditClick(facility)}>Edit</button>
                      <button onClick={() => handleDelete(facility.Vname)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Venue</DialogTitle>
        <DialogContent>
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
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPage;
