import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');

  return (
    <div className="main-container">
      <div class="title">
  <i class="fas fa-user-shield"></i> REGX
</div>

      <div className="simple-container">
        <div className="simple-image-section">
          <img src={require('./dk.jpg')} alt="" />
        </div>
        <div className="simple-form-section">
          <div className="simple-header">
            <h1>{action}</h1>
          </div>

          <div className="simple-inputs">
            {action === 'Sign Up' ? (
              <div className="log-signup-input">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Register Number" />
                <input type="text" placeholder="Department" />
                <input type="text" placeholder="Year (Student or Staff)" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
              </div>
            ) : (
              <div className="log-login-input">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
              </div>
            )}
          </div>

          {action === 'Login' && (
            <div className="forgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
          )}

          <div className="simple-submit-container">
            <button
              className={action === 'Login' ? 'simple-submit gray' : 'simple-submit'}
              onClick={() => setAction('Sign Up')}
            >
              Sign Up
            </button>
            <button
              className={action === 'Sign Up' ? 'simple-submit gray' : 'simple-submit'}
              onClick={() => setAction('Login')}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
