function xssProtection(req, res, next) {
  // Рекурсивно обрабатываем все поля в теле запроса (для вложенных объектов)
  const sanitizeInput = (input) => {
    if (typeof input === "string") {
      // Заменяем потенциально опасные символы (например, <, >, &, ", ', и т.п.)
      return input.replace(
        /[<>&"']/g,
        (char) =>
          ({
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
          }[char])
      );
    }

    if (Array.isArray(input)) {
      return input.map(sanitizeInput);
    }

    if (typeof input === "object" && input !== null) {
      const sanitizedObj = {};
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          sanitizedObj[key] = sanitizeInput(input[key]);
        }
      }
      return sanitizedObj;
    }

    return input;
  };

  req.body = sanitizeInput(req.body);
  next();
}

module.exports = xssProtection;
