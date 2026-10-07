# Fruit Food

Fruit Food has a Next.js frontend and a Django backend:

```text
frontend/   Next.js app, shared UI and UI icons
backend/    Django REST API, admin, database and uploaded images
```

The frontend reads all content (texts, products, images) from the Django API.

## Run the project

Requirements: Python 3.12+, Pipenv, Node.js 20+ and Git.

1. Backend (first terminal):

```bash
cd backend
pipenv install
copy .env.example .env        # then set SECRET_KEY
pipenv shell
python manage.py migrate
python manage.py load_sample
python manage.py createsuperuser
python manage.py runserver
```

2. Frontend (second terminal):

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

On macOS/Linux use `cp` instead of `copy`.

- Site: <http://localhost:3000>
- API: <http://127.0.0.1:8000/api/>
- Admin (edit content and upload images): <http://127.0.0.1:8000/admin/>

Details: [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md).
