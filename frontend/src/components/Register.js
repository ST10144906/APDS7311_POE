import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    idNumber: '',
    accountNumber: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 
    try {
      console.log("Sending request..."); 
      
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);

      console.log("Response received:", res); 
      
      navigate('/login');
    } catch (err) {
      console.error("Error in axios request:", err); 

      if (err.response && err.response.data && err.response.data.errors) {
        console.log("Detailed error messages:", err.response.data.errors); // Log specific errors
        const errorMessages = err.response.data.errors.map(error => `${error.field}: ${error.msg}`).join('\n');
        alert('Error:\n' + errorMessages);
      } else if (err.response && err.response.data && err.response.data.msg) {
        alert('Error: ' + err.response.data.msg);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };
  

  const goBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Username"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Number:</label>
          <input
            type="text"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login Now</span>
      </p>
      
      <button className="back-button" onClick={goBackToHome}>Back to Home</button>
    </div>
  );
};

export default Register;
