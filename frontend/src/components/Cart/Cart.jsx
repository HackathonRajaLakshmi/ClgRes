import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); 
    } else {
      const fetchCartData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Cart data:', response.data);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      };
      fetchCartData();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  );
};

export default Cart;
