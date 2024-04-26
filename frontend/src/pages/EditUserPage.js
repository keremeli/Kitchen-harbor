import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';

const EditUserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        
        // Decode the token to get the user's ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;

        // Fetch user by ID
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data with the provided password
      const updatedUserData = { ...formData };
  
      // Send a PUT request to update the user
      await axios.put(`http://localhost:8000/users/${user.id}`, updatedUserData);

      // Set success message
      setSuccessMessage('Changes saved successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-8">
      <NavBar />
      <div className="w-full max-w-3xl p-8">
        <div className="w-full max-w-3xl p-8 bg-white rounded shadow-lg">
          <h2 className="text-2xl mb-4 text-center text-blue-600">Edit User Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              >
                Save Changes
              </button>
              {/* Display success message */}
              {successMessage && <p>{successMessage}</p>}
              {/* Add a link back to the user profile */}
              <Link
                to="/userpage"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Back to Profile
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;

