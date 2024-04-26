import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Access the history object for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login', loginData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/register', registerData);
      setMessage('Registration successful! You can now log in.');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl mb-4 text-center text-blue-600">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            required
          />
          <input
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
            Login
          </button>
        </form>

        <h2 className="text-2xl mt-8 mb-4 text-center text-blue-600">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            required
          />
          <input
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
          <input
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
            Register
          </button>
        </form>

        {message && <p className="text-center mt-4 text-grey-200">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
