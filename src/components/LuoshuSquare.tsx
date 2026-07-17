import { useState } from 'react';
import { LUOSHU, LUOSHU_TOTAL } from '@/data/cosmograms';
import { magicLines, MAGIC_CONSTANT, type MagicLine } from '@/lib/magicSquare';
import { trigramById } from '@/data/trigrams';
import { useLang } from '@/i18n';
import { useSettings } from '@/store/useSettings';
import { NumberToken } from './HetuDiagram';

// Cùng bảng màu chấm với Hà Đồ (HetuDiagram) — codebase vốn khai báo lại 2 màu này ở
// vài nơi; giữ Lạc Thư tự chứa trong một file.
const YANG_DOT = '#f4ecd8';
const YIN_DOT = '#26314f';

const SIZE = 360;
const PAD = 90;
const STEP = (SIZE - PAD * 2) / 2; // khoảng cách tâm ô (= 90)

function cellCenter(r: number, c: number) {
  return { x: PAD + c * STEP, y: PAD + r * STEP };
}

const LINES = magicLines();

/**
 * HÌNH Lạc Thư thuần — CHỈ phần <svg>, không chú thích/nút/tổng.
 *
 * Tách ra để trang Đúc kết dùng lại bản THU NHỎ mà không kéo theo chrome: dòng "Chọn một
 * đường để kiểm" đứng cạnh 8 nút liệt là mời bấm rồi lờ đi — sai tinh thần trung thực chứ
 * không chỉ xấu.
 *
 * `sel` là CHỈ SỐ đường ma phương (0..7) hay null; `activeCells` dẫn xuất tại chỗ từ
 * magicLines() — không nhận sẵn từ ngoài, để phép toán ma phương chỉ có một nguồn.
 */
