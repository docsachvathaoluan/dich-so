import { describe, it, expect } from 'vitest';
import { HEXAGRAM_EN, TRIGRAM_EN, ELEMENT_EN } from '@/i18n/glossary';
import { UI } from '@/i18n/ui';
import { TRIGRAMS } from '@/data/trigrams';
import { HEXAGRAMS, hexagramByKingWen } from '@/data/hexagrams';
import { hexagramExtraByKingWen } from '@/data/hexagramContent';
import { lineName } from '@/lib/linePositions';

// Các lô quẻ đã dịch xong nội dung EN (cập nhật khi hoàn tất mỗi lô Đợt 3).
const EN_DONE_RANGES: Array<[number, number]> = [[1, 64]];

// Glossary là file NEO — kiểm bất biến phủ đủ (song song với kiểm 64 mã ở hexagrams.ts).
describe('glossary EN phủ đủ', () => {
  it('64 quẻ đều có pinyin + wilhelm không rỗng', () => {
    for (let kw = 1; kw <= 64; kw++) {
      const g = HEXAGRAM_EN[kw];
      expect(g, `thiếu quẻ ${kw}`).toBeTruthy();
      expect(g.pinyin.trim().length, `quẻ ${kw} thiếu pinyin`).toBeGreaterThan(0);
      expect(g.wilhelm.trim().length, `quẻ ${kw} thiếu wilhelm`).toBeGreaterThan(0);
    }
    expect(Object.keys(HEXAGRAM_EN)).toHaveLength(64);
  });

  it('8 quái đều có tên EN, khớp đúng tên Hán-Việt trong dữ liệu', () => {
    expect(Object.keys(TRIGRAM_EN)).toHaveLength(8);
    for (const tri of TRIGRAMS) {
      const g = TRIGRAM_EN[tri.nameHanViet];
      expect(g, `thiếu quái ${tri.nameHanViet}`).toBeTruthy();
      expect(g.modern.trim().length).toBeGreaterThan(0);
      expect(g.pinyin.trim().length).toBeGreaterThan(0);
      expect(g.wilhelm.trim().length).toBeGreaterThan(0);
    }
  });

  it('5 hành đều có tên EN', () => {
    for (const el of ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ']) {
      expect(ELEMENT_EN[el]?.length).toBeGreaterThan(0);
    }
  });
});

describe('UI dictionary song ngữ', () => {
  it('mọi key có cả vi lẫn en, không rỗng', () => {
    for (const [key, msg] of Object.entries(UI)) {
      expect(msg.vi?.length, `${key} thiếu vi`).toBeGreaterThan(0);
      expect(msg.en?.length, `${key} thiếu en`).toBeGreaterThan(0);
    }
  });
});

describe('Đợt 2 — data-model EN', () => {
  it('64 quẻ đều có nameModernEn / pinyin / wilhelm (đủ ngay từ Đợt 2)', () => {
    expect(HEXAGRAMS).toHaveLength(64);
    for (const h of HEXAGRAMS) {
      expect(h.nameModernEn.trim().length, `#${h.kingWen} thiếu nameModernEn`).toBeGreaterThan(0);
      expect(h.pinyin.trim().length, `#${h.kingWen} thiếu pinyin`).toBeGreaterThan(0);
      expect(h.wilhelm.trim().length, `#${h.kingWen} thiếu wilhelm`).toBeGreaterThan(0);
    }
  });

  it('các lô đã dịch: có đủ prose EN (modernShort + deep + hào từ + coreLesson)', () => {
    for (const [lo, hi] of EN_DONE_RANGES) {
      for (let kw = lo; kw <= hi; kw++) {
        const h = hexagramByKingWen(kw);
        expect(h.en?.modernShort?.trim().length, `#${kw} thiếu en.modernShort`).toBeGreaterThan(0);
        expect(h.en?.modernDeep?.modernMapping?.trim().length, `#${kw} thiếu en.modernDeep`).toBeGreaterThan(0);
        const extra = hexagramExtraByKingWen(kw);
        expect(extra?.en?.lines?.length, `#${kw} thiếu en.lines`).toBe(6);
        expect(extra?.en?.coreLesson?.trim().length, `#${kw} thiếu en.coreLesson`).toBeGreaterThan(0);
      }
    }
  });

  it('lineName EN theo quy ước Wilhelm', () => {
    expect(lineName(1, true, 'en')).toBe('Nine at the beginning');
    expect(lineName(6, false, 'en')).toBe('Six at the top');
    expect(lineName(2, true, 'en')).toBe('Nine in the second place');
    expect(lineName(5, false, 'en')).toBe('Six in the fifth place');
    // VN mặc định không đổi
    expect(lineName(1, true)).toBe('Sơ Cửu');
  });
});
