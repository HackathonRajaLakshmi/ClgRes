import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import './LoginSignup.css';
import loginimg from "../../assets/loginimg.jpeg";

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    reg_no: '',
    dept: '',
    year: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = action === 'Sign Up' ? '/api/register' : '/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action === 'Sign Up' ? {
          name: formData.name,
          role: formData.role,
          reg_no: formData.reg_no,
          dept: formData.dept,
          year: formData.year,
          email: formData.email,
          password: formData.password
        } : {
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (action === 'Login') {
          toast.success("Successfully signed in!"); // Show success toast on login
          navigate('/');
        }
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="title">
        <i className="fas fa-user-shield"></i> RESX
      </div>

      <div className="simple-container">
        <div className="simple-image-section">
          <img src={loginimg} alt="" />
        </div>
        <div className="simple-form-section">
          <div className="simple-header">
            <h1>{action}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="simple-inputs">
              {action === 'Sign Up' ? (
                <div className="log-signup-input">
                  <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                  <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
                  <input type="text" name="reg_no" placeholder="Register Number" onChange={handleChange} required />
                  <input type="text" name="dept" placeholder="Department" onChange={handleChange} required />
                  <input type="number" name="year" placeholder="Year (Student or Staff)" onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                </div>
              ) : (
                <div className="log-login-input">
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
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
                type="button"
                onClick={() => setAction('Sign Up')}
              >
                Sign Up
              </button>
              <button
                className={action === 'Sign Up' ? 'simple-submit gray' : 'simple-submit'}
                type="button"
                onClick={() => setAction('Login')}
              >
                Log In
              </button>
              <button type="submit" className="submit-button">
                {action}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
