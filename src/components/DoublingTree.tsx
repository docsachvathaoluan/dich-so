import { useEffect, useRef, useState } from 'react';
import { trigramById } from '@/data/trigrams';
import { linesToValue } from '@/lib/binary';
import { useLang } from '@/i18n';
import type { Bit } from '@/types';

/**
 * Cây sinh đôi có HAI bộ hình học, tự chọn theo bề ngang thật của khung chứa.
 *
 *  - `WIDE`   : bản gốc. Nhãn tầng nằm trong máng trái, cây rộng 760.
 *  - `NARROW` : cho điện thoại. BỎ máng trái (nhãn tầng dời lên trên mỗi hàng) và bóp bề
 *               ngang còn 336 để 8 quẻ vừa màn ~300px, khỏi phải kéo ngang.
 *
 * Vì sao phải tách hẳn hai bộ thay vì cho bản gốc co lại: co hết cỡ thì 852 đơn vị ép vào
 * 300px, chữ 11 còn ~4px, không đọc nổi. Máng trái 92 đơn vị cũng thành phí phạm đúng lúc
 * đang thiếu chỗ nhất.
 *
 * Cỡ chữ ở NARROW bị chặn bởi tên quẻ DÀI NHẤT: tiếng Việt ngắn (Trời/Sấm/Nước…) nhưng
 * tiếng Anh có "Mountain". Ô mỗi quẻ rộng 336/8 = 42, nên chữ phải nhỏ vừa đủ để "Mountain"
 * không đè sang quẻ bên cạnh.
 */
interface Geom {
  W: number; // bề ngang vùng vẽ cây
  LGUT: number; // máng trái cho nhãn tầng (0 = nhãn nằm trên mỗi hàng)
  H: number;
  TOP: number;
  ROW_GAP: number;
  leafFont: number;
  binFont: number;
  labelFont: number;
}

const WIDE: Geom = { W: 760, LGUT: 92, H: 366, TOP: 28, ROW_GAP: 96, leafFont: 12, binFont: 10, labelFont: 11 };
const NARROW: Geom = { W: 336, LGUT: 0, H: 374, TOP: 48, ROW_GAP: 92, leafFont: 9, binFont: 7.5, labelFont: 9.5 };

/** Dưới ngưỡng này thì bản WIDE bắt kéo ngang → chuyển sang bản hẹp. */
const NARROW_BELOW = 560;

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

function centerX(g: Geom, level: number, k: number) {
  return g.LGUT + (g.W * (k + 0.5)) / 2 ** level;
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
  const boxRef = useRef<HTMLDivElement>(null);
  // Mặc định bản rộng: khớp với lúc render phía máy chủ (chưa đo được bề ngang).
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < NARROW_BELOW));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const g = compact ? NARROW : WIDE;
  const WT = g.W + g.LGUT;
  const rowLabels = en ? ROW_LABELS_EN : ROW_LABELS;
  const leafW = compact ? 26 : 30;

  return (
    <div ref={boxRef} className={compact ? '' : 'overflow-x-auto'}>
      <svg
        viewBox={`0 0 ${WT} ${g.H}`}
        className={`mx-auto block w-full ${compact ? '' : 'min-w-[680px]'}`}
      >
        {/* Nhãn tầng: bản rộng đặt trong máng trái (canh giữa hàng); bản hẹp không có máng
            nên nhãn nằm NGAY TRÊN mỗi hàng, sát mép trái. */}
        {rowLabels.map((lab, i) => (
          <text
            key={lab}
            x={compact ? 0 : 8}
            y={g.TOP + i * g.ROW_GAP + (compact ? -26 : 4)}
            style={{ fontSize: g.labelFont, fill: '#5d6480' }}
          >
            {lab}
          </text>
        ))}

        {/* connectors */}
        {[1, 2, 3].map((level) =>
          Array.from({ length: 2 ** level }, (_, k) => {
            const x = centerX(g, level, k);
            const y = g.TOP + level * g.ROW_GAP;
            const px = centerX(g, level - 1, Math.floor(k / 2));
            const py = g.TOP + (level - 1) * g.ROW_GAP;
            return (
              <line key={`c-${level}-${k}`} x1={px} y1={py + 14} x2={x} y2={y - 16} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            );
          })
        )}

        {/* Thái Cực */}
        {(() => {
          const x = centerX(g, 0, 0);
          const y = g.TOP;
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
            const x = centerX(g, level, k);
            const y = g.TOP + level * g.ROW_GAP;
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
                    <text x={x} y={y + 19} textAnchor="middle" style={{ fontSize: compact ? 8 : 9, fill: '#8b91a7' }}>
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
          const x = centerX(g, 3, k);
          const y = g.TOP + 3 * g.ROW_GAP;
          const lines = pathLines(3, k);
          const tri = trigramById(linesToValue(lines));
          return (
            <g key={`leaf-${k}`}>
              <Yao lines={lines} cx={x} cy={y - 6} w={leafW} lh={4.5} gap={3} />
              <text x={x} y={y + 20} textAnchor="middle" style={{ fontSize: g.leafFont, fill: '#ece8dd' }}>{en ? tri.nameModernEn : tri.nameModern}</text>
              <text x={x} y={y + 35} textAnchor="middle" className="font-mono" style={{ fontSize: g.binFont, fill: '#5d6480' }}>{tri.binary}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
