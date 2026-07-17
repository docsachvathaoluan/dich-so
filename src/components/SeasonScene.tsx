import { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { TICH_QUAI } from '@/data/monthHexagrams';
import { polarToXY } from '@/lib/layout';
import { useLang } from '@/i18n';
import { monthAngle } from './TichQuaiWheel';

const DEG = Math.PI / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---------- Sơ đồ quỹ đạo (nhìn từ trên) — "ở đâu trong năm" ---------- */
const O_SIZE = 360;
const OC = O_SIZE / 2;
const O_ORBIT = O_SIZE * 0.34;

/* ---------- Trái Đất nhìn cạnh (side-on) — "vì sao có mùa" ---------- */
const H_W = 680; // rộng thêm để nhãn "Bắc/Nam bán cầu" bên phải không bị cắt
const H_H = 440;
const HCX = 360; // tâm Trái Đất
const HCY = H_H / 2;
const HR = 150; // bán kính Trái Đất
const SUN_X = 70; // Mặt Trời ở bên trái

/**
 * SeasonScene — "đồng hồ vũ trụ" cho trang Vũ trụ & Mùa.
 *
 * Hai khung phối hợp, dùng CHUNG một góc `angle` (động, nội suy mượt theo `idx`):
 *  1) Quỹ đạo nhìn từ trên: Mặt Trời ở tâm, Trái Đất chạy quanh, cán Bắc Đẩu chỉ tháng.
 *  2) Trái Đất nhìn CẠNH (phép chiếu side-on — đúng để dạy "vì sao có mùa"):
 *     - Mặt Trời bên trái, tia nắng song song → nửa TRÁI sáng (ngày), nửa PHẢI tối (đêm),
 *       ranh giới = terminator thẳng đứng.
 *     - Trục nghiêng 23.5°; tuỳ mùa, cực Bắc NGẢ về (mùa hè BBC) hay NGẢ XA (mùa đông) Mặt
 *       Trời → quyết định ngày dài/ngắn & ngày/đêm địa cực.
 *
 * Đồng bộ: `idx` rời rạc (12 tháng) điều khiển cả Tích Quái wheel; `angle` nội suy để
 * Trái Đất trôi mượt giữa hai tháng. Tôn trọng prefers-reduced-motion.
 */
export default function SeasonScene({ idx, compact = false }: { idx: number; compact?: boolean }) {
  const reduce = useReducedMotion();
  const en = useLang() === 'en';
  const cur = TICH_QUAI[idx];
  const target = monthAngle(cur.lunarMonth);

  // Góc động dùng chung. Nội suy theo hướng gần nhất để không "quay cả vòng".
  const angle = useMotionValue(target);
  useEffect(() => {
    const cur0 = angle.get();
    const delta = ((((target - cur0) % 360) + 540) % 360) - 180;
    const controls = animate(angle, cur0 + delta, {
      duration: reduce ? 0 : 0.9,
      ease: 'easeInOut',
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduce]);

  // lean = +1 ở Hạ chí (BBC ngả về Mặt Trời) … −1 ở Đông chí.
  const lean = useTransform(angle, (a) => Math.cos(a * DEG));
  const axisRotate = useTransform(lean, (l) => -23.5 * l); // độ nghiêng trục trên màn

  // Vị trí Trái Đất trên quỹ đạo (khung 1).
  const ox = useTransform(angle, (a) => polarToXY(OC, OC, O_ORBIT, a).x);
  const oy = useTransform(angle, (a) => polarToXY(OC, OC, O_ORBIT, a).y);
  // cán Bắc Đẩu (chỉ ra ngoài, ngược phía Mặt Trời cho dễ đọc): điểm đầu mút.
  const dipX = useTransform(angle, (a) => polarToXY(OC, OC, O_ORBIT + 34, a).x);
  const dipY = useTransform(angle, (a) => polarToXY(OC, OC, O_ORBIT + 34, a).y);

  // Glow "mặt trời lúc nửa đêm" ở cực đang ngả về Mặt Trời; cap tối ở cực ngả xa.
  const nDayGlow = useTransform(lean, (l) => clamp(l, 0, 1));
  const sDayGlow = useTransform(lean, (l) => clamp(-l, 0, 1));

  return (
    <div
      className={
        compact
          ? 'grid items-center gap-4 sm:grid-cols-[minmax(0,250px)_1fr]'
          : 'grid items-center gap-6 lg:grid-cols-[minmax(0,360px)_1fr]'
      }
    >
      {/* ---------- Khung 1: quỹ đạo nhìn từ trên ---------- */}
      <div className="mx-auto w-full" style={{ maxWidth: compact ? 250 : O_SIZE }}>
        <svg viewBox={`0 0 ${O_SIZE} ${O_SIZE}`} className="block w-full">
          <defs>
            <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff4d6" />
              <stop offset="55%" stopColor="#e8c373" />
              <stop offset="100%" stopColor="#c79a45" />
            </radialGradient>
          </defs>

          {/* quỹ đạo */}
          <circle cx={OC} cy={OC} r={O_ORBIT} fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 6" />

          {/* 4 mốc mùa */}
          {[
            { a: 0, t: en ? 'Summer Sol.' : 'Hạ chí' },
            { a: 90, t: en ? 'Autumn Eq.' : 'Thu phân' },
            { a: 180, t: en ? 'Winter Sol.' : 'Đông chí' },
            { a: 270, t: en ? 'Spring Eq.' : 'Xuân phân' },
          ].map((m) => {
            const p = polarToXY(OC, OC, O_ORBIT, m.a);
            const lp = polarToXY(OC, OC, O_ORBIT + 26, m.a);
            return (
              <g key={m.t}>
                <circle cx={p.x} cy={p.y} r={2} fill="rgba(232,195,115,0.6)" />
                <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fill: '#9aa1b6' }}>
                  {m.t}
                </text>
              </g>
            );
          })}

          {/* Mặt Trời */}
          <circle cx={OC} cy={OC} r={20} fill="url(#sunCore)" />
          <circle cx={OC} cy={OC} r={20} fill="none" stroke="#f4dda8" strokeWidth={1.5} opacity={0.5} className="animate-breathe" />

          {/* cán Bắc Đẩu → tháng */}
          <motion.line x1={OC} y1={OC} x2={dipX} y2={dipY} stroke="rgba(232,195,115,0.3)" strokeWidth={1} strokeDasharray="3 5" />

          {/* Trái Đất trên quỹ đạo */}
          <motion.circle cx={ox} cy={oy} r={8.5} fill="#23406e" stroke="#9fc6f0" strokeWidth={1.2} />
          <motion.circle cx={ox} cy={oy} r={3} fill="#bfe0ff" opacity={0.85} />
        </svg>
        <p className="mt-1 text-center text-xs text-ink-faint">
          {en ? (
            <>
              The Big Dipper's handle (斗柄) points to <b className="text-ink-muted">{cur.branchEn}</b> ({cur.animalEn}) — month {cur.lunarMonth}.
            </>
          ) : (
            <>
              Cán Bắc Đẩu (斗柄) chỉ cung <b className="text-ink-muted">{cur.branch}</b> ({cur.animal}) — tháng {cur.lunarMonth}.
            </>
          )}
        </p>
      </div>

      {/* ---------- Khung 2: Trái Đất nhìn cạnh — "vì sao có mùa" ---------- */}
      <div className={compact ? 'mx-auto w-full max-w-[400px]' : 'w-full'}>
        <svg viewBox={`0 0 ${H_W} ${H_H}`} className="block w-full">
          <defs>
            <radialGradient id="dayGrad" cx="35%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#bfe3ff" />
              <stop offset="55%" stopColor="#5b86c9" />
              <stop offset="100%" stopColor="#28406e" />
            </radialGradient>
            <radialGradient id="sunGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff4d6" />
              <stop offset="60%" stopColor="#e8c373" />
              <stop offset="100%" stopColor="rgba(199,154,69,0)" />
            </radialGradient>
            <clipPath id="litHalf">
              <rect x={HCX - HR} y={HCY - HR} width={HR} height={HR * 2} />
            </clipPath>
            <clipPath id="globeClip">
              <circle cx={HCX} cy={HCY} r={HR} />
            </clipPath>
          </defs>

          {/* Mặt Trời + tia nắng song song chiếu sang phải */}
          <circle cx={SUN_X} cy={HCY} r={46} fill="url(#sunGlow2)" />
          <circle cx={SUN_X} cy={HCY} r={24} fill="url(#dayGrad)" opacity={0} />
          <circle cx={SUN_X} cy={HCY} r={22} fill="#f4dda8" className="animate-breathe" />
          {[-110, -70, -30, 0, 30, 70, 110].map((dy) => (
            <line
              key={dy}
              x1={SUN_X + 26}
              y1={HCY + dy}
              x2={HCX - HR - 6}
              y2={HCY + dy}
              stroke="rgba(244,221,168,0.28)"
              strokeWidth={1}
              strokeDasharray="2 6"
            />
          ))}

          {/* Trái Đất: nền đêm + nửa trái ban ngày, terminator dọc */}
          <circle cx={HCX} cy={HCY} r={HR} fill="#0c1426" stroke="rgba(159,198,240,0.25)" strokeWidth={1} />
          <circle cx={HCX} cy={HCY} r={HR} fill="url(#dayGrad)" clipPath="url(#litHalf)" />
          <line x1={HCX} y1={HCY - HR} x2={HCX} y2={HCY + HR} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4" />

          {/* Khối nghiêng theo trục (xoay quanh tâm Trái Đất) */}
          <motion.g
            style={{ rotate: axisRotate, transformOrigin: `${HCX}px ${HCY}px`, transformBox: 'view-box' as any }}
            clipPath="url(#globeClip)"
          >
            {/* vĩ tuyến: xích đạo + 2 chí tuyến + 2 vòng cực (vuông góc trục) */}
            {[
              { y: 0, w: 1.4, c: 'rgba(244,236,216,0.5)' },
              { y: -HR * 0.42, w: 0.8, c: 'rgba(232,195,115,0.4)' },
              { y: HR * 0.42, w: 0.8, c: 'rgba(232,195,115,0.4)' },
              { y: -HR * 0.78, w: 0.8, c: 'rgba(159,198,240,0.45)' },
              { y: HR * 0.78, w: 0.8, c: 'rgba(159,198,240,0.45)' },
            ].map((ln, i) => {
              const half = Math.sqrt(Math.max(0, HR * HR - ln.y * ln.y));
              return (
                <line
                  key={i}
                  x1={HCX - half}
                  y1={HCY + ln.y}
                  x2={HCX + half}
                  y2={HCY + ln.y}
                  stroke={ln.c}
                  strokeWidth={ln.w}
                />
              );
            })}

            {/* trục Bắc–Nam */}
            <line x1={HCX} y1={HCY - HR - 16} x2={HCX} y2={HCY + HR + 16} stroke="#f4ecd8" strokeWidth={1.5} opacity={0.85} />

            {/* chỏm cực: glow "mặt trời nửa đêm" / cap tối — sáng dần theo mùa */}
            <motion.circle cx={HCX} cy={HCY - HR * 0.86} r={16} fill="#f4dda8" style={{ opacity: nDayGlow }} className="glow-gold" />
            <motion.circle cx={HCX} cy={HCY + HR * 0.86} r={16} fill="#0a1020" style={{ opacity: sDayGlow }} />
            <motion.circle cx={HCX} cy={HCY - HR * 0.86} r={16} fill="#0a1020" style={{ opacity: sDayGlow }} />
            <motion.circle cx={HCX} cy={HCY + HR * 0.86} r={16} fill="#f4dda8" style={{ opacity: nDayGlow }} className="glow-gold" />
          </motion.g>

          {/* nhãn cực (cố định ngoài khối nghiêng để luôn đọc được) */}
          <motion.text
            style={{ rotate: axisRotate, transformOrigin: `${HCX}px ${HCY}px`, transformBox: 'view-box' as any }}
          >
            <tspan x={HCX} y={HCY - HR - 24} textAnchor="middle" style={{ fontSize: 13, fill: '#f4dda8', fontWeight: 700 }}>
              B
            </tspan>
          </motion.text>

          {/* nhãn bán cầu */}
          <text x={HCX + HR + 10} y={HCY - HR * 0.5} style={{ fontSize: 12, fill: '#9aa1b6' }}>{en ? 'N. hemisphere' : 'Bắc bán cầu'}</text>
          <text x={HCX + HR + 10} y={HCY + HR * 0.5} style={{ fontSize: 12, fill: '#9aa1b6' }}>{en ? 'S. hemisphere' : 'Nam bán cầu'}</text>
          <text x={HCX - HR / 2} y={HCY + HR + 26} textAnchor="middle" style={{ fontSize: 12, fill: '#e8c373' }}>{en ? 'day ☀' : 'ngày ☀'}</text>
          <text x={HCX + HR / 2} y={HCY + HR + 26} textAnchor="middle" style={{ fontSize: 12, fill: '#5d6480' }}>{en ? 'night ☾' : 'đêm ☾'}</text>
        </svg>

        <SeasonCaption idx={idx} compact={compact} />
      </div>
    </div>
  );
}

/** Chú thích mùa, suy từ độ nghiêng tương đối với Mặt Trời (lean). */
function SeasonCaption({ idx, compact = false }: { idx: number; compact?: boolean }) {
  const en = useLang() === 'en';
  const cur = TICH_QUAI[idx];
  const lean = Math.cos(monthAngle(cur.lunarMonth) * DEG);
  let msg: string;
  if (lean > 0.5)
    msg = en
      ? 'The North Pole leans toward the Sun → Northern-Hemisphere summer: long days, the far north has 24h daylight.'
      : 'Cực Bắc ngả về Mặt Trời → Bắc bán cầu mùa hè: ngày dài, vùng cực Bắc có ngày trắng 24h.';
  else if (lean < -0.5)
    msg = en
      ? 'The North Pole leans away from the Sun → Northern-Hemisphere winter: short days, the far north sinks into a long night.'
      : 'Cực Bắc ngả xa Mặt Trời → Bắc bán cầu mùa đông: ngày ngắn, vùng cực Bắc chìm trong đêm dài.';
  else
    msg = en
      ? 'The axis is nearly perpendicular to the Sun → day ≈ night everywhere (the equinoxes).'
      : 'Trục gần vuông góc với hướng Mặt Trời → ngày ≈ đêm khắp nơi (xuân/thu phân).';
  return (
    <p
      className={`mt-2 rounded-lg border border-white/5 bg-white/[0.02] text-center text-ink-muted ${
        compact ? 'p-2 text-xs' : 'p-3 text-sm'
      }`}
    >
      {msg}
    </p>
  );
}
