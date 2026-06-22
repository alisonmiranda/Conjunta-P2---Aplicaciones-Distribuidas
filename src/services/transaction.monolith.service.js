const FinancialVerificationService = require('./financial.verification.service');
const { TransactionStateService } = require('./transaction.state.service');
const ConsoleNotificationService = require('./notification.service');

class TransactionMonolithService {
  constructor(
    financialVerificationService = new FinancialVerificationService(new TransactionStateService()),
    transactionStateService = new TransactionStateService(),
    notificationService = new ConsoleNotificationService()
  ) {
    this.financialVerificationService = financialVerificationService;
    this.transactionStateService = transactionStateService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const { sender, receiver } = this.financialVerificationService.validateTransfer(
      fromAccountId,
      toAccountId,
      amount
    );

    const transaction = this.transactionStateService.applyTransfer(sender, receiver, amount);
    this.notificationService.notifyTransfer(sender, receiver, amount, transaction);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    return this.transactionStateService.getAccountBalance(accountId);
  }
}

module.exports = TransactionMonolithService;
