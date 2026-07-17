// ───────────────────────────────────────────────────────────────────────────
// HÀ ĐỒ (河圖) & LẠC THƯ (洛書) — gốc số học của hệ thống.
//   Hà Đồ: 1..10, cặp lệch 5, số lẻ=dương(trắng)/chẵn=âm(đen). Tổng = 55.
//   Lạc Thư: ma phương 3×3 (mọi đường = 15), tổng = 45; đặt thẳng ra Hậu Thiên.
// ───────────────────────────────────────────────────────────────────────────
import type { CosmoNumber, Element } from '@/types';
import { trigramByName } from './trigrams';

// ── Hà Đồ ────────────────────────────────────────────────────────────────────
export const HETU: CosmoNumber[] = [
  { value: 1, parity: 'duong', direction: 'Bắc', element: 'Thủy', pairValue: 6 },
  { value: 6, parity: 'am', direction: 'Bắc', element: 'Thủy', pairValue: 1 },
  { value: 2, parity: 'am', direction: 'Nam', element: 'Hỏa', pairValue: 7 },
  { value: 7, parity: 'duong', direction: 'Nam', element: 'Hỏa', pairValue: 2 },
  { value: 3, parity: 'duong', direction: 'Đông', element: 'Mộc', pairValue: 8 },
  { value: 8, parity: 'am', direction: 'Đông', element: 'Mộc', pairValue: 3 },
  { value: 4, parity: 'am', direction: 'Tây', element: 'Kim', pairValue: 9 },
  { value: 9, parity: 'duong', direction: 'Tây', element: 'Kim', pairValue: 4 },
  { value: 5, parity: 'duong', direction: 'Trung', element: 'Thổ', pairValue: 10 },
  { value: 10, parity: 'am', direction: 'Trung', element: 'Thổ', pairValue: 5 },
];

export const HETU_TOTAL = HETU.reduce((a, n) => a + n.value, 0); // 55
export const HETU_HEAVEN = HETU.filter((n) => n.value % 2 === 1).reduce(
  (a, n) => a + n.value,
  0
); // 25 (số Trời)
export const HETU_EARTH = HETU.filter((n) => n.value % 2 === 0).reduce(
  (a, n) => a + n.value,
  0
); // 30 (số Đất)

// ── Lạc Thư ──────────────────────────────────────────────────────────────────
// gridPos [hàng, cột]: hàng 0 = trên (Nam), cột 0 = trái (Đông).
const LUOSHU_RAW: Array<{
  value: number;
  gridPos: [number, number];
  direction: CosmoNumber['direction'];
  element: Element;
  trigram?: string;
}> = [
  { value: 4, gridPos: [0, 0], direction: 'Đông Nam', element: 'Mộc', trigram: 'Tốn' },
  { value: 9, gridPos: [0, 1], direction: 'Nam', element: 'Hỏa', trigram: 'Ly' },
  { value: 2, gridPos: [0, 2], direction: 'Tây Nam', element: 'Thổ', trigram: 'Khôn' },
  { value: 3, gridPos: [1, 0], direction: 'Đông', element: 'Mộc', trigram: 'Chấn' },
  { value: 5, gridPos: [1, 1], direction: 'Trung', element: 'Thổ' },
  { value: 7, gridPos: [1, 2], direction: 'Tây', element: 'Kim', trigram: 'Đoài' },
  { value: 8, gridPos: [2, 0], direction: 'Đông Bắc', element: 'Thổ', trigram: 'Cấn' },
  { value: 1, gridPos: [2, 1], direction: 'Bắc', element: 'Thủy', trigram: 'Khảm' },
  { value: 6, gridPos: [2, 2], direction: 'Tây Bắc', element: 'Kim', trigram: 'Càn' },
];

export const LUOSHU: CosmoNumber[] = LUOSHU_RAW.map((r) => ({
  value: r.value,
  parity: r.value % 2 === 1 ? 'duong' : 'am',
  direction: r.direction,
  element: r.element,
  gridPos: r.gridPos,
  laterHeavenTrigram: r.trigram ? trigramByName(r.trigram).id : undefined,
}));

export const LUOSHU_TOTAL = LUOSHU.reduce((a, n) => a + n.value, 0); // 45

// ── Ngũ Hành ────────────────────────────────────────────────────────────────
export const ELEMENT_META: Record<
  Element,
  { color: string; gloss: string }
> = {
  Mộc: { color: '#5fb89a', gloss: 'cây cối, sinh trưởng' },
  Hỏa: { color: '#d9603b', gloss: 'lửa, bùng phát' },
  Thổ: { color: '#c9a24b', gloss: 'đất, dung chứa' },
  Kim: { color: '#cdd3e0', gloss: 'kim loại, kết tinh' },
  Thủy: { color: '#5a8fd6', gloss: 'nước, thẩm thấu' },
};

/** Vòng SINH (tương sinh): Mộc → Hỏa → Thổ → Kim → Thủy → (Mộc). Ứng Hà Đồ. */
export const NGU_HANH_SINH: Element[] = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];

/** Vòng KHẮC (tương khắc): Mộc → Thổ → Thủy → Hỏa → Kim → (Mộc). Liên hệ Lạc Thư (diễn giải truyền thống). */
export const NGU_HANH_KHAC: Element[] = ['Mộc', 'Thổ', 'Thủy', 'Hỏa', 'Kim'];
