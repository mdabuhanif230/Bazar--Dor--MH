import "server-only";
import { cache } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function request(path) {
  const response = await fetch(BASE_URL + path, {
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    throw new Error(
      "পণ্যের তথ্য আনা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"
    );
  }

  return response.json();
}

function getList(data) {
  let items = data;

  if (!Array.isArray(data)) {
    items = data?.data;
  }

  if (!Array.isArray(items)) {
    throw new Error("API থেকে সঠিক তথ্য পাওয়া যায়নি।");
  }

  return items;
}

export const getProducts = cache(async function () {
  const data = await request("/products");

  return getList(data);
});

export const getCategories = cache(async function () {
  const data = await request("/categories");

  return getList(data);
});

export const getCategoryProducts = cache(async function (slug) {
  const category = encodeURIComponent(slug);
  const data = await request("/products?category=" + category);

  return getList(data);
});

export const getProductBySlug = cache(async function (slug) {
  const products = await getProducts();

  const product = products.find(function (item) {
    return item.slug === slug || String(item.id) === slug;
  });

  return product || null;
});