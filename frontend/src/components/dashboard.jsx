import React from 'react';
import './dashboard.css'
const Dashboard = () => {
  return (
    <div className='Db-dash'>
      <h2>Booking Power BI Report</h2>
      <iframe title="Booking" width="1440" height="661.25" src="https://app.powerbi.com/reportEmbed?reportId=6700f78d-1223-49e7-806b-124371e37975&autoAuth=true&ctid=d9f3d0d2-7180-4f1c-81e4-5c799e945b3c" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  );
};

export default Dashboard;
