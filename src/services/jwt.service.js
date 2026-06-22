const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIVATE_KEY_PATH = path.join(__dirname, '../../private.pem');
const PUBLIC_KEY_PATH = path.join(__dirname, '../../public.pem');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 *
 * El payload se estructura con claims seguros: sub, name y exp.
 *
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @param {number} expiresInSeconds - Tiempo de validez del token en segundos.
 * @returns {string} JWT Token firmado.
 */
function signToken(user, expiresInSeconds = 120) {
  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    sub: user.id || user.sub,
    name: user.name || user.username,
    exp: now + expiresInSeconds
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256'
  });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 *
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado si es válido.
 */
function verifyToken(token) {
  const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');

  return jwt.verify(token, publicKey, {
    algorithms: ['RS256']
  });
}

module.exports = {
  signToken,
  verifyToken
};
