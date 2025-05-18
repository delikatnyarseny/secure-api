const patterns = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i, // SQL инъекция — символы ' , --, # и т.п.
  /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|CREATE|ALTER|GRANT|REVOKE)\b)/i, // Запрещенные SQL команды
  /(\b(UNION|OR)\b)/i, // Операторы UNION и OR, которые могут быть использованы для инъекций
];

function sqlInjection(req, res, next) {
  // Проверяем только если есть тело запроса
  if (req.body && Object.keys(req.body).length > 0) {
    const isInvalid = Object.values(req.body).some((value) => {
      return patterns.some((pattern) => pattern.test(value));
    });

    if (isInvalid) {
      return res.status(400).json({
        error: "Входные данные содержат запрещенные символы или SQL команды",
      });
    }
  }

  next();
}

module.exports = sqlInjection;
