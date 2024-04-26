import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CreateRecipeButton from '../components/CreateRecipeButton';
import EditRecipeButton from '../components/EditRecipeButton';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/recipes/');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle error
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle error
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <NavBar />
        <h2 className="text-2xl mb-4 text-center text-blue-600">Recipe Dashboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Ingredients</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No recipes found.</td>
                </tr>
              ) : (
                recipes.map(recipe => (
                  <tr key={recipe.id}>
                    <td className="px-4 py-2">{recipe.id}</td>
                    <td className="px-4 py-2">{recipe.title || 'N/A'}</td>
                    <td className="px-4 py-2">{recipe.ingredients ? recipe.ingredients.join(', ') : 'N/A'}</td>
                    <td className="px-4 py-2">{recipe.description}</td>
                    <td className="px-4 py-2">
                      <EditRecipeButton recipeId={recipe.id} />
                      <button onClick={() => handleDelete(recipe.id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CreateRecipeButton />
    </div>
  );
};

export default Dashboard;

