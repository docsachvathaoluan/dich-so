import { useEffect, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure } from '@/components/Layout';
import TichQuaiWheel from '@/components/TichQuaiWheel';
import SeasonScene from '@/components/SeasonScene';
import WisdomCallout from '@/components/WisdomCallout';
import Gua from '@/components/Gua';
import TermLabel from '@/components/TermLabel';
import { TICH_QUAI } from '@/data/monthHexagrams';
import { hexagramByKingWen } from '@/data/hexagrams';
import { useLang } from '@/i18n';

export default function Layer5() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const en = useLang() === 'en';

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setPlaying(false);
      return;
    }
    const id = setInterval(() => setIdx((i) => (i + 1) % 12), 1600);
    return () => clearInterval(id);
  }, [playing]);

  const cur = TICH_QUAI[idx];
  const curHex = hexagramByKingWen(cur.kingWen);
  const rising = idx < 6;

  return (
    <div className="space-y-6">
      <Measure size="content">
        <PageHeader
          kicker={en ? 'Page 3 · Operation' : 'Trang 3 · Vận hành'}
          title={en ? 'The Cosmos & the Seasons' : 'Vũ trụ & Mùa'}
          symbol="◴"
        >
          {en ? (
            <>
              Arrange the hexagrams around a circle and align them with <b className="text-ink">the
              turning of the year</b>, and the Changes become a cosmic clock: the hexagram{' '}
              <b className="text-gold-soft">Return</b> answers to the <b>Winter Solstice</b> (yang energy
              reborn), and <b className="text-gold-soft">Coming to Meet</b> to the <b>Summer Solstice</b>.
              Each month also answers to a <b>zodiac animal</b> — and the whole system springs from
              watching the <b>stars</b>.
            </>
          ) : (
            <>
              Xếp các quẻ quanh một vòng và gióng vào <b className="text-ink">vòng quay của
              năm</b>, Dịch thành một chiếc đồng hồ vũ trụ: quẻ <b className="text-gold-soft">Phục</b>{' '}
              ứng <b>Đông chí</b> (dương khí hồi sinh), quẻ <b className="text-gold-soft">Cấu</b> ứng{' '}
              <b>Hạ chí</b>. Mỗi tháng lại ứng một <b>con giáp</b> — và cả hệ này bắt nguồn từ
              quan sát <b>sao trời</b>.
            </>
          )}
        </PageHeader>

        {/* HERO "Đồng hồ vũ trụ": vòng Tích quái + sơ đồ Trời–Đất + giải thích quẻ — 1 màn hình. */}
        <section className="panel-raised p-5 md:p-6">
          {/* Tiêu đề + thanh điều khiển (đồng bộ tâm vòng · node active · sơ đồ Trời–Đất) */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl">
                {en ? 'Cosmic clock — the 12 sovereign hexagrams' : 'Đồng hồ vũ trụ — Vòng 12 Tích quái'}
              </h2>
              <p className="text-xs text-ink-faint">
                {en
                  ? 'Each node = a month + zodiac animal; tap to select, or ▶ Play to watch yang energy swell then fade.'
                  : 'Mỗi nút = một tháng + con giáp; bấm để chọn, hoặc ▶ Chạy để xem dương khí lớn dần rồi tàn.'}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="switch-btn" onClick={() => setIdx((i) => (i + 11) % 12)}>{en ? '‹ Prev' : '‹ Trước'}</button>
              <button className="switch-btn" data-active={playing} onClick={() => setPlaying((p) => !p)}>
                {en ? (playing ? '⏸ Pause' : '▶ Play') : playing ? '⏸ Dừng' : '▶ Chạy'}
              </button>
              <button className="switch-btn" onClick={() => setIdx((i) => (i + 1) % 12)}>{en ? 'Next ›' : 'Sau ›'}</button>
            </div>
          </div>

          {/* 2 cột: vòng Tích quái (trái) · sơ đồ Trời–Đất thu nhỏ (phải) */}
          <div className="grid items-start gap-6 lg:grid-cols-[440px_1fr]">
            {/* min-w-0: ô lưới mặc định không co nhỏ hơn nội dung, nên thiếu nó thì vòng
                Tích quái vẫn đội khung ra dù bản thân nó đã co được. */}
            <div className="mx-auto min-w-0 w-full">
              <TichQuaiWheel
                idx={idx}
                onSelect={setIdx}
                center={
                  <Gua lines={curHex.lines} width={62} lineHeight={7} gap={4} glow className="mx-auto" />
                }
              />
            </div>

            <div className="min-w-0">
              <h3 className="mb-1 text-base text-ink">
                {en ? 'The sky-clock — why we have seasons' : 'Đồng hồ trời — vì sao có mùa'}
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-ink-muted">
                {en ? (
                  <>
                    The same month seen astronomically: Earth keeps a <b>23.5° axial tilt</b> as it
                    orbits the Sun. The side facing the Sun is <b className="text-gold-soft">day</b>, the
                    other is <b className="text-jade-soft">night</b>; depending on the season the North
                    Pole leans toward/away → long or short days.
                  </>
                ) : (
                  <>
                    Cùng tháng đó nhìn từ thiên văn: Trái Đất giữ <b>trục nghiêng 23.5°</b> khi quanh
                    Mặt Trời. Nửa hướng Mặt Trời là <b className="text-gold-soft">ngày</b>, nửa kia là{' '}
                    <b className="text-jade-soft">đêm</b>; tuỳ mùa cực Bắc ngả gần/xa → ngày dài hay ngắn.
                  </>
                )}
              </p>
              <SeasonScene idx={idx} compact />
              <p className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-[11px] leading-snug text-ink-faint">
                {en ? (
                  <>
                    ⚠️ The <b>modern (heliocentric)</b> account of the <i>same</i> phenomena the ancients
                    observed from the ground (<b>geocentric</b>): measuring sun-shadows to fix
                    solstices/equinoxes, watching the Big Dipper's handle to fix the month. The Big
                    Dipper is drawn <b>stylized</b>.
                  </>
                ) : (
                  <>
                    ⚠️ Cách giải thích <b>hiện đại (nhật tâm)</b> cho <i>cùng</i> hiện tượng người xưa
                    quan sát từ mặt đất (<b>địa tâm</b>): đo bóng nắng định chí/phân, nhìn cán Bắc Đẩu
                    định tháng. Chòm Bắc Đẩu vẽ <b>cách điệu</b>.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Dải dưới: giải thích quẻ đang chọn · đối chiếu Đạo gia (ngay dưới hai sơ đồ) */}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <Gua lines={curHex.lines} width={46} lineHeight={5.5} gap={3} glow />
              <div className="min-w-0">
                <TermLabel modern={curHex.nameModern} hanViet={curHex.nameHanViet} modernEn={curHex.nameModernEn} pinyin={curHex.pinyin} hanzi={curHex.hanzi} size="lg" />
                <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
                  <span className="chip">
                    {en
                      ? `Month ${cur.lunarMonth} · ${cur.branchEn} (${cur.animalEn})`
                      : `Tháng ${cur.lunarMonth} · ${cur.branch} (${cur.animal})`}
                  </span>
                  {cur.solarTerm && <span className="chip text-gold-soft">{en ? cur.solarTermEn : cur.solarTerm}</span>}
                </div>
                <div className={`mt-1 text-sm ${rising ? 'text-gold-soft' : 'text-jade-soft'}`}>
                  {en
                    ? `${cur.yang}/6 yang lines · ${rising ? '↑ Yang energy rising' : '↓ Yin energy rising'}`
                    : `${cur.yang}/6 hào dương · ${rising ? '↑ Dương khí đang lên' : '↓ Âm khí đang lên'}`}
                </div>
              </div>
            </div>

            <WisdomCallout key={curHex.kingWen} hexKingWen={curHex.kingWen} maxQuotes={1} className="animate-fade-up" />
          </div>
        </section>
      </Measure>

      <Measure size="content" className="space-y-6">
        {/* Gốc thiên văn */}
        <Reveal className="grid gap-4 md:grid-cols-2">
          <section className="panel-soft p-6">
            <h3 className="mb-2 text-lg text-gold-soft">
              {en ? 'Jupiter — the 12-year hand' : 'Mộc Tinh — chiếc kim 12 năm'}
            </h3>
            <p className="text-sm text-ink-muted">
              {en ? (
                <>
                  The 12 Earthly Branches originate with <b className="text-ink">Jupiter (歲星, the
                  Year Star)</b> — the largest planet, orbiting the Sun in about <b>12 years</b>. The
                  ancients divided the celestial circle into 12 stations by Jupiter's position each
                  year, giving rise to the 12 Branches and the 12 zodiac animals. (Tai Sui is the deity
                  answering to Jupiter.)
                </>
              ) : (
                <>
                  12 Địa Chi bắt nguồn từ <b className="text-ink">Mộc Tinh (歲星 Tuế tinh)</b> —
                  hành tinh lớn nhất, quay quanh Mặt Trời khoảng <b>12 năm</b>. Người xưa chia
                  vòng trời thành 12 cung theo vị trí Mộc Tinh mỗi năm, sinh ra 12 Chi và 12 con
                  giáp. (Thái Tuế chính là vị thần ứng với Mộc Tinh.)
                </>
              )}
            </p>
          </section>
          <section className="panel-soft p-6">
            <h3 className="mb-2 text-lg text-gold-soft">
              {en ? 'The Big Dipper — the monthly hand' : 'Bắc Đẩu — chiếc kim hằng tháng'}
            </h3>
            <p className="text-sm text-ink-muted">
              {en ? (
                <>
                  The handle of the <b className="text-ink">Big Dipper (斗柄)</b> sweeps around the pole
                  star at dusk. Whichever way it points fixes the month: at the Winter Solstice the
                  handle points North (station Zǐ) = "the month establishing Zi." Thus the Dipper's
                  handle is the clock-hand that divides the 12 months for the farmer.
                </>
              ) : (
                <>
                  Cán của chòm <b className="text-ink">Bắc Đẩu (斗柄)</b> lúc chập tối quét quanh
                  sao Bắc Cực. Nó chỉ hướng nào thì định tháng đó: Đông chí cán chỉ Bắc (cung Tý)
                  = "kiến Tý nguyệt". Cứ thế cán Bắc Đẩu là kim đồng hồ chia 12 tháng cho nhà nông.
                </>
              )}
            </p>
          </section>
        </Reveal>

        {/* 12 con giáp */}
        <Reveal as="section" className="panel p-6">
          <h2 className="mb-1 text-xl">
            {en ? 'The 12 sovereign hexagrams = the 12 zodiac animals' : '12 Tích quái = 12 con giáp'}
          </h2>
          <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
            {en ? (
              <>
                Since each month answers to a hexagram and an <b>Earthly Branch</b>, and each Branch is
                tied to a zodiac animal, the 12 sovereign hexagrams are the root of the <b>12 zodiac
                animals</b>. (The Vietnamese zodiac uses the <b className="text-gold-soft">Cat</b> for
                Mǎo instead of the Rabbit.)
              </>
            ) : (
              <>
                Vì mỗi tháng ứng một quẻ và một <b>Địa Chi</b>, mà mỗi Địa Chi lại gắn một con
                giáp, nên 12 Tích quái chính là gốc của <b>12 con giáp</b>. (Người Việt dùng{' '}
                <b className="text-gold-soft">Mèo</b> cho Mão thay vì Thỏ.)
              </>
            )}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {TICH_QUAI.map((tq, i) => {
              const h = hexagramByKingWen(tq.kingWen);
              return (
                <button
                  key={tq.kingWen}
                  onClick={() => setIdx(i)}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-2 text-left transition hover:border-gold/40 hover:bg-white/[0.04]"
                  style={{ borderColor: i === idx ? '#e8c373' : undefined }}
                >
                  <Gua lines={h.lines} width={26} lineHeight={3} gap={1.6} />
                  <div className="min-w-0">
                    <div className="text-sm text-ink">{en ? `${tq.branchEn} · ${tq.animalEn}` : `${tq.branch} · ${tq.animal}`}</div>
                    <div className="truncate text-[11px] text-ink-faint">{en ? `${h.pinyin} · M${tq.lunarMonth}` : `${h.nameHanViet} · T${tq.lunarMonth}`}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal as="section" className="panel-soft p-6">
          <h3 className="mb-2 text-lg text-gold-soft">
            {en ? 'Key insight: the extreme is the moment of turning' : 'Điểm sáng: cực điểm là lúc chuyển hóa'}
          </h3>
          <p className="text-sm text-ink-muted">
            {en ? (
              <>
                Notice that at the <b>top of the circle (Summer Solstice)</b> sits the hexagram{' '}
                <b className="text-gold-soft">Coming to Meet</b> — a single yin line just <i>born</i>
                (the days start shortening); while at the <b>bottom (Winter Solstice)</b> sits{' '}
                <b className="text-gold-soft">Return</b> — a single yang line just born. Exactly the
                spirit of <b className="text-ink">"when a thing reaches its extreme, it reverses"</b>:
                whatever peaks begins turning toward its opposite.
              </>
            ) : (
              <>
                Để ý ở <b>đỉnh vòng (Hạ chí)</b> lại là quẻ <b className="text-gold-soft">Cấu</b> —
                một hào âm vừa <i>sinh</i> (ngày bắt đầu ngắn lại); còn ở <b>đáy (Đông chí)</b> là
                quẻ <b className="text-gold-soft">Phục</b> — một hào dương vừa sinh. Đúng tinh thần{' '}
                <b className="text-ink">"vật cực tắc phản"</b>: cái gì đến cực điểm thì bắt đầu
                chuyển sang đối cực.
              </>
            )}
          </p>
        </Reveal>

        <p className="panel-soft p-4 text-xs text-ink-faint">
          {en ? (
            <>
              Note: the 12 sovereign hexagrams are originally reckoned by the <b>lunar month</b> (keyed
              to the principal solar term — e.g. month 11 contains the Winter Solstice). The four
              solstice/equinox anchors are certain; the remaining months are conventional when aligned
              on the circle. This is a historical/astronomical link to understand the ancient worldview,
              not divination.
            </>
          ) : (
            <>
              Lưu ý: 12 Tích quái gốc tính theo <b>tháng âm lịch</b> (canh theo trung khí — ví dụ
              tháng 11 chứa Đông chí). Bốn mốc chí/phân là chắc chắn; các tháng còn lại mang tính
              quy ước khi gióng lên vòng. Đây là liên hệ lịch sử/thiên văn để hiểu thế giới quan
              người xưa, không phải bói toán.
            </>
          )}
        </p>
      </Measure>
    </div>
  );
}
