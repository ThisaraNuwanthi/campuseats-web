# CampusEats Web

React + Vite frontend for the CampusEats application (SE3090 Lab 11 - DevOps and Cloud Hosting).
It shows the menu returned by the CampusEats API (`GET /api/menu`).

## Configuration (environment variables)

| Variable | Where | Purpose |
|---|---|---|
| `VITE_API_URL` | Hosting platform (Vercel > Settings > Environment Variables) or a local `.env` | Base URL of the backend API, for example `https://campuseats-api.onrender.com` |

Vite reads `VITE_*` variables **at build time**, so after changing it you must redeploy.
No secrets belong in this repository: `.env` files are git-ignored (see `.env.example`).

## Run locally

```bash
npm install
cp .env.example .env     # then edit VITE_API_URL
npm run dev              # development server
npm run build            # production build -> dist/
npm run preview          # serve dist/ locally
```

## Deploy (Vercel)

1. vercel.com > Add New > Project > import this repository.
2. Framework preset: **Vite**. Install command `npm install`, build command `npm run build`, output directory `dist`.
3. Add the environment variable `VITE_API_URL`.
4. Deploy. Every push to `main` then redeploys automatically (continuous deployment).
