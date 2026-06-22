class FinancialVerificationService {
  constructor(transactionStateService) {
    this.transactionStateService = transactionStateService;
  }

  validateTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.transactionStateService.getAccountById(fromAccountId);
    const receiver = this.transactionStateService.getAccountById(toAccountId);

    if (!sender) {
      throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
    }

    if (!receiver) {
      throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
    }

    if (amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
    }

    if (sender.balance < amount) {
      throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
    }

    return {
      sender,
      receiver,
      amount
    };
  }
}

module.exports = FinancialVerificationService;
