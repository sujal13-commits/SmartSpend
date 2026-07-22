const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

router.use(protect); // every route below requires a valid token

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;