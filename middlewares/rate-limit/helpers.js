const { match } = require("path-to-regexp");

// Функция получения уникального ключа для пользователя и маршрута
function getKey(ip, path) {
  return `${ip}:${path}`;
}

// Функция, проверяет нужно ли исключить маршрут из проверки
function isExcluded(path, excludeList) {
  return excludeList.includes(path);
}

// Функция, получает лимиты для конкретного маршрута
function getRouteLimits(path, routes, defaultInterval, defaultMax) {
  for (const pattern in routes) {
    const matcher = match(pattern, { decode: decodeURIComponent });

    if (matcher(path)) {
      const config = routes[pattern];

      return {
        interval: config.resetIntervalMs || defaultInterval,
        max: config.max || defaultMax,
        matchedPattern: pattern,
      };
    }
  }

  return { interval: defaultInterval, max: defaultMax, matchedPattern: path };
}

// Функция, проверяет и обновляет лимит запросов
const memoryStore = new Map();

function checkRateLimit(key, interval, max) {
  const now = Date.now();

  let record = memoryStore.get(key) || { count: 0, startTime: now };

  if (now - record.startTime > interval) {
    record = { count: 1, startTime: now };
  } else {
    record.count += 1;
  }

  memoryStore.set(key, record);

  const retryAfter = interval - (now - record.startTime);
  const isLimited = record.count > max;

  return { isLimited, retryAfter, current: record.count };
}

module.exports = {
  getKey,
  isExcluded,
  getRouteLimits,
  checkRateLimit,
};
