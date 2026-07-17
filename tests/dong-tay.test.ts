// ───────────────────────────────────────────────────────────────────────────
// TỰ KIỂM "QUY LUẬT ĐÔNG–TÂY" — chứng minh bằng máy các định lý mà trang này dựa lên.
// Mọi KẾT LUẬN trình bày trên trang phải khớp test ở đây; đây là biên lai của chúng.
//
//   ĐL1: đổi chiều đọc (đáy→trên ↔ trên→đáy/Leibniz) = phép quẻ ĐẢO (綜).
//   ĐL2: bù bit (63−v) = phép quẻ ĐỐI (錯).
//   ĐL2b: tập tự-Đảo = 8 quẻ palindrome; tập tự-Đối = RỖNG.
//   ĐL3: sắp xếp Tiên Thiên (Phục Hy/Thiệu Ung) = thang nhị phân đọc TRÊN→ĐÁY.
//   ĐL4: Tiên→Hậu Thiên KHÔNG quy về phép biến đổi bit cố định (vét cạn 48 phép)
//        + đối xứng bù-bit của vòng tròn: Tiên Thiên 4/4, Hậu Thiên chỉ 1/4.
//   Luật Văn Vương: 64 quẻ = 32 cặp liền kề, mỗi cặp là Đảo, nếu tự-Đảo thì Đối.
// ───────────────────────────────────────────────────────────────────────────
import { describe, it, expect } from 'vitest';
import {
  linesToValue,
  valueToLines,
  readingValue,
  reverseBits,
  reverseLines,
  complement,
  displayValue,
  displayString,
  linesToBinaryString,
} from '@/lib/binary';
import { HEXAGRAMS, hexagramByKingWen } from '@/data/hexagrams';
import { TRIGRAMS } from '@/data/trigrams';
import type { Bit, Direction } from '@/types';

// ── ĐL1 — Đổi chiều đọc = quẻ ĐẢO (綜) ───────────────────────────────────────
describe('ĐL1 — chiều đọc trên→đáy (Leibniz) = quẻ Đảo (綜)', () => {
  it('readingValue(topFirst) === reverseBits(fuxiValue,6) === relations.reversed, ∀ 64 quẻ', () => {
    for (const h of HEXAGRAMS) {
      const top = readingValue(h.lines, true);
      expect(top).toBe(reverseBits(h.fuxiValue, 6));
      expect(top).toBe(h.relations.reversed);
      // và đúng bằng giá trị của quẻ thu được khi lật ngược thứ tự hào
      expect(top).toBe(linesToValue(reverseLines(h.lines)));
    }
  });
});

// ── ĐL2 — Bù bit = quẻ ĐỐI (錯) ──────────────────────────────────────────────
describe('ĐL2 — bù bit (63−v) = quẻ Đối (錯)', () => {
  it('63 − fuxiValue === relations.opposite, ∀ 64 quẻ', () => {
    for (const h of HEXAGRAMS) {
      expect(63 - h.fuxiValue).toBe(h.relations.opposite);
    }
  });
});

// ── ĐL2b — Hai tập điểm bất động (TÁCH BẠCH) ─────────────────────────────────
describe('ĐL2b — tập tự-Đảo (8 quẻ) vs tập tự-Đối (rỗng)', () => {
  it('tự-Đảo: reverseBits(v,6)===v ⇒ đúng 8 quẻ palindrome', () => {
    const selfReversed = HEXAGRAMS.filter(
      (h) => reverseBits(h.fuxiValue, 6) === h.fuxiValue
    );
    expect(selfReversed).toHaveLength(8);
    // đúng tập kinh điển: Càn, Khôn, Khảm(Tập Khảm), Ly(Thuần Ly), Di, Đại Quá,
    // Tiểu Quá, Trung Phu — kiểm bằng kingWen thay vì chép tay
    const names = new Set(selfReversed.map((h) => h.kingWen));
    expect(names).toEqual(new Set([1, 2, 27, 28, 29, 30, 61, 62]));
  });

  it('tự-Đối: 63−v===v VÔ NGHIỆM ⇒ không quẻ nào là Đối của chính nó', () => {
    const selfOpposite = HEXAGRAMS.filter((h) => 63 - h.fuxiValue === h.fuxiValue);
    expect(selfOpposite).toHaveLength(0);
  });
});

