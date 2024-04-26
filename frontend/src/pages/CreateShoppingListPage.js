import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CreateShoppingListPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    completed: false
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = formData.ingredients.split('\n').map(ingredient => ingredient.trim());
      const dataToSend = { ...formData, ingredients: ingredientsArray };

      const response = await axios.post('http://localhost:8000/shopping-lists/createnew', dataToSend);
      console.log('Shopping list created successfully:', response.data);
      setSuccessMessage('Shopping list created successfully!');
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-8">
      <NavBar />
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl mb-4 text-center text-blue-600">Create a Shopping List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Ingredients:</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={() => setFormData({ ...formData, completed: !formData.completed })}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
          >
            Create Shopping List
          </button>
          {/* Use Link component for navigation */}
          <Link
            to="/shoppinglistpage"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Back to Shopping List Dashboard
          </Link>
        </form>
        {successMessage && (
          <div className="success-message mt-4">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateShoppingListPage;

