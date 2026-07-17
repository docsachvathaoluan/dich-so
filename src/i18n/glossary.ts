// ───────────────────────────────────────────────────────────────────────────
// GLOSSARY — file NGUỒN NEO thuật ngữ tiếng Anh (deliverable cốt lõi của bản EN).
//
// House-style (đã chốt với user): tên hiển thị = GLOSS HIỆN ĐẠI đứng đầu (Heaven/Earth)
//   + PINYIN có dấu thanh (Qián/Kūn) + tên CANON Wilhelm trong ngoặc ("The Creative")
//   + hán tự. Thuật ngữ kỹ thuật theo sinology hiện đại (Five Phases, Taiji, Earlier/Later
//   Heaven). Văn cổ neo Legge (public domain) + Wilhelm — CHỈ mượn TÊN/thuật ngữ, KHÔNG
//   copy prose (Wilhelm–Baynes còn bản quyền).
//
// Nguồn tên/pinyin: Wikipedia "King Wen sequence" / bảng 64 quẻ; R. Wilhelm/C. Baynes
//   "The I Ching" (tên canon); pinyin chuẩn có dấu thanh.
// ───────────────────────────────────────────────────────────────────────────

/** Tên tiếng Anh cho 8 quẻ đơn — keyed theo tên Hán-Việt (khớp `trigramByName`). */
export interface TrigramGloss {
  modern: string; // gloss hiện đại: Heaven, Earth…
  pinyin: string; // romanization có dấu thanh: Qián, Kūn…
  wilhelm: string; // tên canon Wilhelm: "The Creative"…
  hanzi: string;
}

export const TRIGRAM_EN: Record<string, TrigramGloss> = {
  'Càn': { modern: 'Heaven', pinyin: 'Qián', wilhelm: 'The Creative', hanzi: '乾' },
  'Khôn': { modern: 'Earth', pinyin: 'Kūn', wilhelm: 'The Receptive', hanzi: '坤' },
  'Chấn': { modern: 'Thunder', pinyin: 'Zhèn', wilhelm: 'The Arousing', hanzi: '震' },
  'Khảm': { modern: 'Water', pinyin: 'Kǎn', wilhelm: 'The Abysmal', hanzi: '坎' },
  'Cấn': { modern: 'Mountain', pinyin: 'Gèn', wilhelm: 'Keeping Still', hanzi: '艮' },
  'Tốn': { modern: 'Wind', pinyin: 'Xùn', wilhelm: 'The Gentle', hanzi: '巽' },
  'Ly': { modern: 'Fire', pinyin: 'Lí', wilhelm: 'The Clinging', hanzi: '離' },
  'Đoài': { modern: 'Lake', pinyin: 'Duì', wilhelm: 'The Joyous', hanzi: '兌' },
};

/** Tên tiếng Anh cho 64 quẻ kép — keyed theo số Văn Vương (1..64).
 *  `pinyin` = tên quẻ romanized; `wilhelm` = tên canon Wilhelm dùng để đối chiếu tài liệu. */
export interface HexGloss {
  pinyin: string;
  wilhelm: string;
}

