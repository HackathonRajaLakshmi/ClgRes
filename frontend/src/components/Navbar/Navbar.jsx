import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { FaUserCircle } from 'react-icons/fa';
import ground from "../../assets/ground1.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import bag from "../../assets/bag_icon.png";

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
                
                <i class="fas fa-user-shield" style={{color:"white",fontSize:"20px"}}><span style={{marginLeft:"15px",fontSize:"20px"}}>RESX</span> </i> 

                    <div className="user-search-container">
                        <input type="search" className='user-search' placeholder="Search facilities..." />
                    </div>
                </div>
                <div className="user-nav-right">
                    {isLoggedIn && (
                        <div className="user-profile">
                            <FaUserCircle size={40} onClick={toggleDropdown}/>
                            
                            {isDropdownOpen && (
                                <ul className="nav-profile-dropdown">
                                <li onClick={() => { navigate('/cart'); setIsDropdownOpen(false); }}>
                                <img src={bag}/> Orders
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
        </div>
    )
}

export default Navbar;
