import { useState } from 'react';
import { hexagramByFuxi, hexagramByKingWen } from '@/data/hexagrams';
import { symmetryFamily } from '@/lib/relations';
import { countYang } from '@/lib/binary';
import { useLang } from '@/i18n';
import type { Hexagram } from '@/types';
import Gua from './Gua';

// ───────────────────────────────────────────────────────────────────────────
// HERO B — Đối chiếu HAI TRẬT TỰ của cùng 64 quẻ.
//   Trái: Phục Hy 8×8 (fuxiValue = c + r*8) → tô theo số hào dương ra DẢI màu sạch.
//   Phải: Văn Vương 1→64 (thứ tự sách) → cùng cách tô ra "VỠ VỤN".
// Rê một quẻ → sáng cả HỌ đối xứng (symmetryFamily) ở CẢ HAI lưới: cụm vs tán.
// KHÔNG dùng HexagramMatrix (nó bind useSettings.arrangement toàn cục — không đặt cạnh nhau được).
// ───────────────────────────────────────────────────────────────────────────

const GOLD = [232, 195, 115];
const JADE = [95, 184, 154];
function yangColor(yang: number, alpha = 0.9): string {
  const t = yang / 6;
  const c = GOLD.map((g, i) => Math.round(JADE[i] + (g - JADE[i]) * t));
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
}

function Grid({
  title,
  sub,
  cells,
  hover,
  family,
  onHover,
  en,
}: {
  title: string;
  sub: string;
  cells: Hexagram[]; // 64 quẻ theo thứ tự lưới (trái→phải, trên→dưới)
  hover: number | null;
  family: number[];
  onHover: (fuxiValue: number | null) => void;
  en: boolean;
}) {
  return (
    <div>
      <div className="mb-2">
        <div className="text-sm font-medium text-ink">{title}</div>
        <div className="text-xs text-ink-faint">{sub}</div>
      </div>
      <div className="grid grid-cols-8 gap-1.5" onMouseLeave={() => onHover(null)}>
        {cells.map((h) => {
          const v = h.fuxiValue;
          const inFam = family.includes(v);
          const isHover = hover === v;
          const yang = countYang(h.lines);
          return (
            <button
              key={h.kingWen}
              onMouseEnter={() => onHover(v)}
              onFocus={() => onHover(v)}
              title={`${en ? h.pinyin : h.nameHanViet} · #${h.kingWen} · ${v}`}
              className="flex aspect-square items-center justify-center overflow-hidden rounded-[4px] transition"
              style={{
                // Nền = THANG MÀU (mosaic "dải sạch vs vỡ vụn") — GIỮ. Không đẩy alpha khi
                // highlight (glyph sẽ tan vào nền cùng màu); highlight dùng viền + glow.
                background: yangColor(yang, inFam ? 0.9 : hover == null ? 0.62 : 0.34),
                outline: isHover
                  ? '2px solid #ece8dd'
                  : inFam
                  ? '1.75px solid rgba(244,221,168,0.9)'
                  : 'none',
                outlineOffset: -1,
                boxShadow: isHover
                  ? '0 0 14px -2px rgba(236,232,221,0.65)'
                  : inFam
                  ? '0 0 10px -3px rgba(232,195,115,0.5)'
                  : undefined,
              }}
            >
              {/* Tấm nền tối (bán trong suốt → ramp vẫn ánh qua) để hào gold/jade nổi rõ. */}
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: 'rgba(5,6,13,0.4)' }}
              >
                <Gua lines={h.lines} width={34} lineHeight={4.4} gap={3} className="h-auto w-[60%]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TwoOrders() {
  const [hover, setHover] = useState<number | null>(null);
  const en = useLang() === 'en';

  const hoverHex = hover != null ? hexagramByFuxi(hover) : null;
  const family = hoverHex ? symmetryFamily(hoverHex.lines) : [];

  const fuxiCells: Hexagram[] = Array.from({ length: 64 }, (_, i) => hexagramByFuxi(i)); // 0..63
  const kingWenCells: Hexagram[] = Array.from({ length: 64 }, (_, i) => hexagramByKingWen(i + 1)); // 1..64

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <Grid
          title={en ? 'Fu Xi · Earlier Heaven' : 'Phục Hy · Tiên Thiên'}
          sub={en ? 'fuxiValue 0→63 · Opposite axis + binary magnitude → clean color bands' : 'fuxiValue 0→63 · trục ĐỐI + độ lớn nhị phân → dải màu sạch'}
          cells={fuxiCells}
          hover={hover}
          family={family}
          onHover={setHover}
          en={en}
        />
        <Grid
          title={en ? 'King Wen · Later Heaven' : 'Văn Vương · Hậu Thiên'}
          sub={en ? 'book order 1→64 · Reversed axis (32 pairs) → shattered color' : 'thứ tự sách 1→64 · trục ĐẢO (32 cặp) → màu vỡ vụn'}
          cells={kingWenCells}
          hover={hover}
          family={family}
          onHover={setHover}
          en={en}
        />
      </div>
      <p className="mt-3 text-center text-xs text-ink-faint">
        {hoverHex ? (
          en ? (
            <>
              Hovering <b className="text-ink-muted">{hoverHex.pinyin}</b> — a symmetry family of{' '}
              <b className="text-gold-soft">{family.length} hexagram{family.length > 1 ? 's' : ''}</b>: sitting at{' '}
              <b className="text-ink-muted">symmetric positions (opposite through the center)</b> in Fu Xi,{' '}
              <b className="text-ink-muted">scattered with no pattern</b> in King Wen. Same 64 hexagrams, two arrangements.
            </>
          ) : (
            <>
              Đang rê <b className="text-ink-muted">{hoverHex.nameHanViet}</b> — họ đối xứng{' '}
              <b className="text-gold-soft">{family.length} quẻ</b>: nằm ở vị trí{' '}
              <b className="text-ink-muted">đối xứng (đối qua tâm)</b> bên Phục Hy,{' '}
              <b className="text-ink-muted">rải rác vô quy luật</b> bên Văn Vương. Cùng 64 quẻ, hai cách sắp.
            </>
          )
        ) : en ? (
          <>Hover a hexagram to see where its symmetry family lands in each order.</>
        ) : (
          <>Rê một quẻ để xem họ đối xứng của nó rơi vào đâu ở mỗi trật tự.</>
        )}
      </p>
    </div>
  );
}
