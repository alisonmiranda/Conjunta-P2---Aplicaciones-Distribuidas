require('dotenv').config();

const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
  enabled: Boolean(process.env.SENTRY_DSN)
});

module.exports = Sentry;
