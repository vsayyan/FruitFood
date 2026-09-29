import { displayLang } from '@/lib/lang';
import axios from '@/lib/axios';

export async function getProducts(lang) {
  try {
    const currentLang = lang || (await displayLang());
    const res = await axios.get(`products?lang=${currentLang}`);
    return res.data;
  } catch {
    return [];
  }
}

export async function getProductsByCategory(categorySlug, lang) {
  try {
    const currentLang = lang || (await displayLang());
    const res = await axios.get(`products?category_slug=${categorySlug}&lang=${currentLang}`);
    return res.data;
  } catch {
    return [];
  }
}

export async function getBreadcrumbItems(categorySlug = null, lang) {
  try {
    const currentLang = lang || (await displayLang());
    
    const breadcrumbsRes = await axios.get(`breadcrumbs?lang=${currentLang}`);
    const breadcrumbsData = breadcrumbsRes.data;
    const baseItems = breadcrumbsData?.[currentLang] || breadcrumbsData?.['am'] || breadcrumbsData || [];

    if (!categorySlug) {
      return baseItems;
    }

    const categoriesRes = await axios.get('breadcrumbCategories');
    const categories = categoriesRes.data || [];

    const category = categories.find((c) => c.slug === categorySlug);

    let categoryName = categorySlug;
    if (category?.name) {
      if (typeof category.name === 'object') {
        categoryName = category.name[currentLang] || category.name['am'] || categorySlug;
      } else {
        categoryName = category.name;
      }
    }

    return [
      ...baseItems,
      { id: 3, label: categoryName, path: null }
    ];
  } catch (error) {
    return [];
  }
}


export async function getCooperationCta(lang) {
  try {
    const currentLang = lang || (await displayLang());
    const res = await axios.get('cooperationCta');
    const cta = res.data;
    return {
      title: cta.title[currentLang] || cta.title.am,
      description: cta.description[currentLang] || cta.description.am,
      buttonText: cta.buttonText[currentLang] || cta.buttonText.am,
      buttonLink: cta.buttonLink
    };
  } catch {
    return {};
  }
}

export async function getProductPageLabels(lang) {
  try {
    const currentLang = lang || (await displayLang());
    const res = await axios.get('product_page_labels', { params: { lang: currentLang } });
    return res.data[0] ?? {};
  } catch {
    return {};
  }
}