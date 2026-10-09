[English](README.md) · [Русский](README.ru.md) · **Հայերեն**

# Fruit Food — backend

Django + Django REST Framework API Fruit Food-ի կայքի համար։ Տալիս է 35
collection (տեքստեր, ապրանքներ, նկարներ) 3 լեզվով։ Frontend-ը ամեն ինչ
վերցնում է այս API-ից։ API-ն միայն կարդալու համար է. բովանդակությունը
փոխվում է Django admin-ից։ Ինչպես միացնել ամբողջ project-ը.
[root README](../README.hy.md)։

**Stack.** Python 3.12+, Django 6.1, Django REST Framework, django-cors-headers,
python-decouple, SQLite, Pipenv։

## Setup

```bash
cd backend
pipenv install
cp .env.example .env        # հետո լրացրու SECRET_KEY-ը (տես root README)
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

- API. <http://127.0.0.1:8000/api/>
- Admin. <http://127.0.0.1:8000/admin/>

macOS-ում Homebrew-ի Python-ով. Pipenv-ը տեղադրիր `brew install pipenv`-ով
(`pip install --user`-ը այնտեղ արգելված է)։

## Կառուցվածքը

| App | Collection-ներ |
| --- | --- |
| `header` | logos, languages, navbars, header_labels, categories, tags |
| `footer` | footer_labels, partner_cta |
| `product` | products, product_page_labels, tag_icons |
| `homepage` | homepage_hero, home_assortment, stats, philosophy_headings, philosophy_text, faq_small, faq_heading, faq |
| `about` | about_intro, about_production, about_why_trust_us, about_showcase, about_quality_naturalness, about_philosophy, about_philosophy_facts, about_page_labels, brands, export_cooperation, our_factory, we_believe |
| `contact` | contact_page_contents, contact_info |
| `geography` | geography_contents, export_countries |

`base/`-ում են settings-ը, URL-ները, `FilteredReadOnlyViewSet`-ը, «միայն
կարդալու» իրավունքը, նկարների URL-ի renderer-ը, `load_sample`-ը
(`base/sample.py`, `base/management/commands/load_sample.py`), test-երը և UI
պատկերակները (`base/static/images/`)։

## API-ի կանոններ

- `GET /api/<collection>`, վերջում `/`-ով կամ առանց։
- Պատասխանները պարզ JSON array-ներ են, առանց pagination-ի։ Միայն `logos`-ն է
  վերադարձնում մեկ object։
- Ամեն լեզու առանձին տող է `lang` = `am`, `ru` կամ `en` դաշտով, ֆիլտրը՝
  `?lang=`։ Լրացուցիչ ֆիլտրեր. `products` (`slug`, `category_slug`),
  `categories` (`slug`), `navbars` (`url`), `brands` և `export_countries`
  (`code`), `tag_icons` (`code`)։
- Անհայտ slug-ի դեպքում գալիս է `[]` 200 status-ով, իսկ 404 էջը ցույց է տալիս
  frontend-ը։
- Նկարները ամբողջական URL-ներ են (`http://127.0.0.1:8000/media/images/products/x.webp`)։
  Նկարների ցուցակները (slider-ներ, ապրանքի gallery) URL-ների array-ներ են,
  օրինակ՝ `brands[].images`, `about_production.images`,
  `home_assortment.cards[].images`, `products[].images`։
- Դաշտերի անունները snake_case են և պետք է ճիշտ նույնը լինեն, ինչ
  `frontend/db_orinak_example`-ում. **frontend-ը կախված է դրանցից։** Դաշտի
  անունը փոխելը կամ դաշտը հանելը կոտրում է կայքը, իսկ նոր դաշտ ավելացնելը
  անվտանգ է։

## Admin և նկարներ

Բովանդակության նկարները file դաշտեր են. դրանք upload են արվում admin-ից և
պահվում `backend/media/images/<բաժին>/`-ում, իսկ բազայում պահվում է
`media/`-ի նկատմամբ ճանապարհը։

- Թույլատրված են jpg, jpeg, png, webp, gif, svg, մինչև 5 MB։ Admin-ի մուտք
  տուր միայն վստահելի մարդկանց. SVG-ն կարող է script պարունակել։
- Ամեն լեզու առանձին տող է, ուստի նկարը փոխվում է 3 տողում էլ (am, ru, en)։
- Slider-ների նկարները ներքևի բլոկներում են («Brand images», «Production
  images», «Hero slides», …)։ Դրանց `order`-ը կայքում հերթականությունն է։ Մեկ
  նկարով slider-ը ցույց է տրվում առանց սլաքների։
- «Մեր տեսականին»-ի քարտերի նկարները. բաց արա քարտը «Home assortment»-ից
  («Change» հղումով) կամ «Assortment cards»-ից։
- Նկարը փոխելը կամ ջնջելը հին ֆայլը disk-ից չի ջնջում։

| Կայքի բաժին | Admin-ի էջ | Բլոկ |
| --- | --- | --- |
| Գլխավոր. Hero slider | Homepage hero | Hero slides |
| Գլխավոր. «Մեր տեսականին» | Assortment cards | Assortment card images |
| Գլխավոր. Փիլիսոփայություն | Philosophy text | Philosophy images |
| Մեր մասին. բաժին 1 | About intro | Intro slides |
| Մեր մասին. Ապրանքանիշեր | Brands | Brand images |
| Մեր մասին. Արտադրություն | About production | Production images |
| Մեր մասին. Showcase | About showcase | Showcase images |
| Մեր մասին. Մեր գործարանը | Our factory | Factory slides, Factory gallery images |
| Ապրանքի էջ | Products | Product images, Product variants (`image`՝ համի քարտ, `box_image`՝ մեծ նկար) |

