// ───────────────────────────────────────────────────────────────────────────
// Tiện ích văn bản dùng chung cho phần render diễn giải.
// ───────────────────────────────────────────────────────────────────────────
import type { Lang } from '@/store/useSettings';

/** Chia một đoạn (có thể nhiều khổ ngăn bằng dòng trống) thành các đoạn <p>. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Chọn nội dung theo ngôn ngữ (data KHÔNG reactive → nhận `lang` tường minh).
 * EN mà có `en` thì trả `en`, ngược lại fallback `vi`. Dùng cho prose điền dần theo đợt.
 */
export function pickLang<T>(lang: Lang, en: T | undefined | null, vi: T): T {
  return lang === 'en' && en != null ? en : vi;
}
