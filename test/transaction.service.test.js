const test = require('node:test');
const assert = require('node:assert/strict');

const TransactionMonolithService = require('../src/services/transaction.monolith.service');

test('executeTransfer completa una transferencia y actualiza saldos', () => {
  const service = new TransactionMonolithService();

  const result = service.executeTransfer('ACC-12345', 'ACC-67890', 100);

  assert.equal(result.success, true);
  assert.equal(result.transaction.status, 'COMPLETED');
  assert.equal(result.balanceRestante, 1400);
});

test('getAccountBalance devuelve el saldo actual de una cuenta', () => {
  const service = new TransactionMonolithService();

  const result = service.getAccountBalance('ACC-12345');

  assert.equal(result.accountId, 'ACC-12345');
  assert.equal(result.balance, 1400);
});
