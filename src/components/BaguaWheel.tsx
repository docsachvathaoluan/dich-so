import { useState } from 'react';
import { TRIGRAMS, trigramById, trigramByName } from '@/data/trigrams';
import { directionToXY, polarToXY, DIRECTION_ANGLE } from '@/lib/layout';
import { useLang } from '@/i18n';
import Gua from './Gua';

/**
 * Lớp đọc phủ lên vòng Tiên Thiên:
 *  - 'plain'        : chỉ 8 quẻ.
 *  - 'thuan-nghich' : 2 mũi tên vòng âm–dương sinh trưởng (Chấn→…→Kiền & Tốn→…→Khôn).
 *  - 'moon'         : pha trăng theo nạp giáp (truyền thống).
 * Hai lớp sau CHỈ có nghĩa với `arrangement='earlier'` (Tiên Thiên).
 */
type Overlay = 'plain' | 'thuan-nghich' | 'moon';

interface Props {
  arrangement: 'earlier' | 'later';
  size?: number;
  /** Vẽ trục nối các cặp bù-bit (cho Tiên Thiên). */
  showComplements?: boolean;
  /** Hiện số THỨ TỰ Tiên Thiên 1–8 (Thiệu Ung) trên mỗi quẻ. */
  showXianTian?: boolean;
  overlay?: Overlay;
}

const YANG = '#e8c373';
const YIN = '#5fb89a';

// Pha trăng theo nạp giáp (truyền thống) — gắn theo tên Hán-Việt quẻ Tiên Thiên.
// Ly/Khảm là THỂ mặt trời/mặt trăng, không phải pha → ghi chú riêng.
const MOON: Record<string, { phase: string; phaseEn: string; day: string; dayEn: string }> = {
  Chấn: { phase: 'Trăng non mọc', phaseEn: 'New crescent rising', day: 'mùng 3', dayEn: 'day 3' },
  Đoài: { phase: 'Thượng huyền', phaseEn: 'First quarter', day: 'mùng 8', dayEn: 'day 8' },
  Càn: { phase: 'Trăng tròn (vọng)', phaseEn: 'Full moon', day: '15', dayEn: 'day 15' },
  Tốn: { phase: 'Bắt đầu khuyết', phaseEn: 'Starting to wane', day: '18', dayEn: 'day 18' },
  Cấn: { phase: 'Hạ huyền', phaseEn: 'Last quarter', day: '23', dayEn: 'day 23' },
  Khôn: { phase: 'Trăng tối (hối)', phaseEn: 'Dark moon', day: '30', dayEn: 'day 30' },
};
const MOON_BODY: Record<string, string> = { Ly: 'Mặt Trời', Khảm: 'Mặt Trăng' };
const MOON_BODY_EN: Record<string, string> = { Ly: 'the Sun', Khảm: 'the Moon' };

