import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ground from "../../assets/ground1.jpg";
import "./Cart.css";
import { FaUserCircle, FaHome } from 'react-icons/fa';
import Footer from "../Footer/Footer";
import { format, parseISO } from 'date-fns';

const Cart = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true); 

    const handleNavigate = () => {
        navigate('/login');
        localStorage.removeItem('token');
    };

    const NavtoUserpage = () => {
        navigate('/');
    };

    const fetchBookings = async () => {
        const token = localStorage.getItem('token'); 
        try {
            const response = await axios.get('http://localhost:3000/api/getbookings', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setBookings(response.data.retData); 
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <>
            <div className="user-nav-cart">
                <div className="user-nav-left">
                    <i className="fas fa-user-shield" style={{ color: "white", fontSize: "20px" }}><span style={{ marginLeft: "15px", fontSize: "20px" }}>RESX</span> </i>
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
                    <FaHome className="home-img" onClick={NavtoUserpage} />
                    <button onClick={handleNavigate}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="cart-container">
                <div className="bookings-container">
                    <h2>Your Bookings</h2>
                    <div className="cart">
                        {loading ? ( // Display loading indicator while fetching
                            <p>Loading bookings...</p>
                        ) : (
                            bookings.length > 0 ? (
                                bookings.map((booking, index) => (
                                    <div key={index} className="user-cart-card">
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
                                              <p>{booking.Vname}</p>
                                              <p>{booking.VType}</p>
                                              <p>{format(parseISO(booking.date), 'MMMM d, yyyy')}</p>
                                              <p> {format(parseISO(booking.bookingTime), 'hh:mm a')}</p>
                                             <p> {format(parseISO(booking.endTime), 'hh:mm a')}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No bookings found.</p>
                            )
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Cart;