export const HEXAGRAM_EN: Record<number, HexGloss> = {
  1: { pinyin: 'Qián', wilhelm: 'The Creative' },
  2: { pinyin: 'Kūn', wilhelm: 'The Receptive' },
  3: { pinyin: 'Zhūn', wilhelm: 'Difficulty at the Beginning' },
  4: { pinyin: 'Méng', wilhelm: 'Youthful Folly' },
  5: { pinyin: 'Xū', wilhelm: 'Waiting (Nourishment)' },
  6: { pinyin: 'Sòng', wilhelm: 'Conflict' },
  7: { pinyin: 'Shī', wilhelm: 'The Army' },
  8: { pinyin: 'Bǐ', wilhelm: 'Holding Together (Union)' },
  9: { pinyin: 'Xiǎo Chù', wilhelm: 'The Taming Power of the Small' },
  10: { pinyin: 'Lǚ', wilhelm: 'Treading (Conduct)' },
  11: { pinyin: 'Tài', wilhelm: 'Peace' },
  12: { pinyin: 'Pǐ', wilhelm: 'Standstill (Stagnation)' },
  13: { pinyin: 'Tóng Rén', wilhelm: 'Fellowship with Men' },
  14: { pinyin: 'Dà Yǒu', wilhelm: 'Possession in Great Measure' },
  15: { pinyin: 'Qiān', wilhelm: 'Modesty' },
  16: { pinyin: 'Yù', wilhelm: 'Enthusiasm' },
  17: { pinyin: 'Suí', wilhelm: 'Following' },
  18: { pinyin: 'Gǔ', wilhelm: 'Work on What Has Been Spoiled (Decay)' },
  19: { pinyin: 'Lín', wilhelm: 'Approach' },
  20: { pinyin: 'Guān', wilhelm: 'Contemplation (View)' },
  21: { pinyin: 'Shì Kè', wilhelm: 'Biting Through' },
  22: { pinyin: 'Bì', wilhelm: 'Grace' },
  23: { pinyin: 'Bō', wilhelm: 'Splitting Apart' },
  24: { pinyin: 'Fù', wilhelm: 'Return (The Turning Point)' },
  25: { pinyin: 'Wú Wàng', wilhelm: 'Innocence (The Unexpected)' },
  26: { pinyin: 'Dà Chù', wilhelm: 'The Taming Power of the Great' },
  27: { pinyin: 'Yí', wilhelm: 'The Corners of the Mouth (Providing Nourishment)' },
  28: { pinyin: 'Dà Guò', wilhelm: 'Preponderance of the Great' },
  29: { pinyin: 'Kǎn', wilhelm: 'The Abysmal (Water)' },
  30: { pinyin: 'Lí', wilhelm: 'The Clinging (Fire)' },
  31: { pinyin: 'Xián', wilhelm: 'Influence (Wooing)' },
  32: { pinyin: 'Héng', wilhelm: 'Duration' },
  33: { pinyin: 'Dùn', wilhelm: 'Retreat' },
  34: { pinyin: 'Dà Zhuàng', wilhelm: 'The Power of the Great' },
  35: { pinyin: 'Jìn', wilhelm: 'Progress' },
  36: { pinyin: 'Míng Yí', wilhelm: 'Darkening of the Light' },
  37: { pinyin: 'Jiā Rén', wilhelm: 'The Family (The Clan)' },
  38: { pinyin: 'Kuí', wilhelm: 'Opposition' },
  39: { pinyin: 'Jiǎn', wilhelm: 'Obstruction' },
  40: { pinyin: 'Xiè', wilhelm: 'Deliverance' },
  41: { pinyin: 'Sǔn', wilhelm: 'Decrease' },
  42: { pinyin: 'Yì', wilhelm: 'Increase' },
  43: { pinyin: 'Guài', wilhelm: 'Break-through (Resoluteness)' },
  44: { pinyin: 'Gòu', wilhelm: 'Coming to Meet' },
  45: { pinyin: 'Cuì', wilhelm: 'Gathering Together (Massing)' },
  46: { pinyin: 'Shēng', wilhelm: 'Pushing Upward' },
  47: { pinyin: 'Kùn', wilhelm: 'Oppression (Exhaustion)' },
  48: { pinyin: 'Jǐng', wilhelm: 'The Well' },
  49: { pinyin: 'Gé', wilhelm: 'Revolution (Molting)' },
  50: { pinyin: 'Dǐng', wilhelm: 'The Cauldron' },
  51: { pinyin: 'Zhèn', wilhelm: 'The Arousing (Shock, Thunder)' },
  52: { pinyin: 'Gèn', wilhelm: 'Keeping Still (Mountain)' },
  53: { pinyin: 'Jiàn', wilhelm: 'Development (Gradual Progress)' },
  54: { pinyin: 'Guī Mèi', wilhelm: 'The Marrying Maiden' },
  55: { pinyin: 'Fēng', wilhelm: 'Abundance (Fullness)' },
  56: { pinyin: 'Lǚ', wilhelm: 'The Wanderer' },
  57: { pinyin: 'Xùn', wilhelm: 'The Gentle (The Penetrating, Wind)' },
  58: { pinyin: 'Duì', wilhelm: 'The Joyous (Lake)' },
  59: { pinyin: 'Huàn', wilhelm: 'Dispersion (Dissolution)' },
  60: { pinyin: 'Jié', wilhelm: 'Limitation' },
  61: { pinyin: 'Zhōng Fú', wilhelm: 'Inner Truth' },
  62: { pinyin: 'Xiǎo Guò', wilhelm: 'Preponderance of the Small' },
  63: { pinyin: 'Jì Jì', wilhelm: 'After Completion' },
  64: { pinyin: 'Wèi Jì', wilhelm: 'Before Completion' },
};

