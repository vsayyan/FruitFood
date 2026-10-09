[English](README.md) · **Русский** · [Հայերեն](README.hy.md)

# Fruit Food — фронтенд

Сайт Fruit Food на Next.js. Своих данных у него нет: все тексты, товары и
изображения приходят из Django API в [`../backend`](../backend/README.ru.md).
Как запустить весь проект: [корневой README](../README.ru.md).

**Стек:** Next.js 16 (App Router), React 19, чистый JavaScript (`.jsx`),
CSS Modules, axios, EmailJS.

## Как страница получает данные

```text
app/<route>/page.jsx (Server Component)
      │  const lang = await displayLang()       lib/lang.js: язык из cookie `lang`
      ▼
app/<route>/actions.js                          свой файл у каждого маршрута, запросы axios
      │  axios.get('products', { params: { lang } })
      ▼
lib/axios.js  baseURL = NEXT_PUBLIC_API_URL  →  Django API  http://127.0.0.1:8000/api
```

- Каждая коллекция — это endpoint (`/api/products`, `/api/faq`, …). У строк
  есть поле `lang`, фильтр — `?lang=am|ru|en`.
- Изображения контента приходят полными URL из `/media/…`; иконки интерфейса
  загружаются из `/static/…` через `asset()` (см. [Изображения](#изображения)).
- Все страницы динамические (рендерятся при каждом запросе), поэтому правки в
  админке видны без пересборки.

## Структура папок

```text
app/
  layout.jsx, actions.js        корневой layout; здесь загружаются хедер, футер, языки
  page.jsx, _components/        Главная: Hero, Assortment, Stats, Philosophy, Faq
  catalog/                      все товары + [categorySlug]
  products/[productSlug]/       страница товара: Gallery, Info, CompositionModal
  about-us/                     О нас
  geography/                    География (карта, страны)
  contact/                      Контакты и форма (EmailJS)
  not-found.jsx, error.jsx, global-error.jsx, loading.jsx
  sitemap.js, robots.js         используют NEXT_PUBLIC_SITE_URL
  globals.css, fonts.js         CSS-переменные (цвета, отступы, размеры), шрифты
components/
  header/, footer/              общие для всех страниц
  partner-cta/                  блок «Стать партнёром» (скрыт на /contact)
  image-slider/ImageSlider.jsx  единственный слайдер, используется везде (10 мест)
context/menubarContext.jsx      состояние мобильного меню
lib/
  axios.js                      экземпляр axios
  lang.js                       displayLang()
  assets.js                     asset('/images/...') → URL иконки интерфейса в бэкенде
proxy.js                        настоящий статус 404 для неизвестных /products/<slug> и /catalog/<slug>
db_orinak_example               образец данных, который load_sample загружает в Django
```

Папки `public/` нет.

## Правила кода

1. **У каждого маршрута свой `actions.js`.** Данные запрашиваются только там,
   через axios. Компоненты не импортируют JSON-файлы.
2. **Компоненты маршрута — в `app/<route>/_components/`**, общие — в
   `components/`. У каждого компонента свой `.module.css` (классы в camelCase,
   без Tailwind и inline-стилей).
3. **Цвета, отступы, радиусы, размеры шрифта — только из CSS-переменных** в
   `app/globals.css` (`var(--color-green)`, `var(--space-md)`). Новую переменную
   согласуйте с Vahe.
4. **По умолчанию Server Components.** `'use client'` — только для состояния
   или событий (`useState`, `onClick`).
5. **Никакого жёстко прописанного видимого текста.** Тексты, `alt` и
   `aria-label` приходят из API на трёх языках. Исключение: `not-found.jsx` и
   `error.jsx` хранят свои тексты на трёх языках в коде, потому что должны
   работать, даже когда API недоступен.
6. **Actions не ломают страницу:** при ошибке API возвращайте `null` / `[]`
   (`try/catch`); компонент тогда ничего не показывает.
7. **Язык — только через `displayLang()`**, а не `document.cookie`.
8. **Стиль (ESLint):** без точек с запятой, одинарные кавычки, `const`/`let`,
   `===`, без комментариев в коде. Перед PR запустите `npm run lint`.
9. **Сначала Figma:** смотрите кадры desktop (1440) и mobile (375) и ui-kit
   (состояния кнопок default/hover). Хедер фиксированный (~67px), поэтому
   первому разделу страницы нужен свой верхний отступ.
10. Общие файлы (`layout.jsx`, `globals.css`, `lib/*`, `package.json`):
    согласуйте изменения с Vahe.

## Изображения

| Тип | Где лежит | Как используется в коде |
| --- | --- | --- |
| Контент (слайдеры, товары, бренды…) | `backend/media/images/`, загружается в админке | URL из API: `<Image src={item.image} />` |
| Иконки интерфейса (стрелки, меню, карта, метки) | `backend/base/static/images/` | `asset('/images/header/down.svg')` из `lib/assets.js` |

- `next.config.mjs` разрешает `next/image` загружать `/media/**` и `/static/**`
  с локального бэкенда. **Для продакшена добавьте туда настоящий домен API.**
- Изображения на странице товара заполняют карточку целиком
  (`object-fit: cover`), поэтому у настоящих фото не должно быть белых или
  прозрачных полей. Размеры: фото галереи (`box_image` и фото товара)
  **1200×1200**, фото вкусов **400×400**. На mobile галерея 4:3, поэтому товар
  должен помещаться в средние 75% высоты. Тестовые изображения в
  `backend/media/images/products/test/` показывают нужные размеры.
- Новая иконка интерфейса: положите её в
  `backend/base/static/images/<раздел>/` и используйте `asset()`.

### Слайдеры

Все слайдеры используют `components/image-slider/ImageSlider.jsx`: стрелки,
точки, свайп, без автопрокрутки.

```jsx
<ImageSlider
  images={data.images.map((src) => ({ src, alt: data.image_alt }))}
  labels={{ previous: labels.slider_previous_label, next: labels.slider_next_label,
            navigation: labels.slider_navigation_label, slide: labels.slider_image_label }}
  sizes='(max-width: 900px) 100vw, 548px'
/>
```

Необязательные props: `href` (вся картинка — ссылка), `preload` (первый
слайд), `imageClassName`. Слайдер заполняет родителя, поэтому размер задаёт
родительский элемент.

## Добавить страницу

```text
app/my-page/
  actions.js
  page.jsx
  page.module.css
  _components/MySection.jsx + MySection.module.css
```

```js
// app/my-page/actions.js
import axios from '@/lib/axios'

export async function getMyData(lang) {
  try {
    const res = await axios.get('my_collection', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}
```

```jsx
// app/my-page/page.jsx
import { displayLang } from '@/lib/lang'
import { getMyData } from './actions'
import MySection from './_components/MySection'

export default async function MyPage() {
  const lang = await displayLang()
  const data = await getMyData(lang)
  return <MySection data={data} />
}
```

Новая коллекция или поле сначала добавляется в бэкенд (модель + миграция +
образец данных), см. [README бэкенда](../backend/README.ru.md).

## Переменные окружения (`.env.local`)

Скопируйте `.env.example` в `.env.local`. Этот файл никогда не коммитится.

| Переменная | Значение |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | локально `http://127.0.0.1:8000/api` (именно `127.0.0.1`, не `localhost`) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | ключи EmailJS для формы обратной связи (у Vahe) |
| `NEXT_PUBLIC_SITE_URL` | только для продакшена: адрес сайта для `sitemap.xml` и `robots.txt` |

## Команды

```bash
npm install       # зависимости
npm run dev       # сервер разработки, http://localhost:3000
npm run lint      # ESLint
npm run build     # production-сборка
npm run start     # запуск production-сборки
```

## Проблемы

| Проблема | Решение |
| --- | --- |
| Страница открывается, но разделы пустые | Django не запущен: `pipenv run python manage.py runserver` в `backend/` |
| Пусто, хотя Django запущен | В `NEXT_PUBLIC_API_URL` должен быть `127.0.0.1`; после изменения `.env.local` перезапустите `npm run dev` |
| Нет изображений или иконок | Django не запущен, или изображение не загружено в админке |
| Форма обратной связи не отправляет | В `.env.local` нет ключей EmailJS |
