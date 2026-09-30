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

export async function getProductPageLabels(lang) {
  try {
    const currentLang = lang || (await displayLang());
    const res = await axios.get('product_page_labels', { params: { lang: currentLang } });
    return res.data[0] ?? {};
  } catch {
    return {};
  }
}