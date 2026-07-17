// ───────────────────────────────────────────────────────────────────────────
// Hào vị: các DỮ KIỆN ĐỊNH VỊ tính được (computable) cho khung "hào vị" của bản
// diễn giải sâu. Lưu ý TRUNG THỰC: vị trí trung/chính/ứng là tính được chính xác,
// nhưng Ý NGHĨA gán cho chúng là KHUNG DIỄN GIẢI TRUYỀN THỐNG (Dịch học cổ) —
// phần prose dùng các dữ kiện này phải ghi rõ nguồn.
//
// Quy ước (theo toàn app): lines[] xếp ĐÁY→ĐỈNH, index 0 = hào 1 = đáy. Dương=1.
//   - Trung (中): hào 2 và hào 5 — ở giữa hạ quái / thượng quái.
//   - Chính/đắc vị (正/當位): hào dương ở vị LẺ (1,3,5), hào âm ở vị CHẴN (2,4,6).
//   - Trung chính (中正): vừa trung vừa chính.
//   - Ứng (應): cặp (1,4) (2,5) (3,6); "có ứng" khi một âm một dương (khác bit).
// ───────────────────────────────────────────────────────────────────────────
import type { Bit } from '@/types';
import type { Lang } from '@/store/useSettings';

export interface LinePosition {
  /** index trong lines[] (0..5, đáy→đỉnh). */
  index: number;
  /** số hào 1..6. */
  position: number;
  bit: Bit;
  yang: boolean;
  /** trung: hào 2 hoặc 5. */
  central: boolean;
  /** chính/đắc vị: dương ở vị lẻ, âm ở vị chẵn. */
  correct: boolean;
  /** vừa trung vừa chính. */
  centralCorrect: boolean;
}

export interface CorrespondencePair {
  /** hào dưới của cặp (1, 2 hoặc 3). */
  lower: number;
  /** hào trên của cặp (4, 5 hoặc 6). */
  upper: number;
  /** có ứng: hai hào khác âm-dương. */
  resonant: boolean;
}

export interface LinePositionAnalysis {
  lines: LinePosition[];
  correspondences: CorrespondencePair[];
}

/** Phân tích hào vị (computable) cho một quẻ 6 hào (đáy→đỉnh). */
export function analyzeLinePositions(lines: Bit[]): LinePositionAnalysis {
  const positions: LinePosition[] = lines.map((bit, index) => {
    const position = index + 1;
    const yang = bit === 1;
    const central = position === 2 || position === 5;
    const oddPlace = position % 2 === 1; // vị dương
    const correct = yang === oddPlace;
    return { index, position, bit, yang, central, correct, centralCorrect: central && correct };
  });

  const correspondences: CorrespondencePair[] = [
    [0, 3],
    [1, 4],
    [2, 5],
  ].map(([lo, hi]) => ({
    lower: lo + 1,
    upper: hi + 1,
    resonant: lines[lo] !== lines[hi],
  }));

  return { lines: positions, correspondences };
}

// ───────────────────────────────────────────────────────────────────────────
// Danh hào & chủ quẻ "quả–chúng" — đều TÍNH ĐƯỢC từ bit (🟢), không điền tay.
// ───────────────────────────────────────────────────────────────────────────

const POSITION_WORD = ['Sơ', 'Nhị', 'Tam', 'Tứ', 'Ngũ', 'Thượng'] as const;

// EN theo quy ước Wilhelm–Baynes: "Nine at the beginning" / "Six in the second place" /
// "Nine at the top". Dương = "Nine" (9), Âm = "Six" (6).
const POSITION_WORD_EN = [
  'at the beginning',
  'in the second place',
  'in the third place',
  'in the fourth place',
  'in the fifth place',
  'at the top',
] as const;

/**
 * Danh hào truyền thống: dương = "Cửu" (9), âm = "Lục" (6); vị trí Sơ..Thượng.
 * Quy ước đọc: hào 1 & 6 để CHỮ VỊ trước ("Sơ Cửu", "Thượng Lục"); hào 2–5 để SỐ trước
 * ("Cửu Nhị", "Lục Tam"). `position` 1..6 (đáy→đỉnh). `lang` mặc định 'vi' (giữ caller/test cũ).
 */
export function lineName(position: number, yang: boolean, lang: Lang = 'vi'): string {
  if (lang === 'en') {
    return `${yang ? 'Nine' : 'Six'} ${POSITION_WORD_EN[position - 1]}`;
  }
  const num = yang ? 'Cửu' : 'Lục';
  const pos = POSITION_WORD[position - 1];
  return position === 1 || position === 6 ? `${pos} ${num}` : `${num} ${pos}`;
}

/**
 * Chỉ số (đáy=0) của hào "lẻ loi" trong quẻ quả–chúng: đúng 1 hào dương giữa toàn âm, hoặc
 * 1 hào âm giữa toàn dương. Hào này chính là CHỦ QUẺ (少者為主) — suy được, không cần điền tay.
 * Trả về null nếu quẻ không thuộc thế quả–chúng. (Đúng 12 quẻ trong 64 — xem docs.)
 */
export function soloLineIndex(lines: Bit[]): number | null {
  const yang = lines.reduce<number>((acc, b) => acc + b, 0);
  if (yang === 1) return lines.findIndex((b) => b === 1);
  if (yang === lines.length - 1) return lines.findIndex((b) => b === 0);
  return null;
}
