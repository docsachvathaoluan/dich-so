import { describe, it, expect } from 'vitest';
import {
  QUOTES,
  ANCHORS,
  anchorsByConcept,
  anchorsByHex,
  quotesOf,
} from '@/data/daoistWisdom';
import { hexagramByKingWen } from '@/data/hexagrams';
import { TICH_QUAI } from '@/data/monthHexagrams';

/**
 * Bất biến dữ liệu minh triết Lão–Trang — canh nguyên tắc trung thực của dự án.
 * Mục tiêu: mọi điểm neo trỏ tới quote tồn tại, mọi quẻ neo hợp lệ, không thiếu nguồn.
 */
describe('daoistWisdom — bất biến dữ liệu', () => {
  it('id quote là duy nhất', () => {
    const ids = QUOTES.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mọi quote có han + viet + ref + cite (kiểm được & dẫn nguồn)', () => {
    for (const q of QUOTES) {
      expect(q.han.trim().length, `han rỗng: ${q.id}`).toBeGreaterThan(0);
      expect(q.viet.trim().length, `viet rỗng: ${q.id}`).toBeGreaterThan(0);
      expect(q.ref.trim().length, `ref rỗng: ${q.id}`).toBeGreaterThan(0);
      expect(q.cite.trim().length, `cite rỗng: ${q.id}`).toBeGreaterThan(0);
      expect(q.resonance.trim().length, `resonance rỗng: ${q.id}`).toBeGreaterThan(0);
      expect(['laozi', 'zhuangzi']).toContain(q.source);
    }
  });

  it('mọi quoteId trong ANCHORS đều tồn tại & anchor không rỗng', () => {
    const known = new Set(QUOTES.map((q) => q.id));
    for (const a of ANCHORS) {
      expect(a.quoteIds.length, `anchor rỗng: ${a.label}`).toBeGreaterThan(0);
      for (const id of a.quoteIds) {
        expect(known.has(id), `quoteId không tồn tại: ${id} (${a.label})`).toBe(true);
      }
      expect(quotesOf(a).length).toBe(a.quoteIds.length);
    }
  });

  it('concept không-hex là duy nhất (để map tra cứu không nuốt mất anchor)', () => {
    const concepts = ANCHORS.filter((a) => a.concept !== 'hex').map((a) => a.concept);
    expect(new Set(concepts).size).toBe(concepts.length);
    expect(anchorsByConcept.size).toBe(concepts.length);
  });

  it('mọi hexKingWen ∈ 1..64 và trỏ đúng quẻ thật', () => {
    for (const [kw, a] of anchorsByHex) {
      expect(kw, `kingWen ngoài 1..64: ${a.label}`).toBeGreaterThanOrEqual(1);
      expect(kw).toBeLessThanOrEqual(64);
      expect(() => hexagramByKingWen(kw)).not.toThrow();
    }
  });

  it('không trùng hexKingWen (mỗi quẻ tối đa 1 anchor)', () => {
    const hexes = ANCHORS.filter((a) => a.hexKingWen != null).map((a) => a.hexKingWen);
    expect(new Set(hexes).size).toBe(hexes.length);
  });

  it('mọi Tích quái (12) đều có đối chiếu Đạo gia theo quẻ', () => {
    for (const tq of TICH_QUAI) {
      expect(anchorsByHex.has(tq.kingWen), `thiếu đối chiếu cho kingWen ${tq.kingWen}`).toBe(true);
    }
  });

  it('không quote nào bị 2 anchor hex khác nhau dùng chung (resonance theo quẻ)', () => {
    const seen = new Map<string, number>(); // quoteId → hexKingWen
    for (const a of ANCHORS) {
      if (a.hexKingWen == null) continue;
      for (const id of a.quoteIds) {
        const prev = seen.get(id);
        expect(prev, `quote "${id}" dùng chung cho quẻ ${prev} và ${a.hexKingWen}`).toBeUndefined();
        seen.set(id, a.hexKingWen);
      }
    }
  });
});
