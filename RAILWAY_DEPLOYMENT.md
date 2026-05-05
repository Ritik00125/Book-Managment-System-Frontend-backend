# Railway Deployment

This repo contains two separate Railway services. Set each service's root directory to the nested app folder before deploying.

## Backend service

Root directory:

```text
Book-Management-System-Backend-main/Book-Management-System-Backend-main
```

Build command:

```text
npm ci
```

Start command:

```text
npm start
```

Healthcheck path:

```text
/health
```

Required variables:

```text
MONGO_URI=<mongodb connection string>
JWT_SECRET=<long random secret>
NODE_ENV=production
```

Do not set `PORT` on Railway. Railway injects it automatically.

## Frontend service

Root directory:

```text
Book-Management-System-FrontEnd--main/Book-Management-System-FrontEnd--main
```

Build command:

```text
npm ci && npm run build
```

Start command:

```text
npm start
```

Required variables:

```text
VITE_API_BASE_URL=https://<backend-service-domain>
```

Use the public Railway domain for the backend service, without a trailing slash.
