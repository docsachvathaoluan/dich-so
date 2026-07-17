import { describe, it, expect } from 'vitest';
import { soloLineIndex, lineName } from '@/lib/linePositions';
import { HEXAGRAMS, hexagramByKingWen } from '@/data/hexagrams';
import {
  HEXAGRAM_CONTENT,
  hexagramExtraByKingWen,
  hasLineTexts,
} from '@/data/hexagramContent';

describe('soloLineIndex — chủ quẻ "quả–chúng" (少者為主)', () => {
  it('đúng 12 quẻ có 1 hào lẻ loi trong 64', () => {
    const solo = HEXAGRAMS.filter((h) => soloLineIndex(h.lines) !== null);
    expect(solo.length).toBe(12);
    expect(solo.map((h) => h.kingWen).sort((a, b) => a - b)).toEqual([
      7, 8, 9, 10, 13, 14, 15, 16, 23, 24, 43, 44,
    ]);
  });

  it('chủ quẻ auto = index hào lẻ loi (spot check)', () => {
    expect(soloLineIndex(hexagramByKingWen(7).lines)).toBe(1); // Sư — hào 2
    expect(soloLineIndex(hexagramByKingWen(8).lines)).toBe(4); // Tỷ — hào 5
    expect(soloLineIndex(hexagramByKingWen(9).lines)).toBe(3); // Tiểu Súc — hào 4
    expect(soloLineIndex(hexagramByKingWen(15).lines)).toBe(2); // Khiêm — hào 3
    expect(soloLineIndex(hexagramByKingWen(16).lines)).toBe(3); // Dự — hào 4
  });

  it('quẻ thuần / không quả–chúng → null', () => {
    expect(soloLineIndex(hexagramByKingWen(1).lines)).toBeNull(); // Càn (thuần dương)
    expect(soloLineIndex(hexagramByKingWen(2).lines)).toBeNull(); // Khôn (thuần âm)
    expect(soloLineIndex(hexagramByKingWen(11).lines)).toBeNull(); // Thái (3–3)
  });
});

describe('lineName — danh hào', () => {
  it('hào 1 & 6 để vị trí trước; 2–5 để số trước', () => {
    expect(lineName(1, true)).toBe('Sơ Cửu');
    expect(lineName(6, false)).toBe('Thượng Lục');
    expect(lineName(2, true)).toBe('Cửu Nhị');
    expect(lineName(3, false)).toBe('Lục Tam');
    expect(lineName(5, true)).toBe('Cửu Ngũ');
  });
});

describe('hexagramContent — hào từ 16 quẻ đầu', () => {
  it('đủ 64/64 quẻ có 6 hào từ, mỗi hào đủ 3 trường', () => {
    for (let kw = 1; kw <= 64; kw++) {
      expect(hasLineTexts(kw)).toBe(true);
      const lines = hexagramExtraByKingWen(kw)!.lines!;
      expect(lines.length).toBe(6);
      for (const l of lines) {
        expect(l.textHV.length).toBeGreaterThan(0);
        expect(l.gloss.length).toBeGreaterThan(0);
        expect(l.modern.length).toBeGreaterThan(0);
      }
    }
  });

  it('Dụng Cửu/Lục (extra) chỉ ở Càn #1 và Khôn #2', () => {
    for (const [k, v] of Object.entries(HEXAGRAM_CONTENT)) {
      if (v.extra) expect([1, 2]).toContain(Number(k));
    }
  });

  it('governing lưu tay CHỈ khi không auto được (soloLineIndex null) & index hợp lệ', () => {
    for (const [k, v] of Object.entries(HEXAGRAM_CONTENT)) {
      if (!v.governing) continue;
      const hex = hexagramByKingWen(Number(k));
      // không lặp với auto: đã lưu tay nghĩa là không phải quả–chúng
      expect(soloLineIndex(hex.lines)).toBeNull();
      for (const idx of v.governing) {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThanOrEqual(5);
      }
    }
  });
});