export default function BaguaWheel({
  arrangement,
  size = 360,
  showComplements,
  showXianTian,
  overlay = 'plain',
}: Props) {
  const C = size / 2;
  const R = size * 0.36;
  const [hover, setHover] = useState<number | null>(null);
  const en = useLang() === 'en';

  const earlier = arrangement === 'earlier';
  const showOverlay = earlier ? overlay : 'plain';

  const placed = TRIGRAMS.map((t) => {
    const dir = earlier ? t.dirEarlier : t.dirLater;
    return { t, dir, angle: DIRECTION_ANGLE[dir], pos: directionToXY(C, C, R, dir) };
  });

  // ── Mũi tên cung tròn (thuận–nghịch) ───────────────────────────────────────
  const Rarrow = R * 0.6;
  function arcArrow(names: string[], color: string, label: string) {
    const angs = names.map((n) => DIRECTION_ANGLE[(earlier ? trigramByName(n).dirEarlier : trigramByName(n).dirLater)]);
    const a0 = angs[0];
    const a1raw = angs[angs.length - 1];
    const a1 = a1raw < a0 ? a1raw + 360 : a1raw; // mở vòng nếu vượt mốc 0°
    const p0 = polarToXY(C, C, Rarrow, a0);
    const p1 = polarToXY(C, C, Rarrow, a1);
    const large = a1 - a0 > 180 ? 1 : 0;
    // đầu mũi tên: tiếp tuyến theo chiều tăng góc (kim đồng hồ) tại a1
    const rad = (a1 * Math.PI) / 180;
    const tip = polarToXY(C, C, Rarrow, a1 + 4);
    const tx = Math.cos(rad);
    const ty = Math.sin(rad);
    const nx = Math.sin(rad);
    const ny = -Math.cos(rad);
    const back = { x: p1.x - tx * 11, y: p1.y - ty * 11 };
    const b1 = { x: back.x + nx * 6, y: back.y + ny * 6 };
    const b2 = { x: back.x - nx * 6, y: back.y - ny * 6 };
    const labelPos = polarToXY(C, C, Rarrow, (a0 + a1) / 2);
    return (
      <g>
        <path
          d={`M ${p0.x} ${p0.y} A ${Rarrow} ${Rarrow} 0 ${large} 1 ${p1.x} ${p1.y}`}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.85}
        />
        <polygon points={`${tip.x},${tip.y} ${b1.x},${b1.y} ${b2.x},${b2.y}`} fill={color} />
        <text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: 10, fill: color, fontWeight: 600 }}
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto block w-full max-w-[600px]">
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.1)" />

      {/* trục bù-bit (Tiên Thiên) */}
      {showComplements &&
        placed.map(({ t, pos }) => {
          const comp = trigramById(t.id ^ 7);
          const compDir = earlier ? comp.dirEarlier : comp.dirLater;
          const cp = directionToXY(C, C, R, compDir);
          if (t.id > (t.id ^ 7)) return null; // vẽ mỗi cặp một lần
          const isHi = hover === t.id || hover === comp.id;
          return (
            <line
              key={`comp-${t.id}`}
              x1={pos.x}
              y1={pos.y}
              x2={cp.x}
              y2={cp.y}
              stroke={isHi ? '#e8c373' : 'rgba(232,195,115,0.18)'}
              strokeWidth={isHi ? 2 : 1}
            />
          );
        })}

      {/* lớp thuận–nghịch */}
      {showOverlay === 'thuan-nghich' && (
        <>
          {arcArrow(['Chấn', 'Ly', 'Đoài', 'Càn'], YANG, en ? 'forward' : 'thuận')}
          {arcArrow(['Tốn', 'Khảm', 'Cấn', 'Khôn'], YIN, en ? 'counter' : 'nghịch')}
        </>
      )}

      {/* tâm */}
      <circle cx={C} cy={C} r={20} fill="#11162a" stroke="rgba(232,195,115,0.4)" />
      <text x={C} y={C} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 18, fill: '#e8c373' }}>
        ☯
      </text>

      {placed.map(({ t, pos }) => {
        const isHi = hover === t.id;
        const moon = MOON[t.nameHanViet];
        const body = MOON_BODY[t.nameHanViet];
        return (
          <g
            key={t.id}
            transform={`translate(${pos.x},${pos.y})`}
            onMouseEnter={() => setHover(t.id)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'default' }}
          >
            <circle r={isHi ? 30 : 27} fill="#11162a" stroke={isHi ? '#e8c373' : 'rgba(255,255,255,0.12)'} strokeWidth={1.2} style={{ transition: 'all .15s' }} />
            <g transform="translate(-18,-22) scale(0.6)">
              <Gua lines={t.lines} width={60} lineHeight={8} gap={4} />
            </g>
            <text y={19} textAnchor="middle" style={{ fontSize: 11, fill: '#ece8dd' }}>
              {en ? t.nameModernEn : t.nameModern}
            </text>

            {/* số THỨ TỰ Tiên Thiên 1–8 (badge) */}
            {showXianTian && (
              <g transform="translate(22,-22)">
                <circle r={8.5} fill="#1d2540" stroke="rgba(232,195,115,0.5)" strokeWidth={1} />
                <text textAnchor="middle" dominantBaseline="central" className="font-mono" style={{ fontSize: 9, fill: '#f4dda8' }}>
                  {t.xianTian}
                </text>
              </g>
            )}

            {/* id nhị phân (khi xem trục bù-bit, không trùng số tiên thiên) */}
            {showComplements && !showXianTian && (
              <text y={-30} textAnchor="middle" className="font-mono" style={{ fontSize: 9, fill: '#5d6480' }}>
                {t.id}
              </text>
            )}

            {/* pha trăng (nạp giáp) — đặt ngoài vòng tròn node, giãn cách cho dễ đọc */}
            {showOverlay === 'moon' && moon && (
              <text y={41} textAnchor="middle" style={{ fontSize: 9.5, fill: '#9aa1b6' }}>
                {en ? `${moon.phaseEn} · ${moon.dayEn}` : `${moon.phase} · ${moon.day}`}
              </text>
            )}
            {showOverlay === 'moon' && body && (
              <text y={41} textAnchor="middle" style={{ fontSize: 9.5, fill: '#5d6480' }}>
                {en ? `${MOON_BODY_EN[t.nameHanViet]} (substance)` : `${body} (thể)`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
