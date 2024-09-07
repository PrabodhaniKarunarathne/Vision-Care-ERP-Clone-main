import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        window.location.href = '/home';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  };

  return (
    <div>
    {isLoggedIn ? (
      <div className="redirect-message">Redirecting</div>
    ) : (
      <div>
        <h1>Welcome to <br></br>The Vision Care</h1>
        <h2 className="login-heading">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="usernameInput"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
          />
          <button
            type="button"
            onClick={handleLogin}
            id="loginButton"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    )}
  </div>
  
  );
}

export default Login;