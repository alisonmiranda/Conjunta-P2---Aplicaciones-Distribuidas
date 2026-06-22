class ConsoleNotificationService {
  notifyTransfer(sender, receiver, amount, transaction) {
    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de confirmación ---`);
    console.log(`Para: ${sender.email}`);
    console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${sender.accountAlpha} el valor de $${amount}.`);
    console.log(`Su nuevo saldo disponible es: $${sender.balance}.`);
    console.log(`------------------------------------------------------------\n`);

    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de recepción ---`);
    console.log(`Para: ${receiver.email}`);
    console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount} de la cuenta ${sender.accountAlpha}.`);
    console.log(`Su nuevo saldo disponible es: $${receiver.balance}.`);
    console.log(`------------------------------------------------------------\n`);

    return transaction;
  }
}

module.exports = ConsoleNotificationService;
