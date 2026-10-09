# Fruit Food — Frontend

> ⚠️ **ԿԱՐԴԱ ՍԿՍԵԼՈՒՑ ԱՌԱՋ**
> 1. Ուղիղ `main`-ի մեջ **ոչ ոք** commit/push չի անում։ Ամեն մարդ աշխատում ա **իր branch-ում** ու ուղարկում ա **Pull Request (PR)**։ Ինտեգրումը (merge դեպի `main`) անում ա միայն **Vahe**-ն։
> 2. Բոլոր տվյալները (տեքստեր, ապրանքներ, նկարներ) գալիս են **Django backend-ից** (`../backend`)։ json-server և `db.json` այլևս չկան։ Frontend-ը աշխատեցնելուց առաջ պետք ա միացած լինի backend-ը (§2)։
> 3. Տվյալները փոխվում են **Django admin-ից** (http://127.0.0.1:8000/admin/)։ Նոր collection կամ field պետք ա՝ գրիր Narek-ին (backend model)։ Մանրամասն՝ [§5](#5-տվյալները-django) և [§7](#7-git--ինչպես-աշխատել-ու-ուղարկել)։

Այս `frontend/` folder-ը պարունակում է գործող Next.js հավելվածը, route-երը, shared component-ները, տվյալների օրինակն ու asset-ները։ Նոր task սկսելիս նախ ստուգիր համապատասխան էջի և component-ի առկա կոդը, հետո պահպանիր §4-ի pattern-ները։ Django backend-ը գտնվում է repository-ի root-ում՝ `backend/` (տես `backend/README.md`)։

**Stack.** Next.js 16 (App Router) + React 19 · plain JavaScript (`.jsx`) · CSS Modules · axios · Django REST API (`../backend`)

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
Django REST API (../backend)              http://127.0.0.1:8000/api
```

- Ամեն collection = endpoint (`/api/products`, `/api/faq`, ...)
- Նկարները նույնպես backend-ից են գալիս՝ `http://127.0.0.1:8000/media/images/...` (`next.config.mjs`-ում թույլատրված ա)
- Ամեն տող ունի `lang` field, ֆիլտրվում ա query-ով՝ `products?lang=am`
- Լեզուն **cookie**-ում ա, ոչ URL-ում (`/catalog`, ոչ թե `/am/catalog`)
- API-ի հասցեն `.env.local`-ի `NEXT_PUBLIC_API_URL`-ն ա

## 2. Setup (առաջին անգամ)

Պետք ա՝ **Node.js 20+**, **Python 3.12+**, **Pipenv** և **git**։

**1. Backend (առաջին terminal)** — մանրամասն՝ `backend/README.md`

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood/backend
pipenv install
cp .env.example .env          # հետո լրացրու SECRET_KEY-ը
pipenv shell
python manage.py migrate
python manage.py load_sample  # բազան լցնում ա db_orinak_example-ից
python manage.py runserver    # http://127.0.0.1:8000
```

**2. Frontend (երկրորդ terminal)**

```bash
cd FruitFood/frontend
npm install
cp .env.example .env.local
npm run dev                   # http://localhost:3000 ← սա բաց արա browser-ում
```

Ստուգելու համար, որ API-ն աշխատում ա, բաց արա http://127.0.0.1:8000/api/products?lang=am

> Windows-ում `cp`-ի փոխարեն՝ `copy .env.example .env.local` և `copy .env.example .env`

Եթե էջը error ա տալիս կամ բաժինները դատարկ են՝ ամենահավանականն այն ա, որ backend-ը (`runserver`) միացած չի (նայիր terminal-ը)։ `.env.local`-ում գրիր `127.0.0.1`, ոչ թե `localhost`։

## 3. Folder structure

```
db_orinak_example              Sample տվյալներ. backend-ի `load_sample`-ը բազան սրանից ա լցնում (ՉԵՍ ՓՈԽՈՒՄ)
.env.example                   copy → .env.local
proxy.js                       /products/<slug>, /catalog/<slug>. slug-ը API-ում չկա → իրական 404 status (loading.jsx-ի պատճառով notFound()-ը 200 էր տալիս)

app/
  layout.jsx + actions.js      Root layout. logo / navbar / langs / footer-ի տվյալը այստեղ ա fetch արվում
  globals.css                  Գույներ, spacing, radius, font-size (CSS variables), .container
  page.jsx + page.module.css   Home
  fonts.js                     Noto Sans Armenian + Noto Sans (cyrillic). layout.jsx-ն ու global-error.jsx-ը սրանից են վերցնում
  loading.jsx / error.jsx / not-found.jsx   Ընդհանուր loading, error, 404
  global-error.jsx             Երբ սխալը հենց layout-ում ա (օր.՝ backend-ը միացած չի). նույն error.jsx-ն ա՝ սեփական <html>-ով
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
  image-slider/  ImageSlider.jsx + .module.css   Կայքի բոլոր slider-ները (‹ › սլաքներ, ներքևում dot-եր, swipe), §9.2

lib/
  axios.js                     axios instance (ՉԵՍ ՓՈԽՈՒՄ)
  lang.js                      displayLang() — լեզուն cookie-ից (ՉԵՍ ՓՈԽՈՒՄ)

public/images/<բաժին>/         Միայն UI պատկերակներ, որ կոդում են գրված (լոգո, սլաքներ, դրոշներ, քարտեզ)։ Բովանդակության բոլոր նկարները backend-ում են՝ `backend/media/images/` (admin-ից)
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

## 5. Տվյալները (Django)

### 5.1 Ինչպես ա կազմակերպված

| Որտեղ | Ինչ ա | Ինչ ես անում |
|---|---|---|
| Django admin (http://127.0.0.1:8000/admin/) | Իրական տվյալներն ու նկարները | Տեքստ փոխել, նկար upload անել |
| `backend/db.sqlite3` | Քո լոկալ բազան (git-ում չկա) | `python manage.py load_sample`-ով լցնում ես |
| `db_orinak_example` | Sample տվյալներ ամբողջ թիմի համար | **Չես փոխում** |

Admin-ում փոխածդ մնում ա միայն քո համակարգչում։ `load_sample`-ը բազան նորից լցնում ա `db_orinak_example`-ից ու **ջնջում ա** admin-ում արած փոփոխությունները։

### 5.2 Նոր տվյալ պետք ա

1. Նայիր՝ քո բաժնի collection-ը **արդեն կա՞**։ Հիմա կան՝ `logos`, `languages`, `navbars`, `header_labels`, `footer_labels`, `categories`, `products`, `product_page_labels`, `tags`, `tag_icons`, `homepage_hero`, `home_assortment`, `philosophy_headings`, `philosophy_text`, `faq`, `faq_heading`, `faq_small`, `stats`, `brands`, `about_intro`, `about_philosophy`, `about_philosophy_facts`, `about_page_labels`, `about_production`, `about_why_trust_us`, `about_showcase`, `about_quality_naturalness`, `export_cooperation`, `our_factory`, `we_believe`, `export_countries`, `geography_contents`, `partner_cta`, `contact_page_contents`, `contact_info`։ Եթե կա՝ օգտագործիր նույն անունն ու field-երը, ու ստուգիր, որ կոդում field-երի անունները **ճիշտ նույնն** են, ինչ db-ում։
2. Եթե կա՝ նոր տողերը ավելացրու admin-ից։
3. Եթե պետք ա **նոր collection կամ նոր field**՝ գրիր Narek-ին, թե ինչ field-եր են պետք (§5.3-ի ձևաչափով)։ Նա ավելացնում ա Django model-ը, admin-ը և endpoint-ը։
4. PR-ի նկարագրության մեջ **պարտադիր գրիր**, թե որ collection/field-երն ես օգտագործում կամ փոխել։

### 5.3 db-ի ձևաչափի կանոններ

1. Collection-ի ու field-ի անուն՝ **snake_case** (`category_slug`, `export_countries`), ոչ `categorySlug`
2. **Ամեն լեզու՝ առանձին տող** իր `"lang": "am" | "ru" | "en"`-ով։ `{ "am": "...", "ru": "..." }` object **չկա**։ Բոլոր 3 լեզուները պարտադիր են։
3. `id`-ն ամեն collection-ում **եզակի** ա (այն տալիս ա backend-ը)
4. `slug` / `code`՝ lowercase kebab-case (`dried-fruits`), նույնը բոլոր 3 լեզուների տողերում
5. Nested array-ի ներսը (`variants`, `social_links`) արդեն plain string ա, որովհետև ամբողջ տողը մեկ լեզվով ա
6. Նկարը upload ա արվում admin-ից, պահվում ա `backend/media/images/<բաժին>/`-ում, API-ն տալիս ա ամբողջական հասցե՝ `"http://127.0.0.1:8000/media/images/<բաժին>/file.jpg"`
7. Ֆիլտր՝ `GET /products?lang=am&category_slug=dried-fruits` (2 ֆիլտրը՝ AND)
8. Նոր collection = նոր Django model + endpoint (Narek)

Մեկ տող collection-ի օրինակ (`about_intro`, `contact_page_contents`)՝ actions-ում վերադարձնում ես `res.data[0]`։

## 6. Ով ինչ ա անում

Ստորև՝ նախագծի վերջնական Information Architecture-ը (IA & Routes), ըստ բոլոր էջերի, բաժինների ու պատասխանատուների։ Folder-ի սյունակը ցույց ա տալիս, թե կոնկրետ որ ֆայլում ա գրվում այս section-ը (already ստեղծված են որպես դատարկ skeleton-ֆայլեր)։

| Էջ / Section | Ով | Folder | Route |
|---|---|---|---|
| Team lead / review / ինտեգրում | Vahe | ամբողջ repo | `main` |
| Backend (Django) | Narek | `../backend/` | — |
| Header + Footer | Vahag | `components/header/*`, `components/footer/*` | ընդհանուր |
| Home · Section 1 (Hero) | Vahag | `app/_components/Hero.jsx` | `/` |
| Home · Section 2 («Մեր տեսականին») + Stats | Ashot | `app/_components/Assortment.jsx`, `app/_components/Stats.jsx` | `/` (քարտերը → `/catalog/<slug>`) |
| Home · Section 3 (Փիլիսոփայություն) + Section 4 (FAQ) | Saten | `app/_components/Philosophy.jsx`, `app/_components/Faq.jsx` | `/` («Կարդալ ավելին» → `/about-us`) |
| Համագործակցության CTA (**բոլոր էջերում, բացի `/contact`**) | Vahram | `components/partner-cta/PartnerCta.jsx` + `PartnerCtaWrapper.jsx` | ամբողջ site (→ `/contact`), բացի `/contact`-ից |
| Կատալոգ (3 էջ) | Elina | `app/catalog/*` | `/catalog`, `/catalog/dried-fruits`, `/catalog/chocolate-covered` |
| Ապրանքի մանրամասն էջ | Vahe | `app/products/[productSlug]/*` | `/products/[slug]` |
| About Us · Section 1–3 (Բնական որակ, Փիլիսոփայություն, Ապրանքանիշեր) | Milena | `app/about-us/_components/NaturalQuality.jsx`, `PhilosophyFacts.jsx`, `Brands.jsx` | `/about-us` |
| About Us · Section 4–6 (Արտադրություն, Վստահություն, Որակ ու բնականություն) | Hamlet | `app/about-us/_components/Production.jsx`, `WhyTrustUs.jsx`, `QualityNaturalness.jsx` | `/about-us` |
| About Us · Section 7–9 (Արտահանում, Գործարան, «Մենք հավատում ենք») | Jor | `app/about-us/_components/ExportCooperation.jsx`, `OurFactory.jsx`, `WeBelieve.jsx` | `/about-us` |
| Աշխարհագրություն | Sergey | `app/geography/*` | `/geography` |
| Կապ | Vahram | `app/contact/*` | `/contact` |

Եթե 2+ հոգի նույն folder-ում են (օրինակ `app/about-us` կամ Home page-ը)՝ ամեն մեկը գրում ա **իր առանձին component-ը** `_components/`-ում, իսկ `page.jsx`-ում ընդհամենը import ա անում։ `page.jsx`-ում conflict-ը Vahe-ն ա լուծում ինտեգրման ժամանակ։ Ամեն մեկն իր section-ի համար db collection(-ներ)ը ինքն ա որոշում ու §5-ի կանոններով գրում Narek-ին։

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
git add app/about
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

Եթե backend-ը փոխվել ա՝ `backend/`-ում աշխատեցրու `python manage.py migrate`, իսկ եթե `db_orinak_example`-ը փոխվել ա՝ նաև `python manage.py load_sample`։

Conflict եղավ ու չգիտես ինչ անել՝ **մի ջնջիր ուրիշի կոդը**, գրիր Vahe-ին։

### 7.4 Ուղարկել Vahe-ին (Pull Request)

Push-ից առաջ պարտադիր.

```bash
npm run lint:fix
npm run build
```

Երկուսն էլ **առանց error** պետք ա անցնեն (build-ի ժամանակ backend-ը (`runserver`) պետք ա միացած լինի)։

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

## db
- Օգտագործված collection-ներ: faq
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
   - եթե ամեն ինչ OK ա՝ Vahe-ն merge ա անում `main`-ի մեջ

Merge-ից հետո նոր task-ի համար՝ նորից §7.1 (`main`-ից **նոր** branch)։

### 7.5 Ինչ ՉԻ կարելի

- ❌ `git push origin main`
- ❌ `git push --force`
- ❌ commit անել `.env.local`, `backend/.env`, `db.sqlite3`, `node_modules` (ու **երբեք** `git add -f`)
- ❌ commit անել փորձնական ֆայլեր (test նկարներ, screenshot-ներ) կամ `package-lock.json`, եթե package չես ավելացրել
- ❌ փոխել `db_orinak_example`, `lib/*`, `package.json`, `layout.jsx`, `globals.css`՝ առանց Vahe-ին հարցնելու
- ❌ `npm install <package>` առանց հարցնելու (`package-lock.json`-ի conflict)

## 8. Ինտեգրում Django-ի հետ (արված ա)

1. Django model-երը կրկնում են **`db_orinak_example`-ի collection-ների ու field-երի անունները** (collection = model, field = column, `lang` = language column)
2. REST endpoint-ները կրկնում են նույն query pattern-ը (`/api/products?lang=am&category_slug=...`)
3. `.env.local`-ում `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api`
4. Component-ները և `actions.js`-երը **չեն փոխվել**
5. Նկարները գալիս են backend-ից. `next.config.mjs`-ում `images.remotePatterns`-ը թույլատրում ա `127.0.0.1:8000/media/**`։ Production-ում այնտեղ պետք ա ավելացնել իրական domain-ը

## 9. Ինչ դեռ չկա

- Իրական լուսանկարներ. բոլոր slider-ները հիմա test նկարներով են (§9.2), factory gallery-ն՝ `about-us/factory-1.jpg` placeholder
- Ապրանքների իրական համերն ու նկարները (տես §9.1)
- Language switcher-ի design-ը
- `not-found.jsx`, `error.jsx`-ի տեքստերը՝ hardcode, ոչ multi-language

### 9.1 Ապրանքների test համերն ու նկարները

Բոլոր 18 ապրանքի էջերը կառուցված են `products/shokoladapatat-chrer-230`-ի պես. 3 նկարով gallery, համեր, tag-եր, նկարագրություն, բաղադրություն։ 230գ-ն ունի իրական համեր ու նկարներ, մնացածը՝ **test**.

| Ինչ | Որտեղ | Չափ |
|---|---|---|
| Համի փոքր նկար | `variants[].image` → `/media/images/products/test/<slug>-taste-N.jpg` | 400×400 |
| Համի մեծ (տուփի) նկար | `variants[].box_image` → `/media/images/products/test/<slug>-box-N.webp` | 1200×1200 |
| Gallery-ի 2-րդ, 3-րդ նկար | `images[1..2]` → `/media/images/products/test/<slug>-gallery-2/3.jpg` | 1600×1067 |
| Համի անուն | `variants[].flavor` | «Համ N» / «Вкус N» / «Taste N», որտեղ իրականը հայտնի չէր |

Համ ընտրելիս gallery-ի առաջին նկարը դառնում ա այդ համի `box_image`-ը։ Ապրանքի էջի բոլոր նկարները (gallery, thumbnail-ներ, համերի քարտեր) **լրիվ լցնում են իրենց քարտը** (`object-fit: cover`), դատարկ եզրեր չկան, դրա համար իրական նկարները պետք ա լինեն առանց սպիտակ/թափանցիկ եզրերի (desktop-ում gallery-ն ~1:1 ա, mobile-ում ~4:3)։ Կատալոգի «N ՀԱՄ»-ը գալիս ա `tastes_count`-ից։ Իրական տվյալները ստանալուց հետո admin-ից փոխում ես միայն `flavor`, `image`, `box_image` դաշտերն ու ապրանքի «Product images» բլոկը, իսկ `backend/media/images/products/test/` folder-ը կարելի ա ջնջել։

### 9.2 Slider-ներ

Բոլոր slider-ները մեկ component են՝ `components/image-slider/ImageSlider.jsx` (props. `images=[{src, alt}]`, `labels={previous, next, navigation, slide}`, `sizes`, `preload`, `href`)։ Autoplay չկա։ Նկարները գալիս են API-ից (admin-ում փոխվում են).

| Բաժին | API դաշտ | Test նկար (`backend/media/images/test/`) |
|---|---|---|
| Home / Hero | `homepage_hero.slider` | `slide-square-1..3.jpg` |
| Home / Մեր տեսականին | `home_assortment.cards[].images` | `slide-landscape-1..3.jpg` |
| Home / Philosophy | `philosophy_text.images` | `slide-square-1..3.jpg` |
| About / Section 1 | `about_intro.slider` | `slide-wide-1..3.jpg` |
| About / Ապրանքանիշեր | `brands[].images` | `slide-landscape-1..3.jpg` |
| About / Production | `about_production.images` | `slide-landscape-1..3.jpg` |
| About / Showcase | `about_showcase.images` | `slide-wide-1..3.jpg` |
| About / Our Factory | `our_factory.slider` | `slide-square-1..3.jpg` |

Իրական նկարները ստանալուց հետո admin-ում փոխում ես միայն այս նկարները, իսկ `backend/media/images/test/`-ը կարելի ա ջնջել։

## 10. `db_orinak_example`-ի կարճ օրինակ

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
    { "id": 1, "lang": "am", "slug": "dried-fruits", "name": "Չրեր և չրային պաստեղներ", "image": "/media/images/categories/dried-fruits.jpg" },
    { "id": 2, "lang": "ru", "slug": "dried-fruits", "name": "Сухофрукты и фруктовая пастила", "image": "/media/images/categories/dried-fruits.jpg" },
    { "id": 3, "lang": "en", "slug": "dried-fruits", "name": "Dried fruits & fruit leathers", "image": "/media/images/categories/dried-fruits.jpg" }
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
