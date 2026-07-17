import { describe, it, expect } from 'vitest';
import {
  linesToValue,
  valueToLines,
  readingValue,
  complement,
  reverseLines,
  reverseBits,
  countYang,
} from '@/lib/binary';
import { computeRelations, nuclearLines } from '@/lib/relations';
import { analyzeLinePositions } from '@/lib/linePositions';
import { fuxiCircleAngle, fuxiCircleStep } from '@/lib/layout';
import { isMagic, gridTotal, magicLines, MAGIC_CONSTANT, LUOSHU_GRID } from '@/lib/magicSquare';
import { TRIGRAMS, trigramByName, trigramFamilyRole } from '@/data/trigrams';
import { HEXAGRAMS, hexagramByKingWen, hexagramByFuxi } from '@/data/hexagrams';
import { KING_WEN } from '@/data/kingWenSequence';
import { INTERPRETATIONS } from '@/data/interpretations';
import { HETU_TOTAL, LUOSHU_TOTAL } from '@/data/cosmograms';
import { TICH_QUAI } from '@/data/monthHexagrams';
import type { Bit } from '@/types';

describe('binary', () => {
  it('Càn = 111 = 7, Khôn = 000 = 0 (đáy = LSB)', () => {
    expect(linesToValue([1, 1, 1])).toBe(7);
    expect(linesToValue([0, 0, 0])).toBe(0);
  });

  it('round-trip 0..63 (6 hào)', () => {
    for (let v = 0; v < 64; v++) {
      expect(linesToValue(valueToLines(v, 6))).toBe(v);
    }
  });

  it('readingValue đảo chiều khi top-first', () => {
    const lines: Bit[] = [1, 0, 0, 0, 0, 0]; // chỉ hào đáy
    expect(readingValue(lines, false)).toBe(1); // đáy = LSB
    expect(readingValue(lines, true)).toBe(32); // đáy = MSB
  });

  it('complement & reverse', () => {
    expect(complement([1, 0, 1])).toEqual([0, 1, 0]);
    expect(reverseLines([1, 0, 0, 0, 0, 1])).toEqual([1, 0, 0, 0, 0, 1].reverse());
  });

  it('countYang', () => {
    expect(countYang([1, 1, 1, 0, 0, 0])).toBe(3);
  });
});

describe('relations', () => {
  it('quẻ đối của Càn (63) là Khôn (0)', () => {
    const r = computeRelations([1, 1, 1, 1, 1, 1]);
    expect(r.opposite).toBe(0);
  });

  it('nuclearLines lấy hào 2-3-4 & 3-4-5', () => {
    const lines: Bit[] = [0, 1, 0, 1, 0, 1];
    // lower nuclear = [l1,l2,l3] = [1,0,1]; upper = [l2,l3,l4] = [0,1,0]
    expect(nuclearLines(lines)).toEqual([1, 0, 1, 0, 1, 0]);
  });

  it('quan hệ là song ánh (đối của đối = chính nó)', () => {
    for (const h of HEXAGRAMS) {
      const opp = hexagramByFuxi(h.relations.opposite);
      expect(opp.relations.opposite).toBe(h.fuxiValue);
    }
  });
});

describe('hào vị (trung/chính/ứng)', () => {
  it('Càn: hào 5 trung chính, các cặp ứng đều thuần dương → không ứng', () => {
    const a = analyzeLinePositions([1, 1, 1, 1, 1, 1]);
    expect(a.lines[4].centralCorrect).toBe(true); // hào 5
    expect(a.lines[1].central).toBe(true); // hào 2 trung
    expect(a.lines[1].correct).toBe(false); //   nhưng dương ở vị chẵn → lệch
    expect(a.correspondences.every((c) => !c.resonant)).toBe(true);
  });

  it('Thái [1,1,1,0,0,0]: cả ba cặp đều có ứng', () => {
    const a = analyzeLinePositions([1, 1, 1, 0, 0, 0]);
    expect(a.correspondences.every((c) => c.resonant)).toBe(true);
  });

  it('chính = dương ở vị lẻ / âm ở vị chẵn', () => {
    const a = analyzeLinePositions([1, 0, 1, 0, 1, 0]); // dương lẻ, âm chẵn → tất cả chính
    expect(a.lines.every((l) => l.correct)).toBe(true);
  });
});

describe('Lạc Thư (ma phương)', () => {
  it('mọi hàng/cột/chéo = 15', () => {
    expect(isMagic(LUOSHU_GRID)).toBe(true);
    for (const l of magicLines()) expect(l.sum).toBe(MAGIC_CONSTANT);
  });
  it('tổng lưới = 45', () => {
    expect(gridTotal()).toBe(45);
    expect(LUOSHU_TOTAL).toBe(45);
  });
});

describe('Hà Đồ', () => {
  it('tổng = 55', () => {
    expect(HETU_TOTAL).toBe(55);
  });
});

