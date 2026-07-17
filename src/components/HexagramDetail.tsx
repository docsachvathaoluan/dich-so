import Gua from './Gua';
import TermLabel from './TermLabel';
import Disclosure from './Disclosure';
import { SixLines, NumberCorner } from './DeepInterpretation';
import WisdomCallout from './WisdomCallout';
import { hexagramExtraByKingWen } from '@/data/hexagramContent';
import { trigramById } from '@/data/trigrams';
import { anchorsByHex } from '@/data/daoistWisdom';
import { paragraphs, pickLang } from '@/lib/text';
import { useSettings } from '@/store/useSettings';
import { useLang } from '@/i18n';
import type { Hexagram } from '@/types';

export default function HexagramDetail({ hex }: { hex: Hexagram }) {
  const upperT = trigramById(hex.upper);
  const lowerT = trigramById(hex.lower);
  const colorMode = useSettings((s) => s.colorMode);
  const showWisdom = useSettings((s) => s.showWisdom);
  const lang = useLang();
  const en = lang === 'en';

  const extra = hexagramExtraByKingWen(hex.kingWen);
  const wisdomAnchor = showWisdom ? anchorsByHex.get(hex.kingWen) : undefined;

  // Prose theo ngôn ngữ (fallback VN khi chưa có EN).
  const modernShort = pickLang(lang, hex.en?.modernShort, hex.modernShort);
  const structureInsight = pickLang(lang, hex.en?.modernDeep?.structureInsight, hex.modernDeep?.structureInsight);
  const modernMapping = pickLang(lang, hex.en?.modernDeep?.modernMapping, hex.modernDeep?.modernMapping);
  const coreLesson = pickLang(lang, extra?.en?.coreLesson, extra?.coreLesson);
  const sequenceLogic = pickLang(lang, extra?.en?.sequenceLogic, extra?.sequenceLogic);
  const keywords = pickLang(lang, hex.en?.keywords, hex.keywords);
  const sources = pickLang(lang, hex.sourcesEn, hex.sources);
  const judgment = en ? hex.en?.judgmentGloss ?? hex.judgmentClassic : hex.judgmentClassic;
  const image = en ? hex.en?.imageGloss ?? hex.imageClassic : hex.imageClassic;
  const hasClassic = judgment || image;

  // Tên quái theo ngôn ngữ.
  const upName = en ? upperT.nameModernEn : upperT.nameModern;
  const loName = en ? lowerT.nameModernEn : lowerT.nameModern;
  const upAlt = en ? upperT.pinyin : upperT.nameHanViet;
  const loAlt = en ? lowerT.pinyin : lowerT.nameHanViet;

  return (
    <div className="panel p-6">
      {/* ── ① Đầu quẻ ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-white/10 bg-cosmos-700/40 p-3">
          <Gua lines={hex.lines} width={60} lineHeight={8} gap={5} glow colorMode={colorMode} />
        </div>
        <div className="min-w-0 flex-1">
          <TermLabel
            modern={hex.nameModern}
            hanViet={hex.nameHanViet}
            hanzi={hex.hanzi}
            modernEn={hex.nameModernEn}
            pinyin={hex.pinyin}
            size="xl"
          />
          <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
            <span className="chip">{en ? `King Wen #${hex.kingWen}` : `Văn Vương #${hex.kingWen}`}</span>
            <span className="chip">
              {upperT.symbol} {upName} / {loName} {lowerT.symbol}
            </span>
            {hex.monthHexagram && (
              <span className="chip text-gold-soft">
                {en ? `Sovereign hexagram · month ${hex.monthHexagram}` : `Tích quái · tháng ${hex.monthHexagram}`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── ② Quẻ này là gì (mở sẵn — lead) ───────────────────────── */}
      <section className="mt-5">
        <p className="text-sm text-ink">{modernShort}</p>
        <p className="mt-2 text-sm text-ink-muted">
          <span className="text-ink">{upperT.symbol} {upName}</span>{' '}
          <span className="text-ink-faint">({upAlt})</span> {en ? 'ABOVE' : 'ở TRÊN'},{' '}
          <span className="text-ink">{lowerT.symbol} {loName}</span>{' '}
          <span className="text-ink-faint">({loAlt})</span> {en ? 'BELOW' : 'ở DƯỚI'} —{' '}
          {en
            ? `that is ${upperT.natureEn} over ${lowerT.natureEn}.`
            : `tức ${upperT.nature} trên ${lowerT.nature}.`}
        </p>
        {structureInsight && <p className="mt-2 text-sm text-ink">{structureInsight}</p>}
      </section>

      {/* ── ⑤ Ý nghĩa đời sống hôm nay (mở sẵn — thân bài chính) ──── */}
      {modernMapping && (
        <section className="mt-5">
          <h3 className="mb-1.5 text-sm font-semibold text-gold-soft">
            {en ? 'What it means today' : 'Ý nghĩa đời sống hôm nay'}
          </h3>
          <div className="space-y-2 text-sm text-ink">
            {paragraphs(modernMapping).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── ⑦ Bài học cốt lõi (mở sẵn) ───────────────────────────── */}
      {coreLesson && (
        <div className="mt-5 rounded-lg border border-gold/20 bg-gold/[0.05] p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-gold-soft">
            {en ? 'Core lesson' : 'Bài học cốt lõi'}
          </div>
          <p className="mt-1 text-sm text-ink">{coreLesson}</p>
        </div>
      )}

      {/* từ khóa */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {keywords.map((k) => (
          <span key={k} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-ink-faint">
            {k}
          </span>
        ))}
      </div>

      {/* ── Ranh giới: phần đọc sâu (thu gọn, bấm để mở) ─────────── */}
      <div className="mt-6 mb-1 flex items-center gap-2 text-[11px] uppercase tracking-wide text-ink-faint">
        <span>{en ? 'Go deeper' : 'Đọc sâu'}</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* ④ Lời cổ — Thoán · Tượng */}
      {hasClassic && (
        <Disclosure title={en ? 'Classical text — Judgment · Image' : 'Lời cổ — Thoán · Tượng'} tone="jade" className="mt-2">
          <div className="space-y-1.5 text-xs text-ink-muted">
            {judgment && (
              <p>
                <span className="text-ink-faint">{en ? 'Judgment (卦辞): ' : 'Lời quẻ (Thoán): '}</span>
                {judgment}
              </p>
            )}
            {image && (
              <p>
                <span className="text-ink-faint">{en ? 'Image (大象): ' : 'Hình ảnh (Tượng): '}</span>
                {image}
              </p>
            )}
          </div>
        </Disclosure>
      )}

      {/* ③ Vì sao đứng ở đây — Tự Quái 序卦傳 */}
      {sequenceLogic && (
        <Disclosure
          title={en ? 'Why it stands here' : 'Vì sao đứng ở đây'}
          subtitle={en ? 'Sequence 序卦傳' : 'Tự Quái 序卦傳'}
          tone="jade"
          className="mt-2"
        >
          <p className="text-xs text-ink-muted">{sequenceLogic}</p>
        </Disclosure>
      )}

      {/* ⑥ Sáu hào — dòng chảy (384 hào từ) */}
      <Disclosure
        title={en ? 'The six lines — the flow' : 'Sáu hào — dòng chảy'}
        subtitle={en ? '384 line texts · click to open' : '384 hào từ · bấm mở'}
        tone="jade"
        className="mt-2"
      >
        <SixLines hex={hex} />
      </Disclosure>

      {/* Đối chiếu Đạo gia (chỉ quẻ có neo văn bản + ⚙ showWisdom; ẩn ở EN tới Đợt 5) */}
      {wisdomAnchor && !en && (
        <Disclosure title="Đối chiếu Đạo gia" subtitle={wisdomAnchor.label} tone="silk" className="mt-2">
          <WisdomCallout hexKingWen={hex.kingWen} bare />
        </Disclosure>
      )}

      {/* ⑧ Góc số học (Disclosure nội bộ) */}
      <NumberCorner hex={hex} />

      {/* Nguồn tham chiếu */}
      <Disclosure title={en ? 'References' : 'Nguồn tham chiếu'} tone="muted" className="mt-2">
        <ul className="list-inside list-disc space-y-0.5 text-xs text-ink-faint">
          {sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Disclosure>
    </div>
  );
}
