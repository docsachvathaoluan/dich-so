// ───────────────────────────────────────────────────────────────────────────
// Kiểu dữ liệu dùng chung cho toàn app.
// Quy ước cốt lõi: `lines` luôn xếp từ ĐÁY → ĐỈNH (index 0 = hào 1 = đáy).
//   Hào dương (—) = 1, hào âm (- -) = 0.
//   Giá trị nhị phân chuẩn (id / fuxiValue): bit đáy = LSB.
//   → Càn [1,1,1] = 7 ; Khôn [0,0,0] = 0.
// ───────────────────────────────────────────────────────────────────────────

export type Bit = 0 | 1;

export type Parity = 'duong' | 'am'; // dương (lẻ) / âm (chẵn)

export type Element = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

/** 8 quẻ đơn (3 hào). */
export interface Trigram {
  /** 0..7 = giá trị nhị phân (bit đáy = LSB). */
  id: number;
  binary: string; // "111" (đỉnh→đáy để đọc như số)
  /**
   * Số thứ tự TIÊN THIÊN (Phục Hy/Thiệu Ung): Càn 1, Đoài 2, Ly 3, Chấn 4,
   * Tốn 5, Khảm 6, Cấn 7, Khôn 8. Đây là nhãn THỨ TỰ truyền thống — KHÁC với
   * `id` (giá trị nhị phân, Càn=7). Hai cái gặp nhau khi đảo chiều đọc (điểm Leibniz).
   */
  xianTian: number; // 1..8
  lines: [Bit, Bit, Bit]; // đáy → đỉnh
  nameModern: string; // "Trời"
  nameHanViet: string; // "Càn"
  hanzi: string; // "乾"
  symbol: string; // ký hiệu unicode ☰
  nature: string; // tượng tự nhiên
  element: Element;
  family: string; // Cha / Mẹ / Trưởng nam...
  dirEarlier: Direction; // Tiên Thiên
  dirLater: Direction; // Hậu Thiên
  luoshuNumber: number; // số Lạc Thư (cung Hậu Thiên)
  keywords: string[];
  modern: string; // diễn giải hiện đại (đầy đủ ở v1)
  // ── Tiếng Anh (bản EN) ──
  nameModernEn: string; // "Heaven" (gloss hiện đại — song song nameModern)
  pinyin: string; // "Qián" (romanization có dấu thanh)
  wilhelm: string; // "The Creative" (tên canon Wilhelm)
  natureEn: string; // tượng tự nhiên EN: "Heaven", "Thunder"…
  familyEn: string; // "Father", "Eldest Son"…
  keywordsEn: string[];
  modernEn: string; // diễn giải hiện đại EN (giọng nhà — song song modern)
}

/** 64 quẻ kép (6 hào). */
export interface Hexagram {
  kingWen: number; // 1..64 — thứ tự Văn Vương (LẤY TỪ BẢNG CHUẨN)
  fuxiValue: number; // 0..63 — giá trị nhị phân (bit đáy = LSB)
  binary: string; // "111111" (đỉnh→đáy)
  lines: Bit[]; // 6 hào, đáy → đỉnh
  upper: number; // id quẻ đơn trên (hào 4-5-6)
  lower: number; // id quẻ đơn dưới (hào 1-2-3)
  nameModern: string;
  nameHanViet: string;
  hanzi: string;
  judgmentClassic: string; // Thoán từ — ý cốt lõi (cổ); "" nếu chưa soạn
  imageClassic: string; // Đại Tượng (cổ); "" nếu chưa soạn
  modernShort: string; // diễn giải NGẮN (có ở v1)
  modernDeep?: DeepInterpretation; // diễn giải SÂU có cấu trúc (bổ sung dần)
  keywords: string[];
  relations: HexagramRelations;
  monthHexagram?: number; // 1..12 nếu là Tích quái
  sources: string[];
  depth: 'ngan' | 'sau'; // cờ tiến độ nội dung
  // ── Tiếng Anh (bản EN) ──
  nameModernEn: string; // "Fire over Water" (sinh từ tên quái EN) — đủ 64 ngay từ Đợt 2
  pinyin: string; // tên quẻ romanized: "Jì Jì"
  wilhelm: string; // tên canon Wilhelm: "After Completion"
  sourcesEn: string[];
  /** Carrier prose EN — copy từ Interpretation.en; component đọc qua pickLang. */
  en?: HexagramEn;
}