describe('Bát Quái (8 quẻ đơn)', () => {
  it('có đúng 8 quẻ, id 0..7 phân biệt', () => {
    expect(TRIGRAMS).toHaveLength(8);
    expect(new Set(TRIGRAMS.map((t) => t.id)).size).toBe(8);
  });
  it('Càn=7 [1,1,1], Khôn=0 [0,0,0]', () => {
    expect(trigramByName('Càn').id).toBe(7);
    expect(trigramByName('Khôn').id).toBe(0);
  });

  it('số tiên thiên là hoán vị 1..8, TÁCH BẠCH với id nhị phân', () => {
    const nums = TRIGRAMS.map((t) => t.xianTian).sort((a, b) => a - b);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // Càn: thứ tự Tiên Thiên = 1 nhưng giá trị nhị phân = 7 (không trùng — đúng chủ ý)
    expect(trigramByName('Càn').xianTian).toBe(1);
    expect(trigramByName('Càn').id).toBe(7);
    expect(trigramByName('Khôn').xianTian).toBe(8);
    expect(trigramByName('Ly').xianTian).toBe(3);
    expect(trigramByName('Khảm').xianTian).toBe(6);
  });

  it('vai trò "gia đình" suy từ bit KHỚP field family (không hardcode lệch)', () => {
    for (const t of TRIGRAMS) {
      expect(trigramFamilyRole(t.lines).role).toBe(t.family);
    }
  });

  it('cơ chế "mượn một vạch": vạch lẻ loi quyết định thứ & trai/gái', () => {
    // Chấn: 1 Dương ở đáy → trưởng nam, vạch mượn = hào 1 (index 0)
    const chan = trigramFamilyRole(trigramByName('Chấn').lines);
    expect(chan).toMatchObject({ role: 'Trưởng nam', gender: 'nam', rank: 'Trưởng', borrowedLine: 0 });
    // Đoài: 1 Âm ở trên → thiếu nữ, vạch mượn = hào 3 (index 2)
    const doai = trigramFamilyRole(trigramByName('Đoài').lines);
    expect(doai).toMatchObject({ role: 'Thiếu nữ', gender: 'nữ', rank: 'Thiếu', borrowedLine: 2 });
    // Cha/Mẹ thuần: không có vạch mượn
    expect(trigramFamilyRole(trigramByName('Càn').lines)).toMatchObject({ role: 'Cha', borrowedLine: null });
    expect(trigramFamilyRole(trigramByName('Khôn').lines)).toMatchObject({ role: 'Mẹ', borrowedLine: null });
  });
});

describe('Vòng Tiên Thiên 64 quẻ (Phương Viên Đồ) — TỰ KIỂM bằng phép tính', () => {
  it('reverseBits(6): Càn 63→63, Phục 1→32, Khôn 0→0', () => {
    expect(reverseBits(63, 6)).toBe(63);
    expect(reverseBits(1, 6)).toBe(32); // [1,0,0,0,0,0] → đỉnh=LSB
    expect(reverseBits(0, 6)).toBe(0);
  });

  it('Càn (63) ở ĐỈNH (0°), Khôn (0) ở ĐÁY (180°)', () => {
    expect(fuxiCircleAngle(63)).toBeCloseTo(0);
    expect(fuxiCircleAngle(0)).toBeCloseTo(180);
  });

  it('64 vị trí phân biệt, phủ kín 0..63 quanh vòng', () => {
    const steps = new Set(Array.from({ length: 64 }, (_, v) => fuxiCircleStep(v)));
    expect(steps.size).toBe(64);
    for (let j = 0; j < 64; j++) expect(steps.has(j)).toBe(true);
  });

  it('cặp bù-bit (v, 63−v) nằm ĐỐI TÂM 180°', () => {
    for (let v = 0; v < 64; v++) {
      const d = Math.abs(fuxiCircleAngle(v) - fuxiCircleAngle(63 - v));
      expect(Math.min(d, 360 - d)).toBeCloseTo(180);
    }
  });

  it('nửa Đông (đáy dương) ↔ nửa Tây (đáy âm): 32 quẻ = 192 hào mỗi nửa; số hào Dương Đông = số hào Âm Tây = 112', () => {
    let eastHex = 0, westHex = 0, eastYang = 0, westYin = 0;
    for (let v = 0; v < 64; v++) {
      const lines = valueToLines(v, 6);
      const yang = countYang(lines);
      if (lines[0] === 1) {
        // đáy = hào 1 dương → nửa Đông (gồm Càn ở đỉnh)
        eastHex++;
        eastYang += yang;
      } else {
        westHex++;
        westYin += 6 - yang;
      }
    }
    expect(eastHex).toBe(32);
    expect(westHex).toBe(32);
    expect(eastHex * 6).toBe(192);
    expect(westHex * 6).toBe(192);
    // ảnh gương bù-bit ⇒ tổng hào Dương nửa Đông = tổng hào Âm nửa Tây
    expect(eastYang).toBe(westYin);
    expect(eastYang).toBe(112);
  });
});

