// ───────────────────────────────────────────────────────────────────────────
// BẢNG THỨ TỰ VĂN VƯƠNG (King Wen sequence) — 64 quẻ.
// Mỗi dòng: [quẻ TRÊN, quẻ DƯỚI, tên Hán-Việt, chữ Hán].
// LẤY TỪ NGUỒN CHUẨN (không suy từ nhị phân). Quy ước tên theo lối "trên/dưới"
// giống cách gọi cổ (vd 水雷屯 = Khảm trên / Chấn dưới = Truân).
// Đối chiếu: Wikipedia "King Wen sequence"; Nguyễn Hiến Lê; Wilhelm/Baynes.
// ───────────────────────────────────────────────────────────────────────────

export interface KingWenEntry {
  upper: string; // tên Hán-Việt quẻ đơn trên
  lower: string; // tên Hán-Việt quẻ đơn dưới
  nameHanViet: string;
  hanzi: string;
}

type Row = [string, string, string, string];

const ROWS: Row[] = [
  ['Càn', 'Càn', 'Thuần Càn', '乾'], // 1
  ['Khôn', 'Khôn', 'Thuần Khôn', '坤'], // 2
  ['Khảm', 'Chấn', 'Truân', '屯'], // 3
  ['Cấn', 'Khảm', 'Mông', '蒙'], // 4
  ['Khảm', 'Càn', 'Nhu', '需'], // 5
  ['Càn', 'Khảm', 'Tụng', '訟'], // 6
  ['Khôn', 'Khảm', 'Sư', '師'], // 7
  ['Khảm', 'Khôn', 'Tỷ', '比'], // 8
  ['Tốn', 'Càn', 'Tiểu Súc', '小畜'], // 9
  ['Càn', 'Đoài', 'Lý', '履'], // 10
  ['Khôn', 'Càn', 'Thái', '泰'], // 11
  ['Càn', 'Khôn', 'Bĩ', '否'], // 12
  ['Càn', 'Ly', 'Đồng Nhân', '同人'], // 13
  ['Ly', 'Càn', 'Đại Hữu', '大有'], // 14
  ['Khôn', 'Cấn', 'Khiêm', '謙'], // 15
  ['Chấn', 'Khôn', 'Dự', '豫'], // 16
  ['Đoài', 'Chấn', 'Tùy', '隨'], // 17
  ['Cấn', 'Tốn', 'Cổ', '蠱'], // 18
  ['Khôn', 'Đoài', 'Lâm', '臨'], // 19
  ['Tốn', 'Khôn', 'Quán', '觀'], // 20
  ['Ly', 'Chấn', 'Phệ Hạp', '噬嗑'], // 21
  ['Cấn', 'Ly', 'Bí', '賁'], // 22
  ['Cấn', 'Khôn', 'Bác', '剝'], // 23
  ['Khôn', 'Chấn', 'Phục', '復'], // 24
  ['Càn', 'Chấn', 'Vô Vọng', '無妄'], // 25
  ['Cấn', 'Càn', 'Đại Súc', '大畜'], // 26
  ['Cấn', 'Chấn', 'Di', '頤'], // 27
  ['Đoài', 'Tốn', 'Đại Quá', '大過'], // 28
  ['Khảm', 'Khảm', 'Tập Khảm', '坎'], // 29
  ['Ly', 'Ly', 'Thuần Ly', '離'], // 30
  ['Đoài', 'Cấn', 'Hàm', '咸'], // 31
  ['Chấn', 'Tốn', 'Hằng', '恆'], // 32
  ['Càn', 'Cấn', 'Độn', '遯'], // 33
  ['Chấn', 'Càn', 'Đại Tráng', '大壯'], // 34
  ['Ly', 'Khôn', 'Tấn', '晉'], // 35
  ['Khôn', 'Ly', 'Minh Di', '明夷'], // 36
  ['Tốn', 'Ly', 'Gia Nhân', '家人'], // 37
  ['Ly', 'Đoài', 'Khuê', '睽'], // 38
  ['Khảm', 'Cấn', 'Kiển', '蹇'], // 39
  ['Chấn', 'Khảm', 'Giải', '解'], // 40
  ['Cấn', 'Đoài', 'Tổn', '損'], // 41
  ['Tốn', 'Chấn', 'Ích', '益'], // 42
  ['Đoài', 'Càn', 'Quải', '夬'], // 43
  ['Càn', 'Tốn', 'Cấu', '姤'], // 44
  ['Đoài', 'Khôn', 'Tụy', '萃'], // 45
  ['Khôn', 'Tốn', 'Thăng', '升'], // 46
  ['Đoài', 'Khảm', 'Khốn', '困'], // 47
  ['Khảm', 'Tốn', 'Tỉnh', '井'], // 48
  ['Đoài', 'Ly', 'Cách', '革'], // 49
  ['Ly', 'Tốn', 'Đỉnh', '鼎'], // 50
  ['Chấn', 'Chấn', 'Thuần Chấn', '震'], // 51
  ['Cấn', 'Cấn', 'Thuần Cấn', '艮'], // 52
  ['Tốn', 'Cấn', 'Tiệm', '漸'], // 53
  ['Chấn', 'Đoài', 'Quy Muội', '歸妹'], // 54
  ['Chấn', 'Ly', 'Phong', '豐'], // 55
  ['Ly', 'Cấn', 'Lữ', '旅'], // 56
  ['Tốn', 'Tốn', 'Thuần Tốn', '巽'], // 57
  ['Đoài', 'Đoài', 'Thuần Đoài', '兌'], // 58
  ['Tốn', 'Khảm', 'Hoán', '渙'], // 59
  ['Khảm', 'Đoài', 'Tiết', '節'], // 60
  ['Tốn', 'Đoài', 'Trung Phu', '中孚'], // 61
  ['Chấn', 'Cấn', 'Tiểu Quá', '小過'], // 62
  ['Khảm', 'Ly', 'Ký Tế', '既濟'], // 63
  ['Ly', 'Khảm', 'Vị Tế', '未濟'], // 64
];

export const KING_WEN: KingWenEntry[] = ROWS.map(
  ([upper, lower, nameHanViet, hanzi]) => ({ upper, lower, nameHanViet, hanzi })
);
