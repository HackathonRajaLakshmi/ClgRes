import React, { useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>Booking Page</h1>
    </div>
  );
};

export default BookingPage;
