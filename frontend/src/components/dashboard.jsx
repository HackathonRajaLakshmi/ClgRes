import React from 'react';
import './dashboard.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        {/* <li><a href="/dashboard">Dashboard</a></li> */}
        <li><a href="/admin">Admin</a></li>
        {/* <li><a href="/analytics">Analytics</a></li> */}
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
};

const Dashboard = () => {
  return (
    <div className='Db-dash'>
      <Navbar />
      <h1><i className="fas fa-user-shield" style={{ color: 'rgb(247, 71, 71)', fontSize: '30px', margin: '0 5px' }}></i> {/* Adjust size */}
      <span style={{ color: 'rgb(247, 71, 71)', fontSize: '30px' }}>RESX</span> {/* Adjust size */}</h1>
      <h2 className='title-tag'>Booking Power BI Report</h2>
      <iframe 
        title="Booking" 
        width="1440" 
        height="661.25" 
        src="https://app.powerbi.com/reportEmbed?reportId=6700f78d-1223-49e7-806b-124371e37975&autoAuth=true&ctid=d9f3d0d2-7180-4f1c-81e4-5c799e945b3c" 
        frameBorder="0" 
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Dashboard;
