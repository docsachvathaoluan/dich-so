// ───────────────────────────────────────────────────────────────────────────
// 64 QUẺ KÉP — lắp ráp từ:
//   KING_WEN (cấu trúc trên/dưới, neo nguồn chuẩn) + TRIGRAMS (hào) +
//   INTERPRETATIONS (nội dung) + lib/relations (đối/đảo/hỗ).
// Hào, fuxiValue, binary, quan hệ đều được DERIVE → luôn nhất quán.
// ───────────────────────────────────────────────────────────────────────────
import type { Bit, Hexagram } from '@/types';
import { KING_WEN } from './kingWenSequence';
import { trigramByName } from './trigrams';
import { INTERPRETATIONS } from './interpretations';
import { TICH_QUAI_MONTH } from './monthHexagrams';
import {
  linesToValue,
  linesToBinaryString,
  joinTrigrams,
} from '@/lib/binary';
import { computeRelations, reversedValue, oppositeValue } from '@/lib/relations';
import { HEXAGRAM_EN } from '@/i18n/glossary';

const DEFAULT_SOURCES = [
  'Nguyễn Hiến Lê — Kinh Dịch: Đạo của người quân tử',
  'R. Wilhelm / C. Baynes — The I Ching',
  'Nguyên văn Hán (Thoán/Tượng): ctext.org · Wikisource 周易',
  'Diễn giải hiện đại: Dịch Số (tổng hợp)',
];

const DEFAULT_SOURCES_EN = [
  'James Legge — The Yî King (Sacred Books of the East, 1882; public domain)',
  'R. Wilhelm / C. Baynes — The I Ching (terminology reference)',
  'Classical Chinese (Judgment/Image): ctext.org · Wikisource 周易',
  'Modern interpretation: Dịch Số (synthesis)',
];

export const HEXAGRAMS: Hexagram[] = KING_WEN.map((entry, i) => {
  const kingWen = i + 1;
  const upperT = trigramByName(entry.upper);
  const lowerT = trigramByName(entry.lower);
  const lines = joinTrigrams(lowerT.lines, upperT.lines) as Bit[];
  const interp = INTERPRETATIONS[kingWen];

  if (!interp) {
    throw new Error(`Thiếu diễn giải cho quẻ Văn Vương #${kingWen}`);
  }

  const nameModern =
    upperT.id === lowerT.id
      ? upperT.nameModern
      : `${upperT.nameModern} trên ${lowerT.nameModern}`;

  const nameModernEn =
    upperT.id === lowerT.id
      ? upperT.nameModernEn
      : `${upperT.nameModernEn} over ${lowerT.nameModernEn}`;

  const gEn = HEXAGRAM_EN[kingWen];

  return {
    kingWen,
    fuxiValue: linesToValue(lines),
    binary: linesToBinaryString(lines, true),
    lines,
    upper: upperT.id,
    lower: lowerT.id,
    nameModern,
    nameHanViet: entry.nameHanViet,
    hanzi: entry.hanzi,
    judgmentClassic: interp.judgmentClassic ?? '',
    imageClassic: interp.imageClassic ?? '',
    modernShort: interp.modernShort,
    modernDeep: interp.modernDeep,
    keywords: interp.keywords,
    relations: computeRelations(lines),
    monthHexagram: TICH_QUAI_MONTH[kingWen],
    sources: DEFAULT_SOURCES,
    depth: interp.modernDeep ? 'sau' : 'ngan',
    // ── EN ──
    nameModernEn,
    pinyin: gEn.pinyin,
    wilhelm: gEn.wilhelm,
    sourcesEn: DEFAULT_SOURCES_EN,
    en: interp.en,
  };
});

// ── Tra cứu ──────────────────────────────────────────────────────────────────
const byKingWen = new Map<number, Hexagram>(
  HEXAGRAMS.map((h) => [h.kingWen, h])
);
const byFuxi = new Map<number, Hexagram>(
  HEXAGRAMS.map((h) => [h.fuxiValue, h])
);

export function hexagramByKingWen(n: number): Hexagram {
  const h = byKingWen.get(n);
  if (!h) throw new Error(`Không có quẻ Văn Vương #${n}`);
  return h;
}

export function hexagramByFuxi(value: number): Hexagram {
  const h = byFuxi.get(value);
  if (!h) throw new Error(`Không có quẻ fuxiValue=${value}`);
  return h;
}

// ── 32 cặp Đảo/Thác — bộ xương thứ tự Văn Vương ──────────────────────────────
// Luật "nhị nhị tương ngẫu, phi phúc tức biến": 64 quẻ ghép thành 32 cặp kề nhau
// (1-2, 3-4, …, 63-64), mỗi cặp là quẻ ĐẢO (綜, lật ngược) — hoặc ĐỐI (錯, bù bit)
// khi quẻ tự-Đảo (palindrome). `kind` tự kiểm bằng reversed/opposite (28 綜 + 4 錯).
export interface KingWenPair {
  a: Hexagram;
  b: Hexagram;
  kind: 'tong' | 'thac'; // 綜 đảo / 錯 đối
}

export function kingWenPairs(): KingWenPair[] {
  const pairs: KingWenPair[] = [];
  for (let kw = 1; kw <= 63; kw += 2) {
    const a = hexagramByKingWen(kw);
    const b = hexagramByKingWen(kw + 1);
    const kind: KingWenPair['kind'] =
      reversedValue(a.lines) === b.fuxiValue ? 'tong' : 'thac';
    pairs.push({ a, b, kind });
  }
  return pairs;
}

// ── Bất biến (kiểm khi DEV): 64 mã phải phủ đủ 0..63 ───────────────────────────
if (import.meta.env?.DEV) {
  const values = new Set(HEXAGRAMS.map((h) => h.fuxiValue));
  if (values.size !== 64) {
    console.error(
      `[Dịch Số] LỖI DỮ LIỆU: ${values.size}/64 mã nhị phân phân biệt — bảng Văn Vương sai!`
    );
  }
  for (let v = 0; v < 64; v++) {
    if (!values.has(v)) console.error(`[Dịch Số] thiếu mã nhị phân ${v}`);
  }
}
