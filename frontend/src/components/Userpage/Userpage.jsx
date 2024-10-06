import React, { useState, useRef, useEffect } from 'react';
import './Userpage.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const Userpage = () => {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardContainerRef = useRef(null);
    const { isLoggedIn } = useAuth();
    const [cardWidth, setCardWidth] = useState(0);
    const [facilityDetails, setFacilityDetails] = useState([]); 
    const [filteredFacilities, setFilteredFacilities] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getvenue'); 
                const venues = response.data.Findvenue;
                setFacilityDetails(venues);
                setFilteredFacilities(venues);
            } catch (error) {
                console.error('Error fetching venues:', error);
                toast.error('Error fetching venues.');
            }
        };
        fetchVenues();
    }, []);

    // Calculate card width after venues are fetched
    useEffect(() => {
        if (cardContainerRef.current && facilityDetails.length > 0) {
            const cardWidthValue = cardContainerRef.current.querySelector('.user-search-card').offsetWidth;
            setCardWidth(cardWidthValue);
        }
    }, [facilityDetails]);

    const handleBookFacility = (facility) => {
        if(!isLoggedIn){
            toast.error("Not Signed in");
        } else {
            navigate(`/bookingpage/${facility.Vname}`, {
                state: {
                    Vname: facility.Vname,
                    Vimage: facility.Vimage,
                    VType: facility.VType,
                },
            });
        }
    };

    const generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <>
                {Array(fullStars).fill().map((_, i) => (
                    <span key={i} className="star">★</span>
                ))}
                {halfStar === 1 && <span className="half-star">★</span>}
                {Array(emptyStars).fill().map((_, i) => (
                    <span key={i} className="star" style={{ color: '#ccc' }}>★</span>
                ))}
            </>
        );
    };

    const handleScrollRight = () => {
        if (cardContainerRef.current) {
            const visibleCards = 3.33;
            const totalCards = facilityDetails.length;

            if (scrollPosition < (totalCards - visibleCards) * cardWidth) {
                const newScrollPosition = Math.min(scrollPosition + cardWidth * visibleCards, (totalCards - visibleCards) * cardWidth);
                cardContainerRef.current.scrollBy({ left: cardWidth * visibleCards, behavior: 'smooth' });
                setScrollPosition(newScrollPosition);

                const rightArrow = document.querySelector('.nav-btn-right');
                if (newScrollPosition >= (totalCards - visibleCards) * cardWidth && rightArrow) {
                    rightArrow.classList.add('disabled');
                }

                const leftArrow = document.querySelector('.nav-btn-left');
                if (leftArrow) {
                    leftArrow.classList.remove('disabled');
                }
            }
        }
    };

    const handleScrollLeft = () => {
        if (cardContainerRef.current && scrollPosition > 0) {
            const visibleCards = 3.33;
            const newScrollPosition = Math.max(scrollPosition - cardWidth * visibleCards, 0);
            cardContainerRef.current.scrollBy({ left: -cardWidth * visibleCards, behavior: 'smooth' });
            setScrollPosition(newScrollPosition);

            const leftArrow = document.querySelector('.nav-btn-left');
            if (newScrollPosition <= 0 && leftArrow) {
                leftArrow.classList.add('disabled');
            }

            const rightArrow = document.querySelector('.nav-btn-right');
            if (rightArrow) {
                rightArrow.classList.remove('disabled');
            }
        }
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredFacilities(facilityDetails);
        } else {
            const filtered = facilityDetails.filter(facility => 
                facility.Vname.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFacilities(filtered);
        }
    };

    return (
        <div className='user-container'>
            <Navbar onSearch={handleSearch} />

            <div className="user-main">
                <div className="user-top-bookings">
                    <h2 style={{ textAlign: "center", marginBottom: "20px", color: "black" }}>Top Bookings</h2>
                    {facilityDetails.sort((a, b) => b.VRating - a.VRating).slice(0, 3).map((facility, index) => (
                        <div key={index} className="user-bookings-card">
                            <img src={facility.Vimage} className="booking-img" alt={facility.Vname} />
                            <div className="user-bookings-detail2">
                                <div className="user-bookings-detail">
                                    <p>Name: {facility.Vname}</p>
                                    <p>Type: {facility.VType}</p>
                                </div>
                                <div className="user-rating">
                                    <span className="user-stars">
                                        Rating: {generateStars(facility.VRating)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="user-details">
                    <h2 style={{ textAlign: "center", marginTop: "0px" }}>Book Facilities</h2>
                    <div className="nav-buttons">
                        <button 
                            className={`nav-btn-left ${scrollPosition <= 0 ? 'disabled' : ''}`} 
                            onClick={handleScrollLeft}
                            style={{ height: '40px', width: '40px', margin: "auto" }}
                            aria-label="Scroll left"
                        >
                            &lt;
                        </button>
                            
                        <div className="user-whole-card" ref={cardContainerRef}>
                        {filteredFacilities.map((facility, index) => (
                            <div key={index} className="user-search-card">
                                <img src={facility.Vimage} className="search-card-img" alt={facility.Vname} />
                                <div className="user-search-card-details">
                                    <div className="user-title-rating">
                                        <p style={{ fontSize: "18px" }}>{facility.Vname}</p>
                                        <div className="user-rating">
                                            <span className="user-stars">
                                                {generateStars(facility.VRating)}
                                            </span>
                                        </div>
                                    </div>
                                    <p>Type: {facility.VType}</p>
                                    <button onClick={() => handleBookFacility(facility)}>Book Facility</button>
                                </div>
                            </div>
                        ))}
                        </div>
                        
                        <button 
                            className={`nav-btn-right ${scrollPosition >= (facilityDetails.length - 3) * cardWidth ? 'disabled' : ''}`} 
                            onClick={handleScrollRight}
                            style={{ height: '40px', width: '40px', margin: "auto" }}
                            aria-label="Scroll right"
                        >
                            &gt;
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Userpage;
