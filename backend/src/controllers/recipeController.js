
const Recipe = require('../database/models/recipe');

exports.createRecipe = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newRecipe = await Recipe.create({ title, description });

        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const recipe = await Recipe.findByPk(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const updatedRecipeData = req.body;

        const [updatedRowsCount] = await Recipe.update(updatedRecipeData, {
            where: { id: recipeId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const updatedRecipe = await Recipe.findByPk(recipeId);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        const deletedRowCount = await Recipe.destroy({ where: { id: recipeId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
