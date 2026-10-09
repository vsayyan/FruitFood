[English](README.md) · **Русский** · [Հայերեն](README.hy.md)

# Fruit Food — бэкенд

API на Django + Django REST Framework для сайта Fruit Food. Отдаёт 35
коллекций (тексты, товары, изображения) на трёх языках. Фронтенд берёт всё
из этого API. API только для чтения: контент редактируется в админке Django.
Как запустить весь проект: [корневой README](../README.ru.md).

**Стек:** Python 3.12+, Django 6.1, Django REST Framework, django-cors-headers,
python-decouple, SQLite, Pipenv.

## Установка

```bash
cd backend
pipenv install
cp .env.example .env        # затем задайте SECRET_KEY (см. корневой README)
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

- API: <http://127.0.0.1:8000/api/>
- Админка: <http://127.0.0.1:8000/admin/>

macOS с Python из Homebrew: ставьте Pipenv через `brew install pipenv`
(`pip install --user` там запрещён).

## Структура

| Приложение | Коллекции |
| --- | --- |
| `header` | logos, languages, navbars, header_labels, categories, tags |
| `footer` | footer_labels, partner_cta |
| `product` | products, product_page_labels, tag_icons |
| `homepage` | homepage_hero, home_assortment, stats, philosophy_headings, philosophy_text, faq_small, faq_heading, faq |
| `about` | about_intro, about_production, about_why_trust_us, about_showcase, about_quality_naturalness, about_philosophy, about_philosophy_facts, about_page_labels, brands, export_cooperation, our_factory, we_believe |
| `contact` | contact_page_contents, contact_info |
| `geography` | geography_contents, export_countries |

В `base/` — настройки, URL, `FilteredReadOnlyViewSet`, право «только чтение»,
рендерер URL изображений, `load_sample` (`base/sample.py`,
`base/management/commands/load_sample.py`), тесты и иконки интерфейса
(`base/static/images/`).

## Правила API

- `GET /api/<collection>`, со слешем в конце или без.
- Ответы — простые JSON-массивы без пагинации. Только `logos` возвращает один
  объект.
- Каждый язык — отдельная строка с `lang` = `am`, `ru` или `en`; фильтр
  `?lang=`. Дополнительные фильтры: `products` (`slug`, `category_slug`),
  `categories` (`slug`), `navbars` (`url`), `brands` и `export_countries`
  (`code`), `tag_icons` (`code`).
- Неизвестный slug возвращает `[]` со статусом 200; страницу 404 показывает
  фронтенд.
- Изображения — полные URL (`http://127.0.0.1:8000/media/images/products/x.webp`).
  Списки изображений (слайдеры, галерея товара) — массивы URL, например
  `brands[].images`, `about_production.images`, `home_assortment.cards[].images`,
  `products[].images`.
- Имена полей в snake_case и должны точно совпадать с
  `frontend/db_orinak_example`: **от них зависит фронтенд.** Переименование или
  удаление поля ломает сайт; добавление поля безопасно.

## Админка и изображения

Изображения контента — файловые поля: они загружаются в админке и сохраняются
в `backend/media/images/<раздел>/`; в базе хранится путь относительно `media/`.

- Разрешены jpg, jpeg, png, webp, gif, svg, до 5 МБ. Доступ к админке давайте
  только доверенным людям: SVG может содержать скрипты.
- Каждый язык — отдельная строка, поэтому изображение меняется во всех трёх
  строках (am, ru, en).
- Изображения слайдеров — во вложенных блоках («Brand images», «Production
  images», «Hero slides», …). Их `order` — порядок на сайте. Слайдер с одним
  изображением показывается без стрелок.
- Изображения карточек ассортимента: откройте карточку из «Home assortment»
  (ссылка «Change») или из «Assortment cards».
- Замена или удаление изображения не удаляет старый файл с диска.

| Раздел сайта | Страница админки | Блок |
| --- | --- | --- |
| Главная: слайдер hero | Homepage hero | Hero slides |
| Главная: ассортимент | Assortment cards | Assortment card images |
| Главная: философия | Philosophy text | Philosophy images |
| О нас: раздел 1 | About intro | Intro slides |
| О нас: бренды | Brands | Brand images |
| О нас: производство | About production | Production images |
| О нас: витрина | About showcase | Showcase images |
| О нас: наш завод | Our factory | Factory slides, Factory gallery images |
| Страница товара | Products | Product images, Product variants (`image` — карточка вкуса 400×400, `box_image` — большое фото 1200×1200); фото товара 1200×1200 |

