# SoundQuest frontend

The frontend is a React app served by [next.js](https://nextjs.org/).

## Frontend local development

* Start the backend stack with Docker Compose from the root of the repository:

```bash
docker-compose up -d
```

* Start the frontend in local dev mode from this folder:

```bash
npm run dev
```

* The frontend runs on port 3000: [http://localhost:3000](http://localhost:3000)

## Backend proxy for local development

For local development, the frontend also serves as proxy to the backend server. All routes starting with `http://localhost:3000/api` and `http://localhost:3000/backend` are forwarded to the backend server. To see docs of the backend API go to [http://localhost:3000/backend/docs](http://localhost:3000/backend/docs). To use the API, use the `http://localhost:3000/api/` endpoints.

The proxy settings can be found in the [server.js](server.js). The backend server is expected to be available on `http://localhost:8888` as provided by Docker Compose.

Adopted from [https://github.com/vercel/next.js/tree/master/examples/with-custom-reverse-proxy](https://github.com/vercel/next.js/tree/master/examples/with-custom-reverse-proxy).
