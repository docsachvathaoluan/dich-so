// ───────────────────────────────────────────────────────────────────────────
// 8 QUẺ ĐƠN (Bát Quái). id & binary được DERIVE từ `lines` (đáy→đỉnh) để luôn
// nhất quán với lib/binary. Phương vị Tiên Thiên (đối xứng) & Hậu Thiên (Lạc Thư).
//
// Nguồn tham chiếu: Nguyễn Hiến Lê "Kinh Dịch - Đạo của người quân tử";
//   Wilhelm/Baynes "The I Ching"; Wikipedia "Bagua".
// ───────────────────────────────────────────────────────────────────────────
import type { Bit, Direction, Element, Trigram } from '@/types';
import { linesToValue, linesToBinaryString } from '@/lib/binary';
import { TRIGRAM_EN, FAMILY_EN } from '@/i18n/glossary';

interface RawTrigram {
  lines: [Bit, Bit, Bit];
  xianTian: number; // số thứ tự Tiên Thiên (Thiệu Ung): Càn 1 … Khôn 8
  nameModern: string;
  nameHanViet: string;
  hanzi: string;
  symbol: string;
  nature: string;
  element: Element;
  family: string;
  dirEarlier: Direction;
  dirLater: Direction;
  luoshuNumber: number;
  keywords: string[];
  modern: string;
  // ── EN (nameModernEn/pinyin/wilhelm/familyEn derive từ glossary trong map) ──
  natureEn: string;
  keywordsEn: string[];
  modernEn: string;
}

