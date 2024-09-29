import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import "./AdminLogin.css";
import loginimg from '../../assets/loginimg.jpeg';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', formData);
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Store token as 'authToken'
      toast.success("Sign-In Successful");
      navigate('/admin');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password. Please try again.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="simple-container">
        <div className="simple-image-section">
          <img src={loginimg} alt="Admin Login" />
        </div>
        <div className="simple-form-section">
          <div className="simple-header">
            <h1>Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="simple-inputs">
              <div className="admin-login-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ marginBottom: "10px" }}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{marginBottom:"10px"}}
                  required
                />
              </div>
            </div>   

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="simple-submit-container">
              <button className="simple-submit" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          <a href="/login" className="sign-in-link">Sign in as User</a>
        </div>
      </div>
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AdminLogin;
