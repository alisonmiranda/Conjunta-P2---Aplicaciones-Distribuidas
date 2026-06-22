# Bitácora de evaluación — Fintech SecurePay

Durante este proyecto trabajé sobre una API que debía responder como un sistema distribuido simulado, con separación de responsabilidades, autenticación stateless y observabilidad para errores operacionales. A lo largo del proceso fui corrigiendo la arquitectura, ajustando la seguridad del flujo JWT y dejando evidencia de las pruebas que realicé para comprobar el comportamiento del sistema.

## C1: Refactorización SOLID (SRP & DIP)

Desde el inicio, el objetivo fue dejar de trabajar con una lógica monolítica concentrada en un solo punto. Reorganicé la aplicación para separar responsabilidades entre rutas, controladores, servicios de negocio y servicios auxiliares. Esto me permitió que la capa de negocio ya no dependiera directamente de una implementación concreta en cada caso, sino que quedara más preparada para recibir cambios sin afectar el flujo completo.

En la práctica, el servicio financiero quedó desacoplado de la lógica de verificación y del manejo de estado, lo que refleja un enfoque más cercano al principio de responsabilidad única y a la inyección de dependencias.

## C2: Autenticación Stateless (JWT RS256)

Para la autenticación implementé un flujo basado en JWT con firma asimétrica RS256. El sistema valida el token mediante la clave pública, evitando depender de un secreto compartido y manteniendo el protocolo stateless, tal como corresponde a este tipo de arquitectura.

También ajusté la manera en que se leen las llaves RSA y el manejo del header de autorización, para que el proceso sea más robusto frente a errores comunes como tokens mal formados o cabeceras incompletas. El resultado fue que las rutas protegidas solo responden correctamente cuando el JWT es válido y está bien estructurado.

## C3: Observabilidad y Sentry Tracking

La observabilidad fue otra parte clave del trabajo. Integré Sentry para diferenciar correctamente entre errores de seguridad y errores operacionales. Así, cuando la aplicación detecta una falla real del sistema, el evento se reporta con contexto adicional, mientras que los accesos no autorizados se manejan como respuestas `401` sin convertir el problema en un fallo de infraestructura.

Además, dejé el seguimiento con tags de usuario y operación para que el error quede más claro al momento de revisar el panel.

## C4: GitOps y trazabilidad DevOps

También cuidé el lado de control de versiones. Trabajé con ramas separadas por funcionalidad, mantuve mensajes de commit más claros y fui registrando cambios progresivos en lugar de dejar todo concentrado en un solo paso. Además, configuré correctamente el manejo de variables sensibles para que el archivo `.env` no quede expuesto y dejé una plantilla base (`.env.example`) para facilitar la configuración del entorno.

## Cómo ejecuté la API

Para validar el sistema, ejecuté la aplicación con:

```bash
npm install
npm start
```

Una vez iniciada, la API quedó disponible en:

- `http://localhost:3000`

## Evidencia de pruebas realizadas

Durante la validación ejecuté pruebas sobre el servidor y sobre los endpoints protegidos. A continuación dejo las capturas que registré para documentar el proceso.

### Servidor corriendo

![Servidor corriendo](media/captura_servidor_corriendo_postman.png)

### Verificación del endpoint raíz

![Health check](media/captura_health_check_postman.png)

### Prueba con acceso autorizado

![Acceso autorizado](media/captura_error_intencional_postman.png)

### Prueba con token inválido o expirado

![Acceso denegado](media/captura_token_invalido_postman.png)

### Evidencia en Sentry del error operacional

![Panel de Sentry](media/captura_issues_panel_sentry.png)

## Conclusión

Con este trabajo logré dejar una API más ordenada, con una autenticación más sólida, mejor trazabilidad de errores y una bitácora clara de las pruebas que validan el comportamiento del sistema. La documentación refleja no solo el resultado final, sino también el proceso seguido para corregir, probar y evidenciar cada criterio evaluado.
