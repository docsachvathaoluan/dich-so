import { describe, it, expect } from 'vitest';
import { guaLineColors, YANG, YIN } from '@/components/Gua';
import { ELEMENT_META } from '@/data/cosmograms';
import { hexagramByKingWen } from '@/data/hexagrams';
import { trigramByName } from '@/data/trigrams';
import type { Bit } from '@/types';

const CAN6: Bit[] = [1, 1, 1, 1, 1, 1];
const KHON6: Bit[] = [0, 0, 0, 0, 0, 0];

describe('guaLineColors — Ngũ hành theo nửa quẻ', () => {
  it('quẻ thuần: cả 6 hào cùng 1 màu hành', () => {
    expect(guaLineColors(CAN6, 'wuxing')).toEqual(Array(6).fill(ELEMENT_META.Kim.color)); // Càn = Kim
    expect(guaLineColors(KHON6, 'wuxing')).toEqual(Array(6).fill(ELEMENT_META.Thổ.color)); // Khôn = Thổ
  });

  it('quẻ kép: nửa dưới theo quẻ dưới, nửa trên theo quẻ trên', () => {
    // Truân #3 = Khảm(Thủy) trên / Chấn(Mộc) dưới
    const truan = hexagramByKingWen(3).lines;
    expect(guaLineColors(truan, 'wuxing')).toEqual([
      ELEMENT_META.Mộc.color, // hào 1-3 = Chấn (Mộc)
      ELEMENT_META.Mộc.color,
      ELEMENT_META.Mộc.color,
      ELEMENT_META.Thủy.color, // hào 4-6 = Khảm (Thủy)
      ELEMENT_META.Thủy.color,
      ELEMENT_META.Thủy.color,
    ]);
  });

  it('quẻ đơn 3 hào: cả 3 hào cùng màu hành', () => {
    const ly = trigramByName('Ly').lines; // Ly = Hỏa
    expect(guaLineColors(ly, 'wuxing')).toEqual(Array(3).fill(ELEMENT_META.Hỏa.color));
  });

  it('duality (mặc định): theo bit — dương YANG, âm YIN', () => {
    expect(guaLineColors(CAN6)).toEqual(Array(6).fill(YANG));
    expect(guaLineColors([1, 0, 1, 0, 1, 0], 'duality')).toEqual([YANG, YIN, YANG, YIN, YANG, YIN]);
  });

  it('số hào ∉ {3,6} (vd 1 hào lẻ) → luôn theo âm/dương, kể cả wuxing', () => {
    expect(guaLineColors([1], 'wuxing')).toEqual([YANG]);
    expect(guaLineColors([0], 'wuxing')).toEqual([YIN]);
  });
});

describe('ELEMENT_META — bảng màu 5 hành', () => {
  it('đủ 5 hành, mỗi màu là hex hợp lệ', () => {
    const els = Object.keys(ELEMENT_META);
    expect(els.sort()).toEqual(['Hỏa', 'Kim', 'Mộc', 'Thổ', 'Thủy'].sort());
    for (const el of els) {
      expect(ELEMENT_META[el as keyof typeof ELEMENT_META].color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});
