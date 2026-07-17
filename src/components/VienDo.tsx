import { HEXAGRAMS, hexagramByFuxi } from '@/data/hexagrams';
import { fuxiCircleAngle, polarToXY, annulusSectorPath } from '@/lib/layout';
import { countYang } from '@/lib/binary';
import { useLang } from '@/i18n';
import Gua from './Gua';

// Sắc Dương(vàng)→Âm(ngọc) theo số hào dương, để cả vòng & vuông cùng "đọc" được nhịp âm-dương.
const GOLD = [232, 195, 115];
const JADE = [95, 184, 154];
function yangColor(yang: number, alpha = 0.9): string {
  const t = yang / 6;
  const c = GOLD.map((g, i) => Math.round(JADE[i] + (g - JADE[i]) * t));
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
}

const STEP = 360 / 64; // 5.625°

// 4 quẻ thuần — vị trí THẬT trên vòng (tự tính), không idealize.
const PURE = [
  { v: 63, label: 'Càn · Trời', labelEn: 'Qián · Heaven', sub: 'giữa trưa · Hạ chí · rằm', subEn: 'noon · Summer Solstice · full moon' },
  { v: 0, label: 'Khôn · Đất', labelEn: 'Kūn · Earth', sub: 'nửa đêm · Đông chí · mùng 1', subEn: 'midnight · Winter Solstice · new moon' },
  { v: 45, label: 'Ly · Mặt Trời', labelEn: 'Lí · the Sun', sub: '', subEn: '' },
  { v: 18, label: 'Khảm · Mặt Trăng', labelEn: 'Kǎn · the Moon', sub: '', subEn: '' },
];

/** VÒNG VIÊN — 64 quẻ Tiên Thiên (Trời · động · thời gian). */
export function VienCircle({ size = 460 }: { size?: number }) {
  const C = size / 2;
  const rOuter = size * 0.42;
  const rInner = size * 0.31;
  const en = useLang() === 'en';

  const padX = 80; // lề ngang thêm vào viewBox để nhãn Đông/Tây & 4 quẻ thuần không bị cắt
  const padY = 28; // lề dọc: dòng phụ Càn/Khôn (đỉnh·đáy) không bị xén sau khi lật baseline
  return (
    <svg
      viewBox={`${-padX} ${-padY} ${size + padX * 2} ${size + padY * 2}`}
      className="mx-auto block w-full max-w-[560px]"
    >
      {/* 64 cung */}
      {HEXAGRAMS.map((h) => {
        const a = fuxiCircleAngle(h.fuxiValue);
        const yang = countYang(h.lines);
        const isPure = PURE.some((p) => p.v === h.fuxiValue);
        return (
          <path
            key={h.fuxiValue}
            d={annulusSectorPath(C, C, rInner, rOuter, a - STEP / 2, a + STEP / 2)}
            fill={yangColor(yang, 0.85)}
            stroke={isPure ? '#ece8dd' : 'rgba(5,6,13,0.55)'}
            strokeWidth={isPure ? 1.4 : 0.5}
          />
        );
      })}

      {/* trục dọc Càn–Khôn (đường chia Đông/Tây) */}
      <line x1={C} y1={C - rOuter - 4} x2={C} y2={C + rOuter + 4} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4" />

      {/* nhãn nửa Đông / Tây */}
      <text x={C - rOuter - 6} y={C} textAnchor="end" dominantBaseline="central" style={{ fontSize: 10, fill: '#e8c373' }}>
        {en ? 'East · Yang ↑' : 'Đông · Dương ↑'}
      </text>
      <text x={C + rOuter + 6} y={C} textAnchor="start" dominantBaseline="central" style={{ fontSize: 10, fill: '#5fb89a' }}>
        {en ? 'West · Yin ↓' : 'Tây · Âm ↓'}
      </text>

      {/* 4 quẻ thuần — nhãn ngoài */}
      {PURE.map((p) => {
        const a = fuxiCircleAngle(p.v);
        const pos = polarToXY(C, C, rOuter + 16, a);
        const top = a < 90 || a > 270;
        const right = a > 0 && a < 180;
        return (
          <g key={p.v}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor={Math.abs(a - 0) < 1 || Math.abs(a - 180) < 1 ? 'middle' : right ? 'start' : 'end'}
              dominantBaseline={top ? 'auto' : 'hanging'}
              style={{ fontSize: 10, fill: '#ece8dd', fontWeight: 600 }}
            >
              {en ? p.labelEn : p.label}
            </text>
            {(en ? p.subEn : p.sub) && (
              <text
                x={pos.x}
                y={pos.y + (top ? -12 : 12)}
                textAnchor="middle"
                dominantBaseline={top ? 'auto' : 'hanging'}
                style={{ fontSize: 8, fill: '#9aa1b6' }}
              >
                {en ? p.subEn : p.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* tâm */}
      <circle cx={C} cy={C} r={rInner * 0.5} fill="#080b16" stroke="rgba(232,195,115,0.25)" />
      <text x={C} y={C - 8} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 13, fill: '#e8c373' }}>
        ☯
      </text>
      <text x={C} y={C + 10} textAnchor="middle" style={{ fontSize: 9, fill: '#5d6480' }}>
        {en ? 'Heaven · motion · time' : 'Trời · động · thời gian'}
      </text>
    </svg>
  );
}

// ── PHƯƠNG — vuông 8×8 (Đất · tĩnh · không gian). Lưới nhị phân, KHÔNG phải bản 方圖 cổ. ──
const CELL = 42;
const PAD = 2;

/** Lưới vuông 64 quẻ; đường chéo Khôn↔Càn (góc trên-trái → dưới-phải) được làm nổi. */
export function PhuongSquare() {
  const total = CELL * 8 + PAD * 2;
  return (
    <svg viewBox={`0 0 ${total} ${total}`} className="mx-auto block w-full max-w-[440px]">
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => {
          const value = c + r * 8; // lower = c, upper = r → fuxiValue
          const h = hexagramByFuxi(value);
          const yang = countYang(h.lines);
          const onDiag = r === c; // Khôn(0,0) … Càn(7,7)
          return (
            <g key={value} transform={`translate(${PAD + c * CELL},${PAD + r * CELL})`}>
              <rect
                width={CELL - 1.5}
                height={CELL - 1.5}
                rx={3}
                fill={yangColor(yang, onDiag ? 0.9 : 0.5)}
                stroke={onDiag ? '#ece8dd' : 'rgba(5,6,13,0.5)'}
                strokeWidth={onDiag ? 1.3 : 0.5}
              />
              <g transform={`translate(${(CELL - 1.5) / 2},${(CELL - 1.5) / 2})`}>
                <g transform="translate(-15.3,-12) scale(0.85)">
                  <Gua lines={h.lines} width={36} lineHeight={3.4} gap={1.6} />
                </g>
              </g>
            </g>
          );
        })
      )}
    </svg>
  );
}
