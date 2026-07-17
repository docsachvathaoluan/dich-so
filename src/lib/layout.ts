// ───────────────────────────────────────────────────────────────────────────
// Tiện ích hình học cho các sơ đồ tròn.
// QUY ƯỚC PHƯƠNG VỊ CỔ THƯ: Nam ở TRÊN, Bắc ở DƯỚI, Đông bên TRÁI, Tây bên PHẢI.
// Góc đo từ ĐỈNH (12 giờ = 0°), theo chiều KIM ĐỒNG HỒ.
// ───────────────────────────────────────────────────────────────────────────
import type { Direction } from '@/types';
import { reverseBits } from './binary';

export const DIRECTION_ANGLE: Record<Direction, number> = {
  Nam: 0, // trên
  'Tây Nam': 45, // trên-phải
  Tây: 90, // phải
  'Tây Bắc': 135, // dưới-phải
  Bắc: 180, // dưới
  'Đông Bắc': 225, // dưới-trái
  Đông: 270, // trái
  'Đông Nam': 315, // trên-trái
  Trung: 0, // tâm (bán kính 0)
};

export interface Point {
  x: number;
  y: number;
}

/** Điểm trên đường tròn theo góc (độ) đo từ đỉnh, chiều kim đồng hồ. */
export function polarToXY(cx: number, cy: number, r: number, angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
}

/** Điểm theo phương vị (Nam/Bắc/...). */
export function directionToXY(
  cx: number,
  cy: number,
  r: number,
  dir: Direction
): Point {
  if (dir === 'Trung') return { x: cx, y: cy };
  return polarToXY(cx, cy, r, DIRECTION_ANGLE[dir]);
}

/**
 * Đường path SVG cho một cung tròn (annulus sector) — dùng vẽ vòng 64 quẻ / mùa.
 * Góc đo từ đỉnh, chiều kim đồng hồ.
 */
export function annulusSectorPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
): string {
  const p1 = polarToXY(cx, cy, rOuter, startDeg);
  const p2 = polarToXY(cx, cy, rOuter, endDeg);
  const p3 = polarToXY(cx, cy, rInner, endDeg);
  const p4 = polarToXY(cx, cy, rInner, startDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
// VÒNG TIÊN THIÊN 64 QUẺ (Phương Viên Đồ — Thiệu Ung).
//   Càn (fuxiValue 63) ở ĐỈNH (0°/Nam) · Khôn (0) ở ĐÁY (180°/Bắc).
//   Cặp bù-bit (v, 63−v) nằm ĐỐI TÂM (cách nhau 180°).
//   Hai nửa trái/Đông (đáy = hào DƯƠNG) ↔ phải/Tây (đáy = hào ÂM) là ảnh gương bù-bit.
//   ⚠ Thứ tự & đối xứng được KIỂM bằng phép tính trong test (xem hexagrams.test),
//      KHÔNG chép như định lý từ sách.
// Thứ tự quanh vòng theo w = reverseBits(v, 6) (đọc hào ĐỈNH→ĐÁY): đi ngược chiều
// kim đồng hồ từ Càn xuống Phục (nửa Đông, w=63..32), rồi từ Khôn lên Cấu (nửa Tây).
// ─────────────────────────────────────────────────────────────────────────────

/** Bước đếm 0..63 quanh vòng (0 = Càn ở đỉnh). */
export function fuxiCircleStep(fuxiValue: number): number {
  const w = reverseBits(fuxiValue, 6);
  return w >= 32 ? 63 - w : 32 + w;
}

/** Góc (độ, từ đỉnh, chiều kim đồng hồ) của quẻ kép trên vòng Tiên Thiên 64 quẻ. */
export function fuxiCircleAngle(fuxiValue: number): number {
  const j = fuxiCircleStep(fuxiValue);
  return ((360 - j * (360 / 64)) % 360 + 360) % 360;
}
