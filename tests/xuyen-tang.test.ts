// ───────────────────────────────────────────────────────────────────────────
// TỰ KIỂM "QUY LUẬT XUYÊN TẦNG" — chứng minh bằng máy các kết luận mà trang này dựa lên.
// Mọi kết luận 🟢 (số kiểm được) trên trang phải khớp test ở đây; đây là biên lai của chúng.
//
//   §2: {Đảo (綜), Đối (錯)} — involution + giao hoán → nhóm Klein 4.
//       symmetryFamily chia 64 quẻ thành 20 họ: 12 họ-4 + 8 họ-2.
//       8 họ-2 = 4 họ palindrome (tự-Đảo) + 4 họ "Đảo≡Đối"; đều có dạng {v, Đối(v)}.
//       4 họ palindrome = đúng 4 cặp ĐỐI (錯) của Văn Vương.
// (Không lặp ĐL1–4 & luật 32 cặp — xem dong-tay.test.ts / pairs.test.ts.)
// ───────────────────────────────────────────────────────────────────────────
import { describe, it, expect } from 'vitest';
import {
  valueToLines,
  reverseBits,
  complement,
  reverseLines,
  linesToValue,
} from '@/lib/binary';
import { symmetryFamily, oppositeValue, familyKind } from '@/lib/relations';
import { kingWenPairs } from '@/data/hexagrams';
import type { Bit } from '@/types';

const ALL = Array.from({ length: 64 }, (_, v) => v);
const linesOf = (v: number) => valueToLines(v, 6) as Bit[];

// ── §2 — Đảo & Đối là involution VÀ giao hoán ────────────────────────────────
describe('§2 — {Đảo, Đối} sinh nhóm Klein 4 (involution + giao hoán)', () => {
  const dao = (v: number) => reverseBits(v, 6);
  const doi = (v: number) => 63 - v;

  it('Đảo, Đối đều là involution trên cả 64 quẻ', () => {
    for (const v of ALL) {
      expect(dao(dao(v))).toBe(v);
      expect(doi(doi(v))).toBe(v);
    }
  });

  it('Đảo và Đối GIAO HOÁN: Đảo∘Đối = Đối∘Đảo, ∀ 64 quẻ', () => {
    for (const v of ALL) {
      expect(dao(doi(v))).toBe(doi(dao(v)));
    }
  });
});

// ── §2 — 20 họ quỹ đạo ───────────────────────────────────────────────────────
describe('§2 — symmetryFamily chia 64 quẻ thành 20 họ (12 họ-4 + 8 họ-2)', () => {
  // Gom quỹ đạo: mỗi họ đại diện bởi min(fuxiValue)
  const families = new Map<number, number[]>();
  for (const v of ALL) {
    const fam = symmetryFamily(linesOf(v));
    families.set(fam[0], fam); // key = phần tử nhỏ nhất (bất biến trong họ)
  }
  const list = [...families.values()];

  it('đúng 20 họ, phủ đủ 0..63 không trùng', () => {
    expect(list.length).toBe(20);
    const union = new Set<number>(list.flat());
    expect(union.size).toBe(64);
  });

  it('phân bố kích thước: 12 họ size-4 + 8 họ size-2 (không có họ size-1)', () => {
    const size4 = list.filter((f) => f.length === 4);
    const size2 = list.filter((f) => f.length === 2);
    const size1 = list.filter((f) => f.length === 1);
    expect(size4.length).toBe(12);
    expect(size2.length).toBe(8);
    expect(size1.length).toBe(0); // Đối vô điểm bất động ⇒ không họ đơn
    expect(size4.length * 4 + size2.length * 2).toBe(64);
  });

  it('cả 8 họ size-2 đều có dạng {v, Đối(v)}', () => {
    const size2 = list.filter((f) => f.length === 2);
    for (const [a, b] of size2) {
      expect(a + b).toBe(63); // Đối: bù bit ⇒ tổng 63
    }
  });
});