/** Khối prose EN cho một quẻ (song song modernShort/modernDeep/judgment/image bản VN). */
export interface HexagramEn {
  modernShort: string;
  keywords: string[];
  judgmentGloss?: string; // gloss EN của Thoán (giữ hán tự), đối chiếu Legge
  imageGloss?: string; // gloss EN của Đại Tượng
  modernDeep?: DeepInterpretation; // 5 tiểu mục, text EN
}

/**
 * Diễn giải SÂU có cấu trúc cho một quẻ — 5 tiểu mục cố định.
 * 3 mục đầu: phần KHUNG (tên quẻ đơn, quẻ liên quan, giá trị nhị phân) được auto-sinh từ
 *   dữ liệu khi render; ở đây chỉ lưu CÂU INSIGHT viết tay.
 * `linePositions` & `modernMapping`: viết tay hoàn toàn. `linePositions` là diễn giải
 *   TRUYỀN THỐNG (hào vị trung/chính/ứng) — render kèm ghi chú nguồn.
 */
export interface DeepInterpretation {
  structureInsight: string; // ① cơ chế từ 2 quẻ đơn chồng nhau
  transformInsight: string; // ② ý nghĩa mạng lưới đối/đảo/hỗ
  binaryInsight: string; // ③ vị trí trong thang nhị phân 0–63
  linePositions: string; // ④ hào vị (truyền thống)
  modernMapping: string; // ⑤ ánh xạ đời sống hiện đại (trọng tâm)
}

export interface HexagramRelations {
  opposite: number; // quẻ đối/thác (lật toàn bộ bit) — theo fuxiValue
  reversed: number; // quẻ đảo/tống (lật ngược trên-dưới) — theo fuxiValue
  nuclear: number; // quẻ hỗ (nhạch tâm) — theo fuxiValue
}

/**
 * Nội dung ĐIỀN TAY cho một quẻ, ngoài phần auto-sinh (trung/chính/ứng/danh-hào/quả–chúng
 * đều tính từ bit, KHÔNG lưu ở đây).
 *   - `textHV` (nguyên văn Hán-Việt/爻辞) là canon 🟡; `gloss`/`modern` là diễn giải ✍️.
 *   - `governing` chỉ lưu cho quẻ KHÔNG phải "quả–chúng"; quả–chúng suy được từ bit (soloLineIndex).
 */
export interface LineText {
  textHV: string; // nguyên văn Hán-Việt, vd "Tiềm long vật dụng"
  gloss: string; // dịch sát nghĩa đen
  modern: string; // ý nghĩa hiện đại (trọng tâm)
}

export interface HexagramExtra {
  lines?: LineText[]; // 6 phần tử, ĐÁY→ĐỈNH (khớp quy ước app); optional để ship dần
  extra?: LineText; // Dụng Cửu / Dụng Lục (chỉ Càn #1, Khôn #2)
  governing?: number[]; // index (đáy=0) hào chủ quẻ 卦主 (diễn giải) — chỉ khi KHÔNG auto được
  sequenceLogic?: string; // mạch Tự Quái 序卦傳: vì sao nối tiếp quẻ trước
  coreLesson?: string; // bài học cốt lõi
  /** Bản EN — song song. `lines[].textHV` dùng pinyin translit; gloss/modern là EN. */
  en?: {
    lines?: LineText[];
    extra?: LineText;
    sequenceLogic?: string;
    coreLesson?: string;
  };
}

export type Direction =
  | 'Nam'
  | 'Bắc'
  | 'Đông'
  | 'Tây'
  | 'Đông Nam'
  | 'Đông Bắc'
  | 'Tây Nam'
  | 'Tây Bắc'
  | 'Trung';

/** Một con số trong Hà Đồ / Lạc Thư. */
export interface CosmoNumber {
  value: number;
  parity: Parity; // lẻ=dương(trắng) / chẵn=âm(đen)
  direction: Direction;
  element?: Element;
  /** Hà Đồ: số cặp lệch 5. */
  pairValue?: number;
  /** Lạc Thư: vị trí lưới 3×3, [hàng, cột] 0..2 (hàng 0 = trên cùng = Nam). */
  gridPos?: [number, number];
  /** Lạc Thư: id quẻ đơn Hậu Thiên ứng với cung (ánh xạ sạch). */
  laterHeavenTrigram?: number;
}
