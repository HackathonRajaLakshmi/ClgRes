import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import ground from "../../assets/ground1.jpg";
import "./Cart.css";
import { FaUserCircle,FaHome} from 'react-icons/fa';
import Footer from "../Footer/Footer";


const Cart = () => {

 const navigate=useNavigate();

 const handleNavigate=()=>{
  navigate('/login');
  localStorage.removeItem('token');
 }

 const NavtoUserpage=()=>{
    navigate('/');
 }

  return (
   <>
   <div className="user-nav-cart">
                <div className="user-nav-left">
                    <i className="fas fa-user-shield" style={{color:"white",fontSize:"20px"}}><span style={{marginLeft:"15px",fontSize:"20px"}}>RESX</span> </i> 

                    <div className="user-search-container">
                        <input 
                            type="search" 
                            className='user-search' 
                            placeholder="Search facilities..." 
                        />
                    </div>
                </div>
                <div className="user-nav-right">
                        <div className="user-profile">
                        </div>
                  <FaHome className="home-img" onClick={NavtoUserpage}/>
                    <button onClick={handleNavigate}>
                      Logout
                    </button>
                </div>
            </div>
 

    <div className="cart-container">
     <div className="bookings-container">
      <h2>Your Bookings</h2>
      <div className="cart">
        <div className="user-cart-card">
          <div className="user-cart-detail">
            <p><strong>Bookings</strong></p>
            <p><strong>Venue Name:</strong></p>
            <p><strong>Venue Type:</strong></p>
            <p><strong>Date:</strong></p>
            <p><strong>Time:</strong></p>
            <p><strong>Price</strong></p>
          </div>
          <div className="user-cart-detail">
          <img src={ground} className="cart-booking-img" alt="Venue" />
            <p>Nehru Stadium</p>
            <p>Sports Facility</p>
            <p>30.09.2024</p>
            <p>6:30 PM</p>
            <p>Rs 200 per hour</p>
          </div>
        </div>
      </div>
      </div>  
      <Footer/>
    </div>
  </>  
  );
};

export default Cart;
