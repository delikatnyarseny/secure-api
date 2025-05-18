# Secure API Middleware

A lightweight middleware package for Node.js/Express that provides:

- ✅ Configurable **CORS (Cross-Origin Resource Sharing)** headers
- 🚫 Flexible **rate limiting** for route-based protection against abuse

---

## 📦 Installation

```bash
npm install @arsenydzelikatny/secure-api
```

## CORS Middleware

The `cors` function configures Cross-Origin Resource Sharing headers to control which domains can access your API.

### Configuration Options for `cors()`:

1.  **`allowedOrigins`**: Specifies the allowed origin(s) for cross-origin requests.
    - `"*"`: Allows all origins (not recommended for production).
    - `string`: A single allowed origin (e.g., `'http://localhost:3000'`).
    - `Array<string>`: An array of allowed origins (e.g., `['http://localhost:3000', 'https://example.com']`).
    - Default: `"*"`
2.  **`methods`**: An array of allowed HTTP methods for cross-origin requests (e.g., `['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']`). Default: `['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']`.
3.  **`allowedHeaders`**: An array of allowed request headers for cross-origin requests (e.g., `['Content-Type', 'Authorization']`). Default: `['Content-Type', 'Authorization']`.
4.  **`credentials`**: A boolean indicating whether to allow sending and receiving of credentials (cookies, Authorization headers) in cross-origin requests. Default: `true`.

## Rate Limiting Middleware

The `rateLimiter` function limits the number of requests a client can make to your API within a specified time frame, protecting against abuse and overload.

### Configuration Options for `rateLimiter()`:

- **`resetIntervalMs`**: The time window in milliseconds during which requests are counted. Default: `15 * 60 * 1000` (15 minutes).
- **`max`**: The maximum number of requests allowed from a client within the `resetIntervalMs`. Default: `100`.
- **`exclude`**: An array of route paths to exclude from rate limiting (e.g., `["/health", "/static"]`). Default: `[]`.
- **`routes`**: An object defining specific rate limiting rules for individual routes. The keys are route paths (or patterns), and the values are configuration objects with `max` and `resetIntervalMs` that override the global settings for those routes. Default: `{}`.
