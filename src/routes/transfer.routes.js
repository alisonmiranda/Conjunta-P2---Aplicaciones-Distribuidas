const express = require('express');
const router = express.Router();
const TransactionMonolithService = require('../services/transaction.monolith.service');
const TransferController = require('../controllers/transfer.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const transactionService = new TransactionMonolithService();
const transferController = new TransferController(transactionService);

// POST /v1/transfer-beta/execute
router.post('/execute', authMiddleware, transferController.executeTransfer.bind(transferController));

module.exports = router;
