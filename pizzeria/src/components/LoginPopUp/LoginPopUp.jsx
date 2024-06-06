import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // New state to track login status

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.47.43:8000/users');
      setUserData(response.data);
    } catch (error) {
      setError('Error fetching user data: ' + error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currState === 'Login') {
      // Find the user by email
      const user = userData.find((user) => user.email === email);

      if (!user) {
        setError('Error: User not found.');
        return;
      }

      // Check if the password matches
      if (user.password !== password) {
        setError('Error: Incorrect password.');
        return;
      }

      setLoggedIn(true); // Set loggedIn state to true on successful login
      // Handle successful login, e.g., set token, redirect, etc.
    } else if (currState === 'Sign Up') {
      // Perform sign up using POST method
      const userData = {
        email,
        password,
        username
      };

      try {
        const response = await axios.post('http://192.168.47.43:8000/users', userData);
        console.log(response.data);
        // Handle the response data as needed for successful sign up
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError('Network Error: Please check your internet connection.');
        } else {
          setError('Error: ' + error.message);
        }
      }
    }
  };

  return (
    <>
      {!loggedIn && ( // Render login pop-up if not logged in
        <div className='login-popup'>
          <form className='login-popup-container' onSubmit={handleSubmit}>
            <div className='login-popup-title'>
              <h2>{currState}</h2>
              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
            </div>
            <div className='login-popup-inputs'>
              {currState === 'Sign Up' && (
                <input
                  type='text'
                  placeholder='Your username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}
              <input
                type='email'
                placeholder='Your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit'>
              {currState === 'Sign Up' ? 'Create account' : 'Login'}
            </button>
            <div className='login-popup-condition'>
              <input type='checkbox' required />
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {error && <p className='error-message'>{error}</p>}
          </form>
        </div>
      )}
      {loggedIn && ( // Render user email if logged in
        <div className='user-info'>
          <p>Welcome, {email}</p>
          <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
      )}
    </>
  );
};

export default LoginPopUp;
