# Fruit Food — Frontend

> ⚠️ **ԿԱՐԴԱ ՍԿՍԵԼՈՒՑ ԱՌԱՋ**
> 1. Ուղիղ `main`-ի մեջ **ոչ ոք** commit/push չի անում։ Ամեն մարդ աշխատում ա **իր branch-ում** ու ուղարկում ա **Pull Request (PR)**։ Ինտեգրումը (merge դեպի `main`) անում ա միայն **Vahe**-ն։
> 2. `db_orinak_example`-ը **չես փոխում**։ Դա ընդհանուր օրինակ ա։ Ամեն մարդ իր համակարգչում ունի **իր սեփական `db.json`**-ը (git-ի մեջ չի գնում)։
> 3. Քո նոր տվյալները (collection-ները) ուղարկում ես առանձին ֆայլով՝ `db_parts/<քո-անուն>.json`։ Մանրամասն՝ [§5](#5-քո-dbjson-ը) և [§7](#7-git--ինչպես-աշխատել-ու-ուղարկել)։

Project-ի էջերի skeleton-ներն ու ընդհանուր ֆայլերը գտնվում են ստորև նշված տեղերում։ Որոշ էջեր արդեն իրականացված են, մյուսները դեռ ընթացքի մեջ են. յուրաքանչյուր էջի վիճակը նշված է §6 և §9 բաժիններում։ Նոր էջ կամ component ավելացնելիս պահպանիր §4-ի կոդի կանոններն ու տվյալների ստացման pattern-ը։

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
cd Fruit-Food
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

app/
  layout.jsx + actions.js      Root layout. logo / navbar / langs / footer-ի տվյալը այստեղ ա fetch արվում
  globals.css                  Գույներ, spacing, radius, font-size (CSS variables), .container
  page.jsx + page.module.css   Home
  loading.jsx / error.jsx / not-found.jsx   Ընդհանուր loading, error, 404
  sitemap.js / robots.js       SEO
  catalog/
    actions.js                 getCategories(), getProducts()
    page.jsx                   Ամբողջ արտադրանքը
    _components/ProductCard.jsx + .module.css
    [categorySlug]/
      actions.js               getCategory(), getProductsByCategory()
      page.jsx                 Կատեգորիայի էջ
  products/
    [productSlug]/
      actions.js               getProduct(slug, lang), getProductCategory(), getProductTags()
      page.jsx + page.module.css   Մեկ ապրանքի էջ (Arnak + Vahe (Teamlead), §6)
      _components/Gallery.jsx, Info.jsx, CompositionModal.jsx + .module.css
                                ապրանքի պատկերասրահ, տարբերակներ ու բաղադրության modal

  contact/
    actions.js                 getContactPageContent(), submitContact() (POST)
    page.jsx + page.module.css
    _components/ContactForm.jsx + .module.css   ('use client' օրինակ)

components/                    Global component-ներ (ամեն էջում են)
  header/  index.jsx, Logo.jsx, Navbar.jsx, Langs.jsx, Header.module.css
  footer/  index.jsx, Footer.module.css
  partner-cta/  PartnerCta.jsx, PartnerCtaWrapper.jsx ('use client', pathname-ով
                ստուգում ա /contact-ը), PartnerCta.module.css   (Vahram, §6)

lib/
  axios.js                     axios instance (ՉԵՍ ՓՈԽՈՒՄ)
  lang.js                      displayLang() — լեզուն cookie-ից (ՉԵՍ ՓՈԽՈՒՄ)

public/images/<բաժին>/         Նկարներ (db-ում գրվում ա `/images/...`)
```

## 4. Կոդի կանոններ

1. **Ամեն route-ն ունի իր `actions.js`-ը.** Ընդհանուր `api.js` չկա — 11 հոգի ենք, ընդհանուր ֆայլը = անընդհատ conflict։
2. **Տվյալը միայն axios-ով**, `actions.js`-ից։ Component-ում `import data from '...json'` **չկա**։
3. **Page-ի component-ները՝ `_components/`**-ում (underscore-ով, որ Next.js-ը route չհամարի)։ Global-ները՝ `components/`-ում։
4. **Ամեն component-ն ունի իր `.module.css`-ը**, class-երը camelCase։ Tailwind / inline style չկա։
5. **Գույն / spacing / radius / font-size՝ միայն CSS variable-ից** (`var(--color-green)`, `var(--space-md)`), պատահական թվեր չկան։ Նոր variable պետք ա՝ ասա Vahe-ին։
6. **Server Component default ա.** `'use client'` դնում ես միայն եթե պետք ա `useState`, `onClick` և այլն (տես `ContactForm.jsx`, `Langs.jsx`)։
7. **UI-ի տեքստը կոդի մեջ hardcode չի արվում.** Էջում երևացող վերնագրերը, կոճակները, aria-label-ները և պատկերների description-ները գալիս են տվյալների շտեմարանից՝ ճիշտ լեզվով։
8. Code style (ESLint). առանց `;`, single quotes `'...'`, `const`/`let` (ոչ `var`), `===`։
9. **Ուրիշի ֆայլերին չես դիպչում** (տես §6 աղյուսակը)։ Եթե պետք ա ընդհանուր ֆայլ փոխել (`layout.jsx`, `globals.css`, `lib/*`, `package.json`)՝ նախ գրիր Vahe-ին։

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

Ինչու այսպես. եթե 11 հոգի նույն `db.json`-ը փոխեն ու push անեն, ամեն PR-ում conflict կլինի։ Այս ձևով ամեն մեկը գրում ա միայն իր ֆայլը, իսկ Vahe-ն ինտեգրման ժամանակ դրանք միացնում ա `db_orinak_example`-ի մեջ։

### 5.2 Քայլերով

1. `cp db_orinak_example db.json` (եթե դեռ չես արել)
2. Նայիր՝ քո բաժնի collection-ը **արդեն կա՞** օրինակում (`faq`, `stats`, `export_countries`, `brands`, `about_intro` արդեն կան)։ Եթե կա՝ օգտագործիր նույն անունն ու field-երը։
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

5. Եթե **արդեն գոյություն ունեցող** collection ես փոխել՝ PR-ի նկարագրության մեջ **պարտադիր գրիր**, թե ինչ ես փոխել։ Product page-ի task-երի դեպքում `db_parts/<անուն>.json`-ի `products` դաշտում ներառիր տեղային `db.json`-ի **ամբողջ `products` collection-ը**, բոլոր ապրանքներով և լեզուներով, ոչ թե միայն փոփոխված ապրանքի տողերը։

### 5.3 db-ի ձևաչափի կանոններ

1. Collection-ի ու field-ի անուն՝ **snake_case** (`category_slug`, `export_countries`), ոչ `categorySlug`
2. **Ամեն լեզու՝ առանձին տող** իր `"lang": "am" | "ru" | "en"`-ով։ `{ "am": "...", "ru": "..." }` object **չկա**։ Բոլոր 3 լեզուները պարտադիր են։
3. `id`-ն ամեն collection-ում **եզակի** ա (json-server-ը id-ով ա աշխատում)
4. `slug` / `code`՝ lowercase kebab-case (`dried-fruits`), նույնը բոլոր 3 լեզուների տողերում
5. Nested array-ի ներսը (`variants`, `social_links`) արդեն plain string ա, որովհետև ամբողջ տողը մեկ լեզվով ա
6. Նկար՝ `public/images/<բաժին>/file.jpg`, db-ում գրվում ա `"/images/<բաժին>/file.jpg"`
7. Ֆիլտր՝ `GET /products?lang=am&category_slug=dried-fruits` (2 ֆիլտրը՝ AND)
8. Նոր collection = պարզապես նոր key JSON-ում, json-server-ը ինքն ա endpoint ստեղծում
9. **UI label-ներ** պահիր `product_page_labels`-ի նման collection-ում՝ յուրաքանչյուր լեզվի համար առանձին տողով։ Լեզվից անկախ icon-ները պահիր առանձին lookup collection-ում, օրինակ՝ `tag_icons` (`code`, `icon`)։ Component-ը ստանում է դրանք page-ի `actions.js`-ից, լեզվական բառարաններ կամ code-to-icon object-ներ component-ում չպետք է լինեն։

Product detail էջի label-ների օրինակ (`db.json`-ի `product_page_labels` collection-ից)․

```json
{
  "product_page_labels": [
    {
      "id": 1,
      "lang": "am",
      "home_label": "Գլխավոր",
      "catalog_label": "Տեսականի",
      "composition_eyebrow": "Բաղադրությունը",
      "close_button": "Փակել",
      "previous_image": "Նախորդ նկարը",
      "next_image": "Հաջորդ նկարը",
      "image_label": "Նկար",
      "sku_label": "Կոդ",
      "variants_label": "Համեր",
      "selected_label": "Ընտրված է",
      "composition_button": "Դիտել բաղադրությունը",
      "weight_unit": "Գ",
      "taste_unit": "համ"
    }
  ],
  "tag_icons": [
    { "id": 1, "code": "100_natural", "icon": "🌿" },
    { "id": 2, "code": "made_in_armenia", "icon": "🇦🇲" },
    { "id": 3, "code": "armenian_fruit", "icon": "🇦🇲" },
    { "id": 4, "code": "cocoa_62", "icon": "🍫" }
  ]
}
```

`product_page_labels`-ում նույն դաշտերը ավելացրու `ru` և `en` լեզուներով առանձին տողերում։ `tag_icons`-ում լեզու պետք չէ, քանի որ icon-ը լեզվից կախված չէ։

Մեկ տող collection-ի օրինակ (`about_intro`, `contact_page_contents`)՝ actions-ում վերադարձնում ես `res.data[0]`։

## 6. Ով ինչ ա անում

Ստորև՝ նախագծի Information Architecture-ը (IA & Routes), ըստ էջերի, բաժինների ու պատասխանատուների։ Folder-ի սյունակը ցույց է տալիս, թե որ ֆայլերում է իրականացվում համապատասխան section-ը. ֆայլերը կարող են լինել skeleton կամ արդեն ունենալ իրականացված բովանդակություն։

| Էջ / Section | Ով | Folder | Route |
|---|---|---|---|
| Team lead / review / ինտեգրում | Vahe | ամբողջ repo | `main` |
| Backend (Django, վերջում) | Narek | `/backend` | — |
| Header + Footer | Vahag | `components/header/*`, `components/footer/*` | ընդհանուր |
| Home · Section 1 (Hero) | Vahag | `app/_components/Hero.jsx` | `/` |
| Home · Section 2 («Մեր տեսականին») | Ashot | `app/_components/Assortment.jsx` | `/` |
| Home · Section 3 (Փիլիսոփայություն) + Section 4 (FAQ) | Saten | `app/_components/Philosophy.jsx`, `app/_components/Faq.jsx` | `/` (→ `/about-us#philosophy`) |
| Համագործակցության CTA (**բոլոր էջերում, բացի `/contact`**) | Vahram | `components/partner-cta/PartnerCta.jsx` + `PartnerCtaWrapper.jsx` | ամբողջ site (→ `/contact`), բացի `/contact`-ից |
| Կատալոգ (3 էջ) | Elina | `app/catalog/*` | `/catalog`, `/catalog/dried-fruits`, `/catalog/chocolate-covered` |
| Ապրանքի մանրամասն էջ | Arnak + Vahe | `app/products/[productSlug]/*` | `/products/[slug]` |
| About Us · Section 1–3 (Բնական որակ, Փիլիսոփայություն, Ապրանքանիշեր) | Milena | `app/about-us/_components/NaturalQuality.jsx`, `Philosophy.jsx`, `Brands.jsx` | `/about-us` |
| About Us · Section 4–6 (Արտադրություն, Վստահություն, Որակ ու բնականություն) | Hamlet | `app/about-us/_components/Production.jsx`, `WhyTrustUs.jsx`, `QualityNaturalness.jsx` | `/about-us` |
| About Us · Section 7–9 (Արտահանում, Գործարան, «Մենք հավատում ենք») | Jor | `app/about-us/_components/ExportCooperation.jsx`, `OurFactory.jsx`, `WeBelieve.jsx` | `/about-us` |
| Աշխարհագրություն | Sergey | `app/geography/*` | `/geography` |
| Կապ | Vahram | `app/contact/*` | `/contact` |

Եթե 2+ հոգի նույն folder-ում են (օրինակ `app/about-us` կամ Home page-ը)՝ ամեն մեկը գրում ա **իր առանձին component-ը** `_components/`-ում, իսկ `page.jsx`-ում ընդհամենը import ա անում։ `page.jsx`-ում conflict-ը Vahe-ն ա լուծում ինտեգրման ժամանակ։ Ամեն մեկն իր section-ի համար db collection(-ներ)ը ինքն ա որոշում ու ավելացնում իր `db.json`-ում, §5-ի կանոններով։

**Catalog → Product-ի կապը (Elina ↔ Arnak+Vahe).** Elina-ի catalog-ի ProductCard-ը (`Link href="/products/..."`) պիտի տանի Arnak+Vahe-ի էջին, բայց կարևոր ա, թե **ինչո՞վ** է link-ը կառուցվում.
- `db_orinak_example`-ում ապրանքի `id`-ն **լեզվով ա տարբերվում** (նույն ապրանքը am-ում ունի, ասենք, `id: 1`, ru-ում՝ `id: 2`), մինչդեռ `slug`-ը (`shokoladapatat-chrer-230`) **նույնն ա բոլոր լեզուներում**։
- Ուրեմն Elina-ի Link-ը պիտի կառուցվի **`slug`-ով, ոչ թե `id`-ով** (`/products/${product.slug}`), հակառակ դեպքում լեզուն փոխելիս (cookie) նույն ապրանքի URL-ը կփոխվի ու կխափանվի (նույն սկզբունքով, ինչով `/catalog/[categorySlug]`-ն ա category_slug-ով, ոչ թե id-ով)։
- `app/products/[productSlug]`-ի Arnak+Vahe-ը իրենց `actions.js`-ում `getProduct()`-ը պետք ա փնտրի db-ում **`slug`-ով** (զտելով `lang`-ով), ոչ թե numeric `id`-ով. `params.productSlug`-ը ուղղակի string ա, որով db-ում `.slug === params.productSlug` ես անում։

**PartnerCta-ի մասին (Vahram).** Սա այլևս Home-ի section չի՝ պետք ա երևա **բոլոր էջերում, բացի `/contact`**-ից, ուրեմն `page.jsx`-երից յուրաքանչյուրում առանձին import անելու փոխարեն դրվում ա մեկ տեղում՝ `app/layout.jsx`-ում (որ բոլոր էջերը wrap ա անում)։ Դրա համար.
- Component-ը գնում ա `components/` (global, ոչ թե `app/_components/`, քանի որ home-ին հատուկ չի)՝ `components/partner-cta/PartnerCta.jsx` + `.module.css`։
- Քանի որ `layout.jsx`-ը Server Component ա, իսկ ուր ես գտնվում (pathname) իմանալու համար պետք ա client-side ստուգում՝ ավելացրու `components/partner-cta/PartnerCtaWrapper.jsx` (`'use client'`), որը `usePathname()`-ով ստուգում ա, եթե `pathname.startsWith('/contact')` ա՝ վերադարձնում `null`, հակառակ դեպքում՝ `<PartnerCta />`։
- `layout.jsx`-ը **ընդհանուր ֆայլ ա** (§4, կանոն 9) — Vahram ինքը չի փոխում, այլ իր branch-ում գրում ա `components/partner-cta/*`-ը, PR-ի description-ում գրում ա, թե որ մեկ տողը (`<PartnerCtaWrapper />`) ու որտեղ (`{children}`-ից հետո/առաջ) պետք ա ավելացվի `layout.jsx`-ում, ու Vahe-ն ինտեգրման ժամանակ ինքն ա ավելացնում։
- Նոր folder ա (`components/partner-cta/`), ուրիշ տեղ ոչինչ avelacնելու պետք չի (`app/_components/PartnerCta.jsx`-ի հին տեղը հանվում ա)։

**Vahram-ի task-ը կոնկրետ.**
1. Գրիր `components/partner-cta/PartnerCta.jsx` — ինքը CTA-ի content-ը (տեքստը՝ db-ից, §4 կանոն 7)։
2. Գրիր `components/partner-cta/PartnerCtaWrapper.jsx` (սա wrapper-ն ա, պատրաստ կոդ, ուղղակի copy արա).

```jsx
// components/partner-cta/PartnerCtaWrapper.jsx
'use client'

import { usePathname } from 'next/navigation'
import PartnerCta from './PartnerCta'

export default function PartnerCtaWrapper() {
  const pathname = usePathname()

  if (pathname.startsWith('/contact')) {
    return null
  }

  return <PartnerCta />
}
```

3. `layout.jsx`-ին **ինքդ չես դիպչում** (ընդհանուր ֆայլ ա)։ PR-ի description-ում գրիր հստակ, թե Vahe-ն ինչ պիտի ավելացնի `layout.jsx`-ում.
```jsx
import PartnerCtaWrapper from '@/components/partner-cta/PartnerCtaWrapper'
// ...
<PartnerCtaWrapper />   // {children}-ից հետո, footer-ից առաջ
```
4. Եթե հին `app/_components/PartnerCta.jsx` արդեն ստեղծած ես եղել՝ ջնջիր, տեղափոխված ա `components/partner-cta/`-ի մեջ։

## 7. Git — ինչպես աշխատել ու ուղարկել

### 7.1 Սկիզբ (մեկ անգամ)

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd Fruit-Food
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
git checkout main
git pull origin main
git checkout feature/saten-faq
git merge main
```

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
- ❌ commit անել `db.json`, `.env.local`, `node_modules`
- ❌ փոխել `db_orinak_example`, `lib/*`, `package.json`, `layout.jsx`, `globals.css`՝ առանց Vahe-ին հարցնելու
- ❌ `npm install <package>` առանց հարցնելու (`package-lock.json`-ի conflict)

## 8. Ինտեգրում Django-ի հետ (նախագծի վերջում)

1. Narek-ը Django model-երը գրում ա **ուղիղ `db_orinak_example`-ի collection-ների ու field-երի անուններով** (collection = model, field = column, `lang` = language column)
2. REST endpoint-ները կրկնում են նույն query pattern-ը (`?lang=am&category_slug=...`)
3. `.env.local`-ում `NEXT_PUBLIC_API_URL`-ը փոխվում ա Django-ի հասցեին
4. Component-ները և `actions.js`-երը **չեն փոխվում**

## 9. Էջերի վիճակն ու Product detail page-ը

### 9.1 Product detail page (`/products/[productSlug]`)

Figma-ի Product Card-ի հղումից բացվող ապրանքի մանրամասն էջի հիմքը գտնվում է `app/products/[productSlug]/`-ում։ Էջի route-ը `/products/<slug>` է, իսկ ապրանքը ընտրվում է `products` collection-ից՝ `slug` և ակտիվ լեզվի `lang` դաշտերով։

- `actions.js`-ը բերում է ապրանքը, համապատասխան category-ն, tag-երի թարգմանությունները/icon-ները և էջի UI label-ները `axios`-ով։
- `page.jsx`-ը ստանում է լեզուն `displayLang()`-ից, հավաքում breadcrumb-ները, տվյալներ է փոխանցում Gallery-ին ու Info-ին, իսկ չգտնված ապրանքի դեպքում ցույց է տալիս 404-ը։
- `Gallery`-ը ցույց է տալիս հիմնական նկարները, thumbnail-ները և նախորդ/հաջորդ կառավարումը։
- `Info`-ը ցույց է տալիս ապրանքի անվանումը, քաշը, տարբերակների քանակն ու համերը, բնութագրիչ tag-երը և բաղադրությունը։
- `CompositionModal`-ը բացում է բաղադրության մանրամասները և փակվում է close կոճակով, ֆոնի սեղմումով կամ Escape-ով։
- Էջի ոճերը պահվում են component-ների կողքի CSS Module ֆայլերում, իսկ layout-ը հարմարեցված է նեղ էկրաններին։

Ներկայիս տեղային `db.json`-ում `shokoladapatat-chrer-230` ապրանքի համար կան երեք gallery image և հինգ flavor variant՝ հայերեն, ռուսերեն և անգլերեն տվյալներով։ Նկարները պահվում են `public/images/products/`-ում, իսկ JSON-ում նշվում են public path-երով, օրինակ՝ `/images/products/choco-chir-230-1.png`։ Նոր կամ փոփոխված տվյալները PR-ով փոխանցելու համար հետևիր §5-ի `db_parts/<անուն>.json` կանոնին. `db.json`-ը git չի ավելացվում։

Product detail-ի task-ի ժամանակ `db_parts/vahe-arnak-product-page.json`-ում պահիր տեղային `db.json`-ի ամբողջ `products` collection-ը, ինչպես նաև `product_page_labels` և `tag_icons` collection-ները։

Տեղային էջը բացելու համար գործարկիր `npm run dev` և այցելիր `http://localhost:3000/products/shokoladapatat-chrer-230`։ Այդ հրամանը միաժամանակ աշխատեցնում է Next.js-ը՝ port `3000`-ում, և json-server-ը՝ port `8000`-ում։ Եթե `db.json`-ը փոփոխելուց հետո API-ն հին տվյալներն է վերադարձնում, վերագործարկիր dev հրամանը, որպեսզի json-server-ը նորից կարդա ֆայլը։

### 9.2 Մյուս էջերի ընթացքը

- `about-us` և `geography` էջերը բաժանված են §6-ում նշված պատասխանատուների և component-ների միջև. յուրաքանչյուր section-ի ավարտը պետք է ստուգել իր route-ում։
- `components/header/Langs.jsx`-ի լեզու փոխող control-ը կարող է դեռ պահանջել ավարտում; նայիր հենց ֆայլի ընթացիկ վիճակին։
- Նկարները local public assets են. path-երը պետք է մատնանշեն առկա ֆայլեր։ Օգտագործիր սովորական `<img>`՝ համաձայն §4-ի նախագծային կանոնի։


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
