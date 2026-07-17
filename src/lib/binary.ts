// ───────────────────────────────────────────────────────────────────────────
// Tiện ích nhị phân ↔ quẻ. Quy ước: lines[0] = đáy = LSB.
// ───────────────────────────────────────────────────────────────────────────
import type { Bit } from '@/types';

/** Đổi mảng hào (đáy→đỉnh) thành số nguyên, bit đáy = LSB. */
export function linesToValue(lines: Bit[]): number {
  return lines.reduce<number>((acc, bit, i) => acc + (bit << i), 0);
}

/** Đổi số nguyên thành mảng hào (đáy→đỉnh), độ dài `n` hào. */
export function valueToLines(value: number, n: number): Bit[] {
  const lines: Bit[] = [];
  for (let i = 0; i < n; i++) {
    lines.push(((value >> i) & 1) as Bit);
  }
  return lines;
}

/**
 * Chuỗi nhị phân hiển thị. Mặc định đọc từ ĐỈNH xuống ĐÁY (như viết số: MSB trái).
 * `topFirst = false` → đọc từ đáy lên (theo lối đếm hào truyền thống).
 */
export function linesToBinaryString(lines: Bit[], topFirst = true): string {
  const arr = topFirst ? [...lines].reverse() : [...lines];
  return arr.join('');
}

/**
 * Giá trị theo chiều đọc:
 *  - topFirst=false (mặc định, "đáy=LSB"): giá trị nhị phân chuẩn của app.
 *  - topFirst=true ("Leibniz đọc từ trên xuống"): đảo trật tự bit.
 * Dùng cho công tắc "đổi chiều đọc" để minh họa điểm tinh tế học thuật.
 */
export function readingValue(lines: Bit[], topFirst: boolean): number {
  if (!topFirst) return linesToValue(lines);
  // top = LSB
  const n = lines.length;
  return lines.reduce<number>((acc, bit, i) => acc + (bit << (n - 1 - i)), 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// "ỐNG KÍNH CHIỀU ĐỌC" (display layer) — đổi NHÃN số theo chiều đọc, KHÔNG đụng
// id/fuxiValue nội bộ (luôn neo đáy=LSB). Một nguồn duy nhất cho cặp (chuỗi, số)
// để mọi component thống nhất CHIỀU.
//   - topFirst=false (đáy→trên, mặc định): số = value (đáy=LSB).
//   - topFirst=true  (trên→đáy, Leibniz):  số = reverseBits(value) = số quẻ ĐẢO.
// ─────────────────────────────────────────────────────────────────────────────

/** Số thập phân hiển thị theo chiều đọc (n bit). id/fuxiValue gốc không đổi. */
export function displayValue(value: number, topFirst: boolean, n = 6): number {
  return topFirst ? reverseBits(value, n) : value;
}

/**
 * Chuỗi nhị phân hiển thị = DÃY HÀO theo chiều đọc đang chọn (không phải numeral
 * của `displayValue`). Cố ý: `parseInt(displayString) = reverseBits(displayValue)`
 * ở cả hai chiều — chính là bài học ĐL1 (đọc khác chiều ⇒ số khác).
 *   - topFirst=true  → "đỉnh…đáy" = numeral chuẩn của value (b_{n-1}…b0).
 *   - topFirst=false → "đáy…đỉnh" = đảo lại.
 */
export function displayString(value: number, topFirst: boolean, n = 6): string {
  const numeral = (value & ((1 << n) - 1)).toString(2).padStart(n, '0');
  return topFirst ? numeral : [...numeral].reverse().join('');
}

/** Quẻ đối/thác: lật toàn bộ hào (bù bit). */
export function complement(lines: Bit[]): Bit[] {
  return lines.map((b) => (b ^ 1) as Bit);
}

/** Quẻ đảo/tống: lật ngược thứ tự hào (trên thành dưới). */
export function reverseLines(lines: Bit[]): Bit[] {
  return [...lines].reverse() as Bit[];
}

/** Tách 6 hào thành [quẻ dưới (hào 1-2-3), quẻ trên (hào 4-5-6)]. */
export function splitTrigrams(lines: Bit[]): { lower: Bit[]; upper: Bit[] } {
  return {
    lower: lines.slice(0, 3) as Bit[],
    upper: lines.slice(3, 6) as Bit[],
  };
}

/** Ghép quẻ dưới + quẻ trên thành 6 hào (đáy→đỉnh). */
export function joinTrigrams(lower: Bit[], upper: Bit[]): Bit[] {
  return [...lower, ...upper] as Bit[];
}

/** Số hào dương trong quẻ. */
export function countYang(lines: Bit[]): number {
  return lines.reduce<number>((acc, b) => acc + b, 0);
}

/**
 * Đảo trật tự `n` bit của một giá trị (bit i ↔ bit n-1-i).
 * Với quẻ kép (n=6): biến "đáy=LSB" thành "đỉnh=LSB" — tức đọc hào từ ĐỈNH xuống ĐÁY.
 * Dùng để suy thứ tự vòng Tiên Thiên (Phương Viên Đồ) từ `fuxiValue`.
 */
export function reverseBits(value: number, n: number): number {
  let out = 0;
  for (let i = 0; i < n; i++) {
    out |= ((value >> i) & 1) << (n - 1 - i);
  }
  return out;
}
