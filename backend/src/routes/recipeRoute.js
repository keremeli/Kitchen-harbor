
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/', recipeController.createRecipe);

router.get('/:recipeId', recipeController.getRecipeById);

router.put('/:recipeId', recipeController.updateRecipe);

router.delete('/:recipeId', recipeController.deleteRecipe);



module.exports = router;
