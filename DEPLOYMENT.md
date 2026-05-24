Deploying to Render

1) Create two services in Render:
   - Frontend: Static Site (Connect to repository). Build command: `cd frontend && npm ci && npm run build`. Publish directory: `frontend/dist`.
   - Backend: Web Service (Docker). Use the `backend/Dockerfile` in the repo (or connect with `render.yaml`).

2) Set Render secrets (in repo Settings -> Secrets or Render dashboard):
   - `RENDER_API_KEY` — API key with deploy permissions.
   - `RENDER_SERVICE_ID_FRONTEND` — Render service id for the frontend.
   - `RENDER_SERVICE_ID_BACKEND` — Render service id for the backend.

3) CI: The repository includes `.github/workflows/render-deploy.yml` which builds the frontend and triggers deploys for both services. Push to `main` to run.

4) Local testing commands:

```bash
# Frontend
cd frontend
npm ci
npm run build
# Preview static build
npx serve dist

# Backend (venv)
python -m venv .venv
.venv\\Scripts\\activate
pip install -r backend/requirements.txt
python backend/run.py
```

5) Notes:
   - The backend Dockerfile uses `$PORT` at runtime so Render can assign ports.
   - For production environment variables (DB connection strings, JWT secrets), add them in the Render dashboard as environment variables or use Render's encrypted secrets.
