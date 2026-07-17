// ───────────────────────────────────────────────────────────────────────────
// 12 TÍCH QUÁI (quẻ "thiên thời" / 12 message hexagrams) — ứng 12 tháng.
// Hào dương lớn dần (Phục→Càn) rồi hào âm lớn dần (Cấu→Khôn), như đếm nhị phân.
// Lưu ý: tích quái gốc theo THÁNG ÂM LỊCH (canh theo trung khí). 4 mốc chắc chắn:
//   Phục = Đông chí, Đại Tráng = Xuân phân, Cấu = Hạ chí, Quán = Thu phân.
// File này KHÔNG import data/hexagrams để tránh phụ thuộc vòng.
// ───────────────────────────────────────────────────────────────────────────

export interface TichQuai {
  kingWen: number;
  lunarMonth: number; // tháng âm lịch (11 = Tý/đông chí)
  branch: string; // Địa Chi
  animal: string; // con giáp (Việt: Mão = Mèo)
  yang: number; // số hào dương
  solarTerm?: string; // tiết khí mốc (chỉ 4 điểm chắc chắn)
  // ── EN: Địa Chi romanized (pinyin) + con giáp quốc tế (Mão = Rabbit, không phải Cat) ──
  branchEn: string; // Earthly Branch romanized: Zǐ, Chǒu…
  animalEn: string; // international zodiac animal
  solarTermEn?: string;
}

/** Theo thứ tự dương khí tăng dần rồi âm khí tăng dần (bắt đầu từ Đông chí). */
export const TICH_QUAI: TichQuai[] = [
  { kingWen: 24, lunarMonth: 11, branch: 'Tý', animal: 'Chuột', yang: 1, solarTerm: 'Đông chí', branchEn: 'Zǐ', animalEn: 'Rat', solarTermEn: 'Winter Solstice' }, // Phục
  { kingWen: 19, lunarMonth: 12, branch: 'Sửu', animal: 'Trâu', yang: 2, branchEn: 'Chǒu', animalEn: 'Ox' }, // Lâm
  { kingWen: 11, lunarMonth: 1, branch: 'Dần', animal: 'Hổ', yang: 3, branchEn: 'Yín', animalEn: 'Tiger' }, // Thái
  { kingWen: 34, lunarMonth: 2, branch: 'Mão', animal: 'Mèo', yang: 4, solarTerm: 'Xuân phân', branchEn: 'Mǎo', animalEn: 'Rabbit', solarTermEn: 'Spring Equinox' }, // Đại Tráng
  { kingWen: 43, lunarMonth: 3, branch: 'Thìn', animal: 'Rồng', yang: 5, branchEn: 'Chén', animalEn: 'Dragon' }, // Quải
  { kingWen: 1, lunarMonth: 4, branch: 'Tỵ', animal: 'Rắn', yang: 6, branchEn: 'Sì', animalEn: 'Snake' }, // Càn
  { kingWen: 44, lunarMonth: 5, branch: 'Ngọ', animal: 'Ngựa', yang: 5, solarTerm: 'Hạ chí', branchEn: 'Wǔ', animalEn: 'Horse', solarTermEn: 'Summer Solstice' }, // Cấu (1 âm)
  { kingWen: 33, lunarMonth: 6, branch: 'Mùi', animal: 'Dê', yang: 4, branchEn: 'Wèi', animalEn: 'Goat' }, // Độn
  { kingWen: 12, lunarMonth: 7, branch: 'Thân', animal: 'Khỉ', yang: 3, branchEn: 'Shēn', animalEn: 'Monkey' }, // Bĩ
  { kingWen: 20, lunarMonth: 8, branch: 'Dậu', animal: 'Gà', yang: 2, solarTerm: 'Thu phân', branchEn: 'Yǒu', animalEn: 'Rooster', solarTermEn: 'Autumn Equinox' }, // Quán
  { kingWen: 23, lunarMonth: 9, branch: 'Tuất', animal: 'Chó', yang: 1, branchEn: 'Xū', animalEn: 'Dog' }, // Bác
  { kingWen: 2, lunarMonth: 10, branch: 'Hợi', animal: 'Heo', yang: 0, branchEn: 'Hài', animalEn: 'Pig' }, // Khôn
];

/** Map nhanh: kingWen → tháng âm lịch (để gắn cờ monthHexagram cho hexagrams). */
export const TICH_QUAI_MONTH: Record<number, number> = Object.fromEntries(
  TICH_QUAI.map((t) => [t.kingWen, t.lunarMonth])
);
