# Fruit Food — Frontend

> ⚠️ **ԿԱՐԴԱ ՍԿՍԵԼՈՒՑ ԱՌԱՋ**
> 1. Ուղիղ `main`-ի մեջ **ոչ ոք** commit/push չի անում։ Ամեն մարդ աշխատում ա **իր branch-ում** ու ուղարկում ա **Pull Request (PR)**։ Ինտեգրումը (merge դեպի `main`) անում ա միայն **Vahe**-ն։
> 2. `db_orinak_example`-ը **չես փոխում**։ Դա ընդհանուր օրինակ ա։ Ամեն մարդ իր համակարգչում ունի **իր սեփական `db.json`**-ը (git-ի մեջ չի գնում)։
> 3. Քո նոր տվյալները (collection-ները) ուղարկում ես առանձին ֆայլով՝ `db_parts/<քո-անուն>.json`։ Մանրամասն՝ [§5](#5-քո-dbjson-ը) և [§7](#7-git--ինչպես-աշխատել-ու-ուղարկել)։

Այս `frontend/` folder-ը պարունակում է գործող Next.js հավելվածը, route-երը, shared component-ները, տվյալների օրինակն ու asset-ները։ Նոր task սկսելիս նախ ստուգիր համապատասխան էջի և component-ի առկա կոդը, հետո պահպանիր §4-ի pattern-ները։ Django backend-ի համար նախատեսված դատարկ պանակը գտնվում է repository-ի root-ում՝ `backend/`։

**Stack.** Next.js 16 (App Router) + React 19 · plain JavaScript (`.jsx`) · CSS Modules · axios · json-server (mock API)

---

## 1. Ինչպես ա աշխատում

```
page.jsx (Server Component)
      ↓  displayLang()  ← lib/lang.js, լեզուն cookie-ից (am / ru / en)
      ↓
actions.js  (տվյալ բերող ֆունկցիաներ, ամեն route-ի մոտ իրենը)
      ↓
lib/axios.js  ← baseURL = NEXT_PUBLIC_API_URL
      ↓
(հիմա)   json-server  →  db.json            http://localhost:8000
(վերջում) Django REST API                    Narek
```

- `db.json`-ը json-server-ով դառնում ա **իրական HTTP API**. ամեն collection = endpoint (`/products`, `/faq`, ...)
- Ամեն տող ունի `lang` field, ֆիլտրվում ա query-ով՝ `products?lang=am`
- Լեզուն **cookie**-ում ա, ոչ URL-ում (`/catalog`, ոչ թե `/am/catalog`)
- Django-ին անցնելիս frontend-ի կոդը **չի փոխվում**, փոխվում ա միայն `.env.local`-ի `NEXT_PUBLIC_API_URL`-ը

## 2. Setup (առաջին անգամ)

Պետք ա՝ **Node.js 20+** և **git**։

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood/frontend
npm install
cp .env.example .env.local
cp db_orinak_example db.json
npm run dev
```

`npm run dev`-ը միաժամանակ միացնում ա 2 սերվեր.
- `json-server` → http://localhost:8000 (կարդում ա **`db.json`**-ը, ոչ թե `db_orinak_example`-ը)
- `next dev` → http://localhost:3000 ← սա բաց արա browser-ում

Ստուգելու համար, որ API-ն աշխատում ա, բաց արա http://localhost:8000/products?lang=am

> Windows-ում `cp`-ի փոխարեն՝ `copy .env.example .env.local` և `copy db_orinak_example db.json`

Եթե էջը error ա տալիս՝ ամենահավանականն այն ա, որ `db.json` չկա, կամ json-server-ը չի միացել (նայիր terminal-ը)։

## 3. Folder structure

```
db_orinak_example              Ընդհանուր օրինակ DB (ՉԵՍ ՓՈԽՈՒՄ, ինտեգրում ա անում Vahe-ն)
db.json                        Քո լոկալ DB-ն (copy օրինակից, git-ում չկա)
db_parts/<անուն>.json          Քո նոր collection-ները՝ ուղարկելու համար (§5)
.env.example                   copy → .env.local
proxy.js                       /products/<slug>, /catalog/<slug>. slug-ը API-ում չկա → իրական 404 status (loading.jsx-ի պատճառով notFound()-ը 200 էր տալիս)

app/
  layout.jsx + actions.js      Root layout. logo / navbar / langs / footer-ի տվյալը այստեղ ա fetch արվում
  globals.css                  Գույներ, spacing, radius, font-size (CSS variables), .container
  page.jsx + page.module.css   Home
  fonts.js                     Noto Sans Armenian + Noto Sans (cyrillic). layout.jsx-ն ու global-error.jsx-ը սրանից են վերցնում
  loading.jsx / error.jsx / not-found.jsx   Ընդհանուր loading, error, 404
  global-error.jsx             Երբ սխալը հենց layout-ում ա (օր.՝ json-server-ը միացած չի). նույն error.jsx-ն ա՝ սեփական <html>-ով
  sitemap.js / robots.js       SEO
  catalog/
    actions.js                 getAllProducts(), getProductPageLabels()
    page.jsx                   Ամբողջ տեսականին
    _components/               Breadcrumbs, ProductGrid, ProductCard (+ .module.css)
    [categorySlug]/
      actions.js               getProductsByCategory(), getProductCategory(), getProductPageLabels()
      page.jsx                 Կատեգորիայի էջ (անհայտ կատեգորիա → 404)
  products/
    [productSlug]/
      actions.js               getProduct(slug), getProductCategory(), getProductTags(), getProductPageLabels()
      page.jsx + page.module.css   Մեկ ապրանքի էջ (Vahe, §6)
      _components/ProductDetails.jsx, Gallery.jsx, Info.jsx, CompositionModal.jsx + .module.css
  about-us/                    Section 7–9 պատրաստ են (ExportCooperation, OurFactory, WeBelieve)
  geography/                   Պատրաստ ա (Intro, Description, Map, CountryList, BottomInfo)

  contact/
    actions.js                 getContactPageContent(), submitContact() (POST)
    page.jsx + page.module.css
    _components/ContactForm.jsx + .module.css   ('use client' օրինակ)

components/                    Global component-ներ (ամեն էջում են)
  header/  index.jsx, Logo.jsx, Navbar.jsx, Langs.jsx, Header.module.css
  footer/  index.jsx, Footer.module.css
  partner-cta/  PartnerCta.jsx (Server Component, տվյալը՝ action.js-ով),
                PartnerCtaWrapper.jsx ('use client', միայն pathname-ով թաքցնում ա /contact-ում),
                PartnerCta.module.css   (Vahram, §6)

lib/
  axios.js                     axios instance (ՉԵՍ ՓՈԽՈՒՄ)
  lang.js                      displayLang() — լեզուն cookie-ից (ՉԵՍ ՓՈԽՈՒՄ)

public/images/<բաժին>/         Նկարներ (db-ում գրվում ա `/images/...`)
public/images/products/test/   Ժամանակավոր test նկարներ ապրանքների համար (§9.1)
```

## 4. Կոդի կանոններ

1. **Ամեն route-ն ունի իր `actions.js`-ը.** Ընդհանուր `api.js` չկա — շատ ենք, ընդհանուր ֆայլը = անընդհատ conflict։
2. **Տվյալը միայն axios-ով**, `actions.js`-ից։ Component-ում `import data from '...json'` **չկա**։
3. **Page-ի component-ները՝ `_components/`**-ում (underscore-ով, որ Next.js-ը route չհամարի)։ Global-ները՝ `components/`-ում։
4. **Ամեն component-ն ունի իր `.module.css`-ը**, class-երը camelCase։ Tailwind / inline style չկա։
5. **Գույն / spacing / radius / font-size՝ միայն CSS variable-ից** (`var(--color-green)`, `var(--space-md)`), պատահական թվեր չկան։ Նոր variable պետք ա՝ ասա Vahe-ին։
6. **Server Component default ա.** `'use client'` դնում ես միայն եթե պետք ա `useState`, `onClick` և այլն (տես `ContactForm.jsx`, `Langs.jsx`)։
7. **Տեքստ կոդի մեջ hardcode չկա.** Ամեն տեքստ, որ էջում երևում ա, գալիս ա db-ից՝ ճիշտ լեզվով։
8. Code style (ESLint). առանց `;`, single quotes `'...'`, `const`/`let` (ոչ `var`), `===`։
9. **Ուրիշի ֆայլերին չես դիպչում** (տես §6 աղյուսակը)։ Եթե պետք ա ընդհանուր ֆայլ փոխել (`layout.jsx`, `globals.css`, `lib/*`, `package.json`)՝ նախ գրիր Vahe-ին։
10. **Լեզուն միշտ `displayLang()`-ով** (`lib/lang.js`), ոչ թե `document.cookie`-ից։ Տվյալը, եթե հնարավոր ա, բեր server-ում (page.jsx / Server Component), ոչ թե `useEffect`-ով։
11. **Նկար, alt, aria-label՝ նույնպես db-ից**, երեք լեզվով (օրինակ slider-ի «Նախորդ նկարը» / «Предыдущее фото» / «Previous image»)։
12. **Figma-ն նայիր ամբողջությամբ.** desktop (1440) + mobile (375) frame-երը և **ui-kit** բաժինը, որտեղ կոճակների default/hover վիճակներն են։ Մեկ տեքստի մեջ կարող են լինել տարբեր weight/գույներ, ստուգիր տեքստի տարբեր մասերը։
13. **Header-ը fixed ա (~67px).** Էջի առաջին բաժինը պետք ա ունենա իր վերևի padding-ը, որ բովանդակությունը header-ի տակ չմնա (տես `geography/_components/Intro.module.css`)։
14. **actions-ը չպետք ա «գցեն» էջը.** API-ն չաշխատելու դեպքում վերադարձրու `null` / `[]` (`try/catch`), իսկ component-ը այդ դեպքում պարզապես ոչինչ չի ցույց տալիս։

### CSS token-ներ (`app/globals.css`)

Բոլոր արժեքները Figma-ից են։ Վերջերս ավելացածները.

| Token | Արժեք | Ինչի համար |
|---|---|---|
| `--space-6` | 6px | կոճակի տեքստի ու սլաքի արանք |
| `--space-18` | 18px | Partner CTA-ի արանքներ |
| `--color-white` | #ffffff | սպիտակ տեքստ/ֆոն |
| `--color-surface` | #f5f5f5 | Geography-ի քարտեզի ֆոն |
| `--color-green-hover` | #0d5030 | hover-ի մուգ կանաչ եզր |
| `--font-size-22` / `-30` / `-33` | 22 / 30 / 33px | Figma-ի չափեր, որոնց համար token չկար |

Կոճակների hover-ը (Figma ui-kit). լցված կանաչ կոճակ՝ `--color-green-dark` → hover `--color-green`, սլաքը 7px աջ։ Եզրով կոճակ (CTA)՝ hover-ին սպիտակ ֆոն, կանաչ տեքստ։ «Դիտել բաղադրությունը»՝ hover-ին `--color-mint` ֆոն, `--color-green-hover` եզր։

### Նոր էջի template

```
app/about/
  actions.js
  page.jsx
  page.module.css
  _components/
    Faq.jsx
    Faq.module.css
```

```js
// app/about/actions.js
import axios from '@/lib/axios'

export async function getFaq(lang) {
  const res = await axios.get(`faq?lang=${lang}`)
  return res.data
}
```

```jsx
// app/about/page.jsx
import { displayLang } from '@/lib/lang'
import { getFaq } from './actions'
import Faq from './_components/Faq'
import styles from './page.module.css'

export default async function AboutPage() {
  const lang = await displayLang()
  const faq = await getFaq(lang)

  return (
    <div className={`container ${styles.page}`}>
      <Faq data={faq} />
    </div>
  )
}
```

## 5. Քո `db.json`-ը

### 5.1 Ինչպես ա կազմակերպված

| Ֆայլ | Ում ա | git-ում կա՞ | Ինչ ես անում |
|---|---|---|---|
| `db_orinak_example` | Ընդհանուր | ✅ | **Չես փոխում.** Միայն copy ես անում |
| `db.json` | Քո լոկալը | ❌ (`.gitignore`) | Ազատ փոխում ես, ավելացնում, փորձարկում |
| `db_parts/<անուն>.json` | Քոնը | ✅ | Միայն **քո նոր** collection-ները, Vahe-ին ուղարկելու համար |

Ինչու այսպես. եթե ամբողջ թիմը նույն `db.json`-ը փոխեն ու push անեն, ամեն PR-ում conflict կլինի։ Այս ձևով ամեն մեկը գրում ա միայն իր ֆայլը, իսկ Vahe-ն ինտեգրման ժամանակ դրանք միացնում ա `db_orinak_example`-ի մեջ։

### 5.2 Քայլերով

1. `cp db_orinak_example db.json` (եթե դեռ չես արել)
2. Նայիր՝ քո բաժնի collection-ը **արդեն կա՞** օրինակում։ Հիմա կան՝ `logos`, `languages`, `navbars`, `header_labels`, `footer_labels`, `categories`, `products`, `product_page_labels`, `tags`, `tag_icons`, `homepage_hero`, `philosophy_headings`, `philosophy_text`, `faq`, `faq_heading`, `faq_small`, `stats`, `brands`, `about_intro`, `export_cooperation`, `our_factory`, `we_believe`, `export_countries`, `geography_contents`, `partner_cta`, `contact_page_contents`, `contact_info`, `contact_messages`։ Եթե կա՝ օգտագործիր նույն անունն ու field-երը, ու ստուգիր, որ կոդում field-երի անունները **ճիշտ նույնն** են, ինչ db-ում։
   Նոր տողեր ավելացնելիս `id`-ները **չպետք ա կրկնվեն** արդեն եղածների հետ։
3. Նոր collection-ը / նոր տողերը ավելացրու **քո `db.json`**-ում ու աշխատիր դրանով (`npm run dev` ավտոմատ կտեսնի փոփոխությունը)
4. Երբ պատրաստ ես՝ **միայն քո նոր/փոխված collection-ները** copy արա `db_parts/<անուն>.json`-ի մեջ, օրինակ `db_parts/saten.json`.

```json
{
  "faq": [
    { "id": 1, "lang": "am", "question": "...", "answer": "..." },
    { "id": 2, "lang": "ru", "question": "...", "answer": "..." },
    { "id": 3, "lang": "en", "question": "...", "answer": "..." }
  ]
}
```

5. Եթե **արդեն գոյություն ունեցող** collection ես փոխել (օրինակ field ես ավելացրել `products`-ին)՝ PR-ի նկարագրության մեջ **պարտադիր գրիր**, թե ինչ ես փոխել։

### 5.3 db-ի ձևաչափի կանոններ

1. Collection-ի ու field-ի անուն՝ **snake_case** (`category_slug`, `export_countries`), ոչ `categorySlug`
2. **Ամեն լեզու՝ առանձին տող** իր `"lang": "am" | "ru" | "en"`-ով։ `{ "am": "...", "ru": "..." }` object **չկա**։ Բոլոր 3 լեզուները պարտադիր են։
3. `id`-ն ամեն collection-ում **եզակի** ա (json-server-ը id-ով ա աշխատում)
4. `slug` / `code`՝ lowercase kebab-case (`dried-fruits`), նույնը բոլոր 3 լեզուների տողերում
5. Nested array-ի ներսը (`variants`, `social_links`) արդեն plain string ա, որովհետև ամբողջ տողը մեկ լեզվով ա
6. Նկար՝ `public/images/<բաժին>/file.jpg`, db-ում գրվում ա `"/images/<բաժին>/file.jpg"`
7. Ֆիլտր՝ `GET /products?lang=am&category_slug=dried-fruits` (2 ֆիլտրը՝ AND)
8. Նոր collection = պարզապես նոր key JSON-ում, json-server-ը ինքն ա endpoint ստեղծում

Մեկ տող collection-ի օրինակ (`about_intro`, `contact_page_contents`)՝ actions-ում վերադարձնում ես `res.data[0]`։

## 6. Ով ինչ ա անում

Ստորև՝ նախագծի վերջնական Information Architecture-ը (IA & Routes), ըստ բոլոր էջերի, բաժինների ու պատասխանատուների։ Folder-ի սյունակը ցույց ա տալիս, թե կոնկրետ որ ֆայլում ա գրվում այս section-ը (already ստեղծված են որպես դատարկ skeleton-ֆայլեր)։

| Էջ / Section | Ով | Folder | Route |
|---|---|---|---|
| Team lead / review / ինտեգրում | Vahe | ամբողջ repo | `main` |
| Backend (Django, հետագայում) | Narek | `../backend/` | — |
| Header + Footer | Vahag | `components/header/*`, `components/footer/*` | ընդհանուր |
| Home · Section 1 (Hero) | Vahag | `app/_components/Hero.jsx` | `/` |
| Home · Section 2 («Մեր տեսականին») | Ashot | `app/_components/Assortment.jsx` | `/` |
| Home · Section 3 (Փիլիսոփայություն) + Section 4 (FAQ) | Saten | `app/_components/Philosophy.jsx`, `app/_components/Faq.jsx` | `/` («Կարդալ ավելին» → `/about-us`) |
| Համագործակցության CTA (**բոլոր էջերում, բացի `/contact`**) | Vahram | `components/partner-cta/PartnerCta.jsx` + `PartnerCtaWrapper.jsx` | ամբողջ site (→ `/contact`), բացի `/contact`-ից |
| Կատալոգ (3 էջ) | Elina | `app/catalog/*` | `/catalog`, `/catalog/dried-fruits`, `/catalog/chocolate-covered` |
| Ապրանքի մանրամասն էջ | Vahe | `app/products/[productSlug]/*` | `/products/[slug]` |
| About Us · Section 1–3 (Բնական որակ, Փիլիսոփայություն, Ապրանքանիշեր) | Milena | `app/about-us/_components/NaturalQuality.jsx`, `Philosophy.jsx`, `Brands.jsx` | `/about-us` |
| About Us · Section 4–6 (Արտադրություն, Վստահություն, Որակ ու բնականություն) | Hamlet | `app/about-us/_components/Production.jsx`, `WhyTrustUs.jsx`, `QualityNaturalness.jsx` | `/about-us` |
| About Us · Section 7–9 (Արտահանում, Գործարան, «Մենք հավատում ենք») | Jor | `app/about-us/_components/ExportCooperation.jsx`, `OurFactory.jsx`, `WeBelieve.jsx` | `/about-us` |
| Աշխարհագրություն | Sergey | `app/geography/*` | `/geography` |
| Կապ | Vahram | `app/contact/*` | `/contact` |

Եթե 2+ հոգի նույն folder-ում են (օրինակ `app/about-us` կամ Home page-ը)՝ ամեն մեկը գրում ա **իր առանձին component-ը** `_components/`-ում, իսկ `page.jsx`-ում ընդհամենը import ա անում։ `page.jsx`-ում conflict-ը Vahe-ն ա լուծում ինտեգրման ժամանակ։ Ամեն մեկն իր section-ի համար db collection(-ներ)ը ինքն ա որոշում ու ավելացնում իր `db.json`-ում, §5-ի կանոններով։

**Catalog → Product-ի կապը (Elina ↔ Vahe).** Elina-ի catalog-ի ProductCard-ը (`Link href="/products/..."`) տանում ա ապրանքի էջին, բայց կարևոր ա, թե **ինչո՞վ** է link-ը կառուցվում.
- `db_orinak_example`-ում ապրանքի `id`-ն **լեզվով ա տարբերվում** (նույն ապրանքը am-ում ունի, ասենք, `id: 1`, ru-ում՝ `id: 2`), մինչդեռ `slug`-ը (`shokoladapatat-chrer-230`) **նույնն ա բոլոր լեզուներում**։
- Ուրեմն Elina-ի Link-ը պիտի կառուցվի **`slug`-ով, ոչ թե `id`-ով** (`/products/${product.slug}`), հակառակ դեպքում լեզուն փոխելիս (cookie) նույն ապրանքի URL-ը կփոխվի ու կխափանվի (նույն սկզբունքով, ինչով `/catalog/[categorySlug]`-ն ա category_slug-ով, ոչ թե id-ով)։
- `app/products/[productSlug]/actions.js`-ում `getProduct()`-ը փնտրում ա db-ում **`slug`-ով** (զտելով `lang`-ով), ոչ թե numeric `id`-ով (`products?slug=...&lang=...`)։

**PartnerCta-ի մասին (Vahram) — պատրաստ ա։** Երևում ա **բոլոր էջերում, բացի `/contact`**-ից, դրա համար դրված ա մեկ տեղում՝ `app/layout.jsx`-ում.
- `components/partner-cta/PartnerCta.jsx`-ը **Server Component** ա. լեզուն վերցնում ա `displayLang()`-ով, տվյալը՝ `action.js`-ի `getPartnerCta(lang)`-ով (`partner_cta` collection)։ Այդպես CTA-ն էջի հետ միասին ա երևում, ոչ թե բեռնվելուց հետո։
- `PartnerCtaWrapper.jsx`-ը `'use client'` ա միայն `usePathname()`-ի համար. `/contact`-ում վերադարձնում ա `null`, մնացած էջերում՝ իր `children`-ը։
- `layout.jsx`-ում.

```jsx
import PartnerCta from '@/components/partner-cta/PartnerCta'
import PartnerCtaWrapper from '@/components/partner-cta/PartnerCtaWrapper'
// ...
<main className="main-content">{children}</main>
<PartnerCtaWrapper>
  <PartnerCta />
</PartnerCtaWrapper>
<Footer />
```

```jsx
// components/partner-cta/PartnerCtaWrapper.jsx
'use client'

import { usePathname } from 'next/navigation'

export default function PartnerCtaWrapper({ children }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/contact')) {
    return null
  }

  return children
}
```

(Server Component-ը client component-ի մեջ կարելի ա դնել միայն `children`-ով, ոչ թե client ֆայլի ներսում import անելով։)

## 7. Git — ինչպես աշխատել ու ուղարկել

### 7.1 Սկիզբ (մեկ անգամ)

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood/frontend
git checkout main
git pull origin main
git checkout -b feature/<անուն>-<task>     # օրինակ՝ feature/saten-faq
```

Հիմա դու քո branch-ում ես։ Ստուգել՝ `git branch` (աստղանիշով նշվածը քոնն ա)։

### 7.2 Ամեն օր աշխատելիս

```bash
git status                          # ինչ ես փոխել
git add app/about db_parts/saten.json public/images/about
git commit -m "faq: add accordion component"
git push -u origin feature/saten-faq   # առաջին push-ը, հետո ուղղակի `git push`
```

- `git add .`-ից **խուսափիր**, add արա միայն քո ֆայլերը
- Commit-ը՝ փոքր ու հաճախ, հասկանալի message-ով
- **Ամեն օր գոնե մեկ push**, որ աշխատանքը չկորչի

### 7.3 `main`-ի նորությունները քեզ բերել

Երբ Vahe-ն ինչ-որ բան merge ա անում `main`-ում (օրինակ թարմացնում ա `db_orinak_example`-ը), քեզ պետք ա բերել.

```bash
git fetch origin
git merge origin/main
```

Այս հրամանները աշխատեցրու քո feature branch-ում․ կմնաս նույն branch-ում և կշարունակես այնտեղ աշխատել։

Եթե `db_orinak_example`-ը փոխվել ա՝ նորից `cp db_orinak_example db.json` ու քո `db_parts/<անուն>.json`-ի collection-ները նորից ավելացրու `db.json`-ում։

Conflict եղավ ու չգիտես ինչ անել՝ **մի ջնջիր ուրիշի կոդը**, գրիր Vahe-ին։

### 7.4 Ուղարկել Vahe-ին (Pull Request)

Push-ից առաջ պարտադիր.

```bash
npm run lint:fix
npm run build
```

Երկուսն էլ **առանց error** պետք ա անցնեն (build-ի ժամանակ `npm run dev`-ը/json-server-ը պետք ա միացած լինի)։

Հետո.
1. `git push`
2. GitHub-ում բաց արա repo-ն → **Compare & pull request**
3. **base:** `main` ← **compare:** `feature/<անուն>-<task>`
4. Վերնագիր՝ `[Saten] FAQ section`
5. Նկարագրություն (copy արա ու լրացրու).

```markdown
## Ինչ եմ արել
- ...

## Ֆայլեր
- app/about/_components/Faq.jsx
- db_parts/saten.json

## db
- Նոր collection-ներ: faq
- Փոխված գոյություն ունեցող collection-ներ: չկա / (ինչ ու ինչու)

## Ստուգում
- [ ] npm run lint:fix — OK
- [ ] npm run build — OK
- [ ] ստուգել եմ am / ru / en
- [ ] screenshot-ը կցված ա
```

6. **Reviewer**՝ Vahe
7. **Ինքդ merge մի արա.** Vahe-ն review ա անում.
   - եթե comment ա գրել՝ ուղղում ես **նույն branch-ում**, `commit` + `push`, PR-ը ինքն ա թարմանում (նոր PR մի բաց)
   - եթե ամեն ինչ OK ա՝ Vahe-ն merge ա անում `main`-ի մեջ ու `db_parts/<անուն>.json`-ը միացնում `db_orinak_example`-ին

Merge-ից հետո նոր task-ի համար՝ նորից §7.1 (`main`-ից **նոր** branch)։

### 7.5 Ինչ ՉԻ կարելի

- ❌ `git push origin main`
- ❌ `git push --force`
- ❌ commit անել `db.json`, `.env.local`, `node_modules` (ու **երբեք** `git add -f`)
- ❌ commit անել փորձնական ֆայլեր (test նկարներ, screenshot-ներ) կամ `package-lock.json`, եթե package չես ավելացրել
- ❌ փոխել `db_orinak_example`, `lib/*`, `package.json`, `layout.jsx`, `globals.css`՝ առանց Vahe-ին հարցնելու
- ❌ `npm install <package>` առանց հարցնելու (`package-lock.json`-ի conflict)

## 8. Ինտեգրում Django-ի հետ (նախագծի վերջում)

1. Narek-ը Django model-երը գրում ա **ուղիղ `db_orinak_example`-ի collection-ների ու field-երի անուններով** (collection = model, field = column, `lang` = language column)
2. REST endpoint-ները կրկնում են նույն query pattern-ը (`?lang=am&category_slug=...`)
3. `.env.local`-ում `NEXT_PUBLIC_API_URL`-ը փոխվում ա Django-ի հասցեին
4. Component-ները և `actions.js`-երը **չեն փոխվում**

## 9. Ինչ դեռ չկա

- About Us · Section 1–6 (Milena, Hamlet). մինչ այդ `about-us/page.module.css`-ում ժամանակավոր padding կա header-ի համար
- Home · «Մեր տեսականին» (Ashot)
- Իրական լուսանկարներ. factory (`about-us/factory-1.jpg`-ը placeholder ա), Philosophy slider-ի 3 slide-ը նույն լուսանկարն են (`philosophy_text.images`), Hero-ի նկարը (`homepage/hero.png`)
- Ապրանքների իրական համերն ու նկարները (տես §9.1)
- Language switcher-ի design-ը
- `not-found.jsx`, `error.jsx`-ի տեքստերը՝ hardcode, ոչ multi-language

### 9.1 Ապրանքների test համերն ու նկարները

Բոլոր 18 ապրանքի էջերը կառուցված են `products/shokoladapatat-chrer-230`-ի պես. 3 նկարով gallery, համեր, tag-եր, նկարագրություն, բաղադրություն։ 230գ-ն ունի իրական համեր ու նկարներ, մնացածը՝ **test**.

| Ինչ | Որտեղ | Չափ |
|---|---|---|
| Համի փոքր նկար | `variants[].image` → `/images/products/test/<slug>-taste-N.jpg` | 400×400 |
| Համի մեծ (տուփի) նկար | `variants[].box_image` → `/images/products/test/<slug>-box-N.webp` | 1200×1200 |
| Gallery-ի 2-րդ, 3-րդ նկար | `images[1..2]` → `/images/products/test/<slug>-gallery-2/3.jpg` | 1600×1067 |
| Համի անուն | `variants[].flavor` | «Համ N» / «Вкус N» / «Taste N», որտեղ իրականը հայտնի չէր |

Համ ընտրելիս gallery-ի առաջին նկարը դառնում ա այդ համի `box_image`-ը։ Կատալոգի «N ՀԱՄ»-ը գալիս ա `tastes_count`-ից։ Իրական տվյալները ստանալուց հետո (կամ admin-ից) փոխում ես միայն `flavor`, `image`, `box_image`, `images` դաշտերը, իսկ `public/images/products/test/` folder-ը կարելի ա ջնջել։

## 10. `db.json`-ի կարճ օրինակ

Սա **ամբողջական `db_orinak_example`-ի կրճատ տարբերակն ա** (մի քանի collection, յուրաքանչյուրում ընդամենը 2-3 տող)՝ պարզապես ցույց տալու ֆորմատը։ Իսկական, ամբողջական տվյալների համար բացիր հենց `db_orinak_example`-ը։

```json
{
  "logos": { "id": 1, "title": "Fruit Food" },
  "languages": [
    { "id": 1, "code": "am", "label": "Հայ" },
    { "id": 2, "code": "ru", "label": "Рус" },
    { "id": 3, "code": "en", "label": "Eng" }
  ],
  "navbars": [
    { "id": 1, "lang": "am", "title": "Գլխավոր", "url": "/" },
    { "id": 2, "lang": "en", "title": "Home", "url": "/" }
  ],
  "categories": [
    { "id": 1, "lang": "am", "slug": "dried-fruits", "name": "Չրեր և չրային պաստեղներ", "image": "/images/categories/dried-fruits.jpg" },
    { "id": 2, "lang": "ru", "slug": "dried-fruits", "name": "Сухофрукты и фруктовая пастила", "image": "/images/categories/dried-fruits.jpg" },
    { "id": 3, "lang": "en", "slug": "dried-fruits", "name": "Dried fruits & fruit leathers", "image": "/images/categories/dried-fruits.jpg" }
  ],
  "products": [
    { "id": 1, "lang": "am", "slug": "chrer-200", "category_slug": "dried-fruits", "name": "Չրեր", "weight_value": 200, "weight_unit": "g" },
    { "id": 2, "lang": "en", "slug": "chrer-200", "category_slug": "dried-fruits", "name": "Dried fruits", "weight_value": 200, "weight_unit": "g" }
  ],
  "faq": [
    { "id": 1, "lang": "am", "question": "Արդյո՞ք ձեր արտադրանքը բնական է", "answer": "Այո, բացառապես բնական հումքից։" },
    { "id": 2, "lang": "ru", "question": "Ваша продукция натуральная?", "answer": "Да, только натуральное сырьё." },
    { "id": 3, "lang": "en", "question": "Are your products natural?", "answer": "Yes, exclusively natural ingredients." }
  ]
}
```

Ինչ նկատել այս օրինակից (§5.3-ի կանոնները գործողության մեջ)․ ամեն լեզու՝ **առանձին տող** (ոչ `{ "am": "...", "ru": "..." }`), `id`-ն եզակի ա ամբողջ collection-ում, `slug`/`code`-ը՝ **lowercase kebab-case** ու նույնը բոլոր լեզուների տողերում, իսկ collection/field անունները՝ **snake_case**։
