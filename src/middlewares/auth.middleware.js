const jwtService = require('../services/jwt.service');

/**
 * Middleware de autenticación que valida un JWT RS256.
 *
 * Acepta encabezados con formato Bearer <token> y tolera espacios,
 * mayúsculas/minúsculas y comillas alrededor del token.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const normalizedHeader = authHeader.trim();
  const match = normalizedHeader.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = match[1].trim().replace(/^['"]|['"]$/g, '');

  if (!token) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'El token JWT está vacío.'
    });
  }

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
      message: error.name === 'JsonWebTokenError'
        ? 'El token JWT está mal formado o no es válido.'
        : error.message
    });
  }
}

module.exports = authMiddleware;
