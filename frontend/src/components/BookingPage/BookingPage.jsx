import React, { useState } from 'react';
import yourImage from '../../assets/gandhi.jpg'; 
import './BookingPage.css';

const BookingPage = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [urgency, setUrgency] = useState('');

  const handleBooking = () => {
    alert(`Booking confirmed on ${date} from ${startTime} to ${endTime} with urgency: ${urgency}`);
  };

  return (
    <div className="booking-page">
      <div className="main-container">
        <div className="top-section">
          <img src={yourImage} alt="Venue" className="venue-image" />
        </div>
        <div className="bottom-section">
          <div className="details-container">
            <h3 className="venue-name">NAME: Beautiful Venue</h3>
            <h3 className="venue-type">TYPE: Event Hall</h3>
            
            <div className="input-container">
              <label>
                Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                  required
                />
              </label>
              <label>
                Start Time:
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input-field"
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input-field"
                  required
                />
              </label>
              <div>
                <label>
                  Urgency:
                  <div className="radio-group">
                    {['High', 'Medium', 'Low'].map((level) => (
                      <label key={level}>
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
                </label>
              </div>
            </div>
            <button onClick={handleBooking} className="book-button">Book Now</button>
          </div>

          <div className="sep-div"></div> {/* Separator */}

          <div className="empty-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.783049701283!2d77.05794187508938!3d10.827907989324046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84ee37569ae7f%3A0x3c5b1824b6e79192!2sSri%20Eshwar%20College%20of%20Engineering%2C%20Coimbatore!5e0!3m2!1sen!2sin!4v1727580417829!5m2!1sen!2sin" 
              width="78%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
