[English](README.md) · [Русский](README.ru.md) · **Հայերեն**

# Fruit Food

**Fruit Food**-ի կայքը։ Fruit Food-ը հայկական ընկերություն է, որ արտադրում է
բնական չրեր և շոկոլադապատ քաղցրավենիք։ Կայքը 3 լեզվով է (հայերեն, ռուսերեն,
անգլերեն) և ունի 7 բաժին. Գլխավոր, Կատալոգ (2 կատեգորիայով), ապրանքների
էջեր, Մեր մասին, Աշխարհագրություն և Կապ։

Ամբողջ բովանդակությունը (տեքստեր, ապրանքներ, նկարներ) պահվում է backend-ում
և փոխվում է Django admin-ից։ Frontend-ը միայն ցույց է տալիս այն։

## Ինչպես է աշխատում

```text
Browser ──► Next.js (frontend, :3000) ──axios──► Django REST API (backend, :8000/api) ──► SQLite
                                                        ▲
Django admin (:8000/admin) ─ տեքստեր, նկարների upload ──┘   նկարներ՝ backend/media, UI պատկերակներ՝ backend/base/static
```

| Մաս | Տեխնոլոգիա | Folder |
| --- | --- | --- |
| Frontend | Next.js 16 (App Router), React 19, JavaScript, CSS Modules, axios | [`frontend/`](frontend/README.hy.md) |
| Backend | Django 6.1, Django REST Framework, SQLite | [`backend/`](backend/README.hy.md) |
| Կապի ձև | EmailJS (նամակը ուղարկվում է անմիջապես browser-ից) | `frontend/app/contact/` |

- Լեզուն պահվում է `lang` cookie-ում (`am`, `ru`, `en`), էջերի հասցեները բոլոր
  լեզուներում նույնն են (`/catalog`, ոչ թե `/am/catalog`)։
- Ամեն էջ կառուցվում է server-ում ամեն բացելիս, ուստի admin-ում պահպանված
  փոփոխությունը կայքում երևում է անմիջապես, առանց rebuild-ի։
- `frontend/db_orinak_example`-ը sample տվյալներն են. `load_sample`-ը դրանով է
  լցնում նոր բազան։

## Repository-ի կառուցվածքը

```text
frontend/                 Next.js կայքը (էջեր, component-ներ, ոճեր)
  db_orinak_example       բազայի sample տվյալներ (35 collection, 3 լեզու)
backend/                  Django project
  base/                   settings, API-ի ընդհանուր կոդ, load_sample, test-եր
  base/static/images/     UI պատկերակներ (սլաքներ, մենյու, քարտեզ, պահեստային լոգո)
  media/images/           բովանդակության նկարներ (upload են արվում admin-ից)
  header/ footer/ product/ homepage/ about/ contact/ geography/   ամեն բաժնի համար մեկ app
```

## Ինչպես միացնել project-ը քո համակարգչում

Պետք են **Git**, **Node.js 20+**, **Python 3.12+** և **Pipenv**։

- macOS. `brew install node python pipenv` (Homebrew-ի Python-ի դեպքում
  Pipenv-ը տեղադրվում է `brew`-ով, ոչ թե `pip`-ով)։
- Windows. Node.js-ը և Python-ը տեղադրիր իրենց կայքերից, հետո
  `pip install pipenv`։ Ներքևում `cp`-ի փոխարեն գրիր `copy`։

### 1. Բեր կոդը

```bash
git clone https://github.com/vsayyan/FruitFood.git
cd FruitFood
```

### 2. Backend (առաջին terminal-ի պատուհան)

```bash
cd backend
pipenv install
cp .env.example .env
pipenv run python -c "from django.core.management.utils import get_random_secret_key as k; print(k())"
```

Տպված key-ը դիր `backend/.env`-ում որպես `SECRET_KEY=...`, հետո.

```bash
pipenv run python manage.py migrate
pipenv run python manage.py load_sample
pipenv run python manage.py createsuperuser
pipenv run python manage.py runserver
```

Այս պատուհանը բաց թող։ `createsuperuser`-ը կհարցնի username և password. դա
քո admin-ի մուտքն է։

### 3. Frontend (երկրորդ terminal-ի պատուհան)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 4. Բաց արա