// ── ĐL3 — Tiên Thiên = thang nhị phân đọc TRÊN→ĐÁY ───────────────────────────
describe('ĐL3 — Tiên Thiên (Phục Hy/Thiệu Ung) = đếm nhị phân đọc trên→đáy', () => {
  it('xianTian === 8 − reverseBits(id,3) cho cả 8 quẻ đơn', () => {
    for (const t of TRIGRAMS) {
      expect(t.xianTian).toBe(8 - reverseBits(t.id, 3));
    }
  });

  it('mở rộng 64 quẻ: sort theo reverseBits(v,6) phủ kín 0..63 (thứ tự Phục Hy)', () => {
    const order = Array.from({ length: 64 }, (_, v) => reverseBits(v, 6));
    expect(new Set(order).size).toBe(64);
  });
});

// ── ĐL4 — Tiên→Hậu Thiên KHÔNG có luật bit ──────────────────────────────────
// Nhóm 48 phép = 6 hoán vị vị trí 3 bit × 8 phép XOR hằng số (nhóm con của AGL(3,2)).
const PERMS_3 = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2],
  [1, 2, 0], [2, 0, 1], [2, 1, 0],
];
function applyTransform(v: number, perm: number[], xor: number): number {
  const bits = [v & 1, (v >> 1) & 1, (v >> 2) & 1];
  let out = 0;
  for (let i = 0; i < 3; i++) out |= bits[perm[i]] << i;
  return out ^ xor;
}
/** σ(t) = quẻ đơn nằm ở CÙNG phương vị trong Hậu Thiên với phương vị Tiên Thiên của t. */
function houTianPermutation(): Map<number, number> {
  const tienByDir = new Map<Direction, number>();
  const hauByDir = new Map<Direction, number>();
  for (const t of TRIGRAMS) {
    tienByDir.set(t.dirEarlier, t.id);
    hauByDir.set(t.dirLater, t.id);
  }
  const sigma = new Map<number, number>();
  for (const t of TRIGRAMS) {
    const hau = hauByDir.get(t.dirEarlier);
    if (hau === undefined) throw new Error('phương vị Tiên Thiên không khớp Hậu Thiên');
    sigma.set(t.id, hau);
  }
  return sigma;
}

describe('ĐL4 — Tiên → Hậu Thiên không phải phép biến đổi bit cố định', () => {
  it('VÉT CẠN 48 phép affine: KHÔNG phép nào biến Tiên Thiên thành Hậu Thiên', () => {
    const sigma = houTianPermutation();
    let found: string | null = null;
    for (const perm of PERMS_3) {
      for (let xor = 0; xor < 8; xor++) {
        const ok = TRIGRAMS.every((t) => applyTransform(t.id, perm, xor) === sigma.get(t.id));
        if (ok) found = `perm=${perm} xor=${xor}`;
      }
    }
    expect(found).toBeNull();
  });

  it('đối xứng bù-bit của vòng tròn: Tiên Thiên 4/4 cặp đối tâm là bù-bit; Hậu Thiên chỉ 1/4', () => {
    const OPP: Record<Direction, Direction> = {
      Nam: 'Bắc', Bắc: 'Nam', Đông: 'Tây', Tây: 'Đông',
      'Đông Nam': 'Tây Bắc', 'Tây Bắc': 'Đông Nam',
      'Đông Bắc': 'Tây Nam', 'Tây Nam': 'Đông Bắc', Trung: 'Trung',
    };
    const countComplementPairs = (dirOf: (t: typeof TRIGRAMS[number]) => Direction) => {
      const byDir = new Map<Direction, number>();
      for (const t of TRIGRAMS) byDir.set(dirOf(t), t.id);
      let n = 0;
      const seen = new Set<Direction>();
      for (const t of TRIGRAMS) {
        const d = dirOf(t);
        const od = OPP[d];
        if (seen.has(d) || seen.has(od)) continue;
        seen.add(d); seen.add(od);
        const a = byDir.get(d)!;
        const b = byDir.get(od);
        if (b !== undefined && (a ^ b) === 7) n++; // bù 3 bit = 7
      }
      return n;
    };
    expect(countComplementPairs((t) => t.dirEarlier)).toBe(4); // Tiên Thiên: toàn bộ
    expect(countComplementPairs((t) => t.dirLater)).toBe(1); // Hậu Thiên: chỉ Ly/Khảm
  });
});

