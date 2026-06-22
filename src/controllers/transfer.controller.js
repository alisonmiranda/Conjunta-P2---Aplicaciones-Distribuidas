const Sentry = require('../instrument');

class TransferController {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  executeTransfer(req, res, next) {
    try {
      const { fromAccountId, toAccountId, amount, triggerOperationalError } = req.body;

      if (!fromAccountId || !toAccountId || amount === undefined) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
        });
      }

      if (triggerOperationalError) {
        const error = new Error('Conexión interrumpida con el Clúster de Datos SecurePay');
        Sentry.withScope((scope) => {
          scope.setTag('userId', req.user?.sub || req.user?.id || 'unknown');
          scope.setTag('operation', 'transfer.execute');
          Sentry.captureException(error);
        });
        return res.status(500).json({
          error: 'Error interno del servidor',
          message: error.message
        });
      }

      const result = this.transactionService.executeTransfer(
        fromAccountId,
        toAccountId,
        Number(amount)
      );

      return res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Conexión interrumpida con el Clúster de Datos SecurePay') {
        Sentry.withScope((scope) => {
          scope.setTag('userId', req.user?.sub || req.user?.id || 'unknown');
          scope.setTag('operation', 'transfer.execute');
          Sentry.captureException(error);
        });
        return res.status(500).json({
          error: 'Error interno del servidor',
          message: error.message
        });
      }

      return res.status(400).json({
        error: 'Error en la transacción',
        message: error.message
      });
    }
  }
}

module.exports = TransferController;
