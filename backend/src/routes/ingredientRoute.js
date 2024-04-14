
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

router.post('/', ingredientController.createIngredient);

router.get('/:ingredientId', ingredientController.getIngredientById);

router.put('/:ingredientId', ingredientController.updateIngredient);

router.delete('/:ingredientId', ingredientController.deleteIngredient);


module.exports = router;
