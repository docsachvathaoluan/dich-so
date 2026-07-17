import { useState } from 'react';
import { HETU, HETU_TOTAL, HETU_HEAVEN, HETU_EARTH, ELEMENT_META } from '@/data/cosmograms';
import { directionToXY, polarToXY } from '@/lib/layout';
import { useSettings } from '@/store/useSettings';
import { useLang, ELEMENT_EN, DIRECTION_EN } from '@/i18n';
import type { CosmoNumber } from '@/types';

const YANG_DOT = '#f4ecd8';
const YIN_DOT = '#26314f';

const SIZE = 460;
const C = SIZE / 2;

/** Cụm chấm/numeral cho một con số Hà Đồ-Lạc Thư. */
export function NumberToken({
  n,
  numerals,
  scale = 1,
}: {
  n: CosmoNumber;
  numerals: boolean;
  scale?: number;
}) {
  const isYang = n.parity === 'duong';
  const fill = isYang ? YANG_DOT : YIN_DOT;
  const stroke = isYang ? 'rgba(0,0,0,0.2)' : 'rgba(244,236,216,0.5)';

  if (numerals) {
    return (
      <text
        textAnchor="middle"
        dominantBaseline="central"
        className="font-mono"
        style={{ fontSize: 18 * scale, fill, fontWeight: 600 }}
      >
        {n.value}
      </text>
    );
  }

  // xếp chấm: tối đa 5 mỗi cột, 2 cột
  const r = 3.6 * scale;
  const gap = 9 * scale;
  const perCol = 5;
  const cols = Math.ceil(n.value / perCol);
  const dots: { x: number; y: number }[] = [];
  for (let i = 0; i < n.value; i++) {
    const col = Math.floor(i / perCol);
    const row = i % perCol;
    const colCount = Math.min(perCol, n.value - col * perCol);
    dots.push({
      x: (col - (cols - 1) / 2) * gap,
      y: (row - (colCount - 1) / 2) * gap,
    });
  }
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={r} fill={fill} stroke={stroke} strokeWidth={0.8} />
      ))}
    </g>
  );
}

/**
 * HÌNH Hà Đồ thuần — CHỈ phần <svg>, không chú thích/nút/tổng.
 *
 * Tách ra để trang Đúc kết dùng lại bản THU NHỎ mà không kéo theo chrome: ở bề ngang ~260px
 * thì nút bấm vô nghĩa, mà để nút hiện rồi bấm không ăn còn tệ hơn là không có.
 *
 * `numerals` nhận QUA PROP chứ không đọc store: nơi gọi tự quyết chấm↔số. Bản thu nhỏ cần
 * chữ số (55 cái chấm ở 260px là mớ bùi nhùi), và không được để lựa chọn của người đọc bên
 * /ha-do-lac-thu rò sang trang khác.
 */
