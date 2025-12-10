// path: src/utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp: ts, stack, meta }) => {
  const base = `${ts} [${level}] ${message}`;
  if (stack) return `${base}\n${stack}`;
  if (meta) return `${base} ${JSON.stringify(meta)}`;
  return base;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console()
    // Add file transports in production if needed:
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' })
  ],
  exitOnError: false,
});

module.exports = logger;
