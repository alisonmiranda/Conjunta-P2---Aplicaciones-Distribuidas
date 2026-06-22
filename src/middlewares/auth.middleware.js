const jwtService = require('../services/jwt.service');

/**
 * Middleware de autenticación que valida un JWT RS256.
 *
 * El token debe venir como:
 * Authorization: Bearer <token>
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = parts[1];

  try {
    const decoded = jwtService.verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'El token JWT ha expirado.'
      });
    }

    return res.status(401).json({
      error: 'Token inválido',
      message: error.message
    });
  }
}

module.exports = authMiddleware;