// ── Luật Văn Vương — 32 cặp Đảo/Đối ──────────────────────────────────────────
describe('Luật Văn Vương — 64 quẻ = 32 cặp liền kề (Đảo, hoặc Đối nếu tự-Đảo)', () => {
  it('mọi cặp (2k−1, 2k) là Đảo của nhau; nếu tự-Đảo thì là Đối', () => {
    let zong = 0; // cặp Đảo (綜)
    let cuo = 0; // cặp Đối (錯) — khi quẻ tự-Đảo
    for (let k = 1; k <= 64; k += 2) {
      const a = hexagramByKingWen(k);
      const b = hexagramByKingWen(k + 1);
      const aRev = reverseBits(a.fuxiValue, 6);
      if (aRev !== a.fuxiValue) {
        expect(b.fuxiValue).toBe(aRev); // Đảo
        zong++;
      } else {
        expect(b.fuxiValue).toBe(63 - a.fuxiValue); // tự-Đảo ⇒ dùng Đối
        cuo++;
      }
    }
    expect(zong).toBe(28);
    expect(cuo).toBe(4);
    expect(zong + cuo).toBe(32);
  });
});

// ── Helper hiển thị "ống kính chiều đọc" (B1) ────────────────────────────────
describe('B1 — helper displayValue/displayString (tầng hiển thị, đồng quy ước)', () => {
  it('displayValue(v,false)=v; displayValue(v,true)=reverseBits(v)=relations.reversed', () => {
    for (const h of HEXAGRAMS) {
      expect(displayValue(h.fuxiValue, false)).toBe(h.fuxiValue);
      expect(displayValue(h.fuxiValue, true)).toBe(reverseBits(h.fuxiValue, 6));
      expect(displayValue(h.fuxiValue, true)).toBe(h.relations.reversed);
    }
  });

  it('chuỗi & số đồng quy ước: parseInt(displayString(v,t)) === reverseBits(displayValue(v,t))', () => {
    for (let v = 0; v < 64; v++) {
      for (const t of [false, true]) {
        expect(parseInt(displayString(v, t), 2)).toBe(reverseBits(displayValue(v, t), 6));
      }
    }
  });

  it('displayString khớp hành vi cũ (linesToBinaryString theo dãy hào)', () => {
    for (let v = 0; v < 64; v++) {
      for (const t of [false, true]) {
        expect(displayString(v, t)).toBe(linesToBinaryString(valueToLines(v, 6), t));
      }
    }
  });

  it('cấp quẻ đơn (n=3): displayValue(id,true)=reverseBits(id,3)', () => {
    for (let v = 0; v < 8; v++) {
      expect(displayValue(v, true, 3)).toBe(reverseBits(v, 3));
      expect(displayString(v, true, 3)).toHaveLength(3);
    }
  });
});

// ── Bằng chứng phụ trợ: ĐL1 phát biểu lại ở mức bit đơn ──────────────────────
describe('phụ trợ — readingValue đảo MSB↔LSB', () => {
  it('hào đáy đơn lẻ: đáy→trên = 1, trên→đáy = 32', () => {
    const lines: Bit[] = valueToLines(1, 6);
    expect(readingValue(lines, false)).toBe(1);
    expect(readingValue(lines, true)).toBe(32);
    expect(complement(lines)).toEqual([0, 1, 1, 1, 1, 1]);
  });
});
