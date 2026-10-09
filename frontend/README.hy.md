[English](README.md) · [Русский](README.ru.md) · **Հայերեն**

# Fruit Food — frontend

Fruit Food-ի Next.js կայքը։ Այն սեփական տվյալներ չունի. բոլոր տեքստերը,
ապրանքներն ու նկարները գալիս են Django API-ից՝ [`../backend`](../backend/README.hy.md)։
Ինչպես միացնել ամբողջ project-ը. [root README](../README.hy.md)։

**Stack.** Next.js 16 (App Router), React 19, մաքուր JavaScript (`.jsx`),
CSS Modules, axios, EmailJS։

## Ինչպես է էջը ստանում տվյալները

```text
app/<route>/page.jsx (Server Component)
      │  const lang = await displayLang()       lib/lang.js. լեզուն `lang` cookie-ից
      ▼
app/<route>/actions.js                          ամեն route-ի իր ֆայլը, axios-ի հարցումներ
      │  axios.get('products', { params: { lang } })
      ▼
lib/axios.js  baseURL = NEXT_PUBLIC_API_URL  →  Django API  http://127.0.0.1:8000/api
```

- Ամեն collection մի endpoint է (`/api/products`, `/api/faq`, …)։ Տողերն ունեն
  `lang` դաշտ, ֆիլտրը՝ `?lang=am|ru|en`։
