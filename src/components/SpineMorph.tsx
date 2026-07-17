import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HEXAGRAMS, hexagramByFuxi } from '@/data/hexagrams';
import { symmetryFamily, reversedValue, oppositeValue, familyKind } from '@/lib/relations';
import type { FamilyKind } from '@/lib/relations';
import { fuxiCircleAngle, polarToXY } from '@/lib/layout';
import { countYang } from '@/lib/binary';
import { trigramById } from '@/data/trigrams';
import { useLang } from '@/i18n';
import { pickLang } from '@/lib/text';
import Gua from './Gua';
import TermLabel from './TermLabel';

// ───────────────────────────────────────────────────────────────────────────
// HERO C — Morph Phương (8×8) ↔ Viên (vòng Tiên Thiên), điều khiển bằng THANH TRƯỢT,
// GHÉP với panel giải nghĩa (rê để xem · bấm để ghim). Một SVG HỢP NHẤT: mỗi quẻ có
// toạ độ ô-vuông & toạ-độ-cung của CHÍNH nó (cùng fuxiValue), nội suy tuyến tính theo
// t∈[0,1]. Rê/ghim 1 quẻ → sáng cả HỌ đối xứng (Đối=xuyên tâm, Đảo=gương) + panel bên
// phải kể nghĩa quẻ và VÌ SAO ba quẻ kia liên quan.
// Không auto-animation → an toàn prefers-reduced-motion (slider vẫn kéo tay).
// ───────────────────────────────────────────────────────────────────────────

const VB = 660;
const C = VB / 2; // tâm
const S = 360; // cạnh lưới vuông
const CELL = S / 8;
const G0 = C - S / 2; // góc trên-trái lưới
// Bán kính vòng: giữ bất biến chống-chồng-lấn 2·R·sin(π/64) ≥ TILE.
// R=300, TILE=27 → khoảng cách tâm ≈ 29.4 > 27 (khe ~2.4 đơn vị). Đổi TILE/R phải giữ BĐT.
const R = 300; // bán kính vòng

