# Fruit Food backend

Django + Django REST Framework API for the Fruit Food site. It serves the same
35 collections as `frontend/db_orinak_example`, with the same URLs and field
names. The frontend reads all its content from this API. The API is read-only;
content is edited through the Django admin.

## Requirements

- Python 3.12 or newer
- Pipenv

## Setup

```bash
cd backend
pipenv install
cp .env.example .env        # then set SECRET_KEY
pipenv shell
python manage.py migrate
python manage.py load_sample
python manage.py createsuperuser
python manage.py runserver
```

- API: http://127.0.0.1:8000/api/
- Admin: http://127.0.0.1:8000/admin/

## Connecting the frontend

In `frontend/.env.local` (copied from `frontend/.env.example`):

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Then start the frontend with `npm run dev` while `runserver` is running.
`frontend/next.config.mjs` allows `next/image` to load images from
`http://127.0.0.1:8000/media/`; add the production domain there when deploying.

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
- Images are returned as full URLs
  (`http://127.0.0.1:8000/media/images/products/x.png`), so the browser loads
  them from Django. Set `PUBLIC_BASE_URL` in production if the API runs behind
  a proxy.

## Images and the admin

Every image is a file field, so images are uploaded in the admin
(`/admin/`) instead of typing paths. Uploaded files are saved in
`backend/media/images/<section>/`, and the database stores the path relative
to `media/` (for example `images/products/x.png`).

- Allowed formats: jpg, jpeg, png, webp, gif, svg. Maximum size: 5 MB.
- Product photos are edited in the "Product images" block on the product
  page; their order is the order on the site.
- The "Preview" column shows the current image.
- Replacing or deleting an image does not delete the old file from disk.
- Only trusted staff users should get admin access: an uploaded SVG can contain
  scripts.

## Sample data

`python manage.py load_sample` fills the database from
`frontend/db_orinak_example`. It replaces existing content, so content edited
in the admin is lost. Run it after `migrate` on a new machine, or after the
sample file changes. `--path` loads another file.

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
touched. Admin tests upload an image to a temporary folder and check that
the API returns it, that non-image files are rejected and that every admin page
opens.

## Production

Set `DEBUG=False`, a real `SECRET_KEY`, `ALLOWED_HOSTS`,
`CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` in `.env`. With
`DEBUG=False` the browsable API is turned off and HTTPS, secure cookies and
HSTS are enabled. Run `python manage.py check --deploy` and
`python manage.py collectstatic` before deploying.

Django serves `/media/` only when `DEBUG=True`. In production the web server
(for example nginx) must serve `backend/media/` at `/media/`. Back up
`backend/media/` together with the database: uploaded images exist only there.
