**English** · [Русский](README.ru.md) · [Հայերեն](README.hy.md)

# Fruit Food — backend

Django + Django REST Framework API for the Fruit Food site. It serves 35
collections (texts, products, images) in three languages. The frontend reads
everything from this API. The API is read-only: content is edited in the
Django admin. How to run the whole project: [root README](../README.md).

**Stack:** Python 3.12+, Django 6.1, Django REST Framework, django-cors-headers,
python-decouple, SQLite, Pipenv.

## Setup

```bash
cd backend
pipenv install
cp .env.example .env        # then set SECRET_KEY (see the root README)
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

- API: <http://127.0.0.1:8000/api/>
- Admin: <http://127.0.0.1:8000/admin/>

macOS with Homebrew Python: install Pipenv with `brew install pipenv`
(`pip install --user` is blocked there).

## Structure

| App | Collections |
| --- | --- |
| `header` | logos, languages, navbars, header_labels, categories, tags |
| `footer` | footer_labels, partner_cta |
| `product` | products, product_page_labels, tag_icons |
| `homepage` | homepage_hero, home_assortment, stats, philosophy_headings, philosophy_text, faq_small, faq_heading, faq |
| `about` | about_intro, about_production, about_why_trust_us, about_showcase, about_quality_naturalness, about_philosophy, about_philosophy_facts, about_page_labels, brands, export_cooperation, our_factory, we_believe |
| `contact` | contact_page_contents, contact_info |
| `geography` | geography_contents, export_countries |

`base/` holds the settings, URLs, `FilteredReadOnlyViewSet`, the read-only
permission, the media URL renderer, `load_sample` (`base/sample.py`,
`base/management/commands/load_sample.py`), the tests and the UI icons
(`base/static/images/`).

## API rules

- `GET /api/<collection>`, with or without a trailing slash.
- Responses are plain JSON arrays without pagination. `logos` is the only
  endpoint that returns a single object.
- Every language is a separate row with `lang` = `am`, `ru` or `en`; filter
  with `?lang=`. Extra filters: `products` (`slug`, `category_slug`),
  `categories` (`slug`), `navbars` (`url`), `brands` and `export_countries`
  (`code`), `tag_icons` (`code`).
- An unknown slug returns `[]` with status 200; the frontend shows the 404.
- Images are full URLs (`http://127.0.0.1:8000/media/images/products/x.webp`).
  Image lists (sliders, product gallery) are arrays of URLs, for example
  `brands[].images`, `about_production.images`, `home_assortment.cards[].images`,
  `products[].images`.
- Field names are snake_case and must match `frontend/db_orinak_example`
  exactly: **the frontend depends on them.** Renaming or removing a field
  breaks the site; adding a field is safe.

## Admin and images

Content images are file fields: they are uploaded in the admin and saved in
`backend/media/images/<section>/`; the database stores the path relative to
`media/`.

- Allowed: jpg, jpeg, png, webp, gif, svg, up to 5 MB. Give admin access only
  to trusted people: an SVG can contain scripts.
- Every language is a separate row, so an image is changed in all three rows
  (am, ru, en).
- Slider images are in inline blocks ("Brand images", "Production images",
  "Hero slides", …). Their `order` is the order on the site. A slider with one
  image shows no arrows.
- Assortment card images: open the card from "Home assortment" (the "Change"
  link) or from "Assortment cards".
- Replacing or deleting an image does not delete the old file from disk.

| Site section | Admin page | Block |
| --- | --- | --- |
| Home: hero slider | Homepage hero | Hero slides |
| Home: assortment | Assortment cards | Assortment card images |
| Home: philosophy | Philosophy text | Philosophy images |
| About: section 1 | About intro | Intro slides |
| About: brands | Brands | Brand images |
| About: production | About production | Production images |
| About: showcase | About showcase | Showcase images |
| About: our factory | Our factory | Factory slides, Factory gallery images |
| Product page | Products | Product images, Product variants (`image` = taste card, `box_image` = large image) |

Most images are test images (`media/images/test/`, `media/images/products/test/`,
marked "TEST n/3"). Delete those folders when every image has been replaced.

UI icons (arrows, menu, map, pins, logo fallback) are not content: they are
Django static files in `base/static/images/`, loaded by the frontend from
`/static/images/...`.

## Sample data

```bash
pipenv run python manage.py load_sample
```

Fills the database from `frontend/db_orinak_example` (`--path` loads another
file). **It deletes all existing content first**, including admin edits. Use it
on a new machine or when the sample file changes, and in production only once,
on the first deploy.

## Changing the data model

**New text field** (for example a label):

```python
slider_image_label = models.CharField(max_length=100, blank=True)
```

`blank=True` lets the migration run on existing rows. Then
`makemigrations`, add the field in three languages to
`frontend/db_orinak_example`, run `load_sample`. Serializers use
`fields = "__all__"`, so the field appears in the API by itself.

**One image → a slider** (same pattern as `BrandImage`):

1. Child model: `ForeignKey(Parent, related_name="images")`, `order`,
   `image = models.FileField(...)`, `ordering = ["order", "id"]`.
2. `makemigrations`; in the migration move `RemoveField` to the end and put
   `migrations.RunPython(copy_images, migrations.RunPython.noop)` before it, so
   existing images are kept (see `about/migrations/0005_brand_production_images.py`).
3. Serializer: `images = serializers.SerializerMethodField()` with
   `get_images()` returning the URLs.
4. Admin: an inline with `ImagePreviewMixin`.
5. `base/sample.py`: `"children": {"images": child(NewImage, "parent_fk")}`
   (nested levels with `children=`).
6. `db_orinak_example`: `"image": "..."` → `"images": ["...", "..."]`, and tell
   Vahe so the frontend uses the slider there.

## Tests

```bash
pipenv run python manage.py test
```

The tests load `frontend/db_orinak_example` into a temporary database and check
that every endpoint returns exactly the same data in all three languages,
plus filters, the read-only API, CORS, image upload in the admin, rejection of
non-image files and that every admin page opens. Your `db.sqlite3` is not
touched.

## Production

- `.env`: `DEBUG=False`, a new long `SECRET_KEY`, `ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS` (the site domain), `CSRF_TRUSTED_ORIGINS`,
  `PUBLIC_BASE_URL` (the API domain, used for image URLs).
- The database stays **SQLite**: keep `db.sqlite3` and `media/` on a persistent
  disk and back them up together.
- Django serves `/media/` and `/static/` only with `DEBUG=True`. In production
  the web server (for example nginx) serves `backend/media/` at `/media/` and
  `backend/staticfiles/` at `/static/`.
- Run with gunicorn:

```bash
pipenv install gunicorn
pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --noinput
pipenv run python manage.py check --deploy
pipenv run gunicorn base.wsgi:application --bind 0.0.0.0:8000
```

The contact form uses EmailJS, so Django sends no email. `check --deploy`
reports `mail.E001` for the console email backend; add
`SILENCED_SYSTEM_CHECKS = ["mail.E001"]` to `base/settings.py`.

The frontend also needs the production API domain in `NEXT_PUBLIC_API_URL`
and in `images.remotePatterns` of `frontend/next.config.mjs`.

## Problems

| Problem | Fix |
| --- | --- |
| `No module named pipenv` (macOS) | `brew install pipenv` |
| `That port is already in use` | another server uses port 8000: `lsof -ti :8000 \| xargs kill` |
| Site sections empty | `runserver` is not running, or the frontend uses `localhost` instead of `127.0.0.1` |
| Old content after `git pull` | `pipenv run python manage.py migrate`, and `load_sample` if the sample file changed |
