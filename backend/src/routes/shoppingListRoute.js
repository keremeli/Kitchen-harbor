
const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.post('/', shoppingListController.createShoppingList);

router.get('/:shoppingListId', shoppingListController.getShoppingListById);

router.put('/:shoppingListId', shoppingListController.updateShoppingList);

router.delete('/:shoppingListId', shoppingListController.deleteShoppingList);


module.exports = router;
