# Բեքենդի գործարկում

**Ուշադրություն:** Նախագիծն աշխատացնելու համար պահանջվում է **Python 3.12** կամ ավելի նոր տարբերակ (Django 6.1.1-ի պահանջով)։ Նախագիծը կառավարվում է **Pipenv**-ով։

Գործարկելու համար տերմինալում հերթականությամբ կատարեք այս քայլերը.

```bash
cd backend
pipenv install
pipenv shell
python manage.py migrate
python manage.py runserver 8000