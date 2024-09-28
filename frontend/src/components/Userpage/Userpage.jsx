import React, { useState, useRef } from 'react';
import './Userpage.css';
import ground from "../../assets/ground1.jpg";
import lab from "../../assets/lab.jpg";
import gandhi from "../../assets/school.webp";
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Userpage = () => {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardContainerRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0); 

    const facilityDetails = [
        {
            name: "Nehru Ground",
            type: "Sports Facility",
            date: "28-09-2024",
            time: "6:30 PM",
            img: ground,
            rating: 4.5
        },
        {
            name: "Gandhi Stadium",
            type: "Athletics Facility",
            date: "31-09-2024",
            time: "7:30 PM",
            img: gandhi,
            rating: 4.4
        },
        {
            name: "Synopsis Lab",
            type: "Lab Facility",
            date: "02-10-2024",
            time: "10:30 AM",
            img: lab,
            rating: 4.1
        },
        {
            name: "Lotus Pool",
            type: "Swimming Facility",
            date: "05-10-2024",
            time: "8:00 AM",
            img: "lotus-pool.jpg",
            rating: 4.0
        },
        {
            name: "Khan Auditorium",
            type: "Event Facility",
            date: "07-10-2024",
            time: "6:00 PM",
            img: "auditorium.jpg",
            rating: 4.0
        },
        {
            name: "Physics Lab",
            type: "Science Facility",
            date: "09-10-2024",
            time: "9:30 AM",
            img: "physics-lab.jpg",
            rating: 4.0
        }
    ];

    const handleBookFacility = () => {
        if (isLoggedIn) {
            navigate("/bookingpage"); 
        } else {
            toast.error("Not signed in");
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

    useEffect(() => {
        const card = document.querySelector('.user-search-card');
        if (card) {
            setCardWidth(card.offsetWidth);
        }
    }, []);
    
    useEffect(() => {
        const handleResize = () => {
            const card = document.querySelector('.user-search-card');
            if (card) {
                setCardWidth(card.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const handleScrollRight = () => {
        if (cardContainerRef.current) {
            const visibleCards = 3.5;
            const totalCards = facilityDetails.length;
    
            if (scrollPosition < (totalCards - visibleCards) * cardWidth) {
                const newScrollPosition = scrollPosition + cardWidth * visibleCards; // Move by 3 cards
                cardContainerRef.current.scrollBy({ left: cardWidth * visibleCards, behavior: 'smooth' });
                setScrollPosition(newScrollPosition);
    
                if (newScrollPosition >= (totalCards - visibleCards) * cardWidth) {
                    const rightArrow = document.querySelector('.nav-btn.right');
                    if (rightArrow) {
                        rightArrow.classList.add('disabled');
                    }
                }
                
                const leftArrow = document.querySelector('.nav-btn.left');
                if (leftArrow) {
                    leftArrow.classList.remove('disabled');
                }
            }
        }
    };
    
    const handleScrollLeft = () => {
        if (cardContainerRef.current && scrollPosition > 0) {
            const newScrollPosition = scrollPosition - cardWidth * 3.5;
            cardContainerRef.current.scrollBy({ left: -cardWidth * 3.5, behavior: 'smooth' });
            setScrollPosition(newScrollPosition);
    
            const leftArrow = document.querySelector('.nav-btn.left');
            if (newScrollPosition <= 0 && leftArrow) {
                leftArrow.classList.add('disabled');
            }

            const rightArrow = document.querySelector('.nav-btn.right');
            if (rightArrow) {
                rightArrow.classList.remove('disabled');
            }
        }
    };
    
    useEffect(() => {
        const leftArrow = document.querySelector('.nav-btn.left');
        if (leftArrow) {
            leftArrow.classList.toggle('disabled', scrollPosition <= 0);
        }
    }, [scrollPosition]);
    
    
    return (
        <div className='user-container'>
            <Navbar/>

            <div className="user-main">
                <div className="user-top-bookings">
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Top Bookings</h2>
                    {facilityDetails.sort((a, b) => b.rating - a.rating).slice(0, 3).map((facility, index) => (
                        <div key={index} className="user-bookings-card">
                            <img src={facility.img} className="booking-img" alt={facility.name} />
                            <div className="user-bookings-detail2">
                                <div className="user-bookings-detail">
                                    <p>Name: {facility.name}</p>
                                    <p>Type: {facility.type}</p>
                                </div>
                                <div className="user-rating">
                                    <span className="user-stars">
                                        Rating: {generateStars(facility.rating)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="user-details">
                    <h2 style={{ textAlign: "center", marginTop: "0px" }} onClick={handleBookFacility}>Book Facilities</h2>
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
                            {facilityDetails.map((facility, index) => (
                                <div key={index} className="user-search-card">
                                    <img src={facility.img} className="search-card-img" alt={facility.name} />
                                    <div className="user-search-card-details">
                                        <div className="user-title-rating">
                                            <p style={{fontSize:"18px"}}>{facility.name}</p>
                                            <div className="user-rating">
                                                <span className="user-stars">
                                                    {generateStars(facility.rating)}
                                                </span>
                                            </div>
                                        </div>
                                        <p>Type: {facility.type}</p>
                                        <button>Book Facility</button>
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
