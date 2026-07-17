import type { ReactNode } from 'react';
import { TICH_QUAI } from '@/data/monthHexagrams';
import { hexagramByKingWen } from '@/data/hexagrams';
import { polarToXY } from '@/lib/layout';
import { useLang } from '@/i18n';
import Gua from './Gua';

const SIZE = 440;
const C = SIZE / 2;
// R nhỏ lại để nhãn chí/phân (đặt ở R + LABEL_GAP) nằm NGOÀI ô node (cao 64px) mà vẫn lọt
// trong khung SIZE — node là button HTML định vị px nên KHÔNG đổi SIZE để khỏi vỡ căn lề.
const R = SIZE * 0.335;
const LABEL_GAP = 42;
// Nhãn phân (Xuân/Thu) nằm trên trục ngang, trùng ô Mão/Dậu (rộng 58px) → xếp 2 DÒNG cho
// hẹp ngang + đẩy ra xa hơn để lọt khe ngoài ô mà vẫn trong khung SIZE. (Nhãn chí trên/dưới
// giữ 1 dòng vì ô chỉ cao 64, đã thoáng.)
const EQUINOX_GAP = 50;

/** Góc (độ, từ đỉnh, kim đồng hồ) cho mỗi tháng âm lịch: m5 (Hạ chí) ở đỉnh. */
export function monthAngle(m: number) {
  return ((((m - 5) % 12) + 12) % 12) * 30;
}

/**
 * Vòng 12 Tích quái (controlled). Trạng thái `idx` (0..11 theo thứ tự dương-khí)
 * do trang cha (Layer5) giữ để đồng bộ với "Đồng hồ trời".
 */
export default function TichQuaiWheel({
  idx,
  onSelect,
  center,
}: {
  idx: number;
  onSelect: (i: number) => void;
  /** Nội dung đặt ở TÂM vòng (đang trống) — vd readout quẻ hiện tại ("đồng hồ vũ trụ"). */
  center?: ReactNode;
}) {
  const en = useLang() === 'en';
  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: '100%' }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.1)" />
        {[
          { a: 0, t: 'Hạ chí', en: 'Summer Solstice' },
          // Nhãn phân: tách sẵn 2 dòng để hẹp ngang, khỏi bị ô Mão/Dậu che.
          { a: 90, t: 'Thu phân', en: 'Autumn Equinox', lines: ['Thu', 'phân'], enLines: ['Autumn', 'Equinox'] },
          { a: 180, t: 'Đông chí', en: 'Winter Solstice' },
          { a: 270, t: 'Xuân phân', en: 'Spring Equinox', lines: ['Xuân', 'phân'], enLines: ['Spring', 'Equinox'] },
        ].map((m) => {
          const twoLine = m.lines != null; // chỉ 2 nhãn phân
          const p = polarToXY(C, C, R + (twoLine ? EQUINOX_GAP : LABEL_GAP), m.a);
          const rows = twoLine ? (en ? m.enLines! : m.lines!) : null;
          return (
            <text key={m.t} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" style={{ fontSize: en ? 10 : 12, fill: '#e8c373', fontWeight: 600 }}>
              {rows ? (
                <>
                  <tspan x={p.x} dy="-0.5em">{rows[0]}</tspan>
                  <tspan x={p.x} dy="1em">{rows[1]}</tspan>
                </>
              ) : (
                en ? m.en : m.t
              )}
            </text>
          );
        })}
      </svg>

      {TICH_QUAI.map((tq, i) => {
        const hex = hexagramByKingWen(tq.kingWen);
        const p = polarToXY(C, C, R, monthAngle(tq.lunarMonth));
        const active = i === idx;
        return (
          <button
            key={tq.kingWen}
            onClick={() => onSelect(i)}
            className="absolute flex flex-col items-center justify-center rounded-xl border p-1 transition"
            style={{
              left: p.x,
              top: p.y,
              width: 58,
              height: 64,
              marginLeft: -29,
              marginTop: -32,
              borderColor: active ? '#e8c373' : 'rgba(255,255,255,0.1)',
              background: active ? 'rgba(232,195,115,0.14)' : 'rgba(13,17,32,0.85)',
              boxShadow: active ? '0 0 16px -2px rgba(232,195,115,0.5)' : 'none',
            }}
            title={
              en
                ? `${hex.pinyin} · month ${tq.lunarMonth} (${tq.branchEn}·${tq.animalEn})${tq.solarTermEn ? ' · ' + tq.solarTermEn : ''}`
                : `${hex.nameHanViet} · tháng ${tq.lunarMonth} (${tq.branch}·${tq.animal})${tq.solarTerm ? ' · ' + tq.solarTerm : ''}`
            }
          >
            <Gua lines={hex.lines} width={28} lineHeight={3.5} gap={2} />
            <span className="mt-0.5 text-[8.5px] leading-none text-ink-muted">
              {en ? `${tq.branchEn}·${tq.animalEn}` : `${tq.branch}·${tq.animal}`}
            </span>
          </button>
        );
      })}

      {/* Tâm vòng: readout quẻ hiện tại (overlay không chặn click các node xung quanh). */}
      {center && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto w-[200px] max-w-[46%]">{center}</div>
        </div>
      )}
    </div>
  );
}
