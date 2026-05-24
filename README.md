# AI-Driven Internship Recommendation (InternMatch AI)

InternMatch AI helps students discover better-fit internship opportunities, helps employers identify qualified interns, and helps teams improve placement outcomes using a lightweight Flask API and a Vite + React frontend.

**Highlights**
- Matches candidates to internships using configurable recommendation logic.
- Includes authentication, employer and student flows, and a Copilot-powered assistant for content assistance.
- Designed for local development with the frontend package under `frontend/` and the Flask backend under `backend/`.

**Repository layout**
- `backend/`: Flask API, services, and models.
- `frontend/public/`, `frontend/src/`: Vite + React frontend source, components, and assets.
- `tests/`: backend API tests.

## Quickstart (development)

Prerequisites:
- Node.js (LTS)
- Python 3.10+ and a virtual environment for the backend
- MongoDB (local or hosted)

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start frontend and backend together (recommended):

```bash
cd frontend
npm run dev:full
```

Notes: `dev:full` starts the Flask backend first, waits for `http://127.0.0.1:5000/api/health`, then launches Vite.

Run frontend only:

```bash
cd frontend
npm run dev:frontend
```

Run backend only (ensure Python venv is active):

```bash
cd frontend
npm run dev:backend
```

## Environment variables

See `backend/.env.example` for all recommended variables. Common variables:

- `FLASK_ENV` (development|production)
- `SECRET_KEY`, `JWT_SECRET`
- `MONGO_URI`, `MONGO_DB_NAME`
- `CORS_ORIGINS` (frontend origin during development/production)
- `VITE_API_BASE_URL` (frontend build-time API base URL)

## Running tests

Backend tests are located in `backend/tests/` and can be run with the configured test runner. Example (from repo root):

```bash
pytest backend/tests
```

## Production

Build the frontend for production:

```bash
cd frontend
npm run build
```

Recommended backend start command for WSGI hosts:

```bash
gunicorn wsgi:app
```

When deploying separately, set `VITE_API_BASE_URL` to point to the backend API (for example, `https://api.example.com/api`). Ensure `CORS_ORIGINS` permits the frontend origin.

## Architecture notes

- Backend: Flask app with modular `routes/`, `services/`, and `utils/` to keep business logic isolated.
- Frontend: Vite + React with context for auth and reusable components in `frontend/src/components/`.
- Recommendation engine: implemented in `backend/app/services/recommendation_engine.py` and intended to be extendable.

## Contributing

- Open issues for bugs and feature requests.
- Follow existing code patterns; backend uses Flask style conventions and a virtualenv for Python dependencies.

## License

This repository does not include a license file by default. Add a `LICENSE` if you intend to publish under an open-source license.

---

If you'd like, I can also:
- add a short `SUMMARY.md` or GitHub repo description text, or
- generate a trimmed `README-short.md` for the GitHub description field.
"# AI-Driven-Internship-Recommendation-System" 

"# AI-Driven-Internship-Recommendation-System" 
