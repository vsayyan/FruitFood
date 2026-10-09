**English** · [Русский](README.ru.md) · [Հայերեն](README.hy.md)

# Fruit Food

Website of **Fruit Food**, an Armenian producer of natural dried fruits and
chocolate-covered sweets. The site is available in three languages (Armenian,
Russian, English) and has seven sections: Home, Catalog (with two
categories), product pages, About us, Geography and Contact.

All content (texts, products, images) is stored in the backend and edited
in the Django admin. The frontend only displays it.

## How it works

```text
Browser ──► Next.js (frontend, :3000) ──axios──► Django REST API (backend, :8000/api) ──► SQLite
                                                        ▲
Django admin (:8000/admin) ─ edit texts, upload images ─┘   images: backend/media, UI icons: backend/base/static
```

| Part | Technology | Folder |
| --- | --- | --- |
| Frontend | Next.js 16 (App Router), React 19, JavaScript, CSS Modules, axios | [`frontend/`](frontend/README.md) |
| Backend | Django 6.1, Django REST Framework, SQLite | [`backend/`](backend/README.md) |
| Contact form | EmailJS (sends the message straight from the browser) | `frontend/app/contact/` |

- The language is stored in a `lang` cookie (`am`, `ru`, `en`); URLs stay the
  same for every language (`/catalog`, not `/am/catalog`).
- Every page is rendered on the server on each request, so a change saved in
  the admin is visible on the site immediately, without a rebuild.
- `frontend/db_orinak_example` is the sample data: `load_sample` fills a new
  database from it.

## Repository structure

```text
frontend/                 Next.js site (pages, components, styles)
  db_orinak_example       sample data for the database (35 collections, 3 languages)
backend/                  Django project
  base/                   settings, shared API code, load_sample, tests
  base/static/images/     UI icons (arrows, menu, map, logo fallback)
  media/images/           content images (uploaded in the admin)
  header/ footer/ product/ homepage/ about/ contact/ geography/   one app per site section
```

## Run the project on your computer

You need **Git**, **Node.js 20+**, **Python 3.12+** and **Pipenv**.

- macOS: `brew install node python pipenv` (with Homebrew Python, install
  Pipenv with `brew`, not with `pip`).
- Windows: install Node.js and Python from their websites, then
  `pip install pipenv`. Use `copy` instead of `cp` below.

### 1. Get the code

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood
```

### 2. Backend (first terminal window)

```bash
cd backend
pipenv install
cp .env.example .env
pipenv run python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

Paste the printed key into `backend/.env` as `SECRET_KEY=...`, then:

```bash
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

Keep this window open. `createsuperuser` asks for a username and password:
this is your admin login.

### 3. Frontend (second terminal window)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 4. Open

| What | Address |
| --- | --- |
| Website | <http://localhost:3000> |
| Admin (edit content, upload images) | <http://127.0.0.1:8000/admin/> |
| API (example) | <http://127.0.0.1:8000/api/products?lang=en> |

If the site opens but sections are empty, the backend is not running
(step 2). The contact form needs the EmailJS keys in `frontend/.env.local`;
ask Vahe for them, they are never committed.

## Team workflow

### Rules

1. **Nobody commits to `main`.** Work in your own branch and open a Pull
   Request. Vahe reviews and merges.
2. Branch names: `feature/<what>`, `fix/<what>`, `docs/<what>`,
   `chore/<what>`.
3. One task = one branch = one PR. Write in the PR what changed and how to
   check it.
4. Never commit `.env`, `.env.local`, `db.sqlite3` or other secrets (they are
   in `.gitignore`).

### Start a new task

```bash
git checkout main
git pull origin main
git checkout -b feature/my-task
# ... work ...
git add -A
git commit -m "Short description of the change"
git push origin feature/my-task
```

Then open a Pull Request into `main` on GitHub.

### Get the latest changes

When something new is merged into `main`:

```bash
git checkout main
git pull origin main
cd backend
pipenv install
pipenv run python manage.py migrate
cd ../frontend
npm install
```

Then restart both servers. Run `pipenv run python manage.py load_sample` only
if `frontend/db_orinak_example` changed: **it replaces all content in your
local database**, including your admin edits.

### Where to change what

| I want to change… | Where |
| --- | --- |
| A text, product, image or translation | Django admin (no code) |
| A page layout, style or component | `frontend/` ([frontend README](frontend/README.md)) |
| A new data field or collection | `backend/` model + migration ([backend README](backend/README.md)) |
| A UI icon (arrow, menu, map) | `backend/base/static/images/` |

## Team

| Who | Part |
| --- | --- |
| Vahe | Team lead, review and integration, product page |
| Narek | Backend (Django) |
| Vahag | Header, footer, Home hero |
| Ashot | Home: assortment and stats |
| Saten | Home: philosophy and FAQ |
| Vahram | Partner CTA, Contact page |
| Elina | Catalog |
| Milena | About us: sections 1–3 |
| Hamlet | About us: sections 4–6 |
| Jor | About us: sections 7–9 |
| Sergey | Geography |

## Status

- Frontend and backend are finished and integrated; the site runs fully on
  Django.
- Most images are temporary **test images** marked "TEST n/3"; they are
  replaced with real photos in the admin.
- Next steps (outside the code): real photos and product data, hosting and
  domain, production setup of the backend (see the
  [backend README](backend/README.md#production)).
