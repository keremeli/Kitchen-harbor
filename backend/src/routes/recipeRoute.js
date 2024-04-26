
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getAllRecipes);

// Route for creating a new recipe
router.post('/createnew', recipeController.createRecipe);

// Route for updating an existing recipe
router.put('/:recipeId', recipeController.updateRecipe);

// Route for deleting a recipe
router.delete('/:recipeId', recipeController.deleteRecipe);

// Route for fetching a recipe by ID
router.get('/:recipeId', recipeController.getRecipeById);



module.exports = router;

