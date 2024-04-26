import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { jwtDecode } from 'jwt-decode';
import EditUserPageButton from '../components/EditUserPageButton';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;
      await axios.delete(`http://localhost:8000/users/${userId}`);
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const maskPassword = (password) => {
    return '*'.repeat(password.length);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto py-8 px-4">
        <NavBar />
        <h2 className="text-2xl mb-4 text-center text-blue-600">User Information</h2>
        {loading && <p className="text-center">Loading...</p>}
        {!loading && user && (
          <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Password:</span> {maskPassword(user.password)}</p>
            <div className="flex justify-end mt-4">
              <EditUserPageButton userId={user.id}/>
              <button onClick={handleDelete} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        )}
        {!loading && !user && <p className="text-center">User not found</p>}
      </div>
    </div>
  );
};

export default UserPage;

