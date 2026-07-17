import type { ReactNode } from 'react';
import { useT } from '@/i18n';

/**
 * Thẻ "ghi chú trung thực" tái dùng — TRUNG THỰC là nguyên tắc cao nhất của dự án.
 *
 * Phân biệt rõ hai loại tri thức:
 *  - `kind="kiem-duoc"`  → số/đối xứng KIỂM ĐƯỢC bằng phép tính (Hà Đồ=55, 192/192 hào…).
 *  - `kind="truyen-thong"` → diễn giải TRUYỀN THỐNG có dị bản (cần dẫn nguồn, không nêu như định lý).
 *
 * KHÔNG dùng sắc vàng(Dương)/lục(Âm) để khỏi lẫn nghĩa hào; dùng nét mực trung tính.
 */
export default function NoteCallout({
  kind,
  title,
  source,
  className = '',
  children,
}: {
  kind: 'truyen-thong' | 'kiem-duoc';
  title?: string;
  source?: string;
  className?: string;
  children: ReactNode;
}) {
  const t = useT();
  const verified = kind === 'kiem-duoc';
  const tag = verified ? t('note.verified') : t('note.traditional');
  const mark = verified ? '✓' : 'ⓘ';

  return (
    <aside
      className={`panel-soft p-4 border-l-2 ${verified ? 'border-l-jade/40' : 'border-l-ink-faint/40'} ${className}`}
      aria-label={tag}
    >
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${
            verified
              ? 'border-jade/30 text-jade/90'
              : 'border-ink-faint/40 text-ink-muted'
          }`}
        >
          <span aria-hidden>{mark}</span> {tag}
        </span>
        {title && <span className="text-sm font-medium text-ink">{title}</span>}
      </div>
      <div className="text-sm leading-relaxed text-ink-muted">{children}</div>
      {source && (
        <p className="mt-2 text-[11px] text-ink-faint">{t('note.source')}: {source}</p>
      )}
    </aside>
  );
}
