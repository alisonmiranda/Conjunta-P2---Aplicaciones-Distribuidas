const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

const transactionsHistory = [];

class TransactionStateService {
  getAccountById(accountId) {
    return usersDb.find((user) => user.accountAlpha === accountId);
  }

  getAccountBalance(accountId) {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }

  applyTransfer(sender, receiver, amount) {
    sender.balance -= amount;
    receiver.balance += amount;

    const transaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: sender.accountAlpha,
      to: receiver.accountAlpha,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };

    transactionsHistory.push(transaction);

    return transaction;
  }

  getUsersDb() {
    return usersDb;
  }

  getTransactionsHistory() {
    return transactionsHistory;
  }
}

module.exports = {
  TransactionStateService,
  usersDb,
  transactionsHistory
};
