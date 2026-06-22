const express = require('express');
const router = express.Router();
const TransactionMonolithService = require('../services/transaction.monolith.service');
const AccountController = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const transactionService = new TransactionMonolithService();
const accountController = new AccountController(transactionService);

// GET /v1/account-alpha/balance
router.get('/balance', authMiddleware, accountController.getBalance.bind(accountController));

module.exports = router;
