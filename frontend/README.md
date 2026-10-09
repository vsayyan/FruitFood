**English** · [Русский](README.ru.md) · [Հայերեն](README.hy.md)

# Fruit Food — frontend

Next.js site of Fruit Food. It has no data of its own: every text, product
and image comes from the Django API in [`../backend`](../backend/README.md).
How to run the whole project: [root README](../README.md).

**Stack:** Next.js 16 (App Router), React 19, plain JavaScript (`.jsx`),
CSS Modules, axios, EmailJS.

## How a page gets its data

```text
app/<route>/page.jsx (Server Component)
      │  const lang = await displayLang()       lib/lang.js: language from the `lang` cookie
      ▼
app/<route>/actions.js                          one file per route, axios calls
      │  axios.get('products', { params: { lang } })
      ▼
lib/axios.js  baseURL = NEXT_PUBLIC_API_URL  →  Django API  http://127.0.0.1:8000/api
```

- Every collection is an endpoint (`/api/products`, `/api/faq`, …). Rows have a
  `lang` field and are filtered with `?lang=am|ru|en`.
- Content images come as full URLs from `/media/…`; UI icons are loaded from
  `/static/…` with `asset()` (see [Images](#images)).
- All pages are dynamic (rendered on each request), so admin changes appear
  without a rebuild.

## Folder structure

```text
app/
  layout.jsx, actions.js        root layout; header, footer, languages are loaded here
  page.jsx, _components/        Home: Hero, Assortment, Stats, Philosophy, Faq
  catalog/                      all products + [categorySlug]
  products/[productSlug]/       product page: Gallery, Info, CompositionModal
  about-us/                     About us
  geography/                    Geography (map, countries)
  contact/                      Contact page and form (EmailJS)
  not-found.jsx, error.jsx, global-error.jsx, loading.jsx
  sitemap.js, robots.js         use NEXT_PUBLIC_SITE_URL
  globals.css, fonts.js         CSS variables (colors, spacing, sizes), fonts
components/
  header/, footer/              shared on every page
  partner-cta/                  "Become a partner" block (hidden on /contact)
  image-slider/ImageSlider.jsx  the one slider used everywhere (10 places)
context/menubarContext.jsx      mobile menu state
lib/
  axios.js                      axios instance
  lang.js                       displayLang()
  assets.js                     asset('/images/...') → UI icon URL in the backend
proxy.js                        real 404 status for unknown /products/<slug> and /catalog/<slug>
db_orinak_example               sample data loaded into Django by load_sample
```

There is no `public/` folder.

## Code rules

1. **Each route has its own `actions.js`.** Data is fetched only there, with
   axios. Components never import JSON files.
2. **Route components live in `app/<route>/_components/`**, shared ones in
   `components/`. Each component has its own `.module.css` (camelCase classes,
   no Tailwind, no inline styles).
3. **Colors, spacing, radius, font sizes come from CSS variables** in
   `app/globals.css` (`var(--color-green)`, `var(--space-md)`). Ask Vahe before
   adding a new one.
4. **Server Components by default.** Add `'use client'` only for state or
   events (`useState`, `onClick`).
5. **No hardcoded visible text.** Texts, `alt` and `aria-label` come from the
   API in three languages. Exceptions: `not-found.jsx` and `error.jsx` keep
   their three-language texts in the code because they must work when the API
   is down.
6. **Actions never break the page:** on an API error return `null` / `[]`
   (`try/catch`); the component then renders nothing.
7. **Language only through `displayLang()`**, not `document.cookie`.
8. **Style (ESLint):** no semicolons, single quotes, `const`/`let`, `===`, no
   code comments. Run `npm run lint` before a PR.
9. **Figma first:** check desktop (1440) and mobile (375) frames and the
   ui-kit (button default/hover states). The header is fixed (~67px), so the
   first section of a page needs its own top padding.
10. Shared files (`layout.jsx`, `globals.css`, `lib/*`, `package.json`): ask
    Vahe before changing them.

## Images

| Kind | Where it lives | How the code uses it |
| --- | --- | --- |
| Content (sliders, products, brands…) | `backend/media/images/`, uploaded in the admin | URL from the API: `<Image src={item.image} />` |
| UI icons (arrows, menu, map, pins) | `backend/base/static/images/` | `asset('/images/header/down.svg')` from `lib/assets.js` |

- `next.config.mjs` allows `next/image` to load `/media/**` and `/static/**`
  from the local backend. **For production, add the real API domain there.**
- Product page images fill their card (`object-fit: cover`), so real photos
  must have no white or transparent margins. Sizes: gallery images
  (`box_image` and product images) **1200×1200**, taste images **400×400**.
  On mobile the gallery is 4:3, so keep the product inside the middle 75% of
  the height. The test images in `backend/media/images/products/test/` show
  the right sizes.
- New UI icon: put it in `backend/base/static/images/<section>/` and use
  `asset()`.

### Sliders

All sliders use `components/image-slider/ImageSlider.jsx`: arrows, dots,
swipe, no autoplay.

```jsx
<ImageSlider
  images={data.images.map((src) => ({ src, alt: data.image_alt }))}
  labels={{ previous: labels.slider_previous_label, next: labels.slider_next_label,
            navigation: labels.slider_navigation_label, slide: labels.slider_image_label }}
  sizes='(max-width: 900px) 100vw, 548px'
/>
```

Optional props: `href` (the whole image is a link), `preload` (first slide),
`imageClassName`. The slider fills its parent, so the parent sets the size.

## Adding a page

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

A new collection or field is added in the backend first (model + migration +
sample data), see the [backend README](../backend/README.md).

## Environment variables (`.env.local`)

Copy `.env.example` to `.env.local`. It is never committed.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://127.0.0.1:8000/api` locally (use `127.0.0.1`, not `localhost`) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS keys for the contact form (ask Vahe) |
| `NEXT_PUBLIC_SITE_URL` | production only: site address for `sitemap.xml` and `robots.txt` |

## Commands

```bash
npm install       # dependencies
npm run dev       # development server, http://localhost:3000
npm run lint      # ESLint
npm run build     # production build
npm run start     # run the production build
```

## Problems

| Problem | Fix |
| --- | --- |
| Page opens but sections are empty | Django is not running: `pipenv run python manage.py runserver` in `backend/` |
| Still empty with Django running | `NEXT_PUBLIC_API_URL` must use `127.0.0.1`; restart `npm run dev` after changing `.env.local` |
| Images or icons missing | Django is not running, or the image was not uploaded in the admin |
| Contact form does not send | EmailJS keys are missing in `.env.local` |
