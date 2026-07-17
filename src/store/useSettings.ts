// ───────────────────────────────────────────────────────────────────────────
// Công tắc toàn cục (lớp thuật ngữ + tuỳ chọn hiển thị). Lưu localStorage.
// ───────────────────────────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TermPrimary = 'modern' | 'hanviet';
export type Arrangement = 'kingwen' | 'fuxi';
export type ColorMode = 'duality' | 'wuxing';
export type Lang = 'vi' | 'en';

/**
 * Ngôn ngữ khởi tạo: SSR-safe (không đụng `navigator`/`localStorage` khi chưa có).
 * Lần đầu ghé (chưa persist): dò `navigator.language` — `en-*` → 'en', còn lại 'vi'.
 * (persist middleware sẽ ghi đè bằng giá trị đã lưu nếu có.)
 */
function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'vi';
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'vi';
}

interface SettingsState {
  /** Ngôn ngữ giao diện: 'vi' (mặc định) | 'en'. */
  lang: Lang;
  /** Tên hiển thị chính: hiện đại (Trời) hay Hán-Việt (Càn). Mặc định hiện đại.
   *  Ở EN mode, slot 'hanviet' được diễn giải là PINYIN (Qián) — xem TermLabel. */
  termPrimary: TermPrimary;
  /** Có hiện chữ Hán (乾) kèm theo không. */
  showHanzi: boolean;
  /** Kiểu sắp xếp ma trận 64 quẻ. */
  arrangement: Arrangement;
  /** Bảng màu vẽ quẻ: 'duality' = Âm/Dương (vàng/ngọc); 'wuxing' = Ngũ hành (mỗi hành 1 màu). */
  colorMode: ColorMode;
  /** Hà Đồ/Lạc Thư: hiện chữ số (true) hay chấm (false). */
  cosmoNumerals: boolean;
  /** Hiện thẻ minh triết Lão–Trang (đối chiếu Đạo gia) trong lúc xem. Mặc định bật. */
  showWisdom: boolean;
  /** Sidebar (desktop) đang ghim mở (true) hay thu về rail icon (false). Mặc định mở. */
  sidebarPinned: boolean;

  setLang: (v: Lang) => void;
  toggleLang: () => void;
  setTermPrimary: (v: TermPrimary) => void;
  toggleHanzi: () => void;
  setArrangement: (v: Arrangement) => void;
  setColorMode: (v: ColorMode) => void;
  toggleCosmoNumerals: () => void;
  toggleWisdom: () => void;
  toggleSidebar: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      lang: detectLang(),
      termPrimary: 'modern',
      showHanzi: true,
      arrangement: 'kingwen',
      colorMode: 'duality',
      cosmoNumerals: false,
      showWisdom: true,
      sidebarPinned: true,

      setLang: (v) => set({ lang: v }),
      toggleLang: () => set((s) => ({ lang: s.lang === 'vi' ? 'en' : 'vi' })),
      setTermPrimary: (v) => set({ termPrimary: v }),
      toggleHanzi: () => set((s) => ({ showHanzi: !s.showHanzi })),
      setArrangement: (v) => set({ arrangement: v }),
      setColorMode: (v) => set({ colorMode: v }),
      toggleCosmoNumerals: () => set((s) => ({ cosmoNumerals: !s.cosmoNumerals })),
      toggleWisdom: () => set((s) => ({ showWisdom: !s.showWisdom })),
      toggleSidebar: () => set((s) => ({ sidebarPinned: !s.sidebarPinned })),
    }),
    { name: 'dichso-settings' }
  )
);
