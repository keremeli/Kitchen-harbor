import React from 'react';
import { Link } from 'react-router-dom';

const CreateShoppingListButton = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link to="/createshoppinglistpage">
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded px-4 py-2">Create Shopping List</button>
      </Link>
    </div>
  );
};

export default CreateShoppingListButton;
