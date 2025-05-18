const {
  isExcluded,
  getKey,
  getRouteLimits,
  checkRateLimit,
} = require("./helpers");

/**
 * rateLimiter - middleware для ограничения количества запросов
 *
 * @param {Object} config
 * @param {number} config.resetIntervalMs - период в миллисекундах
 * @param {number} config.max - максимальное количество запросов
 * @param {string[]} [config.exclude=[]] - список путей, исключённых из ограничения
 * @param {Object} [config.routes={}] - индивидуальные настройки для отдельных путей
 */
function rateLimiter({
  resetIntervalMs = 15 * 60 * 1000,
  max = 100,
  exclude = [],
  routes = {},
} = {}) {
  return (req, res, next) => {
    const { ip, path } = req;

    if (isExcluded(path, exclude)) {
      return next();
    }

    const {
      interval,
      max: routeMax,
      matchedPattern,
    } = getRouteLimits(path, routes, resetIntervalMs, max);

    const key = getKey(ip, matchedPattern);

    const { isLimited, retryAfter, current } = checkRateLimit(
      key,
      interval,
      routeMax
    );

    res.setHeader("X-RateLimit-Limit", routeMax);
    res.setHeader("X-RateLimit-Remaining", Math.max(routeMax - current, 0));

    if (isLimited) {
      res.setHeader("Retry-After", Math.ceil(retryAfter / 1000));

      return res.status(429).json({
        message: "Слишком много запросов. Попробуйте позже.",
        retryAfterMs: retryAfter,
      });
    }

    next();
  };
}

module.exports = rateLimiter;
