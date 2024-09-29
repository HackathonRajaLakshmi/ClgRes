import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import ground from "../../assets/ground1.jpg";
import "./Cart.css";

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
    <div className="cart-container">
      <h2>Your Bookings</h2>
      <div className="cart">
        <div className="user-cart-card">
          <img src={ground} className="cart-booking-img" alt="Venue" />
          <div className="user-cart-detail">
            <p><strong>Name:</strong> Nehru Stadium</p>
            <p><strong>Type:</strong> Sports Facility</p>
            <p><strong>Date:</strong> 30.09.2024</p>
            <p><strong>Time:</strong> 6:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