function HetuFigure({ numerals }: { numerals: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const en = useLang() === 'en';

  // 4 hướng ngoài: mỗi hướng có 1 sinh số (trong) + 1 thành số (ngoài). Tâm (5·10) vẽ riêng.
  const dirs = ['Bắc', 'Nam', 'Đông', 'Tây'] as const;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full">
      {/* trục nối các cặp lệch-5 */}
      {dirs.map((d) => {
        const inner = directionToXY(C, C, 70, d);
        const outer = directionToXY(C, C, 150, d);
        return (
          <line
            key={`l-${d}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        );
      })}

      {dirs.map((d) => {
        const group = HETU.filter((n) => n.direction === d);
        const sheng = group.find((n) => n.value <= 5)!;
        const cheng = group.find((n) => n.value >= 6)!;
        const elColor = ELEMENT_META[sheng.element!].color;
        const isHover = hover === sheng.value;

        const innerPos = directionToXY(C, C, 70, d);
        const outerPos = directionToXY(C, C, 150, d);
        const labelPos = directionToXY(C, C, 200, d);

        return (
          <g
            key={d}
            onMouseEnter={() => setHover(sheng.value)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'default' }}
          >
            {/* quầng hành */}
            <circle
              cx={innerPos.x}
              cy={innerPos.y}
              r={isHover ? 30 : 26}
              fill={elColor}
              opacity={isHover ? 0.22 : 0.12}
              style={{ transition: 'all .2s' }}
            />
            <g transform={`translate(${innerPos.x},${innerPos.y})`}>
              <NumberToken n={sheng} numerals={numerals} />
            </g>
            <g transform={`translate(${outerPos.x},${outerPos.y})`}>
              <NumberToken n={cheng} numerals={numerals} />
            </g>

            {/* nhãn hành + hướng */}
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 12, fill: elColor }}
            >
              {en ? `${ELEMENT_EN[sheng.element!]} · ${DIRECTION_EN[d]}` : `${sheng.element} · ${d}`}
            </text>
          </g>
        );
      })}

      {/* TÂM: số 5 ở giữa, số 10 thành VÒNG 10 chấm bao quanh */}
      {(() => {
        const tho5 = HETU.find((n) => n.value === 5)!;
        const elColor = ELEMENT_META.Thổ.color;
        const ringR = 30;
        const isHover = hover === 5;
        const labelPos = polarToXY(C, C, 74, 135); // đặt nhãn ở khe chéo (dưới-phải) cho thoáng
        return (
          <g onMouseEnter={() => setHover(5)} onMouseLeave={() => setHover(null)} style={{ cursor: 'default' }}>
            <circle cx={C} cy={C} r={isHover ? 46 : 42} fill={elColor} opacity={isHover ? 0.2 : 0.1} style={{ transition: 'all .2s' }} />
            {/* vòng 10 chấm (số 10 = chẵn = Âm) */}
            {Array.from({ length: 10 }, (_, i) => {
              const p = polarToXY(C, C, ringR, i * 36);
              return <circle key={i} cx={p.x} cy={p.y} r={3.4} fill={YIN_DOT} stroke="rgba(244,236,216,0.5)" strokeWidth={0.8} />;
            })}
            {numerals && (
              <text x={C} y={C - ringR - 7} textAnchor="middle" className="font-mono" style={{ fontSize: 11, fill: YIN_DOT }}>
                10
              </text>
            )}
            {/* số 5 (lẻ = Dương) ở chính giữa */}
            <g transform={`translate(${C},${C})`}>
              <NumberToken n={tho5} numerals={numerals} scale={0.85} />
            </g>
            <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fill: elColor }}>
              {en ? 'Earth · Center' : 'Thổ · Trung'}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

export default function HetuDiagram() {
  const numerals = useSettings((s) => s.cosmoNumerals);
  const toggle = useSettings((s) => s.toggleCosmoNumerals);
  const en = useLang() === 'en';

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: YANG_DOT }} />
            {en ? 'odd = Yang (Heaven)' : 'lẻ = Dương (Trời)'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full border" style={{ background: YIN_DOT, borderColor: 'rgba(244,236,216,0.5)' }} />
            {en ? 'even = Yin (Earth)' : 'chẵn = Âm (Đất)'}
          </span>
        </div>
        <button className="switch-btn !py-1" data-active={numerals} onClick={toggle}>
          {en
            ? numerals ? 'Showing: numerals' : 'Showing: dots'
            : numerals ? 'Đang hiện: chữ số' : 'Đang hiện: chấm'}
        </button>
      </div>

      <HetuFigure numerals={numerals} />

      {/* totals */}
      <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="panel-soft p-3">
          <div className="text-2xl font-semibold" style={{ color: YANG_DOT }}>
            {HETU_HEAVEN}
          </div>
          <div className="text-xs text-ink-faint">{en ? 'Heaven numbers (odd)' : 'số Trời (lẻ)'}</div>
        </div>
        <div className="panel-soft p-3">
          <div className="text-2xl font-semibold text-jade-soft">{HETU_EARTH}</div>
          <div className="text-xs text-ink-faint">{en ? 'Earth numbers (even)' : 'số Đất (chẵn)'}</div>
        </div>
        <div className="panel-soft p-3">
          <div className="text-2xl font-semibold text-gold">{HETU_TOTAL}</div>
          <div className="text-xs text-ink-faint">{en ? 'total = number of heaven & earth' : 'tổng = số trời đất'}</div>
        </div>
      </div>
    </div>
  );
}