const GOLD = [232, 195, 115];
const JADE = [95, 184, 154];
function yangColor(yang: number, alpha = 0.9): string {
  const t = yang / 6;
  const c = GOLD.map((g, i) => Math.round(JADE[i] + (g - JADE[i]) * t));
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Toạ độ ô vuông của quẻ (r=⌊v/8⌋, c=v%8) — khớp PhuongSquare (value = c + r*8). */
function squarePos(v: number) {
  const r = Math.floor(v / 8);
  const c = v % 8;
  return { x: G0 + c * CELL + CELL / 2, y: G0 + r * CELL + CELL / 2 };
}
/** Toạ độ trên vòng Tiên Thiên (cùng thứ tự reverseBits mà Phương Viên Đồ dùng). */
function circlePos(v: number) {
  return polarToXY(C, C, R, fuxiCircleAngle(v));
}
function posAt(v: number, t: number) {
  const s = squarePos(v);
  const o = circlePos(v);
  return { x: lerp(s.x, o.x, t), y: lerp(s.y, o.y, t) };
}

// ── Nhãn quan hệ: cờ ĐỘC LẬP (không dùng chuỗi ưu tiên) — 4 họ "đôi-2 kiểu Đảo≡Đối"
//    có thành viên VỪA Đảo VỪA Đối, phải ghi trung thực. ─────────────────────
const REL_HAN: Record<string, string> = {
  Đối: '錯',
  Đảo: '綜',
  'Đảo-Đối': '綜錯',
  'Đảo ≡ Đối': '綜=錯',
};
// Nhãn quan hệ EN (keyed theo nhãn VN — dùng làm khoá ổn định giữa hai ngôn ngữ).
const REL_LABEL_EN: Record<string, string> = {
  Đối: 'Opposite',
  Đảo: 'Reversed',
  'Đảo-Đối': 'Reversed-Opposite',
  'Đảo ≡ Đối': 'Reversed ≡ Opposite',
};
const REL_WHY: Record<string, string> = {
  Đối: 'Bù MỌI hào → phản chiếu qua tâm; tổng hai quẻ = 63. Cực ngược hoàn toàn.',
  Đảo: 'Lật thứ tự hào trên–dưới → phản chiếu qua gương. Cùng một việc, nhìn từ phía đối diện.',
  'Đảo-Đối': 'Làm cả hai phép → vừa lật hào vừa bù bit.',
  'Đảo ≡ Đối': 'Ở họ này, lật hào và bù bit ra CÙNG một quẻ — phản chiếu gương trùng phản chiếu tâm.',
};
const REL_WHY_EN: Record<string, string> = {
  Đối: 'Complement EVERY line → reflection through the center; the two hexagrams sum to 63. Complete polar reversal.',
  Đảo: 'Flip the top–bottom order of the lines → reflection through a mirror. The same matter seen from the opposite side.',
  'Đảo-Đối': 'Apply both operations → both flip the lines and complement the bits.',
  'Đảo ≡ Đối': 'In this family, flipping the lines and complementing the bits give the SAME hexagram — mirror reflection coincides with central reflection.',
};
// ── Khung cấu trúc "Đọc cả họ" — auto-sinh theo LOẠI họ. Mô tả CẤU TRÚC đối xứng,
//    KHÔNG bịa "chủ đề ngữ nghĩa" (giữ ranh giới TRUNG THỰC — nghĩa tổng quát do user rút ra).
const FAMILY_FRAME: Record<FamilyKind, string> = {
  full4:
    'Họ đầy-4: bốn quẻ là bốn biến thể đối xứng của CÙNG một mẫu 6 hào — đọc dọc để đối chiếu một thế nhìn từ 4 góc (chính · Đảo/gương · Đối/nghịch tâm · cả hai).',
  palindrome:
    'Họ đôi-2: quẻ này TỰ-ĐẢO (đọc xuôi = đọc ngược), nên họ co lại chỉ còn nó và quẻ Đối của nó.',
  reversalEqualsOpposite:
    'Họ đôi-2: ở họ này ĐẢO TRÙNG ĐỐI (lật thứ tự hào và bù mọi bit ra cùng một quẻ), nên họ chỉ còn nó và quẻ Đối.',
};
const FAMILY_FRAME_EN: Record<FamilyKind, string> = {
  full4:
    'A full-4 family: the four hexagrams are four symmetric variants of the SAME 6-line pattern — read them together to compare one situation from four angles (the hexagram · Reversed/mirror · Opposite/central-inverse · both).',
  palindrome:
    'A pair-2 family: this hexagram is SELF-REVERSED (reads the same forward and backward), so the family shrinks to just it and its Opposite.',
  reversalEqualsOpposite:
    'A pair-2 family: here REVERSED COINCIDES WITH OPPOSITE (flipping the line order and complementing every bit give the same hexagram), so the family is only it and its Opposite.',
};

function relLabel(v: number, opp: number, rev: number): { label: string; color: string } {
  const isOpp = v === opp;
  const isRev = v === rev;
  if (isOpp && isRev) return { label: 'Đảo ≡ Đối', color: 'text-gold-soft' };
  if (isOpp) return { label: 'Đối', color: 'text-gold-soft' };
  if (isRev) return { label: 'Đảo', color: 'text-jade' };
  return { label: 'Đảo-Đối', color: 'text-ink-muted' };
}

/** Panel giải nghĩa quẻ đang rê/ghim + vì sao Đối/Đảo/Đảo-Đối (họ đối xứng). */
function RelationPanel({
  value,
  isHovering,
  onPin,
}: {
  value: number;
  isHovering: boolean;
  onPin: (v: number) => void;
}) {
  const lang = useLang();
  const en = lang === 'en';
  const hex = hexagramByFuxi(value);
  const upperT = trigramById(hex.upper);
  const lowerT = trigramById(hex.lower);
  const opp = oppositeValue(hex.lines);
  const rev = reversedValue(hex.lines);
  const family = symmetryFamily(hex.lines).filter((v) => v !== value);
  const kind = familyKind(hex.lines);

  return (
    <div className="panel p-5">
      {/* đầu quẻ */}
      <div className="flex items-start gap-3">
        <div className="rounded-lg border border-white/10 bg-cosmos-700/40 p-2">
          <Gua lines={hex.lines} width={46} lineHeight={6} gap={4} glow />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 text-[10px] uppercase tracking-wide text-ink-faint">
            {en ? (isHovering ? 'hovering' : 'pinned') : isHovering ? 'đang rê' : 'đang ghim'}
          </div>
          <TermLabel modern={hex.nameModern} hanViet={hex.nameHanViet} modernEn={hex.nameModernEn} pinyin={hex.pinyin} hanzi={hex.hanzi} size="lg" />
          <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
            <span className="chip">{en ? `King Wen #${hex.kingWen}` : `Văn Vương #${hex.kingWen}`}</span>
            <span className="chip">
              {upperT.symbol} {en ? upperT.nameModernEn : upperT.nameModern} / {en ? lowerT.nameModernEn : lowerT.nameModern} {lowerT.symbol}
            </span>
          </div>
        </div>
      </div>

      {/* ý nghĩa ngắn */}
      <p className="mt-3 text-sm text-ink">{pickLang(lang, hex.en?.modernShort, hex.modernShort)}</p>
      <Link
        to={`/64-que?q=${hex.kingWen}`}
        className="mt-1.5 inline-block text-xs text-gold-soft underline-offset-2 hover:underline"
      >
        {en ? '→ See detail on the 64 Hexagrams page' : '→ Xem chi tiết ở trang 64 Quẻ'}
      </Link>

      {/* họ đối xứng — vì sao liên quan */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="mb-2 text-xs font-semibold text-gold-soft">
          {en ? 'The symmetry family — why they relate' : 'Họ đối xứng — vì sao liên quan'}
        </div>
        {family.length === 0 ? (
          <p className="text-xs text-ink-faint">
            {en ? 'This hexagram is self-symmetric — it produces no other members.' : 'Quẻ này tự đối xứng — không sinh thành viên khác.'}
          </p>
        ) : (
          <ul className="space-y-2">
            {family.map((v) => {
              const m = hexagramByFuxi(v);
              const { label, color } = relLabel(v, opp, rev);
              return (
                <li key={v}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onPin(v)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onPin(v);
                      }
                    }}
                    className="group flex cursor-pointer items-start gap-2.5 rounded-lg px-1.5 py-1.5 hover:bg-white/5"
                  >
                    <div className="mt-0.5 shrink-0">
                      <Gua lines={m.lines} width={26} lineHeight={3} gap={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className={`text-xs font-semibold ${color}`}>
                          {en ? REL_LABEL_EN[label] : label} <span className="han font-normal opacity-80">{REL_HAN[label]}</span>
                        </span>
                        <span className="text-sm text-ink">{en ? m.nameModernEn : m.nameModern}</span>
                        <span className="text-xs text-ink-faint">{en ? m.pinyin : m.nameHanViet}</span>
                      </div>
                      {/* NGHĨA riêng của quẻ (dòng chính) */}
                      <p className="mt-0.5 text-xs text-ink">{pickLang(lang, m.en?.modernShort, m.modernShort)}</p>
                      {/* CƠ CHẾ liên kết (dòng phụ, nhạt) */}
                      <p className="mt-0.5 text-[11px] leading-snug text-ink-faint">{en ? REL_WHY_EN[label] : REL_WHY[label]}</p>
                    </div>
                    <Link
                      to={`/64-que?q=${m.kingWen}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={en ? `Detail ${m.nameModernEn}` : `Chi tiết ${m.nameModern}`}
                      className="shrink-0 self-center text-sm text-gold-soft opacity-0 transition-opacity hover:underline group-hover:opacity-100"
                    >
                      →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Đọc cả họ — khung cấu trúc auto (đúc kết; KHÔNG bịa chủ đề ngữ nghĩa) */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="mb-1.5 text-xs font-semibold text-gold-soft">{en ? 'Read the whole family' : 'Đọc cả họ'}</div>
        <p className="text-xs text-ink-muted">{en ? FAMILY_FRAME_EN[kind] : FAMILY_FRAME[kind]}</p>
        <p className="mt-1.5 text-[11px] italic leading-snug text-ink-faint">
          {en
            ? 'An auto structural frame — the general meaning is for you to draw from the senses above; the app imposes none.'
            : 'Khung cấu trúc auto — ý nghĩa tổng quát do bạn tự rút ra từ các nghĩa trên, app không áp đặt.'}
        </p>
      </div>
    </div>
  );
}

export default function SpineMorph() {
  const [t, setT] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState(17); // Truân — họ đầy-4, minh hoạ đủ 4 quan hệ
  const en = useLang() === 'en';

  // ?? (KHÔNG ||): fuxiValue = 0 (Khôn) hợp lệ, || sẽ nuốt mất Khôn khi rê.
  const active = hover ?? pinned;
  const activeHex = hexagramByFuxi(active);
  const family = symmetryFamily(activeHex.lines);
  const opp = oppositeValue(activeHex.lines); // Đối (63−v)
  const rev = reversedValue(activeHex.lines); // Đảo

  const TILE = 27;
  const stateLabel = en
    ? t < 0.02 ? 'Square · Earth' : t > 0.98 ? 'Round · Heaven' : 'folding…'
    : t < 0.02 ? 'Phương · vuông · Đất' : t > 0.98 ? 'Viên · tròn · Trời' : 'đang gập…';

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* ── CỘT TRÁI: biểu đồ gập + điều khiển (rộng hơn để vòng thoáng) ─── */}
      <div>
        <svg viewBox={`0 0 ${VB} ${VB}`} className="mx-auto block w-full max-w-[640px]">
          {/* đường nối HỌ đối xứng của quẻ đang rê/ghim (vẽ dưới các ô) */}
          {opp != null && (() => {
            const a = posAt(active, t);
            const b = posAt(opp, t);
            return (
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="rgba(232,195,115,0.7)" strokeWidth={1.6} strokeDasharray="4 3" />
            );
          })()}
          {rev !== active && (() => {
            const a = posAt(active, t);
            const b = posAt(rev, t);
            return (
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="rgba(95,184,154,0.7)" strokeWidth={1.6} strokeDasharray="2 3" />
            );
          })()}

          {/* 64 ô quẻ */}
          {HEXAGRAMS.map((h) => {
            const v = h.fuxiValue;
            const p = posAt(v, t);
            const inFam = family.includes(v);
            const isHover = hover === v;
            const isPinned = pinned === v;
            const yang = countYang(h.lines);
            return (
              <g
                key={v}
                transform={`translate(${p.x - TILE / 2},${p.y - TILE / 2})`}
                onMouseEnter={() => setHover(v)}
                onMouseLeave={() => setHover((cur) => (cur === v ? null : cur))}
                onClick={() => setPinned(v)}
                style={{
                  cursor: 'pointer',
                  // Highlight bằng GLOW (khác kênh với màu nền) → tương phản rõ.
                  filter: isHover
                    ? 'drop-shadow(0 0 5px rgba(236,232,221,0.6))'
                    : inFam || isPinned
                    ? 'drop-shadow(0 0 4px rgba(232,195,115,0.5))'
                    : undefined,
                }}
              >
                <rect
                  width={TILE} height={TILE - 2} rx={3}
                  // Nền = thang màu; nghỉ 0.62, dim vừa (0.34) khi rê → mosaic vẫn thấy.
                  fill={yangColor(yang, inFam ? 0.9 : hover != null ? 0.34 : 0.62)}
                  stroke={
                    isHover
                      ? '#ece8dd'
                      : isPinned
                      ? 'rgba(232,195,115,0.95)'
                      : inFam
                      ? 'rgba(244,221,168,0.9)'
                      : 'rgba(5,6,13,0.5)'
                  }
                  strokeWidth={isHover ? 1.8 : isPinned ? 1.6 : inFam ? 1.2 : 0.5}
                />
                {/* Tấm nền tối bán trong suốt → hào gold/jade nổi trên nền cùng họ màu. */}
                <rect x={2} y={2} width={TILE - 4} height={TILE - 6} rx={2} fill="rgba(5,6,13,0.4)" />
                <g transform="translate(2.5,2.5)">
                  <Gua lines={h.lines} width={TILE - 5} lineHeight={2.4} gap={1.3} />
                </g>
              </g>
            );
          })}

          {/* tâm Thái Cực (rõ khi ở trạng thái Viên) */}
          <circle cx={C} cy={C} r={10} fill="#080b16" stroke="rgba(232,195,115,0.25)" opacity={t} />
          <text x={C} y={C + 4} textAnchor="middle" style={{ fontSize: 12, fill: '#e8c373', opacity: t }}>☯</text>
        </svg>

        {/* Thanh trượt Phương ⟷ Viên */}
        <div className="mx-auto mt-4 flex max-w-[640px] items-center gap-3">
          <span className="text-xs text-ink-faint">{en ? 'Square' : 'Phương'}</span>
          <input
            type="range" min={0} max={1} step={0.01} value={t}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-gold"
            aria-label={en ? 'Fold the square matrix into a circle' : 'Gập ma trận vuông thành vòng tròn'}
          />
          <span className="text-xs text-ink-faint">{en ? 'Round' : 'Viên'}</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-3 text-xs">
          <button className="switch-btn !py-1" data-active={t < 0.5} onClick={() => setT(0)}>{en ? 'Square' : 'Vuông (Phương)'}</button>
          <span className="text-ink-faint">{stateLabel}</span>
          <button className="switch-btn !py-1" data-active={t >= 0.5} onClick={() => setT(1)}>{en ? 'Round' : 'Tròn (Viên)'}</button>
        </div>
        <p className="mt-3 text-center text-xs text-ink-faint">
          {en ? (
            <>
              The same <b className="text-ink-muted">fuxiValue</b>: cell (row, col) folds to the very arc of{' '}
              <b className="text-ink-muted">that hexagram</b>. Hover or tap a hexagram to see{' '}
              <span className="text-gold-soft">Opposite (through center)</span> ·{' '}
              <span className="text-jade">Reversed (mirror)</span> — the whole symmetry family, with meanings in the panel at right.
            </>
          ) : (
            <>
              Cùng một <b className="text-ink-muted">fuxiValue</b>: ô (hàng, cột) gập về đúng cung của{' '}
              <b className="text-ink-muted">chính quẻ đó</b>. Rê hoặc bấm một quẻ để thấy{' '}
              <span className="text-gold-soft">Đối (xuyên tâm)</span> ·{' '}
              <span className="text-jade">Đảo (gương)</span> — cả họ đối xứng, đọc nghĩa ở bảng bên phải.
            </>
          )}
        </p>
      </div>

      {/* ── CỘT PHẢI: panel giải nghĩa ─────────────────────────────── */}
      <RelationPanel value={active} isHovering={hover != null} onPin={setPinned} />
    </div>
  );
}