Նկարների մեծ մասը test նկարներ են (`media/images/test/`,
`media/images/products/test/`, «TEST n/3» նշանով)։ Երբ բոլորը փոխարինվեն,
այդ folder-ները կարելի է ջնջել։

UI պատկերակները (սլաքներ, մենյու, քարտեզ, pin-եր, պահեստային լոգո)
բովանդակություն չեն. դրանք Django-ի static ֆայլեր են `base/static/images/`-ում,
ու frontend-ը դրանք բեռնում է `/static/images/...`-ից։

## Sample տվյալներ

```bash
pipenv run python manage.py load_sample
```

Բազան լցնում է `frontend/db_orinak_example`-ից (`--path`-ով կարելի է այլ ֆայլ
տալ)։ **Այն նախ ջնջում է ամբողջ բովանդակությունը**, այդ թվում admin-ում արած
փոփոխությունները։ Օգտագործիր նոր համակարգչում կամ երբ sample ֆայլը փոխվել
է, իսկ production-ում՝ միայն մեկ անգամ, առաջին deploy-ի ժամանակ։

## Ինչպես փոխել տվյալների model-ը

**Նոր տեքստային դաշտ** (օրինակ՝ label).

```python
slider_image_label = models.CharField(max_length=100, blank=True)
```

`blank=True`-ը թույլ է տալիս migration-ին անցնել եղած տողերի վրա։ Հետո
`makemigrations`, դաշտը 3 լեզվով ավելացրու `frontend/db_orinak_example`-ում,
աշխատեցրու `load_sample`։ Serializer-ները օգտագործում են `fields = "__all__"`,
ուստի դաշտը API-ում ինքն է հայտնվում։

**Մեկ նկարը դարձնել slider** (նույն ձևով, ինչ `BrandImage`-ը).

1. Child model. `ForeignKey(Parent, related_name="images")`, `order`,
   `image = models.FileField(...)`, `ordering = ["order", "id"]`։
2. `makemigrations`. migration-ում `RemoveField`-ը տեղափոխիր վերջ և դրանից
   առաջ դիր `migrations.RunPython(copy_images, migrations.RunPython.noop)`, որ
   եղած նկարները չկորեն (տես `about/migrations/0005_brand_production_images.py`)։
3. Serializer. `images = serializers.SerializerMethodField()` և
   `get_images()`, որը վերադարձնում է URL-ները։
4. Admin. inline `ImagePreviewMixin`-ով։
5. `base/sample.py`. `"children": {"images": child(NewImage, "parent_fk")}`
   (ներդրված մակարդակներ՝ `children=`-ով)։
6. `db_orinak_example`. `"image": "..."` → `"images": ["...", "..."]`, և
   ասա Վահեին, որ frontend-ում այդ տեղը slider դարձնի։

## Test-եր

```bash
pipenv run python manage.py test
```

Test-երը `frontend/db_orinak_example`-ը լցնում են ժամանակավոր բազա և
ստուգում, որ ամեն endpoint 3 լեզվով էլ վերադարձնում է ճիշտ նույն տվյալները։
Ստուգվում են նաև ֆիլտրերը, «միայն կարդալու» ռեժիմը, CORS-ը, admin-ում նկարի
upload-ը, ոչ նկար ֆայլերի մերժումը և որ admin-ի ամեն էջ բացվում է։ Քո
`db.sqlite3`-ին test-երը չեն դիպչում։

## Production

- `.env`. `DEBUG=False`, նոր երկար `SECRET_KEY`, `ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS` (կայքի domain-ը), `CSRF_TRUSTED_ORIGINS`,
  `PUBLIC_BASE_URL` (API-ի domain-ը, օգտագործվում է նկարների URL-ներում)։
- Բազան մնում է **SQLite**. `db.sqlite3`-ը և `media/`-ն պահիր մշտական disk-ի
  վրա և backup արա միասին։
- Django-ն `/media/`-ը և `/static/`-ը տալիս է միայն `DEBUG=True`-ի դեպքում։
  Production-ում web server-ը (օրինակ՝ nginx) տալիս է `backend/media/`-ն
  `/media/`-ով և `backend/staticfiles/`-ը `/static/`-ով։
- Աշխատեցում gunicorn-ով.

```bash
pipenv install gunicorn
pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --noinput
pipenv run python manage.py check --deploy
pipenv run gunicorn base.wsgi:application --bind 0.0.0.0:8000
```

Կապի ձևը աշխատում է EmailJS-ով, ու Django-ն email չի ուղարկում։
`check --deploy`-ը console email backend-ի համար տալիս է `mail.E001`.
`base/settings.py`-ում ավելացրու `SILENCED_SYSTEM_CHECKS = ["mail.E001"]`։

Frontend-ին նույնպես պետք է production API-ի domain-ը
`NEXT_PUBLIC_API_URL`-ում և `frontend/next.config.mjs`-ի
`images.remotePatterns`-ում։

## Խնդիրներ

| Խնդիր | Լուծում |
| --- | --- |
| `No module named pipenv` (macOS) | `brew install pipenv` |
| `That port is already in use` | 8000 port-ը զբաղված է այլ server-ով. `lsof -ti :8000 \| xargs kill` |
| Կայքի բաժինները դատարկ են | `runserver`-ը միացված չէ, կամ frontend-ը `127.0.0.1`-ի փոխարեն օգտագործում է `localhost` |
| `git pull`-ից հետո հին բովանդակություն | `pipenv run python manage.py migrate`, իսկ եթե sample ֆայլը փոխվել է՝ նաև `load_sample` |
