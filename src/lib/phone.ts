export function formatRuPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";

  let normalized = digits;
  if (normalized.startsWith("8")) {
    normalized = "7" + normalized.slice(1);
  } else if (!normalized.startsWith("7")) {
    normalized = "7" + normalized;
  }
  normalized = normalized.slice(0, 11);

  const p1 = normalized.slice(1, 4);
  const p2 = normalized.slice(4, 7);
  const p3 = normalized.slice(7, 9);
  const p4 = normalized.slice(9, 11);

  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (normalized.length >= 4) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

export function isValidRuPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"));
}