/** Ngũ hành → Five Phases (theo Needham; "Five Elements" là biến thể phổ thông). */
export const ELEMENT_EN: Record<string, string> = {
  Kim: 'Metal',
  Mộc: 'Wood',
  Thủy: 'Water',
  Hỏa: 'Fire',
  Thổ: 'Earth',
};

/** Phương vị (giữ quy ước cổ thư Nam trên / Bắc dưới). */
export const DIRECTION_EN: Record<string, string> = {
  'Nam': 'South',
  'Bắc': 'North',
  'Đông': 'East',
  'Tây': 'West',
  'Đông Nam': 'Southeast',
  'Đông Bắc': 'Northeast',
  'Tây Nam': 'Southwest',
  'Tây Bắc': 'Northwest',
  'Trung': 'Center',
};

/** Vai vế bát quái gia đình. */
export const FAMILY_EN: Record<string, string> = {
  'Cha': 'Father',
  'Mẹ': 'Mother',
  'Trưởng nam': 'Eldest Son',
  'Trưởng nữ': 'Eldest Daughter',
  'Trung nam': 'Middle Son',
  'Trung nữ': 'Middle Daughter',
  'Thiếu nam': 'Youngest Son',
  'Thiếu nữ': 'Youngest Daughter',
};

/**
 * Thuật ngữ kỹ thuật cốt lõi — dùng ở prose auto-sinh & UI. Neo theo sinology hiện đại.
 */
export const TERM_EN = {
  yin: 'Yin',
  yang: 'Yang',
  line: 'line', // 爻
  solidLine: 'solid (unbroken) line',
  brokenLine: 'broken line',
  trigram: 'trigram',
  hexagram: 'hexagram',
  eightTrigrams: 'the Eight Trigrams',
  taiji: 'Taiji (the Supreme Ultimate)',
  twoModes: 'the Two Modes',
  fourImages: 'the Four Images',
  fivePhases: 'the Five Phases',
  hetu: 'the Yellow River Map (Hetu)',
  luoshu: 'the Luo River Writing (Luoshu)',
  earlierHeaven: 'the Earlier Heaven (Fu Xi) arrangement',
  laterHeaven: 'the Later Heaven (King Wen) arrangement',
  kingWen: 'King Wen',
  fuXi: 'Fu Xi',
  judgment: 'the Judgment', // 卦辞
  image: 'the Image', // 大象
  sequence: 'the Sequence of the Hexagrams', // 序卦
  nuclear: 'nuclear hexagram', // 互
  opposite: 'opposite (complementary) hexagram', // 錯/旁通
  reversed: 'reversed (inverted) hexagram', // 綜
  governingLine: 'governing (ruling) line', // 卦主
  central: 'central', // 中
  correct: 'correct (in place)', // 正/當位
  centralCorrect: 'central and correct', // 中正
  resonant: 'resonant', // 應
} as const;
