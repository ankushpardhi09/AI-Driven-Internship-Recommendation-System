FROM python:3.11-slim
WORKDIR /app

# Install build deps and python requirements
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY . ./backend/

ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# Use shell form so $PORT (set by Render) is expanded at runtime. Default to 8000.
CMD sh -c "gunicorn -w 4 -b 0.0.0.0:${PORT:-8000} backend.wsgi:app"
