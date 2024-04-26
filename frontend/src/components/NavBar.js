import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex justify-center mb-8 mt-4">
      <ul className="flex space-x-4">
        <li>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" to="/dashboard">Recipes</Link>
        </li>
        <li>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" to="/shoppinglistpage">Shopping List</Link>
        </li>
        <li>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" to="/userpage">User Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

