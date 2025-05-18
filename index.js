const rateLimiter = require("./middlewares/rate-limit");
const cors = require("./middlewares/cors");
const sqlInjection = require("./middlewares/sql-injection");
const xssProtection = require("./middlewares/xss");
const csrfProtection = require("./middlewares/csrf");

/**
 * Secure API Middleware Collection
 * @module secure-api
 * @exports {Object} Middleware collection
 * @property {Function} rateLimiter - Rate limiting middleware
 * @property {Function} cors - CORS security middleware
 * @property {Function} sqlInjection - SQL injection protection middleware
 * @property {Function} xssProtection - XSS protection middleware
 * @property {Function} csrfProtection - CSRF protection middleware
 */
module.exports = {
  rateLimiter,
  cors,
  sqlInjection,
  xssProtection,
  csrfProtection,
};
