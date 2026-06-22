# Bitácora del proyecto Fintech SecurePay

En este proyecto configuré una API básica para simular el flujo de autenticación y monitoreo de una aplicación financiera. Durante el desarrollo, fui ajustando la arquitectura, validando el comportamiento de los endpoints y registrando evidencia de las pruebas realizadas.

## ¿Qué hice?

Comencé por estructurar la aplicación para separar responsabilidades y facilitar la lectura del código. Luego implementé autenticación mediante JWT con firma asimétrica RS256, para que las rutas protegidas requirieran un token válido en el header `Authorization`.

También integré Sentry para capturar errores operacionales y poder visualizar en el panel cómo se registran los eventos con información adicional del usuario y la operación ejecutada.

## Cómo ejecuté la API

Para correr el proyecto utilicé:

```bash
npm install
npm start
```

Con esto, el servidor quedó disponible en:

- `http://localhost:3000`

## Endpoints que validé

Durante la evaluación probé los siguientes accesos:

- `GET /` para verificar el estado del servidor
- `GET /v1/account-alpha/balance?accountId=ACC-12345` con token válido
- `POST /v1/transfer-beta/execute` con token válido y payload correcto
- escenarios con token ausente o inválido para comprobar las respuestas `401`

## Evidencia de pruebas en Postman

Aquí dejo las capturas que registré mientras validaba el funcionamiento del sistema.

### Servidor en ejecución

![Servidor corriendo](media/captura_servidor_corriendo_postman.png)

### Verificación del endpoint raíz

![Health check](media/captura_health_check_postman.png)

### Prueba con acceso autorizado

![Acceso autorizado](media/captura_error_intencional_postman.png)

### Prueba con token inválido o expirado

![Acceso denegado](media/captura_token_invalido_postman.png)

## Evidencia de monitoreo en Sentry

Además, validé el comportamiento de error operacional para confirmar que la plataforma captura correctamente las excepciones. En la siguiente captura se observa el error registrado con los tags relacionados al usuario y a la operación.

![Panel de Sentry](media/captura_issues_panel_sentry.png)

## Resultado que obtuve

Con estas pruebas pude comprobar que:

- el servidor responde correctamente cuando está en ejecución;
- las rutas protegidas requieren un JWT válido;
- los errores operacionales quedan registrados en Sentry con contexto útil para depuración.

Este README quedó como una bitácora personal del proceso, con las pruebas y evidencias que utilicé para verificar el comportamiento de la API.
