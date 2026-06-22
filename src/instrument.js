require('dotenv').config();

const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN || 'https://37a7a5deeefd24a1df72c21a8c218172@o4511580700213248.ingest.us.sentry.io/4511609066291200',
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
  enabled: true,
  dataCollection: {
    enabled: true
  }
});

module.exports = Sentry;
