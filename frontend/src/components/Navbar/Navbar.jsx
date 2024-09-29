import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { FaUserCircle } from 'react-icons/fa';
import ground from "../../assets/ground1.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        setIsLoggedIn(!!token);
    }, [setIsLoggedIn]);

    const handleProfileClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleNavigate = () => {
        if (isLoggedIn) {
            localStorage.removeItem('token');
            setIsLoggedIn(false); 
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <div className="user-nav">
                <div className="user-nav-left">
                
<h2 style={{ color: 'white' }}>ResX</h2>

                    <div className="user-search-container">
                        <input type="search" className='user-search' placeholder="Search facilities..." />
                    </div>
                </div>
                <div className="user-nav-right">
                    {isLoggedIn && (
                        <div className="user-profile">
                            <FaUserCircle size={40} color="white" onClick={toggleDropdown}/>
                            
                            {isDropdownOpen && (
                                <ul className="nav-profile-dropdown">
                                <li onClick={() => { navigate('/cart'); setIsDropdownOpen(false); }}>
                                <img src=""/> Orders
                                </li>
                                </ul>
                               )}

                        </div>
                    )}
                    <button onClick={handleNavigate}>
                        {isLoggedIn ? 'Logout' : 'Sign In'}
                    </button>
                </div>
            </div>
            {showPopup && (
                <>
                    <div className="popup-overlay show" onClick={handleClosePopup}></div>
                    <div className="user-profile-popup">
                        <span className="close-btn" onClick={handleClosePopup}>&times;</span>
                        <div className="user-popup-left">
                            <FaUserCircle size={40} color="#333" />
                            <h3>{userEmail ? userEmail : 'Username'}</h3> 
                        </div>
                        <div className="whole-bookings-card">
                            <h4 style={{textAlign:"center"}}>Your Bookings</h4>
                            <div className="user-popup-card">
                                <div className="user-popup-card-details-1">
                                    <img src={ground} className="user-popup-card-img" alt="" />
                                    <span style={{marginTop:"4px"}}>Nehru Stadium</span>
                                </div>
                                <div className="user-popup-card-details-2">
                                    <p>Date: 02.10.2024</p>
                                    <p>Time: 6:30 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar;
