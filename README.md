# Bitácora de evaluación — Fintech SecurePay

Este repositorio funciona como bitácora de evaluación para evidenciar el comportamiento de la API, la autenticación JWT y el monitoreo con Sentry.

## 1. Descripción general

La API expone dos endpoints protegidos mediante JWT RS256:

- `GET /v1/account-alpha/balance`
- `POST /v1/transfer-beta/execute`

Además, la aplicación cuenta con un endpoint de salud para verificar que el servidor está disponible.

## 2. Cómo ejecutar el proyecto

```bash
npm install
npm start
```

El servidor queda disponible en:

- `http://localhost:3000`

## 3. Variables de entorno

El proyecto utiliza un archivo `.env` para la configuración local.

Ejemplo base:

```env
PORT=3000
NODE_ENV=development
SENTRY_DSN=
```

Las llaves RSA (`private.pem` y `public.pem`) se generan localmente y no deben subirse al repositorio.

## 4. Endpoints principales

### Health check

```http
GET http://localhost:3000/
```

### Balance Alpha

```http
GET http://localhost:3000/v1/account-alpha/balance?accountId=ACC-12345
Authorization: Bearer <token>
```

### Transferencia Beta

```http
POST http://localhost:3000/v1/transfer-beta/execute
Authorization: Bearer <token>
Content-Type: application/json
```

Body:

```json
{
  "fromAccountId": "ACC-12345",
  "toAccountId": "ACC-67890",
  "amount": 100
}
```

## 5. Generación del token JWT

Para probar la autenticación, el token debe generarse con la clave privada RSA y enviarse en el header `Authorization` como `Bearer <token>`.

Ejemplo de prueba válida:

- `sub: usr_001`
- `name: Alice`

## 6. Bitácora de pruebas (Postman)

### 6.1 Servidor corriendo

![Servidor corriendo](media/captura_servidor_corriendo_postman.png)

### 6.2 Health check

![Health check](media/captura_health_check_postman.png)

### 6.3 Token válido / acceso autorizado

![Token válido](media/captura_error_intencional_postman.png)

### 6.4 Token inválido / expirado

![Token inválido](media/captura_token_invalido_postman.png)

## 7. Bitácora de observabilidad (Sentry)

La aplicación captura errores operacionales con tags relacionados con el usuario y la operación ejecutada.

### 7.1 Panel de Sentry con error operacional 500

![Panel de Sentry](media/captura_issues_panel_sentry.png)

## 8. Evidencia del comportamiento esperado

- Sin token o con token inválido: respuesta `401`.
- Con token válido y datos correctos: respuesta `200`.
- Si se fuerza el error operacional: respuesta `500` y registro en Sentry.

## 9. Notas finales

Esta bitácora recoge las capturas necesarias para demostrar que el sistema funciona correctamente en los escenarios solicitados: autenticación, acceso permitido/denegado y monitoreo de errores operacionales.
