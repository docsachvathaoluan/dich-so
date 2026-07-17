import { useEffect, useRef, useState } from 'react';
import SettingsBar from './SettingsBar';
import { useT } from '@/i18n';

/**
 * Nút ⚙ "Hiển thị" trên top bar → mở popover chứa các công tắc (tái dùng SettingsBar).
 * Đóng khi click ra ngoài hoặc nhấn Esc.
 */
export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        data-active={open}
        className="switch-btn flex items-center gap-1.5 !py-1.5"
        aria-haspopup="dialog"
        aria-expanded={open}
        title={t('settings.options')}
      >
        <span aria-hidden>⚙</span>
        <span>{t('settings.title')}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('settings.options')}
          className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-white/10 bg-cosmos-900/95 p-4 shadow-panel-raised backdrop-blur-md"
        >
          <SettingsBar />
        </div>
      )}
    </div>
  );
}
