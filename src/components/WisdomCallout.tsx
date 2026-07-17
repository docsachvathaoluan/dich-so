import { useState } from 'react';
import { useSettings } from '@/store/useSettings';
import { useLang } from '@/i18n';
import {
  anchorsByConcept,
  anchorsByHex,
  quotesOf,
  type WisdomQuote,
} from '@/data/daoistWisdom';

/**
 * Thẻ "minh triết" Lão–Trang đối chiếu Đạo gia với Dịch.
 *
 * - Thẩm mỹ thủy mặc: thân nền mực (cosmos/ink), accent `silk` (mực-bạc) + dấu triện chu sa nhỏ.
 *   KHÔNG dùng vàng/lục (nghĩa Dương/Âm) để khỏi lẫn với hào.
 * - Mặc định HIỆN, dạng GẤP GỌN (1 dòng resonance + nguồn); bấm để mở Hán + dịch.
 * - Tôn trọng công tắc `showWisdom`; dòng Hán theo `showHanzi`.
 *
 * Dùng 1 trong 2 props: `concept` (khuôn mẫu) hoặc `hexKingWen` (neo vào 1 quẻ).
 */
export default function WisdomCallout({
  concept,
  hexKingWen,
  className = '',
  maxQuotes,
  bare = false,
}: {
  concept?: string;
  hexKingWen?: number;
  className?: string;
  /** Giới hạn số trích dẫn hiển thị (vd =1 để callout nhúng vừa chiều cao panel cạnh nó). */
  maxQuotes?: number;
  /** Bỏ khung <aside> + header — khi đặt trong một <Disclosure> đã cấp khung/tiêu đề. */
  bare?: boolean;
}) {
  const showWisdom = useSettings((s) => s.showWisdom);
  const en = useLang() === 'en';

  const anchor =
    hexKingWen != null
      ? anchorsByHex.get(hexKingWen)
      : concept
        ? anchorsByConcept.get(concept)
        : undefined;

  if (!showWisdom || !anchor) return null;
  const allQuotes = quotesOf(anchor);
  const quotes = maxQuotes != null ? allQuotes.slice(0, maxQuotes) : allQuotes;
  if (quotes.length === 0) return null;

  const ariaLabel = en ? 'Daoist wisdom parallel' : 'Minh triết Lão–Trang đối chiếu';
  const footer = en ? (
    <>
      Laozi and Zhuangzi form a stream of <b className="text-ink-muted">Daoist</b> wisdom that
      resonates with the Changes (not the same root — the I Ching is a Confucian classic, joined
      later).
    </>
  ) : (
    <>
      Lão–Trang là dòng minh triết <b className="text-ink-muted">Đạo gia</b> cộng hưởng với
      Dịch (không cùng một gốc — Dịch vốn thuộc Nho điển, hợp lưu về sau).
    </>
  );

  if (bare) {
    return (
      <div className={className} aria-label={ariaLabel}>
        <div className="space-y-2.5">
          {quotes.map((q) => (
            <QuoteRow key={q.id} quote={q} />
          ))}
        </div>
        <p className="mt-2.5 text-[10.5px] leading-snug text-ink-faint">{footer}</p>
      </div>
    );
  }

  return (
    <aside
      className={`rounded-xl border border-silk/25 bg-silk/[0.04] p-4 ${className}`}
      aria-label={ariaLabel}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border border-cinnabar/50 text-[10px] text-cinnabar"
          title={en ? 'Daoist wisdom parallel' : 'Minh triết Lão–Trang (đối chiếu Đạo gia)'}
          aria-hidden
        >
          道
        </span>
        <span className="text-xs uppercase tracking-[0.15em] text-silk-soft/80">
          {en ? 'Daoist parallel' : 'Đối chiếu Đạo gia'}
        </span>
        <span className="text-[11px] text-ink-faint">· {en ? anchor.labelEn : anchor.label}</span>
      </div>

      <div className="space-y-2.5">
        {quotes.map((q) => (
          <QuoteRow key={q.id} quote={q} />
        ))}
      </div>

      <p className="mt-2.5 text-[10.5px] leading-snug text-ink-faint">{footer}</p>
    </aside>
  );
}

function QuoteRow({ quote }: { quote: WisdomQuote }) {
  const showHanzi = useSettings((s) => s.showHanzi);
  const en = useLang() === 'en';
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-2 text-left"
        aria-expanded={open}
      >
        <span className="mt-0.5 shrink-0 text-xs text-silk" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-ink">{en ? quote.resonanceEn : quote.resonance}</span>
          <span className="mt-0.5 block text-[11px] text-silk-deep">
            — {en ? quote.refEn : quote.ref}
          </span>
        </span>
      </button>

      {open && (
        <div className="mt-2 space-y-1.5 border-t border-white/5 pl-5 pt-2">
          {showHanzi && (
            <p className="han text-base leading-relaxed text-silk-soft">{quote.han}</p>
          )}
          <p className="text-sm italic text-ink-muted">“{en ? quote.vietEn : quote.viet}”</p>
          <p className="text-[10.5px] text-ink-faint">
            {en ? (
              <>
                Translation (an interpretation, after Nguyễn Hiến Lê / Thu Giang) · original:{' '}
                <span className="text-silk-deep">{quote.cite}</span>
              </>
            ) : (
              <>
                Dịch nghĩa (diễn giải, theo Nguyễn Hiến Lê / Thu Giang) · nguyên văn:{' '}
                <span className="text-silk-deep">{quote.cite}</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
