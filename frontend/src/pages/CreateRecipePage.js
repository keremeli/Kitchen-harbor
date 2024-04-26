import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const CreateRecipePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    description: ''
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

      const response = await axios.post('http://localhost:8000/recipes/createnew', dataToSend);
      console.log('Recipe created successfully:', response.data);
      setSuccessMessage('Recipe created successfully!');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-8">
      <NavBar />
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow-lg">
          <h2 className="text-2xl mb-4 text-center text-blue-600">Create a Recipe</h2>
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
              <label className="block mb-1">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
            >
              Create Recipe
            </button>
            <Link
              to="/dashboard"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Back to Recipes Dashboard
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

export default CreateRecipePage;
