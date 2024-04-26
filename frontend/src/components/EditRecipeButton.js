import React from 'react';
import { Link } from 'react-router-dom';

const EditRecipeButton = ({ recipeId }) => {
  return (
    <Link to={`/editrecipepage/${recipeId}`}>
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Edit</button>
    </Link> 
  );
};

export default EditRecipeButton;