function LuoshuFigure({
  numerals,
  showTrigrams,
  sel,
}: {
  numerals: boolean;
  showTrigrams: boolean;
  sel: number | null;
}) {
  const en = useLang() === 'en';
  const active: MagicLine | null = sel === null ? null : LINES[sel];
  const activeCells = new Set(active?.cells.map(([r, c]) => `${r},${c}`) ?? []);

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto block w-full max-w-sm">
      {/* lưới */}
      <rect
        x={PAD - STEP / 2}
        y={PAD - STEP / 2}
        width={STEP * 3}
        height={STEP * 3}
        rx={14}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.1)"
      />
      {[1, 2].map((i) => (
        <g key={i} stroke="rgba(255,255,255,0.07)">
          <line x1={PAD - STEP / 2 + i * STEP} y1={PAD - STEP / 2} x2={PAD - STEP / 2 + i * STEP} y2={PAD - STEP / 2 + STEP * 3} />
          <line x1={PAD - STEP / 2} y1={PAD - STEP / 2 + i * STEP} x2={PAD - STEP / 2 + STEP * 3} y2={PAD - STEP / 2 + i * STEP} />
        </g>
      ))}

      {/* đường nối khi chọn */}
      {active && (
        <polyline
          points={active.cells
            .map(([r, c]) => {
              const p = cellCenter(r, c);
              return `${p.x},${p.y}`;
            })
            .join(' ')}
          fill="none"
          stroke="#e8c373"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.6}
        />
      )}

      {/* các ô */}
      {LUOSHU.map((n) => {
        const [r, c] = n.gridPos!;
        const p = cellCenter(r, c);
        const isActive = activeCells.has(`${r},${c}`);
        const tri =
          showTrigrams && n.laterHeavenTrigram !== undefined
            ? trigramById(n.laterHeavenTrigram)
            : null;
        return (
          <g key={n.value} transform={`translate(${p.x},${p.y})`}>
            {isActive && (
              <circle r={26} fill="#e8c373" opacity={0.18} />
            )}
            {tri ? (
              <g transform="translate(0,-6)">
                <text textAnchor="middle" style={{ fontSize: 22, fill: '#e8c373' }}>
                  {tri.symbol}
                </text>
                <text textAnchor="middle" y={18} style={{ fontSize: 11, fill: '#9aa1b6' }}>
                  {en ? tri.nameModernEn : tri.nameModern} · {n.value}
                </text>
              </g>
            ) : (
              // showTrigrams || numerals: khi hiện quẻ, ô tâm (số 5, không có trigram)
              // vẫn phải là "5" chứ không phải một chấm đơn độc.
              <NumberToken n={n} numerals={showTrigrams || numerals} scale={1.1} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function LuoshuSquare() {
  const [sel, setSel] = useState<number | null>(null);
  const [showTrigrams, setShowTrigrams] = useState(false);
  const en = useLang() === 'en';
  // Công tắc chấm↔số dùng CHUNG toàn cục với Hà Đồ.
  const numerals = useSettings((s) => s.cosmoNumerals);
  const toggleNumerals = useSettings((s) => s.toggleCosmoNumerals);

  const active: MagicLine | null = sel === null ? null : LINES[sel];

  const lineButtons: { label: string; labelEn: string; idx: number }[] = [
    { label: 'Hàng trên', labelEn: 'Top row', idx: 0 },
    { label: 'Hàng giữa', labelEn: 'Middle row', idx: 1 },
    { label: 'Hàng dưới', labelEn: 'Bottom row', idx: 2 },
    { label: 'Cột trái', labelEn: 'Left column', idx: 3 },
    { label: 'Cột giữa', labelEn: 'Middle column', idx: 4 },
    { label: 'Cột phải', labelEn: 'Right column', idx: 5 },
    { label: 'Chéo ＼', labelEn: 'Diagonal ＼', idx: 6 },
    { label: 'Chéo ／', labelEn: 'Diagonal ／', idx: 7 },
  ];

  return (
    <div>
      <div className="mb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-ink-muted">
            {en ? (
              <>
                Pick a line to check: every row, column, and diagonal sums to{' '}
                <b className="text-gold">15</b>.
              </>
            ) : (
              <>
                Chọn một đường để kiểm: mọi hàng, cột, đường chéo đều cộng ={' '}
                <b className="text-gold">15</b>.
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            {/* chấm↔số: ẩn khi đang hiện quẻ (lúc đó chế độ chấm/số không áp dụng) */}
            {!showTrigrams && (
              <button
                className="switch-btn !py-1"
                data-active={numerals}
                onClick={toggleNumerals}
              >
                {en
                  ? numerals ? 'Showing: numerals' : 'Showing: dots'
                  : numerals ? 'Đang hiện: chữ số' : 'Đang hiện: chấm'}
              </button>
            )}
            <button
              className="switch-btn !py-1"
              data-active={showTrigrams}
              onClick={() => setShowTrigrams((v) => !v)}
            >
              {en
                ? showTrigrams ? 'Hide Later-Heaven trigrams' : 'Show Later-Heaven trigrams'
                : showTrigrams ? 'Ẩn quẻ Hậu Thiên' : 'Hiện quẻ Hậu Thiên'}
            </button>
          </div>
        </div>

        {/* chú thích màu chấm — chỉ hiện ở chế độ chấm (đối xứng gương với Hà Đồ) */}
        {!numerals && !showTrigrams && (
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: YANG_DOT }} />
              {en ? 'odd = Yang (Heaven)' : 'lẻ = Dương (Trời)'}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 rounded-full border"
                style={{ background: YIN_DOT, borderColor: 'rgba(244,236,216,0.5)' }}
              />
              {en ? 'even = Yin (Earth)' : 'chẵn = Âm (Đất)'}
            </span>
          </div>
        )}
      </div>

      <LuoshuFigure numerals={numerals} showTrigrams={showTrigrams} sel={sel} />

      {/* nút chọn đường */}
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {lineButtons.map((b) => (
          <button
            key={b.idx}
            className="switch-btn !px-2 !py-1 text-xs"
            data-active={sel === b.idx}
            onClick={() => setSel(sel === b.idx ? null : b.idx)}
          >
            {en ? b.labelEn : b.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 text-sm">
        <div className="text-center">
          <span className="text-ink-muted">{en ? 'Selected line sum: ' : 'Tổng đường đang chọn: '}</span>
          <span className="font-mono text-xl text-gold">
            {active ? active.sum : '—'}
          </span>
          {active && active.sum === MAGIC_CONSTANT && (
            <span className="ml-1 text-jade-soft">✓ = 15</span>
          )}
        </div>
        <div className="text-center text-ink-faint">
          {en ? 'Whole-grid total = ' : 'Tổng toàn lưới = '}
          <span className="font-mono text-ink">{LUOSHU_TOTAL}</span>
        </div>
      </div>
    </div>
  );
}
