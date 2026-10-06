# Fruit Food backend

Django + Django REST Framework API for the Fruit Food site. It serves the same
35 collections as `frontend/db_orinak_example`, with the same URLs and field
names, so the frontend works without code changes. The API is read-only;
content is edited through the Django admin.

## Requirements

- Python 3.14 (see `Pipfile`)
- Pipenv

## Setup

```bash
cd backend
pipenv install
cp .env.example .env        # then set SECRET_KEY
pipenv shell
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- API: http://127.0.0.1:8000/api/
- Admin: http://127.0.0.1:8000/admin/

## Connecting the frontend

In `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Then run only Next.js (`npx next dev`). `npm run dev` also starts
json-server on port 8000, which conflicts with Django.

Use `127.0.0.1`, not `localhost`: Node.js may resolve `localhost` to IPv6
(`::1`), while `runserver` listens on IPv4 only. The frontend hides failed
sections silently, so the page would just look empty.

## API rules

- `GET /api/<collection>`, with or without a trailing slash.
- Responses are plain JSON arrays without pagination. `logos` is the only
  endpoint that returns a single object.
- Language collections are filtered with `?lang=am|ru|en`. Extra filters:
  `products` (`slug`, `category_slug`), `categories` (`slug`),
  `navbars` (`url`), `brands` and `export_countries` (`code`), `tag_icons` (`code`).
- An unknown slug returns `[]` with status 200, not 404.
- Image fields are plain paths into `frontend/public` (e.g. `/images/...`).

## Apps

| App | Collections |
| --- | --- |
| `header` | logos, languages, navbars, header_labels, categories, tags |
| `footer` | footer_labels, partner_cta |
| `product` | products, product_page_labels, tag_icons |
| `homepage` | homepage_hero, home_assortment, stats, philosophy_headings, philosophy_text, faq_small, faq_heading, faq |
| `about` | about_intro, about_production, about_why_trust_us, about_showcase, about_quality_naturalness, about_philosophy, about_philosophy_facts, about_page_labels, brands, export_cooperation, our_factory, we_believe |
| `contact` | contact_page_contents, contact_info |
| `geography` | geography_contents, export_countries |

`base/` holds the project settings, `FilteredReadOnlyViewSet`, the read-only
permission and the language choices.

## Tests

```bash
python manage.py test base
```

The tests load `frontend/db_orinak_example` into a temporary database and check
that every endpoint returns exactly the same data, in all three languages. They
also check filters, the read-only API and CORS. Your real `db.sqlite3` is not
touched.

## Production

Set `DEBUG=False`, a real `SECRET_KEY`, `ALLOWED_HOSTS`,
`CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` in `.env`. With
`DEBUG=False` the browsable API is turned off and HTTPS, secure cookies and
HSTS are enabled. Run `python manage.py check --deploy` and
`python manage.py collectstatic` before deploying.
