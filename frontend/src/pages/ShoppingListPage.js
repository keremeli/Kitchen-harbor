import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import CreateShoppingListButton from '../components/CreateShoppingListButton';
import EditShoppingListButton from '../components/EditShoppingListButton';

const ShoppingListPage = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shopping-lists/');
        setShoppingLists(response.data);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingLists();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/shopping-lists/${id}`);
      setShoppingLists(shoppingLists.filter(list => list.id !== id));
    } catch (error) {
      console.error('Error deleting shopping list:', error);
    }
  };

  const handleCheckboxChange = async (id) => {
    try {
      const updatedShoppingList = shoppingLists.find(list => list.id === id);
      updatedShoppingList.completed = !updatedShoppingList.completed;
      const response = await axios.put(`http://localhost:8000/shopping-lists/${id}`, updatedShoppingList);
      console.log('Shopping list updated successfully:', response.data);
      setShoppingLists([...shoppingLists]);
    } catch (error) {
      console.error('Error updating shopping list:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-8">
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <p>Loading...</p>}
        {!loading && shoppingLists.length === 0 && <p>No shopping lists found</p>}
        {shoppingLists.map(list => (
          <div key={list.id} className="shopping-list-card bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{list.title}</h3>
            <p>ID: {list.id}</p>
            <p>Ingredients: {list.ingredients.join(', ')}</p>
            <label className="inline-flex items-center mt-2">
              <input type="checkbox" checked={list.completed} onChange={() => handleCheckboxChange(list.id)} className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2">Completed</span>
            </label>
            <div className="flex justify-end mt-4">
              <EditShoppingListButton shoppingListId={list.id} />
              <button className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 ml-2" onClick={() => handleDelete(list.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <CreateShoppingListButton />
    </div>
  );
};

export default ShoppingListPage;