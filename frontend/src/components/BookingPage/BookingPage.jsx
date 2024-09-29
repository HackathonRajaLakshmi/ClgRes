import React, { useState } from 'react';
import yourImage from '../../assets/lab.jpg';
import './BookingPage.css';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const BookingPage = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [urgency, setUrgency] = useState('');
  const [role, setRole] = useState(''); 
  const navigate=useNavigate();

  const handleBooking = async () => {

    const token = localStorage.getItem('token'); 
    if (!token) {
      toast.error('Unauthorized: Please log in to continue.');
      navigate('/login');
      return;
    }
  
    if (!date || !startTime || !endTime || !urgency || !role) {
      alert('Please fill out all fields before confirming the booking.');
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/book',
        {
          Vname: "Beautiful Venue",
          VType: "Event Hall",
          date: date,
          bookingTime: startTime,
          endTime: endTime,
          urge: urgency,
          role: role
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 200) {
        toast.success('Booking confirmed!');
        navigate('/cart');
      } else {
        toast.error(`Booking failed: ${response.data.msg}`);
      }
    } catch (error) {
      console.error('Error booking:', error);
      toast.error('An error occurred during booking. Please try again later.');
    }
  };
  
  

  return (
    <div className="booking-page">
      <div className="main-container">
        <div className="top-section">
          <img src={yourImage} alt="Venue" className="venue-image" />
        </div>
        <div className="bottom-section">
          <div className="details-container">
            <div className="details-h3tag">
              <h3 >NAME         : Beautiful Venue</h3>
              <h3>TYPE         : Event Hall</h3>
            </div>

            <div className="table">

              <div className="row">
                
                <label className="label">Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field" id='booking-input'
                  required
                />
              </div>
              <div className="row">
                <label className="label">Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input-field" id='booking-input'
                  required
                />
              </div>
              <div className="row">
                <label className="label">End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input-field" id='booking-input'
                  required
                />
              </div>
              <div className="row">
                <label className="label">Urgency:</label>
                <div className="radio-group">
                  {['High', 'Mid', 'Low'].map((level) => (
                    <label key={level} className="radio-label">
                      <input
                        type="radio"
                        value={level}
                        checked={urgency === level}
                        onChange={(e) => setUrgency(e.target.value)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              <div className="row">
                <label className="label">Role:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="Staff">Staff</option>
                  <option value="Pg">Postgraduate</option>
                  <option value="Ug">Undergraduate</option>
                </select>
              </div>
            

            </div>

            <button onClick={handleBooking} className="book-button">Book Now</button>
          </div>


          <div className="map-container">
            <h3>Map</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.783049701283!2d77.05794187508938!3d10.827907989324046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84ee37569ae7f%3A0x3c5b1824b6e79192!2sSri%20Eshwar%20College%20of%20Engineering%2C%20Coimbatore!5e0!3m2!1sen!2sin!4v1727580417829!5m2!1sen!2sin" 
              width="100%"
              height="70%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className='map-iframe'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
