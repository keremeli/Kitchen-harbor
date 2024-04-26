import React from 'react';
import { Link } from 'react-router-dom';

const EditUserPageButton = ({ userId }) => {
  return (
    <Link to={`/edituserpage`}>
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Edit User</button>
    </Link> 
  );
};

export default EditUserPageButton;

