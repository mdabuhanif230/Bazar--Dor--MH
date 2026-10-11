const bengaliDigits = "০১২৩৪৫৬৭৮৯";

export function toNumber(value) {
  if (typeof value === "number") {
    if (Number.isFinite(value)) {
      return value;
    }

    return 0;
  }

  const text = String(value ?? "");
  let result = "";

  for (const character of text) {
    const digit = bengaliDigits.indexOf(character);

    if (digit !== -1) {
      result += digit;
    } else if (character >= "0" && character <= "9") {
      result += character;
    } else if (
      character === "." ||
      character === "+" ||
      character === "-"
    ) {
      result += character;
    }
  }

  const number = Number(result);

  if (Number.isFinite(number)) {
    return number;
  }

  return 0;
}

export function formatNumber(value, decimals = 0) {
  return toNumber(value).toLocaleString("bn-BD", {
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

  return {
    dir: dir,
    amount: amount,
    symbol: symbol,
    text: symbol + " " + formatNumber(Math.abs(amount), 1) + "%",
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
    const minimum = toNumber(market.min);
    const maximum = toNumber(market.max);

    if (minimum < min) {
      min = minimum;
    }

    if (maximum > max) {
      max = maximum;
    }

    total += (minimum + maximum) / 2;
  }

  return {
    min: min,
    max: max,
    average: total / markets.length,
  };
}