import { describe, it, expect } from 'vitest';
import { kingWenPairs } from '@/data/hexagrams';
import { reversedValue, oppositeValue } from '@/lib/relations';

const PAIRS = kingWenPairs();

describe('kingWenPairs — 32 cặp Đảo/Thác Văn Vương', () => {
  it('32 cặp, mỗi kingWen 1..64 xuất hiện đúng một lần', () => {
    expect(PAIRS.length).toBe(32);
    const seen = new Set<number>();
    for (const p of PAIRS) {
      seen.add(p.a.kingWen);
      seen.add(p.b.kingWen);
    }
    expect(seen.size).toBe(64);
    for (let kw = 1; kw <= 64; kw++) expect(seen.has(kw)).toBe(true);
  });

  it('28 Đảo (綜) + 4 Đối (錯)', () => {
    expect(PAIRS.filter((p) => p.kind === 'tong').length).toBe(28);
    expect(PAIRS.filter((p) => p.kind === 'thac').length).toBe(4);
  });

  it('4 cặp Đối rơi đúng 8 quẻ đối xứng (palindrome)', () => {
    const thac = PAIRS.filter((p) => p.kind === 'thac').map((p) => [p.a.kingWen, p.b.kingWen]);
    expect(thac).toEqual([
      [1, 2],
      [27, 28],
      [29, 30],
      [61, 62],
    ]);
  });

  it('kind khớp phép biến: tong ⇒ Đảo, thac ⇒ Đối', () => {
    for (const p of PAIRS) {
      if (p.kind === 'tong') {
        expect(reversedValue(p.a.lines)).toBe(p.b.fuxiValue);
      } else {
        expect(oppositeValue(p.a.lines)).toBe(p.b.fuxiValue);
      }
    }
  });
});
