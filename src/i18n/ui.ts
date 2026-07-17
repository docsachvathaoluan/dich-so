// ───────────────────────────────────────────────────────────────────────────
// Chuỗi UI đơn (Tầng 1) — nút, nhãn, heading, aria. Prose giàu markup (Tầng 2) KHÔNG
// nằm ở đây: dùng mẫu `lang === 'en' ? <En/> : <Vi/>` ngay trong component.
// ───────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/store/useSettings';

type Msg = Record<Lang, string>;

export const UI: Record<string, Msg> = {
  // ── Chrome / App ──
  'app.tagline': { vi: 'Kinh Dịch qua lăng kính nhị phân', en: 'The I Ching through a binary lens' },
  'app.openMap': { vi: 'Mở bản đồ lớp', en: 'Open layer map' },
  'app.collapseSidebar': { vi: 'Thu gọn sidebar', en: 'Collapse sidebar' },
  'app.expandSidebar': { vi: 'Mở rộng sidebar', en: 'Expand sidebar' },
  'app.lang.toVi': { vi: 'Tiếng Việt', en: 'Vietnamese' },
  'app.lang.toEn': { vi: 'English', en: 'English' },
  'app.lang.switchAria': { vi: 'Chuyển ngôn ngữ', en: 'Switch language' },

  // ── Nhóm nav (group) ──
  'group.Khởi đầu': { vi: 'Khởi đầu', en: 'Beginnings' },
  'group.Cấu trúc': { vi: 'Cấu trúc', en: 'Structure' },
  'group.Vận hành': { vi: 'Vận hành', en: 'Dynamics' },
  'group.Đúc kết': { vi: 'Đúc kết', en: 'Synthesis' },
  'group.Minh triết': { vi: 'Minh triết', en: 'Wisdom' },
  'group.Về dự án': { vi: 'Về dự án', en: 'About' },

  // ── Settings menu / bar ──
  'settings.title': { vi: 'Hiển thị', en: 'Display' },
  'settings.options': { vi: 'Tuỳ chọn hiển thị', en: 'Display options' },
  'settings.name': { vi: 'Tên chính', en: 'Name' },
  'settings.name.modern': { vi: 'Hiện đại', en: 'Modern' },
  'settings.name.hanviet': { vi: 'Hán-Việt', en: 'Pinyin' }, // EN mode: slot phụ = pinyin
  'settings.color': { vi: 'Màu quẻ', en: 'Line color' },
  'settings.color.duality': { vi: 'Âm–Dương', en: 'Yin–Yang' },
  'settings.color.wuxing': { vi: 'Ngũ hành', en: 'Five Phases' },
  'settings.color.dualityTitle': {
    vi: 'Tô quẻ theo Âm (ngọc lục) / Dương (vàng kim)',
    en: 'Color lines by Yin (jade) / Yang (gold)',
  },
  'settings.color.wuxingTitle': {
    vi: 'Tô quẻ theo Ngũ hành (mỗi hành một màu, theo nửa quẻ)',
    en: 'Color by the Five Phases (one hue per phase, by trigram half)',
  },
  'settings.wuxingNote': {
    vi: 'Ngũ hành gắn ở tầng bát quái (mỗi quẻ đơn = 1 hành). Vạch liền/đứt vẫn cho biết Dương/Âm.',
    en: 'The Five Phases attach at the trigram level (one phase per trigram). Solid/broken lines still mark Yang/Yin.',
  },
  'settings.hanzi': { vi: '漢 chữ Hán', en: '漢 Hanzi' },
  'settings.hanzi.title': {
    vi: 'Bật/tắt hiển thị chữ Hán (乾)',
    en: 'Toggle Chinese characters (乾)',
  },
  // "Ống kính" để dành riêng cho Lý·Tượng·Số·Từ (trang Gốc của Dịch) — ở đây là CHIỀU ĐỌC.
  'settings.reading': { vi: 'Chiều đọc', en: 'Reading direction' },
  'settings.reading.bottom': { vi: 'đáy→trên', en: 'bottom→top' },
  'settings.reading.leibniz': { vi: 'trên→đáy (Leibniz)', en: 'top→bottom (Leibniz)' },
  'settings.reading.title': {
    vi: 'Chiều đọc hào — đổi cách đánh số quẻ trong demo này (đáy→trên ↔ Leibniz trên→đáy)',
    en: 'Line-reading direction — flips how hexagram values are numbered in this demo (bottom→top ↔ Leibniz top→bottom)',
  },
  'settings.wisdom': { vi: '道 Minh triết Lão–Trang', en: '道 Daoist wisdom' },
  'settings.wisdom.title': {
    vi: 'Bật/tắt thẻ minh triết Lão–Trang (đối chiếu Đạo gia)',
    en: 'Toggle the Laozi–Zhuangzi wisdom cards (Daoist resonance)',
  },

  // ── NoteCallout (ghi chú trung thực) ──
  'note.verified': { vi: 'Kiểm được', en: 'Verifiable' },
  'note.traditional': { vi: 'Diễn giải truyền thống', en: 'Traditional reading' },
  'note.source': { vi: 'Nguồn', en: 'Source' },

  // ── Trang Đúc kết: nhãn tầng (dải mở đầu + chip từng khối) ──
  // Cùng chuỗi render HAI chỗ (dải anchor + chip khối) nên để Tầng 1, lệch nhau là thấy ngay.
  // EN neo theo pinyin trang /goc đang dùng cho Bốn ống kính (Xiang · Li · Shu).
  'spine.lens.shu': { vi: 'SỐ 數', en: 'SHU 數' },
  'spine.lens.xiang': { vi: 'TƯỢNG 象', en: 'XIANG 象' },
  'spine.lens.li': { vi: 'LÝ 理', en: 'LI 理' },

  // ── Chung ──
  'common.on': { vi: 'bật', en: 'on' },
  'common.off': { vi: 'tắt', en: 'off' },
};
