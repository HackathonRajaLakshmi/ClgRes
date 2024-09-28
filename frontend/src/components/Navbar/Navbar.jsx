import React from 'react';
import "./Navbar.css";
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ground from "../../assets/ground1.jpg";

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const handleProfileClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
  return (
    <div>
       <div className="user-nav">
                <div className="user-nav-left">
                    <h2>ResX</h2>
                    <div className="user-search-container">
                        <input type="search" className='user-search' placeholder="Search facilities..." />
                    </div>
                </div>
                <div className="user-nav-right">
                    <div className="user-profile" onClick={handleProfileClick}>
                        <FaUserCircle size={40} color="#333" />
                    </div>
                    <button>Sign-In</button>
                </div>
            </div>
            {showPopup && (
                <>
                    <div className="popup-overlay show" onClick={handleClosePopup}></div>
                    <div className="user-profile-popup">
                        <span className="close-btn" onClick={handleClosePopup}>&times;</span>
                        <div className="user-popup-left">
                           <FaUserCircle size={40} color="#333" />
                           <h3>Username</h3>
                        </div>
                    <div className="whole-bookings-card">
                        <h4 style={{textAlign:"center"}}>Your Bookings</h4>
                        <div className="user-popup-card">
                            <div className="user-popup-card-details-1">
                              <img src={ground} className="user-popup-card-img" alt="" />
                              <span style={{marginTop:"4px"}}>Nehru Stadium</span>
                            </div>  
                            <div className="user-popup-card-details-2">
                              <p>Date:02.10.2024</p>
                              <p>Time:6:30 PM</p>
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