- Բովանդակության նկարները գալիս են ամբողջական URL-ով `/media/…`-ից, իսկ UI
  պատկերակները բեռնվում են `/static/…`-ից `asset()`-ով (տես [Նկարներ](#նկարներ))։
- Բոլոր էջերը dynamic են (կառուցվում են ամեն բացելիս), ուստի admin-ի
  փոփոխությունները երևում են առանց rebuild-ի։

## Folder-ների կառուցվածքը

```text
app/
  layout.jsx, actions.js        root layout. այստեղ են բեռնվում header-ը, footer-ը, լեզուները
  page.jsx, _components/        Գլխավոր. Hero, Assortment, Stats, Philosophy, Faq
  catalog/                      բոլոր ապրանքները + [categorySlug]
  products/[productSlug]/       ապրանքի էջ. Gallery, Info, CompositionModal
  about-us/                     Մեր մասին
  geography/                    Աշխարհագրություն (քարտեզ, երկրներ)
  contact/                      Կապ էջը և ձևը (EmailJS)
  not-found.jsx, error.jsx, global-error.jsx, loading.jsx
  sitemap.js, robots.js         օգտագործում են NEXT_PUBLIC_SITE_URL-ը
  globals.css, fonts.js         CSS փոփոխականներ (գույներ, արանքներ, չափեր), font-եր
components/
  header/, footer/              ընդհանուր բոլոր էջերի համար
  partner-cta/                  «Դարձեք գործընկեր» բլոկը (/contact-ում թաքնված է)
  image-slider/ImageSlider.jsx  միակ slider-ը, օգտագործվում է ամենուր (10 տեղ)
context/menubarContext.jsx      mobile մենյուի վիճակը
lib/
  axios.js                      axios instance
  lang.js                       displayLang()
  assets.js                     asset('/images/...') → UI պատկերակի URL-ը backend-ում
proxy.js                        իրական 404 status անհայտ /products/<slug>-ի և /catalog/<slug>-ի համար
db_orinak_example               sample տվյալներ, որ load_sample-ը լցնում է Django-ում
```

`public/` folder չկա։

## Կոդի կանոններ

1. **Ամեն route ունի իր `actions.js`-ը.** Տվյալը բերվում է միայն այնտեղ,
   axios-ով։ Component-ները JSON ֆայլեր import չեն անում։
2. **Route-ի component-ները՝ `app/<route>/_components/`-ում**, ընդհանուրները՝
   `components/`-ում։ Ամեն component ունի իր `.module.css`-ը (class-երը
   camelCase, առանց Tailwind-ի և inline style-ի)։
3. **Գույն, արանք, radius, font-size՝ միայն CSS փոփոխականներից**
   `app/globals.css`-ում (`var(--color-green)`, `var(--space-md)`)։ Նոր
   փոփոխական ավելացնելուց առաջ հարցրու Վահեին։
4. **Default-ը Server Component է.** `'use client'` միայն state-ի կամ event-ների
   համար (`useState`, `onClick`)։
5. **Էջում երևացող տեքստը կոդում չի գրվում.** Տեքստերը, `alt`-ը և
   `aria-label`-ը գալիս են API-ից 3 լեզվով։ Բացառություն. `not-found.jsx`-ը և
   `error.jsx`-ը իրենց 3 լեզվով տեքստերը պահում են կոդում, որովհետև պետք է
   աշխատեն նաև այն ժամանակ, երբ API-ն հասանելի չէ։
6. **Actions-ը էջը չի կոտրում.** API-ի սխալի դեպքում վերադարձրու `null` / `[]`
   (`try/catch`), ու component-ը ոչինչ չի ցույց տալիս։
7. **Լեզուն միայն `displayLang()`-ով**, ոչ թե `document.cookie`-ից։
8. **Ոճ (ESLint).** առանց `;`, single quotes, `const`/`let`, `===`, առանց
   comment-ների կոդում։ PR-ից առաջ աշխատեցրու `npm run lint`։
9. **Սկզբում Figma.** նայիր desktop (1440) և mobile (375) frame-երը և ui-kit-ը
   (կոճակների default/hover վիճակները)։ Header-ը fixed է (~67px), ուստի էջի
   առաջին բաժինը պետք է ունենա իր վերևի padding-ը։
10. Ընդհանուր ֆայլեր (`layout.jsx`, `globals.css`, `lib/*`, `package.json`).
    փոխելուց առաջ հարցրու Վահեին։

## Նկարներ

| Տեսակ | Որտեղ է | Ինչպես է օգտագործվում կոդում |
| --- | --- | --- |
| Բովանդակություն (slider-ներ, ապրանքներ, brand-եր…) | `backend/media/images/`, upload է արվում admin-ից | URL-ը API-ից. `<Image src={item.image} />` |
| UI պատկերակներ (սլաքներ, մենյու, քարտեզ, pin-եր) | `backend/base/static/images/` | `asset('/images/header/down.svg')`՝ `lib/assets.js`-ից |

- `next.config.mjs`-ը թույլ է տալիս `next/image`-ին բեռնել `/media/**`-ը և
  `/static/**`-ը լոկալ backend-ից։ **Production-ի համար այնտեղ ավելացրու API-ի
  իրական domain-ը։**
- Ապրանքի էջի նկարները լրիվ լցնում են քարտը (`object-fit: cover`), ուստի
  իրական լուսանկարները պետք է լինեն առանց սպիտակ կամ թափանցիկ եզրերի։
  Չափերը. gallery-ի նկարներ (`box_image` և ապրանքի նկարներ) **1200×1200**,
  համերի նկարներ **400×400**։ Mobile-ում gallery-ն 4:3 է, ուստի ապրանքը պետք է
  տեղավորվի բարձրության մեջտեղի 75%-ում։ `backend/media/images/products/test/`-ի
  test նկարները ցույց են տալիս ճիշտ չափերը։
- Նոր UI պատկերակ. դիր `backend/base/static/images/<բաժին>/`-ում և օգտագործիր
  `asset()`-ով։

### Slider-ներ

Բոլոր slider-ները օգտագործում են `components/image-slider/ImageSlider.jsx`-ը.
սլաքներ, dot-եր, swipe, առանց autoplay-ի։

```jsx
<ImageSlider
  images={data.images.map((src) => ({ src, alt: data.image_alt }))}
  labels={{ previous: labels.slider_previous_label, next: labels.slider_next_label,
            navigation: labels.slider_navigation_label, slide: labels.slider_image_label }}
  sizes='(max-width: 900px) 100vw, 548px'
/>
```

Ոչ պարտադիր props. `href` (ամբողջ նկարը հղում է), `preload` (առաջին slide),
`imageClassName`։ Slider-ը լցնում է իր parent-ը, ուստի չափը տալիս է parent-ը։

## Նոր էջ ավելացնել

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

Նոր collection կամ դաշտ սկզբում ավելացվում է backend-ում (model + migration +
sample տվյալներ), տես [backend README](../backend/README.hy.md)։

## Env փոփոխականներ (`.env.local`)

`.env.example`-ը copy արա `.env.local`։ Այս ֆայլը երբեք commit չի արվում։

| Փոփոխական | Արժեք |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | լոկալում `http://127.0.0.1:8000/api` (հենց `127.0.0.1`, ոչ թե `localhost`) |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS-ի key-երը կապի ձևի համար (Վահեի մոտ են) |
| `NEXT_PUBLIC_SITE_URL` | միայն production-ում. կայքի հասցեն `sitemap.xml`-ի և `robots.txt`-ի համար |

## Հրամաններ

```bash
npm install       # dependency-ներ
npm run dev       # development server, http://localhost:3000
npm run lint      # ESLint
npm run build     # production build
npm run start     # production build-ի աշխատեցում
```

## Խնդիրներ

| Խնդիր | Լուծում |
| --- | --- |
| Էջը բացվում է, բայց բաժինները դատարկ են | Django-ն միացված չէ. `backend/`-ում `pipenv run python manage.py runserver` |
| Django-ն միացված է, բայց դատարկ է | `NEXT_PUBLIC_API_URL`-ում պետք է լինի `127.0.0.1`. `.env.local`-ը փոխելուց հետո վերամիացրու `npm run dev`-ը |
| Նկարներ կամ պատկերակներ չկան | Django-ն միացված չէ, կամ նկարը admin-ից upload չի արվել |
| Կապի ձևը չի ուղարկում | `.env.local`-ում EmailJS-ի key-երը չկան |
