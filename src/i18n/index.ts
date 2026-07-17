// ───────────────────────────────────────────────────────────────────────────
// Hook i18n dùng chung. `useLang()` đọc ngôn ngữ; `useT()` trả hàm dịch chuỗi đơn.
// Prose giàu markup (Tầng 2) dùng `lang` trực tiếp với mẫu `lang === 'en' ? … : …`.
// ───────────────────────────────────────────────────────────────────────────
import { useSettings, type Lang } from '@/store/useSettings';
import { UI } from './ui';

export function useLang(): Lang {
  return useSettings((s) => s.lang);
}

/** Trả `t(key)` — tra `UI[key][lang]`. Nếu thiếu key/bản dịch → fallback 'vi' rồi key. */
export function useT(): (key: string) => string {
  const lang = useLang();
  return (key: string) => {
    const msg = UI[key];
    if (!msg) return key;
    return msg[lang] ?? msg.vi ?? key;
  };
}

export * from './glossary';