Большинство изображений тестовые (`media/images/test/`,
`media/images/products/test/`, с пометкой «TEST n/3»). Удалите эти папки, когда
все изображения будут заменены.

Иконки интерфейса (стрелки, меню, карта, метки, запасной логотип) — не
контент: это статические файлы Django в `base/static/images/`, фронтенд
загружает их из `/static/images/...`.

## Образец данных

```bash
pipenv run python manage.py load_sample
```

Заполняет базу из `frontend/db_orinak_example` (`--path` — другой файл).
**Сначала удаляет весь существующий контент**, включая правки в админке.
Используйте на новом компьютере или когда изменился файл образца, а в
продакшене — только один раз, при первом деплое.

## Изменение модели данных

**Новое текстовое поле** (например, подпись):

```python
slider_image_label = models.CharField(max_length=100, blank=True)
```

`blank=True` позволяет миграции пройти на существующих строках. Затем
`makemigrations`, добавьте поле на трёх языках в `frontend/db_orinak_example`,
запустите `load_sample`. Сериализаторы используют `fields = "__all__"`, поэтому
поле появится в API само.

**Одно изображение → слайдер** (по образцу `BrandImage`):

1. Дочерняя модель: `ForeignKey(Parent, related_name="images")`, `order`,
   `image = models.FileField(...)`, `ordering = ["order", "id"]`.
2. `makemigrations`; в миграции перенесите `RemoveField` в конец и перед ним
   поставьте `migrations.RunPython(copy_images, migrations.RunPython.noop)`,
   чтобы сохранить существующие изображения (см.
   `about/migrations/0005_brand_production_images.py`).
3. Сериализатор: `images = serializers.SerializerMethodField()` и
   `get_images()`, возвращающий URL.
4. Админка: inline с `ImagePreviewMixin`.
5. `base/sample.py`: `"children": {"images": child(NewImage, "parent_fk")}`
   (вложенные уровни — через `children=`).
6. `db_orinak_example`: `"image": "..."` → `"images": ["...", "..."]`, и
   сообщите Vahe, чтобы фронтенд использовал там слайдер.

## Тесты

```bash
pipenv run python manage.py test
```

Тесты загружают `frontend/db_orinak_example` во временную базу и проверяют,
что каждый endpoint возвращает точно те же данные на всех трёх языках, а также
фильтры, режим «только чтение», CORS, загрузку изображения в админке, отказ
для не-изображений и то, что открывается каждая страница админки. Ваш
`db.sqlite3` не затрагивается.

## Продакшен

- `.env`: `DEBUG=False`, новый длинный `SECRET_KEY`, `ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS` (домен сайта), `CSRF_TRUSTED_ORIGINS`,
  `PUBLIC_BASE_URL` (домен API, используется в URL изображений).
- База остаётся **SQLite**: держите `db.sqlite3` и `media/` на постоянном диске
  и делайте их резервные копии вместе.
- Django отдаёт `/media/` и `/static/` только при `DEBUG=True`. В продакшене
  веб-сервер (например, nginx) отдаёт `backend/media/` по `/media/` и
  `backend/staticfiles/` по `/static/`.
- Запуск через gunicorn:

```bash
pipenv install gunicorn
pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --noinput
pipenv run python manage.py check --deploy
pipenv run gunicorn base.wsgi:application --bind 0.0.0.0:8000
```

Форма обратной связи работает через EmailJS, Django писем не отправляет.
`check --deploy` выдаёт `mail.E001` для консольного email-бэкенда; добавьте
`SILENCED_SYSTEM_CHECKS = ["mail.E001"]` в `base/settings.py`.

Фронтенду тоже нужен домен API продакшена в `NEXT_PUBLIC_API_URL` и в
`images.remotePatterns` файла `frontend/next.config.mjs`.

## Проблемы

| Проблема | Решение |
| --- | --- |
| `No module named pipenv` (macOS) | `brew install pipenv` |
| `That port is already in use` | порт 8000 занят другим сервером: `lsof -ti :8000 \| xargs kill` |
| Разделы сайта пустые | `runserver` не запущен, или фронтенд использует `localhost` вместо `127.0.0.1` |
| Старый контент после `git pull` | `pipenv run python manage.py migrate`, и `load_sample`, если изменился файл образца |
