import { useSettings } from '@/store/useSettings';

interface TermLabelProps {
  modern: string;
  hanViet: string;
  hanzi?: string;
  /** EN: gloss hiện đại ("Heaven") + pinyin ("Qián"). Thiếu → fallback về modern/hanViet. */
  modernEn?: string;
  pinyin?: string;
  /** Cỡ chữ chính. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Ẩn dòng phụ (chỉ hiện tên chính). */
  primaryOnly?: boolean;
}

const SIZES: Record<NonNullable<TermLabelProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
};

/**
 * Hiển thị thuật ngữ theo lớp: tên CHÍNH (hiện đại mặc định) lớn, tên phụ nhỏ,
 * kèm chữ Hán nếu bật công tắc.
 *  - VN mode: Modern (Trời) ↔ Hán-Việt (Càn).
 *  - EN mode: Modern (Heaven) ↔ Pinyin (Qián), ẩn Hán-Việt. Thiếu EN → fallback êm.
 */
export default function TermLabel({
  modern,
  hanViet,
  hanzi,
  modernEn,
  pinyin,
  size = 'md',
  className = '',
  primaryOnly = false,
}: TermLabelProps) {
  const lang = useSettings((s) => s.lang);
  const termPrimary = useSettings((s) => s.termPrimary);
  const showHanzi = useSettings((s) => s.showHanzi);

  const en = lang === 'en';
  const modernName = en ? modernEn ?? modern : modern;
  const altName = en ? pinyin ?? hanViet : hanViet; // EN: pinyin thay Hán-Việt

  const primary = termPrimary === 'modern' ? modernName : altName;
  const secondary = termPrimary === 'modern' ? altName : modernName;

  return (
    <span className={`inline-flex flex-col leading-tight ${className}`}>
      <span className={`font-serif font-semibold text-ink ${SIZES[size]}`}>
        {primary}
        {showHanzi && hanzi && (
          <span className="han ml-1.5 text-gold-soft/80 font-normal">{hanzi}</span>
        )}
      </span>
      {!primaryOnly && (
        <span className="text-xs text-ink-faint">{secondary}</span>
      )}
    </span>
  );
}