| Ինչ | Հասցե |
| --- | --- |
| Կայքը | <http://localhost:3000> |
| Admin (բովանդակություն, նկարների upload) | <http://127.0.0.1:8000/admin/> |
| API (օրինակ) | <http://127.0.0.1:8000/api/products?lang=am> |

Եթե կայքը բացվում է, բայց բաժինները դատարկ են, backend-ը միացված չէ (քայլ 2)։
Կապի ձևի համար պետք են EmailJS-ի key-երը `frontend/.env.local`-ում. դրանք
տալիս է Վահեն, git-ում չեն պահվում։

## Ինչպես է աշխատում թիմը

### Կանոններ

1. **Ոչ ոք commit չի անում `main`-ում.** Աշխատիր քո branch-ում և բաց արա Pull
   Request։ Վահեն ստուգում է և merge անում։
2. Branch-ի անուններ. `feature/<ինչ>`, `fix/<ինչ>`, `docs/<ինչ>`, `chore/<ինչ>`։
3. Մեկ task = մեկ branch = մեկ PR։ PR-ում գրիր, թե ինչ է փոխվել և ինչպես
   ստուգել։
4. Երբեք commit չանես `.env`, `.env.local`, `db.sqlite3` կամ այլ գաղտնի
   ֆայլեր (դրանք `.gitignore`-ում են)։

### Նոր task սկսել

```bash
git checkout main
git pull origin main
git checkout -b feature/my-task
# ... աշխատանք ...
git add -A
git commit -m "Short description of the change"
git push origin feature/my-task
```

Հետո GitHub-ում բաց արա Pull Request դեպի `main`։

### Բերել վերջին փոփոխությունները

Երբ `main`-ում ինչ-որ նոր բան է merge արվել.

```bash
git checkout main
git pull origin main
cd backend
pipenv install
pipenv run python manage.py migrate
cd ../frontend
npm install
```

Հետո վերամիացրու երկու server-ն էլ։ `pipenv run python manage.py load_sample`-ը
աշխատեցրու միայն այն դեպքում, եթե փոխվել է `frontend/db_orinak_example`-ը.
**այն փոխարինում է քո լոկալ բազայի ամբողջ բովանդակությունը**, այդ թվում
admin-ում արած փոփոխությունները։

### Որտեղ ինչ փոխել

| Ուզում եմ փոխել… | Որտեղ |
| --- | --- |
| Տեքստ, ապրանք, նկար կամ թարգմանություն | Django admin (առանց կոդի) |
| Էջի դասավորություն, ոճ կամ component | `frontend/` ([frontend README](frontend/README.hy.md)) |
| Նոր դաշտ կամ collection | `backend/`. model + migration ([backend README](backend/README.hy.md)) |
| UI պատկերակ (սլաք, մենյու, քարտեզ) | `backend/base/static/images/` |

## Թիմը

| Ով | Մաս |
| --- | --- |
| Vahe | Team lead, review և ինտեգրում, ապրանքի էջ |
| Narek | Backend (Django) |
| Vahag | Header, footer, Գլխավորի Hero |
| Ashot | Գլխավոր. «Մեր տեսականին» և Stats |
| Saten | Գլխավոր. Փիլիսոփայություն և FAQ |
| Vahram | Համագործակցության CTA, Կապ էջ |
| Elina | Կատալոգ |
| Milena | Մեր մասին. բաժիններ 1–3 |
| Hamlet | Մեր մասին. բաժիններ 4–6 |
| Jor | Մեր մասին. բաժիններ 7–9 |
| Sergey | Աշխարհագրություն |

## Վիճակը

- Frontend-ն ու backend-ը պատրաստ են ու միացված իրար. կայքն ամբողջությամբ
  աշխատում է Django-ով։
- Նկարների մեծ մասը ժամանակավոր **test նկարներ** են «TEST n/3» նշանով. դրանք
  admin-ում փոխարինվում են իրական լուսանկարներով։
- Հաջորդ քայլերը (կոդից դուրս). իրական լուսանկարներ և ապրանքների տվյալներ,
  hosting և domain, backend-ի production կարգավորում (տես
  [backend README](backend/README.hy.md))։
