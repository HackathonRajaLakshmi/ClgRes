import React, { useState } from 'react';
import yourImage from '../../assets/gandhi.jpg'; // Adjust the path as necessary
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
      <div className="top-left">
        <img src={yourImage} alt="Venue" className="venue-image" />
      </div>
      <div className="top-right">
        <h1 className="header">Regx</h1>
        <h1 className="venue-name">NAME: Beautiful Venue</h1>
        <h2 className="venue-type">TYPE: Event Hall</h2>
      </div>
      <div className="bottom-left">
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
              <div>
                <label>
                  <input
                    type="radio"
                    value="High"
                    checked={urgency === 'High'}
                    onChange={(e) => setUrgency(e.target.value)}
                  />
                  High
                </label>
                <label>
                  <input
                    type="radio"
                    value="Medium"
                    checked={urgency === 'Medium'}
                    onChange={(e) => setUrgency(e.target.value)}
                  />
                  Medium
                </label>
                <label>
                  <input
                    type="radio"
                    value="Low"
                    checked={urgency === 'Low'}
                    onChange={(e) => setUrgency(e.target.value)}
                  />
                  Low
                </label>
              </div>
            </label>
          </div>
        </div>
        <button onClick={handleBooking} className="book-button">Book Now</button>
      </div>
      <div className="bottom-right">
        {/* Additional content for right container */}
      </div>
    </div>
  );
};

export default BookingPage;
