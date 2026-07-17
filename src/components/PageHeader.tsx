import type { ReactNode } from 'react';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  symbol?: string;
  children?: ReactNode; // mô tả dẫn nhập
}

/** Tiêu đề trang mỗi lớp, đồng nhất phong cách. */
export default function PageHeader({
  kicker,
  title,
  symbol,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-8 animate-fade-up">
      {kicker && (
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gold/70">
          {kicker}
        </div>
      )}
      <h1 className="flex items-center gap-3 text-3xl font-serif font-semibold text-ink md:text-4xl">
        {symbol && (
          <span className="text-gold-soft/90" aria-hidden>
            {symbol}
          </span>
        )}
        <span className="ink-underline">{title}</span>
      </h1>
      {children && (
        <div className="mt-5 max-w-[80ch] text-ink-muted leading-relaxed">
          {children}
        </div>
      )}
    </header>
  );
}