const RAW: RawTrigram[] = [
  {
    lines: [0, 0, 0],
    xianTian: 8,
    nameModern: 'Đất',
    nameHanViet: 'Khôn',
    hanzi: '坤',
    symbol: '☷',
    nature: 'Đất',
    element: 'Thổ',
    family: 'Mẹ',
    dirEarlier: 'Bắc',
    dirLater: 'Tây Nam',
    luoshuNumber: 2,
    keywords: ['thuận', 'nuôi dưỡng', 'bao dung', 'tiếp nhận'],
    modern:
      'Ba hào âm — trạng thái “toàn 0”, thuần tiếp nhận. Đất không khởi xướng mà nâng đỡ, chứa đựng và làm cho mọi mầm sống thành hình. Là nguyên lý của sự bền bỉ, khiêm hạ và năng lực hiện thực hoá ý tưởng của Trời.',
    natureEn: 'Earth',
    keywordsEn: ['yielding', 'nurturing', 'receptive', 'devoted'],
    modernEn:
      'Three yin lines — the "all zeros" state, pure receptivity. Earth does not initiate but supports, contains, and lets every seed take form. It is the principle of endurance, humility, and the power to make Heaven’s ideas real.',
  },
  {
    lines: [1, 0, 0],
    xianTian: 4,
    nameModern: 'Sấm',
    nameHanViet: 'Chấn',
    hanzi: '震',
    symbol: '☳',
    nature: 'Sấm sét',
    element: 'Mộc',
    family: 'Trưởng nam',
    dirEarlier: 'Đông Bắc',
    dirLater: 'Đông',
    luoshuNumber: 3,
    keywords: ['khởi động', 'chấn động', 'bùng nổ', 'đánh thức'],
    modern:
      'Một hào dương vừa nhú lên dưới đáy — tia lửa đầu tiên của chuyển động. Sấm là cú hích đánh thức, năng lượng bùng phát từ tĩnh sang động, khởi đầu của mọi hành trình mới.',
    natureEn: 'Thunder',
    keywordsEn: ['arousing', 'shock', 'eruption', 'awakening'],
    modernEn:
      'A single yang line just breaking through at the bottom — the first spark of movement. Thunder is the jolt that awakens, energy bursting from stillness into motion, the start of every new journey.',
  },
  {
    lines: [0, 1, 0],
    xianTian: 6,
    nameModern: 'Nước',
    nameHanViet: 'Khảm',
    hanzi: '坎',
    symbol: '☵',
    nature: 'Nước / vực sâu',
    element: 'Thủy',
    family: 'Trung nam',
    dirEarlier: 'Tây',
    dirLater: 'Bắc',
    luoshuNumber: 1,
    keywords: ['hiểm', 'chảy', 'thẩm thấu', 'kiên trì'],
    modern:
      'Hào dương kẹt giữa hai hào âm — sức mạnh bị vây trong hiểm nguy. Nước luồn lách, kiên trì tìm đường, nguy hiểm nhưng cũng là phép thử của ý chí. Càng bị ép, càng tìm ra khe để chảy.',
    natureEn: 'Water / the abyss',
    keywordsEn: ['danger', 'flowing', 'seeping', 'perseverance'],
    modernEn:
      'A yang line trapped between two yin lines — strength hemmed in by danger. Water threads its way through, persistently seeking a path; peril, yet a test of will. The more it is pressed, the more it finds a crack to flow through.',
  },
  {
    lines: [1, 1, 0],
    xianTian: 2,
    nameModern: 'Đầm',
    nameHanViet: 'Đoài',
    hanzi: '兌',
    symbol: '☱',
    nature: 'Đầm / hồ',
    element: 'Kim',
    family: 'Thiếu nữ',
    dirEarlier: 'Đông Nam',
    dirLater: 'Tây',
    luoshuNumber: 7,
    keywords: ['vui', 'giao tiếp', 'cởi mở', 'trao đổi'],
    modern:
      'Hào âm mềm phủ trên hai hào dương — mặt nước phẳng lặng ánh lên niềm vui. Đầm là sự cởi mở, trò chuyện, trao đổi và làm hài lòng; sức mạnh được bọc trong sự dịu dàng.',
    natureEn: 'Lake / marsh',
    keywordsEn: ['joy', 'communication', 'openness', 'exchange'],
    modernEn:
      'A soft yin line resting over two yang lines — a still water surface shining with joy. The Lake is openness, conversation, exchange, and giving pleasure; strength wrapped in gentleness.',
  },
  {
    lines: [0, 0, 1],
    xianTian: 7,
    nameModern: 'Núi',
    nameHanViet: 'Cấn',
    hanzi: '艮',
    symbol: '☶',
    nature: 'Núi',
    element: 'Thổ',
    family: 'Thiếu nam',
    dirEarlier: 'Tây Bắc',
    dirLater: 'Đông Bắc',
    luoshuNumber: 8,
    keywords: ['dừng', 'tĩnh', 'giới hạn', 'thiền định'],
    modern:
      'Hào dương đậu trên đỉnh, bên dưới yên tĩnh — núi đứng im. Cấn là biết dừng đúng lúc, sự tĩnh tại, ranh giới và chiêm nghiệm. Dừng lại cũng là một hành động có chủ đích.',
    natureEn: 'Mountain',
    keywordsEn: ['stopping', 'stillness', 'limit', 'meditation'],
    modernEn:
      'A yang line perched at the summit, quiet below — the mountain stands still. Gen is knowing when to stop, stillness, boundary, and reflection. To halt is itself a deliberate act.',
  },
  {
    lines: [1, 0, 1],
    xianTian: 3,
    nameModern: 'Lửa',
    nameHanViet: 'Ly',
    hanzi: '離',
    symbol: '☲',
    nature: 'Lửa / mặt trời',
    element: 'Hỏa',
    family: 'Trung nữ',
    dirEarlier: 'Đông',
    dirLater: 'Nam',
    luoshuNumber: 9,
    keywords: ['sáng', 'bám víu', 'nhận thức', 'rực rỡ'],
    modern:
      'Hào âm trống ở giữa hai hào dương — ngọn lửa cần chất bám để cháy. Ly là ánh sáng, sự minh mẫn, vẻ đẹp và nhận thức; nó soi tỏ mọi vật nhưng phải nương tựa vào cái khác mới tồn tại.',
    natureEn: 'Fire / the sun',
    keywordsEn: ['brightness', 'clinging', 'awareness', 'radiance'],
    modernEn:
      'A hollow yin line between two yang lines — a flame that needs fuel to cling to and burn. Li is light, clarity, beauty, and awareness; it illuminates everything, yet must depend on something else to exist.',
  },
  {
    lines: [0, 1, 1],
    xianTian: 5,
    nameModern: 'Gió',
    nameHanViet: 'Tốn',
    hanzi: '巽',
    symbol: '☴',
    nature: 'Gió / cây',
    element: 'Mộc',
    family: 'Trưởng nữ',
    dirEarlier: 'Tây Nam',
    dirLater: 'Đông Nam',
    luoshuNumber: 4,
    keywords: ['thẩm thấu', 'mềm dẻo', 'lan tỏa', 'tùy thuận'],
    modern:
      'Hào âm ở đáy nâng đỡ hai hào dương — gió len vào mọi kẽ hở. Tốn là sự thẩm thấu nhẹ nhàng mà bền bỉ, ảnh hưởng dần dần thay vì áp đặt; mềm mại nhưng đi tới đâu cũng thấm.',
    natureEn: 'Wind / wood',
    keywordsEn: ['penetrating', 'flexible', 'pervading', 'compliant'],
    modernEn:
      'A yin line at the base supporting two yang lines — wind slips into every crevice. Xun is gentle yet relentless penetration, influence that spreads gradually rather than by force; soft, but it soaks in wherever it goes.',
  },
  {
    lines: [1, 1, 1],
    xianTian: 1,
    nameModern: 'Trời',
    nameHanViet: 'Càn',
    hanzi: '乾',
    symbol: '☰',
    nature: 'Trời',
    element: 'Kim',
    family: 'Cha',
    dirEarlier: 'Nam',
    dirLater: 'Tây Bắc',
    luoshuNumber: 6,
    keywords: ['sáng tạo', 'chủ động', 'mạnh mẽ', 'khởi nguyên'],
    modern:
      'Ba hào dương — trạng thái “toàn 1”, thuần sáng tạo. Trời là năng lượng khởi nguyên, vận động không ngừng, chủ động và cương kiện. Là ý chí phát khởi mọi sự, nguồn lực thúc đẩy vũ trụ tiến về phía trước.',
    natureEn: 'Heaven',
    keywordsEn: ['creative', 'initiative', 'strength', 'origination'],
    modernEn:
      'Three yang lines — the "all ones" state, pure creativity. Heaven is originating energy, ceaseless movement, active and firm. It is the will that sets everything in motion, the force driving the universe forward.',
  },
];

