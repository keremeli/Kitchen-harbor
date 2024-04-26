
const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/', shoppingListController.getAllShoppingLists);

router.post('/createnew', shoppingListController.createShoppingList);

router.get('/:shoppingListId', shoppingListController.getShoppingListById);

router.put('/:shoppingListId', shoppingListController.updateShoppingList);

router.delete('/:shoppingListId', shoppingListController.deleteShoppingList);


module.exports = router;
