import "server-only";
import { cache } from "react";

const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

async function request(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      throw new Error(`API status ${response.status}`);
    }

    return await response.json();
  } catch {
    throw new Error(
      "পণ্যের তথ্য আনা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"
    );
  }
}

function list(data) {
  let items;

  if (Array.isArray(data)) {
    items = data;
  } else {
    items = data?.data;
  }

  if (!Array.isArray(items)) {
    throw new Error("API থেকে সঠিক তথ্য পাওয়া যায়নি।");
  }

  return items;
}

export const getProducts = cache(async function () {
  const data = await request("/products");

  return list(data);
});

export const getCategories = cache(async function () {
  const data = await request("/categories");

  return list(data);
});

export const getCategoryProducts = cache(async function (slug) {
  const category = encodeURIComponent(slug);

  const data = await request(`/products?category=${category}`);

  return list(data);
});

export const getProductBySlug = cache(async function (slug) {
  const products = await getProducts();

  const product = products.find(function (item) {
    return item.slug === slug || String(item.id) === slug;
  });

  return product || null;
});