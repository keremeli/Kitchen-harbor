
const ShoppingList = require('../database/models/shoppingList');

exports.createShoppingList = async (req, res) => {
    try {
        const { name, userId } = req.body;

        const newShoppingList = await ShoppingList.create({ name, userId });

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

        const updatedShoppingListData = req.body;

        const [updatedRowsCount] = await ShoppingList.update(updatedShoppingListData, {
            where: { id: shoppingListId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

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
