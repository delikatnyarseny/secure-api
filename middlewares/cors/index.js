const invalidOrigins = ["*", "null", "undefined", ""];

const isValidOrigin = (origin) => !invalidOrigins.includes(origin);

/**
 * CORS middleware для настройки заголовков доступа между источниками.
 *
 * @param {Object} config - Конфигурация CORS.
 * @param {"*" | string | string[]} [config.allowedOrigins="*"] - Разрешённые источники. Может быть "*", одной строкой или массивом строк.
 * @param {string[]} [config.methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]] - Разрешённые HTTP-методы.
 * @param {string[]} [config.allowedHeaders=["Content-Type", "Authorization"]] - Разрешённые заголовки.
 * @param {boolean} [config.credentials=true] - Разрешить ли отправку cookies и заголовков авторизации.
 * @returns {Function} Express middleware.
 */
function cors({
  allowedOrigins = "*",
  methods,
  allowedHeaders,
  credentials = true,
} = {}) {
  return (req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || !isValidOrigin(origin)) {
      return res.status(403).send("Access Denied");
    }

    let allowedOriginHeader = null;

    if (allowedOrigins === "*") {
      allowedOriginHeader = "*";
    } else if (
      typeof allowedOrigins === "string" &&
      allowedOrigins === origin
    ) {
      allowedOriginHeader = origin;
    } else if (
      Array.isArray(allowedOrigins) &&
      allowedOrigins.includes(origin)
    ) {
      allowedOriginHeader = origin;
    }

    if (!allowedOriginHeader) {
      return res.status(403).send("Access Denied");
    }

    res.setHeader("Access-Control-Allow-Origin", allowedOriginHeader);
    res.setHeader("Access-Control-Allow-Methods", methods.join(", "));
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
    res.setHeader(
      "Access-Control-Allow-Credentials",
      credentials ? "true" : "false"
    );

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  };
}

module.exports = cors;
