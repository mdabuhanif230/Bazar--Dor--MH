import { toNumber, changeInfo } from "./formatPrice.js";

export function sortProducts(products, order = "default") {
  const result = [...products];

  if (order === "low") {
    result.sort(function (a, b) {
      const firstPrice = toNumber(a.today);
      const secondPrice = toNumber(b.today);

      return firstPrice - secondPrice;
    });
  } else if (order === "high") {
    result.sort(function (a, b) {
      const firstPrice = toNumber(a.today);
      const secondPrice = toNumber(b.today);

      return secondPrice - firstPrice;
    });
  }

  return result;
}

export function topMovers(products, dir) {
  const selectedProducts = [];

  for (const product of products) {
    const change = changeInfo(product);

    if (change.dir === dir) {
      selectedProducts.push(product);
    }
  }

  selectedProducts.sort(function (a, b) {
    const firstChange = Math.abs(changeInfo(a).amount);
    const secondChange = Math.abs(changeInfo(b).amount);

    return secondChange - firstChange;
  });

  return selectedProducts.slice(0, 6);
}