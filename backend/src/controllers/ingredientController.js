
const Ingredient = require('../database/models/ingredient');

exports.createIngredient = async (req, res) => {
    try {
        const { name, quantity} = req.body;

        const newIngredient = await Ingredient.create({ name, quantity });

        res.status(201).json(newIngredient);
    } catch (error) {
        console.error('Error creating ingredient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getIngredientById = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        const ingredient = await Ingredient.findByPk(ingredientId);

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        console.error('Error fetching ingredient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        const updatedIngredientData = req.body;

        const [updatedRowsCount] = await Ingredient.update(updatedIngredientData, {
            where: { id: ingredientId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        const updatedIngredient = await Ingredient.findByPk(ingredientId);
        res.status(200).json(updatedIngredient);
    } catch (error) {
        console.error('Error updating ingredient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        const deletedRowCount = await Ingredient.destroy({ where: { id: ingredientId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
