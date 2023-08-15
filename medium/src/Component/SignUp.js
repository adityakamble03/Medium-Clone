import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate=useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post('http://127.0.0.1:3000/create/author', formData);
      // Assuming the API responds with a success message or user data
      console.log('Sign-up successful:', response.data);
      // Reset the form after successful sign-up
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      // Handle any errors that occur during sign-up
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUp;
