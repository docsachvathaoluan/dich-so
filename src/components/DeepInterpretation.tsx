import Gua from './Gua';
import Disclosure from './Disclosure';
import { hexagramExtraByKingWen } from '@/data/hexagramContent';
import { analyzeLinePositions, lineName, soloLineIndex } from '@/lib/linePositions';
import { displayString } from '@/lib/binary';
import { paragraphs, pickLang } from '@/lib/text';
import { useLang } from '@/i18n';
import type { Hexagram } from '@/types';

/**
 * ⑥ Sáu hào — dòng chảy. Liệt kê hào 1 (đáy) → hào 6 (đỉnh) theo chiều thời gian,
 * giống mạch đọc trong sách. Mỗi hào: glyph Gua + tên hào + badge "chủ quẻ" + nguyên
 * văn (爻辞) / dịch / ý hiện đại. Các dấu trung/chính/ứng chuyển xuống "Góc số học".
 */
export function SixLines({ hex }: { hex: Hexagram }) {
  const lang = useLang();
  const en = lang === 'en';
  const analysis = analyzeLinePositions(hex.lines);
  const extra = hexagramExtraByKingWen(hex.kingWen);
  const lineTexts = pickLang(lang, extra?.en?.lines, extra?.lines);
  const extraText = pickLang(lang, extra?.en?.extra, extra?.extra);
  const linePositionsText = pickLang(lang, hex.en?.modernDeep?.linePositions, hex.modernDeep?.linePositions);

  // Chủ quẻ: quả–chúng suy được từ bit (⚙ auto); còn lại lấy từ dữ liệu điền tay.
  const solo = soloLineIndex(hex.lines);
  const governing = solo !== null ? [solo] : extra?.governing ?? [];
  const governingAuto = solo !== null;

  return (
    <div>
      <p className="mb-2 text-xs italic text-ink-faint">
        {en
          ? '✦ Read from the BOTTOM (line 1) up to the TOP (line 6) — like a timeline.'
          : '✦ Đọc từ ĐÁY (hào 1, Sơ) lên ĐỈNH (hào 6, Thượng) — như dòng thời gian.'}
        {en
          ? ' The line statements (爻辞) are the classical text; the translation/sense is interpretation.'
          : ' Hào từ (爻辞) là nguyên văn cổ; phần dịch/ý là diễn giải.'}
      </p>

      <ul className="space-y-1.5">
        {analysis.lines.map((lp) => {
          const lt = lineTexts?.[lp.index];
          const isGov = governing.includes(lp.index);
          return (
            <li
              key={lp.position}
              className={`rounded-md border p-2 ${isGov ? 'border-gold/30 bg-gold/[0.04]' : 'border-white/5'}`}
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <Gua lines={[lp.bit]} width={28} lineHeight={3} />
                <span className="text-ink">{lineName(lp.position, lp.yang, lang)}</span>
                <span className={lp.yang ? 'text-gold-soft' : 'text-jade'}>
                  {lp.yang ? (en ? 'yang' : 'dương') : en ? 'yin' : 'âm'}
                </span>
                {isGov && (
                  <span
                    className="chip text-gold-soft"
                    title={
                      governingAuto
                        ? en
                          ? 'Ruling line derived from the bit pattern (the odd-one-out, 少者為主)'
                          : 'Chủ quẻ suy từ bit (thế quả–chúng, 少者為主)'
                        : en
                          ? 'Ruling line (per traditional interpretation)'
                          : 'Chủ quẻ (theo diễn giải truyền thống)'
                    }
                  >
                    {en ? 'ruling line' : 'chủ quẻ'}
                    {governingAuto ? ' ⚙' : ''}
                  </span>
                )}
              </div>
              {lt && (
                <div className="mt-1.5 pl-1">
                  <p className="text-xs">
                    <span className="font-medium text-gold-soft">{lt.textHV}</span>
                    <span className="text-ink-faint"> — {lt.gloss}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">{lt.modern}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Dụng Cửu / Dụng Lục (chỉ Càn #1, Khôn #2) */}
      {extraText && (
        <div className="mt-1.5 rounded-md border border-jade/20 bg-jade/[0.04] p-2">
          <p className="text-xs">
            <span className="font-medium text-jade">{extraText.textHV}</span>
            <span className="text-ink-faint"> — {extraText.gloss}</span>
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">{extraText.modern}</p>
        </div>
      )}

      {/* Lời dẫn hào vị (truyền thống) */}
      {linePositionsText &&
        paragraphs(linePositionsText).map((p, i) => (
          <p key={i} className="mt-2 text-sm text-ink-muted">
            {p}
          </p>
        ))}
    </div>
  );
}

/**
 * ⑧ Góc số học (thu gọn) — dồn phần "số soi Dịch": nhị phân, vị trí ma trận 8×8,
 * và bảng vị trí trung/chính/ứng (tính được). Mặc định đóng để người mới đọc mạch
 * narrative trước; ai muốn đào sâu thì mở ra.
 */
export function NumberCorner({ hex }: { hex: Hexagram }) {
  const lang = useLang();
  const en = lang === 'en';
  const analysis = analyzeLinePositions(hex.lines);
  const row = Math.floor(hex.fuxiValue / 8); // = quẻ trên
  const col = hex.fuxiValue % 8; // = quẻ dưới
  const binaryInsight = pickLang(lang, hex.en?.modernDeep?.binaryInsight, hex.modernDeep?.binaryInsight);

  return (
    <Disclosure
      title={en ? 'Number corner' : 'Góc số học'}
      subtitle={en ? 'binary · matrix · line positions' : 'nhị phân · ma trận · hào vị'}
      tone="jade"
      className="mt-2"
    >
      <div className="space-y-2">
        <p>
          {en ? 'Binary ' : 'Nhị phân '}
          <span className="font-mono text-ink">{displayString(hex.fuxiValue, false)}</span> ={' '}
          <span className="font-mono text-gold-soft">{hex.fuxiValue}</span>
          {en ? (
            <>
              {' '}— cell (row {row}, col {col}) in the 8×8 Fu Xi matrix (row = upper trigram,
              col = lower trigram, value = row×8 + col).
            </>
          ) : (
            <>
              {' '}— ô (hàng {row}, cột {col}) trong ma trận Phục Hy 8×8 (hàng = quẻ trên, cột = quẻ dưới, giá trị =
              hàng×8 + cột).
            </>
          )}
        </p>
        {binaryInsight && <p className="text-ink">{binaryInsight}</p>}

        <div className="mt-1 rounded-md border border-white/5 p-2">
          <p className="mb-1 text-xs italic text-ink-faint">
            {en ? (
              <>
                Central (中) / correct (正) / resonant (應) positions — <b>computable</b>, but the
                meaning assigned to line positions is a traditional framework.
              </>
            ) : (
              <>
                Vị trí trung (中) / chính (正) / ứng (應) — <b>tính được</b>, nhưng ý nghĩa gán cho hào vị
                là khung truyền thống.
              </>
            )}
          </p>
          <ul className="space-y-1">
            {analysis.lines.map((lp) => (
              <li key={lp.position} className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="w-16 text-ink">{lineName(lp.position, lp.yang, lang)}</span>
                {lp.central && <span className="chip">{en ? 'central' : 'trung'}</span>}
                {lp.correct ? (
                  <span className="chip">{en ? 'correct' : 'chính'}</span>
                ) : (
                  <span className="chip text-ink-faint">{en ? 'out of place' : 'lệch vị'}</span>
                )}
                {lp.centralCorrect && (
                  <span className="chip text-gold-soft">{en ? 'central & correct' : 'trung chính'}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-xs text-ink-faint">
            {en ? 'Resonance (lower–upper pairs): ' : 'Ứng (cặp dưới–trên): '}
            {analysis.correspondences.map((c, i) => (
              <span key={c.lower}>
                {i > 0 && ' · '}
                {c.lower}–{c.upper}{' '}
                {c.resonant
                  ? en
                    ? '✓ resonant'
                    : '✓ có ứng'
                  : en
                    ? '✗ not resonant'
                    : '✗ không ứng'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Disclosure>
  );
}
