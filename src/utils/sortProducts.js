import { toNumber, changeInfo } from "./formatPrice.js";

export function sortProducts(products, order = "default") {
  const result = [...products];

  if (order === "low") {
    result.sort(function (a, b) {
      return toNumber(a.today) - toNumber(b.today);
    });
  } else if (order === "high") {
    result.sort(function (a, b) {
      return toNumber(b.today) - toNumber(a.today);
    });
  }

  return result;
}

export function topMovers(products, dir) {
  const result = [];

  for (const product of products) {
    if (changeInfo(product).dir === dir) {
      result.push(product);
    }
  }

  result.sort(function (a, b) {
    const first = Math.abs(changeInfo(a).amount);
    const second = Math.abs(changeInfo(b).amount);

    return second - first;
  });

  return result.slice(0, 6);
}