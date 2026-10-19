export function formatPeso(value: number): string {
  const rounded = Math.round(value);
  return "\u20B1" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const text =
      millions >= 10 && Number.isInteger(millions)
        ? String(millions)
        : millions.toFixed(1).replace(/\.0$/, "");
    return "\u20B1" + text + "M";
  }
  if (value >= 1000) return "\u20B1" + Math.round(value / 1000) + "K";
  return formatPeso(value);
}
