const test = require('node:test');
const assert = require('node:assert/strict');

const { signToken, verifyToken } = require('../src/services/jwt.service');

test('signToken y verifyToken preservan claims seguros del usuario', () => {
  const user = {
    id: 'usr_001',
    name: 'Alice'
  };

  const token = signToken(user);
  const payload = verifyToken(token);

  assert.equal(payload.sub, 'usr_001');
  assert.equal(payload.name, 'Alice');
  assert.ok(payload.exp > Math.floor(Date.now() / 1000));
});
