import { useState } from 'react';
import { NGU_HANH_SINH, NGU_HANH_KHAC, ELEMENT_META } from '@/data/cosmograms';
import { polarToXY } from '@/lib/layout';
import { useLang, ELEMENT_EN } from '@/i18n';
import type { Element } from '@/types';

const SIZE = 300;
const C = SIZE / 2;
const R = 110;

// Đặt 5 hành theo thứ tự SINH, quanh vòng (đều 72°).
const ORDER = NGU_HANH_SINH;
const POS: Record<Element, { x: number; y: number }> = {} as never;
ORDER.forEach((el, i) => {
  POS[el] = polarToXY(C, C, R, i * 72);
});

export default function NguHanhCycle() {
  const [mode, setMode] = useState<'sinh' | 'khac'>('sinh');
  const en = useLang() === 'en';

  // Cặp mũi tên theo chế độ.
  const arrows: [Element, Element][] =
    mode === 'sinh'
      ? ORDER.map((el, i) => [el, ORDER[(i + 1) % 5]])
      : NGU_HANH_KHAC.map((el, i) => [el, NGU_HANH_KHAC[(i + 1) % 5]]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-center gap-2">
        <button className="switch-btn !py-1" data-active={mode === 'sinh'} onClick={() => setMode('sinh')}>
          {en ? 'Generating' : 'Tương Sinh'}
        </button>
        <button className="switch-btn !py-1" data-active={mode === 'khac'} onClick={() => setMode('khac')}>
          {en ? 'Overcoming' : 'Tương Khắc'}
        </button>
      </div>

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto block w-full max-w-[300px]">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={mode === 'sinh' ? '#5fb89a' : '#d9603b'} />
          </marker>
        </defs>

        {arrows.map(([a, b], i) => {
          const pa = POS[a];
          const pb = POS[b];
          // rút ngắn để mũi tên không chạm node
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const off = 26;
          return (
            <line
              key={i}
              x1={pa.x + ux * off}
              y1={pa.y + uy * off}
              x2={pb.x - ux * off}
              y2={pb.y - uy * off}
              stroke={mode === 'sinh' ? '#5fb89a' : '#d9603b'}
              strokeWidth={1.8}
              opacity={0.7}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {ORDER.map((el) => {
          const p = POS[el];
          const meta = ELEMENT_META[el];
          return (
            <g key={el} transform={`translate(${p.x},${p.y})`}>
              <circle r={22} fill={meta.color} opacity={0.9} />
              <text textAnchor="middle" dominantBaseline="central" style={{ fontSize: en ? 10 : 14, fontWeight: 700, fill: '#08111a' }}>
                {en ? ELEMENT_EN[el] : el}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-1 text-center text-xs text-ink-faint">
        {en
          ? mode === 'sinh'
            ? 'Wood → Fire → Earth → Metal → Water → Wood (Hetu)'
            : 'Wood → Earth → Water → Fire → Metal → Wood (Luoshu link)'
          : mode === 'sinh'
            ? 'Mộc → Hỏa → Thổ → Kim → Thủy → Mộc (Hà Đồ)'
            : 'Mộc → Thổ → Thủy → Hỏa → Kim → Mộc (liên hệ Lạc Thư)'}
      </p>
    </div>
  );
}
