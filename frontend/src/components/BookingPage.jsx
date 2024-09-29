import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 

const BookingPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const fetchProtectedData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/bookingpage', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Protected data:', response.data);
        } catch (error) {
          console.error('Error fetching protected data:', error);
        }
      };
      fetchProtectedData();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Booking Page</h1>
    </div>
  );
};

export default BookingPage;
