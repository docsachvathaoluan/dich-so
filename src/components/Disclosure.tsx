import type { ReactNode } from 'react';

/**
 * Hàng "bấm-để-mở" dùng chung cho panel chú thích quẻ (progressive disclosure).
 *
 * - Dựng trên native <details> → **uncontrolled, mặc định ĐÓNG**, giữ nội dung trong DOM
 *   (hợp SSR render test). KHÔNG truyền prop `open`: React coi `open` là controlled, sẽ
 *   khoá/đặt lại trạng thái mỗi lần re-render (vd đổi ⚙ settings) — ta để native tự quản.
 * - Chỉ animate xoay chevron bằng CSS (`group-open:rotate-90`) → tôn trọng reduced-motion.
 * - Idiom & màu theo "Góc số học" cũ (DeepInterpretation) và tailwind.config "cosmic ink".
 */
const TONE: Record<string, string> = {
  gold: 'text-gold-soft',
  jade: 'text-jade',
  silk: 'text-silk-soft',
  muted: 'text-ink-faint',
};

export default function Disclosure({
  title,
  subtitle,
  tone = 'jade',
  className = '',
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: 'gold' | 'jade' | 'silk' | 'muted';
  className?: string;
  children: ReactNode;
}) {
  return (
    <details className={`group rounded-lg border border-white/10 bg-white/[0.02] ${className}`}>
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-sm font-medium marker:hidden ${TONE[tone]}`}
      >
        <span>
          {title}
          {subtitle && <span className="font-normal text-ink-faint"> — {subtitle}</span>}
        </span>
        <span className="shrink-0 text-xs text-ink-faint transition group-open:rotate-90">▸</span>
      </summary>
      <div className="px-3 pb-3 pt-1 text-sm text-ink-muted">{children}</div>
    </details>
  );
}