// ── §2 — Hai loại họ đôi-2 & liên hệ với cặp Văn Vương ───────────────────────
describe('§2 — 8 họ-2 = 4 palindrome (tự-Đảo) + 4 "Đảo≡Đối"', () => {
  const isPalindrome = (v: number) => reverseBits(v, 6) === v;
  const isDaoEqDoi = (v: number) => reverseBits(v, 6) === 63 - v;

  it('quẻ trong họ size-2 = đúng {8 tự-Đảo} ∪ {8 Đảo≡Đối} = 16 quẻ', () => {
    const inSize2 = ALL.filter((v) => symmetryFamily(linesOf(v)).length === 2);
    expect(inSize2.length).toBe(16);
    const palin = inSize2.filter(isPalindrome);
    const daoEqDoi = inSize2.filter(isDaoEqDoi);
    expect(palin.length).toBe(8);
    expect(daoEqDoi.length).toBe(8);
    // hai loại tách bạch, phủ hết 16 quẻ
    expect(new Set([...palin, ...daoEqDoi]).size).toBe(16);
  });

  it('"Đảo≡Đối" đúng nghĩa: reverseLines = complement (vd Thái/Bĩ 000111/111000)', () => {
    const daoEqDoi = ALL.filter((v) => isDaoEqDoi(v));
    for (const v of daoEqDoi) {
      const lines = linesOf(v);
      expect(linesToValue(reverseLines(lines))).toBe(linesToValue(complement(lines)));
      expect(linesToValue(reverseLines(lines))).toBe(oppositeValue(lines));
    }
    expect(daoEqDoi).toContain(0b000111); // Thái #11
    expect(daoEqDoi).toContain(0b111000); // Bĩ  #12
  });

  it('familyKind phân loại đúng: full4 / palindrome / reversalEqualsOpposite', () => {
    // 3 đại diện đã verify tay
    expect(familyKind(linesOf(17))).toBe('full4'); // Truân — họ đầy-4
    expect(familyKind(linesOf(63))).toBe('palindrome'); // Càn — tự-Đảo, họ {63,0}
    expect(familyKind(linesOf(0b000111))).toBe('reversalEqualsOpposite'); // Thái #11 = 7

    // Nhất quán với phân bố họ: đúng 12 full4 + 4 palindrome + 4 reversalEqualsOpposite
    const kinds = ALL.map((v) => familyKind(linesOf(v)));
    // đếm theo HỌ (mỗi họ đại diện bởi min fuxiValue) để không nhân đôi
    const seen = new Map<number, ReturnType<typeof familyKind>>();
    for (const v of ALL) seen.set(symmetryFamily(linesOf(v))[0], familyKind(linesOf(v)));
    const perFamily = [...seen.values()];
    expect(perFamily.filter((k) => k === 'full4').length).toBe(12);
    expect(perFamily.filter((k) => k === 'palindrome').length).toBe(4);
    expect(perFamily.filter((k) => k === 'reversalEqualsOpposite').length).toBe(4);
    // full4 áp cho mọi quẻ trong 12 họ-4 = 48 quẻ
    expect(kinds.filter((k) => k === 'full4').length).toBe(48);
  });

  it('4 họ palindrome trùng đúng 4 cặp ĐỐI (錯) của Văn Vương', () => {
    // họ palindrome = {v, 63−v} với v tự-Đảo
    const palinFamilies = ALL.filter(isPalindrome)
      .map((v) => [v, 63 - v].sort((a, b) => a - b) as number[])
      .filter((f, i, arr) => arr.findIndex((g) => g[0] === f[0]) === i);
    expect(palinFamilies.length).toBe(4);

    const thacPairs = kingWenPairs()
      .filter((p) => p.kind === 'thac')
      .map((p) => [p.a.fuxiValue, p.b.fuxiValue].sort((x, y) => x - y));

    const norm = (arr: number[][]) =>
      new Set(arr.map((f) => f.join(',')));
    expect(norm(palinFamilies)).toEqual(norm(thacPairs));
  });
});