describe('64 quẻ kép — bất biến dữ liệu', () => {
  it('bảng Văn Vương đủ 64 dòng', () => {
    expect(KING_WEN).toHaveLength(64);
    expect(HEXAGRAMS).toHaveLength(64);
  });

  it('64 mã nhị phân phân biệt, phủ đủ 0..63', () => {
    const values = new Set(HEXAGRAMS.map((h) => h.fuxiValue));
    expect(values.size).toBe(64);
    for (let v = 0; v < 64; v++) expect(values.has(v)).toBe(true);
  });

  it('lines = ghép đúng quẻ dưới + quẻ trên', () => {
    for (const h of HEXAGRAMS) {
      expect(h.lines).toHaveLength(6);
      expect(linesToValue(h.lines.slice(0, 3) as Bit[])).toBe(h.lower);
      expect(linesToValue(h.lines.slice(3, 6) as Bit[])).toBe(h.upper);
      expect(h.lower + h.upper * 8).toBe(h.fuxiValue);
    }
  });

  it('đủ diễn giải cho 64 quẻ', () => {
    for (let k = 1; k <= 64; k++) {
      expect(INTERPRETATIONS[k]?.modernShort?.length).toBeGreaterThan(0);
    }
  });

  it('quẻ nào có diễn giải sâu thì đủ cả 5 tiểu mục (không rỗng)', () => {
    for (let k = 1; k <= 64; k++) {
      const deep = INTERPRETATIONS[k]?.modernDeep;
      if (!deep) continue; // chưa viết sâu — bỏ qua
      for (const field of [
        'structureInsight',
        'transformInsight',
        'binaryInsight',
        'linePositions',
        'modernMapping',
      ] as const) {
        expect(deep[field]?.trim().length, `#${k}.${field}`).toBeGreaterThan(0);
      }
    }
  });

  it('cả 64 quẻ đã có diễn giải sâu (modernDeep)', () => {
    for (let k = 1; k <= 64; k++) {
      expect(INTERPRETATIONS[k]?.modernDeep, `#${k} thiếu modernDeep`).toBeTruthy();
    }
  });

  const CJK = /[一-鿿]/; // có ít nhất một chữ Hán
  it('cả 64 quẻ có văn ngữ cổ Thoán/Tượng kèm chữ Hán', () => {
    for (let k = 1; k <= 64; k++) {
      const it = INTERPRETATIONS[k];
      expect(it?.judgmentClassic?.trim().length, `#${k}.judgmentClassic`).toBeGreaterThan(0);
      expect(it?.imageClassic?.trim().length, `#${k}.imageClassic`).toBeGreaterThan(0);
      expect(CJK.test(it!.judgmentClassic!), `#${k}.judgmentClassic thiếu Hán`).toBe(true);
      expect(CJK.test(it!.imageClassic!), `#${k}.imageClassic thiếu Hán`).toBe(true);
    }
  });

  it('quẻ mốc đúng tên', () => {
    expect(hexagramByKingWen(1).nameHanViet).toBe('Thuần Càn');
    expect(hexagramByKingWen(2).nameHanViet).toBe('Thuần Khôn');
    expect(hexagramByKingWen(63).nameHanViet).toBe('Ký Tế');
    expect(hexagramByKingWen(64).nameHanViet).toBe('Vị Tế');
  });
});

describe('12 Tích quái', () => {
  it('Phục (#24) = 1 hào dương, tháng 11 (Đông chí)', () => {
    const phuc = hexagramByKingWen(24);
    expect(countYang(phuc.lines)).toBe(1);
    expect(phuc.monthHexagram).toBe(11);
  });

  it('Cấu (#44) = 1 hào âm (5 dương), tháng 5 (Hạ chí)', () => {
    const cau = hexagramByKingWen(44);
    expect(countYang(cau.lines)).toBe(5);
    expect(cau.monthHexagram).toBe(5);
  });

  it('số hào dương đúng theo bảng tích quái', () => {
    for (const tq of TICH_QUAI) {
      expect(countYang(hexagramByKingWen(tq.kingWen).lines)).toBe(tq.yang);
    }
  });

  it('12 con giáp đầy đủ & phân biệt; Mão = Mèo (kiểu Việt)', () => {
    const animals = TICH_QUAI.map((t) => t.animal);
    expect(animals).toHaveLength(12);
    expect(new Set(animals).size).toBe(12);
    expect(animals.every((a) => a.length > 0)).toBe(true);
    expect(TICH_QUAI.find((t) => t.branch === 'Mão')?.animal).toBe('Mèo');
  });
});
