import { trigramById } from '@/data/trigrams';
import { linesToValue } from '@/lib/binary';
import { useLang } from '@/i18n';
import type { Bit } from '@/types';

const W = 760; // bề ngang vùng vẽ cây (không kể máng nhãn trái)
const LGUT = 92; // máng trái cho nhãn tầng (Thái Cực / Lưỡng Nghi…) — tránh đè quẻ đầu
const WT = W + LGUT; // tổng bề ngang viewBox
const H = 366;
const TOP = 28;
const ROW_GAP = 96;

const YANG_C = '#e8c373';
const YIN_C = '#5fb89a';

const ROW_LABELS = ['Thái Cực (1)', 'Lưỡng Nghi (2)', 'Tứ Tượng (4)', 'Bát Quái (8)'];
const ROW_LABELS_EN = ['Taiji (1)', 'Two Modes (2)', 'Four Images (4)', 'Eight Trigrams (8)'];

// Tứ Tượng (level 2, trái→phải k=0..3) + con số gieo quẻ truyền thống (đồng bộ TYPE_LABEL
// ở module gieo quẻ trang /64-que). Lão dương 9 · thiếu âm 8 · thiếu dương 7 · lão âm 6.
const SI_TUONG = [
  { name: 'Thái Dương', nameEn: 'Greater Yang', num: 9 },
  { name: 'Thiếu Âm', nameEn: 'Lesser Yin', num: 8 },
  { name: 'Thiếu Dương', nameEn: 'Lesser Yang', num: 7 },
  { name: 'Thái Âm', nameEn: 'Greater Yin', num: 6 },
];

function centerX(level: number, k: number) {
  return LGUT + (W * (k + 0.5)) / 2 ** level;
}

/** Quẻ riêng phần (đáy→đỉnh) của node thứ k ở tầng `level`: trái = Dương. */
function pathLines(level: number, k: number): Bit[] {
  const out: Bit[] = [];
  for (let l = 1; l <= level; l++) {
    out.push(((((k >> (level - l)) & 1) === 0 ? 1 : 0) as Bit));
  }
  return out;
}

/** Vẽ một chồng hào âm/dương (đáy→đỉnh), căn giữa tại (cx, cy). */
function Yao({ lines, cx, cy, w = 32, lh = 6, gap = 3.5 }: { lines: Bit[]; cx: number; cy: number; w?: number; lh?: number; gap?: number }) {
  const n = lines.length;
  const total = n * lh + (n - 1) * gap;
  const top = cy - total / 2;
  const yinGap = w * 0.3;
  return (
    <g>
      {lines.map((_, visualRow) => {
        const idx = n - 1 - visualRow; // visualRow 0 = đỉnh
        const bit = lines[idx];
        const y = top + visualRow * (lh + gap);
        const color = bit ? YANG_C : YIN_C;
        if (bit === 1) {
          return <rect key={visualRow} x={cx - w / 2} y={y} width={w} height={lh} rx={lh / 2} fill={color} />;
        }
        return (
          <g key={visualRow}>
            <rect x={cx - w / 2} y={y} width={w / 2 - yinGap / 2} height={lh} rx={lh / 2} fill={color} />
            <rect x={cx + yinGap / 2} y={y} width={w / 2 - yinGap / 2} height={lh} rx={lh / 2} fill={color} />
          </g>
        );
      })}
    </g>
  );
}

export default function DoublingTree() {
  const en = useLang() === 'en';
  const rowLabels = en ? ROW_LABELS_EN : ROW_LABELS;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${WT} ${H}`} className="mx-auto block w-full min-w-[680px]">
        {/* nhãn các tầng — nằm trong máng trái, không chạm vùng vẽ */}
        {rowLabels.map((lab, i) => (
          <text key={lab} x={8} y={TOP + i * ROW_GAP + 4} style={{ fontSize: 11, fill: '#5d6480' }}>
            {lab}
          </text>
        ))}

        {/* connectors */}
        {[1, 2, 3].map((level) =>
          Array.from({ length: 2 ** level }, (_, k) => {
            const x = centerX(level, k);
            const y = TOP + level * ROW_GAP;
            const px = centerX(level - 1, Math.floor(k / 2));
            const py = TOP + (level - 1) * ROW_GAP;
            return (
              <line key={`c-${level}-${k}`} x1={px} y1={py + 14} x2={x} y2={y - 16} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            );
          })
        )}

        {/* Thái Cực */}
        {(() => {
          const x = centerX(0, 0);
          const y = TOP;
          return (
            <g>
              <circle cx={x} cy={y} r={13} fill="#1d2540" stroke="#e8c373" strokeWidth={1.5} />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 14, fill: '#e8c373' }}>☯</text>
            </g>
          );
        })()}

        {/* Lưỡng Nghi (1 hào) & Tứ Tượng (2 hào) — vẽ vạch âm/dương chồng lên nhau */}
        {[1, 2].map((level) =>
          Array.from({ length: 2 ** level }, (_, k) => {
            const x = centerX(level, k);
            const y = TOP + level * ROW_GAP;
            return (
              <g key={`y-${level}-${k}`}>
                <Yao lines={pathLines(level, k)} cx={x} cy={y} w={level === 1 ? 36 : 32} lh={level === 1 ? 8 : 6} />
                {level === 2 && (
                  <>
                    {/* số gieo quẻ (9/8/7/6) làm badge tròn nhỏ cạnh phải cụm hào (tránh đường nối) */}
                    <circle cx={x + 26} cy={y} r={9} fill="#1d2540" stroke="rgba(232,195,115,0.45)" strokeWidth={1} />
                    <text x={x + 26} y={y} textAnchor="middle" dominantBaseline="central" className="font-mono" style={{ fontSize: 10, fill: YANG_C, fontWeight: 600 }}>
                      {SI_TUONG[k].num}
                    </text>
                    {/* tên tứ tượng canh giữa, ngay dưới cụm hào */}
                    <text x={x} y={y + 19} textAnchor="middle" style={{ fontSize: 9, fill: '#8b91a7' }}>
                      {en ? SI_TUONG[k].nameEn : SI_TUONG[k].name}
                    </text>
                  </>
                )}
              </g>
            );
          })
        )}

        {/* Bát Quái (3 hào) — vạch âm/dương + tên + nhị phân */}
        {Array.from({ length: 8 }, (_, k) => {
          const x = centerX(3, k);
          const y = TOP + 3 * ROW_GAP;
          const lines = pathLines(3, k);
          const tri = trigramById(linesToValue(lines));
          return (
            <g key={`leaf-${k}`}>
              <Yao lines={lines} cx={x} cy={y - 6} w={30} lh={4.5} gap={3} />
              <text x={x} y={y + 20} textAnchor="middle" style={{ fontSize: 12, fill: '#ece8dd' }}>{en ? tri.nameModernEn : tri.nameModern}</text>
              <text x={x} y={y + 35} textAnchor="middle" className="font-mono" style={{ fontSize: 10, fill: '#5d6480' }}>{tri.binary}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