export const TRIGRAMS: Trigram[] = RAW.map((t) => {
  const g = TRIGRAM_EN[t.nameHanViet];
  return {
    ...t,
    id: linesToValue(t.lines),
    binary: linesToBinaryString(t.lines, true),
    nameModernEn: g.modern,
    pinyin: g.pinyin,
    wilhelm: g.wilhelm,
    familyEn: FAMILY_EN[t.family] ?? t.family,
  };
});

const byId = new Map<number, Trigram>(TRIGRAMS.map((t) => [t.id, t]));

export function trigramById(id: number): Trigram {
  const t = byId.get(id);
  if (!t) throw new Error(`Không có quẻ đơn id=${id}`);
  return t;
}

/** Tra quẻ đơn theo tên Hán-Việt (Càn, Khôn, ...). */
const byHanViet = new Map<string, Trigram>(
  TRIGRAMS.map((t) => [t.nameHanViet, t])
);
export function trigramByName(name: string): Trigram {
  const t = byHanViet.get(name);
  if (!t) throw new Error(`Không có quẻ đơn tên=${name}`);
  return t;
}

// ───────────────────────────────────────────────────────────────────────────
// "GIA ĐÌNH" Bát Quái — suy vai trò TỪ BIT (không hardcode). Cha=thuần Dương,
// Mẹ=thuần Âm; sáu con sinh do cha/mẹ "mượn một vạch" của người kia. Vạch lẻ loi
// (hào thiểu số) chính là vạch mượn: vị trí của nó (đáy/giữa/trên) → thứ
// (trưởng/trung/thiếu); âm/dương của nó → gái/trai.
// Có unit test (tests/lib.test.ts) khẳng định `role` khớp field `family` của TRIGRAMS.
// ───────────────────────────────────────────────────────────────────────────

export interface FamilyRole {
  /** Nhãn vai trò, khớp đúng field `family`: 'Cha' | 'Mẹ' | 'Trưởng nam' | … */
  role: string;
  gender: 'nam' | 'nữ' | null; // null cho Cha/Mẹ (thuần)
  rank: 'Trưởng' | 'Trung' | 'Thiếu' | null;
  /** Index (đáy=0) của vạch lẻ loi = vạch "mượn"; null cho Cha/Mẹ. */
  borrowedLine: number | null;
}

const RANK_BY_INDEX = ['Trưởng', 'Trung', 'Thiếu'] as const;

/** Suy vai trò "gia đình" của một quẻ đơn từ ba hào (đáy→đỉnh). */
export function trigramFamilyRole(lines: [Bit, Bit, Bit]): FamilyRole {
  const yang = lines.reduce<number>((acc, b) => acc + b, 0);
  if (yang === 3) return { role: 'Cha', gender: null, rank: null, borrowedLine: null };
  if (yang === 0) return { role: 'Mẹ', gender: null, rank: null, borrowedLine: null };

  // 1 hào lẻ loi quyết định: 1 Dương → con trai; 1 Âm → con gái.
  const gender: 'nam' | 'nữ' = yang === 1 ? 'nam' : 'nữ';
  const loneBit: Bit = yang === 1 ? 1 : 0;
  const borrowedLine = lines.findIndex((b) => b === loneBit);
  const rank = RANK_BY_INDEX[borrowedLine];
  return { role: `${rank} ${gender}`, gender, rank, borrowedLine };
}
