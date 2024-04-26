
const ShoppingList = require('../database/models/shoppingList');

exports.getAllShoppingLists = async (req, res) => {
  try {
    // Fetch all shopping lists from the database
    const shoppingLists = await ShoppingList.findAll();
    // Send the shopping lists as a response
    res.json(shoppingLists);
  } catch (error) {
    // If there's an error, send a 500 status code along with the error message
    res.status(500).json({ error: error.message });
  }
};


exports.createShoppingList = async (req, res) => {
    try {
        const { title, ingredients, completed } = req.body;

        // Check if the required field 'title' is provided
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Create the shopping list with the provided data
        const newShoppingList = await ShoppingList.create({
            title: title,
            ingredients: ingredients || [], // Set to an empty array if not provided
            completed: completed || false, // Set to false if not provided
        });

        // Respond with the created shopping list
        res.status(201).json(newShoppingList);
    } catch (error) {
        console.error('Error creating shopping list:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getShoppingListById = async (req, res) => {
    try {
        const { shoppingListId } = req.params;

        const shoppingList = await ShoppingList.findByPk(shoppingListId);

        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        console.error('Error fetching shopping list:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateShoppingList = async (req, res) => {
    try {
        const { shoppingListId } = req.params;

        // Extract the fields to be updated from the request body
        const { title, ingredients, completed } = req.body;

        // Construct an object containing only the fields that need to be updated
        const updatedShoppingListData = {};
        if (title) updatedShoppingListData.title = title;
        if (ingredients) updatedShoppingListData.ingredients = ingredients;
        if (typeof completed === 'boolean') updatedShoppingListData.completed = completed;

        // Update the shopping list with the provided data
        const [updatedRowsCount] = await ShoppingList.update(updatedShoppingListData, {
            where: { id: shoppingListId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        // Fetch the updated shopping list and send it as a response
        const updatedShoppingList = await ShoppingList.findByPk(shoppingListId);
        res.status(200).json(updatedShoppingList);
    } catch (error) {
        console.error('Error updating shopping list:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteShoppingList = async (req, res) => {
    try {
        const { shoppingListId } = req.params;

        const deletedRowCount = await ShoppingList.destroy({ where: { id: shoppingListId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        res.status(200).json({ message: 'Shopping list deleted successfully' });
    } catch (error) {
        console.error('Error deleting shopping list:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
