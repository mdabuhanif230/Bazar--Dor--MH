const bengaliDigits = "০১২৩৪৫৬৭৮৯";

export function toNumber(value) {
  if (typeof value === "number") {
    if (Number.isFinite(value)) {
      return value;
    }

    return 0;
  }

  const text = String(value ?? "");
  let normalized = "";

  for (const character of text) {
    const digitIndex = bengaliDigits.indexOf(character);

    if (digitIndex !== -1) {
      normalized += digitIndex;
    } else if (
      (character >= "0" && character <= "9") ||
      character === "." ||
      character === "+" ||
      character === "-"
    ) {
      normalized += character;
    }
  }

  const number = Number(normalized);

  if (Number.isFinite(number)) {
    return number;
  }

  return 0;
}

export function formatNumber(value, decimals = 0) {
  const number = toNumber(value);

  return number.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPrice(value) {
  return formatNumber(value) + " টাকা";
}

export function unitLabel(unit) {
  if (unit === "kg") {
    return "প্রতি কেজি";
  }

  if (unit === "litre" || unit === "liter") {
    return "প্রতি লিটার";
  }

  if (unit === "dozen") {
    return "প্রতি ডজন";
  }

  if (unit === "piece" || unit === "pcs") {
    return "প্রতি পিস";
  }

  return "প্রতি " + (unit || "একক");
}

export function changeInfo(product) {
  const amount = toNumber(product.change?.pct);
  let dir = product.change?.dir;

  if (!dir) {
    if (amount > 0) {
      dir = "up";
    } else if (amount < 0) {
      dir = "down";
    } else {
      dir = "flat";
    }
  }

  let symbol = "—";

  if (dir === "up") {
    symbol = "▲";
  } else if (dir === "down") {
    symbol = "▼";
  }

  const percentage = formatNumber(Math.abs(amount), 1);
  const text = symbol + " " + percentage + "%";

  return {
    dir,
    amount,
    symbol,
    text,
  };
}

export function marketSummary(markets = []) {
  if (markets.length === 0) {
    return null;
  }

  let min = Infinity;
  let max = -Infinity;
  let total = 0;

  for (const market of markets) {
    const minimumPrice = toNumber(market.min);
    const maximumPrice = toNumber(market.max);

    if (minimumPrice < min) {
      min = minimumPrice;
    }

    if (maximumPrice > max) {
      max = maximumPrice;
    }

    const middlePrice = (minimumPrice + maximumPrice) / 2;
    total += middlePrice;
  }

  const average = total / markets.length;

  return {
    min,
    max,
    average,
  };
}