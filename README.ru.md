[English](README.md) · **Русский** · [Հայերեն](README.hy.md)

# Fruit Food

Сайт компании **Fruit Food**, армянского производителя натуральных сухофруктов
и сладостей в шоколаде. Сайт работает на трёх языках (армянский, русский,
английский) и состоит из семи разделов: Главная, Каталог (с двумя
категориями), страницы товаров, О нас, География и Контакты.

Весь контент (тексты, товары, изображения) хранится в бэкенде и редактируется
в админке Django. Фронтенд только показывает его.

## Как это работает

```text
Браузер ──► Next.js (фронтенд, :3000) ──axios──► Django REST API (бэкенд, :8000/api) ──► SQLite
                                                        ▲
Админка Django (:8000/admin) ─ тексты, загрузка фото ───┘   фото: backend/media, иконки UI: backend/base/static
```

| Часть | Технологии | Папка |
| --- | --- | --- |
| Фронтенд | Next.js 16 (App Router), React 19, JavaScript, CSS Modules, axios | [`frontend/`](frontend/README.ru.md) |
| Бэкенд | Django 6.1, Django REST Framework, SQLite | [`backend/`](backend/README.ru.md) |
| Форма обратной связи | EmailJS (письмо отправляется прямо из браузера) | `frontend/app/contact/` |

- Язык хранится в cookie `lang` (`am`, `ru`, `en`); адреса страниц одинаковы
  для всех языков (`/catalog`, а не `/ru/catalog`).
- Каждая страница рендерится на сервере при каждом запросе, поэтому изменение,
  сохранённое в админке, сразу видно на сайте, без пересборки.
- `frontend/db_orinak_example` — образец данных: `load_sample` заполняет из
  него новую базу.

## Структура репозитория

```text
frontend/                 сайт на Next.js (страницы, компоненты, стили)
  db_orinak_example       образец данных для базы (35 коллекций, 3 языка)
backend/                  проект Django
  base/                   настройки, общий код API, load_sample, тесты
  base/static/images/     иконки интерфейса (стрелки, меню, карта, запасной логотип)
  media/images/           изображения контента (загружаются в админке)
  header/ footer/ product/ homepage/ about/ contact/ geography/   по приложению на раздел сайта
```

## Запуск проекта на своём компьютере

Нужны **Git**, **Node.js 20+**, **Python 3.12+** и **Pipenv**.

- macOS: `brew install node python pipenv` (если Python из Homebrew, Pipenv
  ставится через `brew`, а не через `pip`).
- Windows: установите Node.js и Python с их сайтов, затем `pip install pipenv`.
  Ниже вместо `cp` используйте `copy`.

### 1. Скачать код

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood
```

### 2. Бэкенд (первое окно терминала)

```bash
cd backend
pipenv install
cp .env.example .env
pipenv run python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

Вставьте напечатанный ключ в `backend/.env` как `SECRET_KEY=...`, затем:

```bash
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

Не закрывайте это окно. `createsuperuser` спросит имя пользователя и пароль —
это ваш вход в админку.

### 3. Фронтенд (второе окно терминала)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 4. Открыть

| Что | Адрес |
| --- | --- |
| Сайт | <http://localhost:3000> |
| Админка (контент, загрузка фото) | <http://127.0.0.1:8000/admin/> |
| API (пример) | <http://127.0.0.1:8000/api/products?lang=ru> |

Если сайт открывается, но разделы пустые, значит бэкенд не запущен (шаг 2).
Для формы обратной связи нужны ключи EmailJS в `frontend/.env.local`; их даёт
Vahe, в git они не попадают.

## Как работает команда

### Правила

1. **Никто не коммитит в `main`.** Работайте в своей ветке и открывайте Pull
   Request. Vahe проверяет и делает merge.
2. Имена веток: `feature/<что>`, `fix/<что>`, `docs/<что>`, `chore/<что>`.
3. Одна задача = одна ветка = один PR. В PR напишите, что изменилось и как это
   проверить.
4. Никогда не коммитьте `.env`, `.env.local`, `db.sqlite3` и другие секреты
   (они в `.gitignore`).

### Начать новую задачу

```bash
git checkout main
git pull origin main
git checkout -b feature/my-task
# ... работа ...
git add -A
git commit -m "Short description of the change"
git push origin feature/my-task
```

Затем откройте на GitHub Pull Request в `main`.

### Получить последние изменения

Когда в `main` что-то смержено:

```bash
git checkout main
git pull origin main
cd backend
pipenv install
pipenv run python manage.py migrate
cd ../frontend
npm install
```

Затем перезапустите оба сервера. `pipenv run python manage.py load_sample`
запускайте, только если изменился `frontend/db_orinak_example`: **он заменяет
весь контент в вашей локальной базе**, включая правки в админке.

### Где что менять

| Хочу изменить… | Где |
| --- | --- |
| Текст, товар, фото или перевод | Админка Django (без кода) |
| Вёрстку страницы, стиль или компонент | `frontend/` ([README фронтенда](frontend/README.ru.md)) |
| Новое поле данных или коллекцию | `backend/`: модель + миграция ([README бэкенда](backend/README.ru.md)) |
| Иконку интерфейса (стрелка, меню, карта) | `backend/base/static/images/` |

## Команда

| Кто | Часть |
| --- | --- |
| Vahe | Тимлид, ревью и интеграция, страница товара |
| Narek | Бэкенд (Django) |
| Vahag | Хедер, футер, первый экран Главной |
| Ashot | Главная: ассортимент и статистика |
| Saten | Главная: философия и FAQ |
| Vahram | Блок партнёрства, страница Контакты |
| Elina | Каталог |
| Milena | О нас: разделы 1–3 |
| Hamlet | О нас: разделы 4–6 |
| Jor | О нас: разделы 7–9 |
| Sergey | География |

## Статус

- Фронтенд и бэкенд готовы и объединены; сайт полностью работает на Django.
- Большинство изображений — временные **тестовые** с пометкой «TEST n/3»; их
  заменяют настоящими фото в админке.
- Следующие шаги (вне кода): настоящие фото и данные товаров, хостинг и домен,
  настройка бэкенда для продакшена (см. [README бэкенда](backend/README.ru.md)).
