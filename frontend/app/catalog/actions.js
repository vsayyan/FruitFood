import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

async function getDbData() {
  const filePath = path.join(process.cwd(), 'db.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

async function getLang() {
  const cookieStore = await cookies();
  return cookieStore.get('lang')?.value || 'am';
}

export async function getProducts() {
  const lang = await getLang();
  const data = await getDbData();

  return data.products.filter((product) => product.lang === lang);
}

export async function getProductsByCategory(categorySlug) {
  const lang = await getLang();
  const data = await getDbData();

  return data.products.filter(
    (product) => product.category_slug === categorySlug && product.lang === lang
  );
}

export async function getBreadcrumbItems(categorySlug = null) {
  const lang = await getLang();
  const data = await getDbData();

  const baseItems = data.breadcrumbs[lang] || data.breadcrumbs['am'];

  if (!categorySlug) {
    return baseItems;
  }

  const category = data.breadcrumbCategories.find((c) => c.slug === categorySlug);
  const categoryName = category?.name[lang] || category?.name['am'] || categorySlug;

  return [
    ...baseItems,
    { id: 3, label: categoryName, path: null }
  ];
}

export async function getCooperationCta() {
  const lang = await getLang();
  const data = await getDbData();
  const cta = data.cooperationCta;

  return {
    title: cta.title[lang] || cta.title.am,
    description: cta.description[lang] || cta.description.am,
    buttonText: cta.buttonText[lang] || cta.buttonText.am,
    buttonLink: cta.buttonLink
  };
}