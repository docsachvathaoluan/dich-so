// ───────────────────────────────────────────────────────────────────────────
// Quan hệ biến hóa giữa các quẻ kép (trả về fuxiValue 0..63).
//   - đối/thác (錯): lật toàn bộ hào (bù bit)        → tổng 2 quẻ = 63
//   - đảo/tống (綜): lật ngược trên-dưới
//   - hỗ (互): nhạch tâm — hào 2-3-4 (dưới) & 3-4-5 (trên)
// ───────────────────────────────────────────────────────────────────────────
import type { Bit, HexagramRelations } from '@/types';
import { complement, reverseLines, linesToValue } from './binary';

/** Quẻ đối/thác (lật toàn bộ bit). */
export function oppositeValue(lines: Bit[]): number {
  return linesToValue(complement(lines));
}

/** Quẻ đảo/tống (lật ngược thứ tự hào). */
export function reversedValue(lines: Bit[]): number {
  return linesToValue(reverseLines(lines));
}

/** Hào nhạch tâm: lower = hào 2-3-4 (index 1,2,3); upper = hào 3-4-5 (index 2,3,4). */
export function nuclearLines(lines: Bit[]): Bit[] {
  return [lines[1], lines[2], lines[3], lines[2], lines[3], lines[4]] as Bit[];
}

/** Quẻ hỗ (nuclear). */
export function nuclearValue(lines: Bit[]): number {
  return linesToValue(nuclearLines(lines));
}

export function computeRelations(lines: Bit[]): HexagramRelations {
  return {
    opposite: oppositeValue(lines),
    reversed: reversedValue(lines),
    nuclear: nuclearValue(lines),
  };
}

/**
 * "Họ đối xứng" của một quẻ dưới nhóm sinh bởi {Đảo (綜), Đối (錯)}.
 * Đảo và Đối là involution và GIAO HOÁN → nhóm Klein 4 {I, Đảo, Đối, Đảo-Đối}.
 * Trả về mảng fuxiValue (unique, tăng dần) của {chính nó, Đảo, Đối, Đảo-Đối}.
 * Kích thước họ ∈ {2, 4}: 12 họ đầy-4 + 8 họ đôi-2 (phủ đủ 64 quẻ).
 * Kiểm ở tests/xuyen-tang.test.ts.
 */
export function symmetryFamily(lines: Bit[]): number[] {
  const self = linesToValue(lines);
  const reversed = reversedValue(lines);
  const opposite = oppositeValue(lines);
  const reversedOpposite = linesToValue(reverseLines(complement(lines)));
  return Array.from(
    new Set([self, reversed, opposite, reversedOpposite])
  ).sort((a, b) => a - b);
}

/**
 * Phân loại HỌ đối xứng của một quẻ (dùng cho khung cấu trúc "Đọc cả họ"):
 *   - 'full4'      : họ đầy-4 {quẻ, Đảo, Đối, Đảo-Đối} — 4 quẻ phân biệt.
 *   - 'palindrome' : họ đôi-2, quẻ TỰ-ĐẢO (Đảo = chính nó) → co còn {quẻ, Đối}.
 *   - 'reversalEqualsOpposite' : họ đôi-2, quẻ có ĐẢO ≡ ĐỐI → co còn {quẻ, Đối}.
 * Đối vô điểm bất động (63−v=v vô nghiệm) ⇒ họ chỉ có kích thước 2 hoặc 4.
 * Khớp isPalindrome/isDaoEqDoi ở tests/xuyen-tang.test.ts.
 */
export type FamilyKind = 'full4' | 'palindrome' | 'reversalEqualsOpposite';
export function familyKind(lines: Bit[]): FamilyKind {
  if (symmetryFamily(lines).length === 4) return 'full4';
  return reversedValue(lines) === linesToValue(lines) ? 'palindrome' : 'reversalEqualsOpposite';
}
