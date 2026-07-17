// Cấu hình "bản đồ lớp" — thứ tự gợi ý từ Đại vũ trụ → Tiểu vũ trụ.
export interface LayerMeta {
  id: number;
  path: string;
  title: string;
  subtitle: string;
  symbol: string;
  group: string;
  titleEn: string;
  subtitleEn: string;
}

export const LAYERS: LayerMeta[] = [
  { id: 0, path: '/goc', title: 'Gốc của Dịch', subtitle: 'Âm · Dương · Thái Cực', symbol: '☯', group: 'Khởi đầu', titleEn: 'The Root of the Changes', subtitleEn: 'Yin · Yang · Taiji' },
  { id: 1, path: '/bat-quai', title: 'Sinh đôi & Bát Quái', subtitle: 'Bit → 8 quẻ đơn (3 bit)', symbol: '⑃', group: 'Cấu trúc', titleEn: 'Doubling & the Eight Trigrams', subtitleEn: 'Bit → 8 trigrams (3 bits)' },
  { id: 2, path: '/ha-do-lac-thu', title: 'Hà Đồ · Lạc Thư → Bát Quái', subtitle: 'Gốc số → Tiên/Hậu Thiên → Nhân', symbol: '𝍢', group: 'Cấu trúc', titleEn: 'Hetu · Luoshu → the Trigrams', subtitleEn: 'Number roots → Earlier/Later Heaven → Humanity' },
  { id: 3, path: '/vu-tru-mua', title: 'Vũ trụ & Mùa', subtitle: '12 Tích quái · con giáp · Bắc Đẩu', symbol: '◴', group: 'Vận hành', titleEn: 'Cosmos & Seasons', subtitleEn: '12 sovereign hexagrams · zodiac · the Dipper' },
  { id: 4, path: '/64-que', title: '64 Quẻ & Cách lập quẻ', subtitle: 'Ma trận · Phương Viên Đồ · gieo quẻ', symbol: '▦', group: 'Vận hành', titleEn: 'The 64 Hexagrams & How They Form', subtitleEn: 'Matrix · Square-and-Round · casting' },
  { id: 7, path: '/xuyen-tang', title: 'Xuyên tầng', subtitle: 'Ôn 6 tầng · 20 họ · gập vuông↔tròn', symbol: '⇌', group: 'Đúc kết', titleEn: 'Across the Layers', subtitleEn: '6 layers recapped · 20 families · fold square↔circle' },
  // Glyph hình ❧ (hoa văn thủy mặc) — đồng bộ bộ icon hình; KHÔNG dùng quẻ bát quái (trùng hệ ký hiệu app) hay chữ Hán.
  { id: 5, path: '/minh-triet', title: 'Minh triết Lão–Trang', subtitle: 'Đạo gia cộng hưởng với Dịch', symbol: '❧', group: 'Minh triết', titleEn: 'Laozi–Zhuangzi Wisdom', subtitleEn: 'Daoist resonance with the Changes' },
  { id: 6, path: '/phuong-phap', title: 'Phương pháp & Nguồn', subtitle: 'Về dự án Dịch Số', symbol: '✦', group: 'Về dự án', titleEn: 'Method & Sources', subtitleEn: 'About the Dịch Số project' },
];
