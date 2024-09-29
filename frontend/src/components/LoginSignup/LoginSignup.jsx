import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginSignup.css';
import loginimg from "../../assets/loginimg.jpeg";
import axios from "axios";

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
      const url = action === 'Sign Up' ? 'http://localhost:3000/api/register' : 'http://localhost:3000/api/login';

      const requestBody = action === 'Sign Up' ? {
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
      };

      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(action === 'Sign Up' ? "Registration successful!" : "Successfully logged in!");

        if (action === 'Login') {
          localStorage.setItem('token',response.data.token); 
          navigate('/');
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Something went wrong. Please try again.");
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

            {action === 'Login' ? (
             <div className="forgot-password">
                New User? <span onClick={() => setAction('Sign Up')} style={{ cursor: 'pointer', color: 'blue' }}>Click Here!</span>
             </div>
             ) : (
             <div className="forgot-password">
                  Already a User? <span onClick={() => setAction('Login')} style={{ cursor: 'pointer', color: 'blue' }}>Click Here!</span>
             </div>
            )}
                        
            <div className="simple-submit-container">
              <button
                className="simple-submit"
                type="submit"
              >
                {action === 'Sign Up' ? 'Sign Up' : 'Log In'}
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
