import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure } from '@/components/Layout';
import DoublingTree from '@/components/DoublingTree';
import BitCounter from '@/components/BitCounter';
import ReadingLensDuality from '@/components/ReadingLensDuality';
import BaguaFamily from '@/components/BaguaFamily';
import BaguaWheel from '@/components/BaguaWheel';
import WisdomCallout from '@/components/WisdomCallout';
import NoteCallout from '@/components/NoteCallout';
import Gua, { YANG, YIN } from '@/components/Gua';
import TermLabel from '@/components/TermLabel';
import { trigramByName } from '@/data/trigrams';
import { ELEMENT_META } from '@/data/cosmograms';
import { useSettings } from '@/store/useSettings';
import { useLang, ELEMENT_EN, DIRECTION_EN } from '@/i18n';

type Overlay = 'plain' | 'thuan-nghich' | 'moon';

/** Vòng Tiên Thiên 8 quẻ — đọc được nhiều lớp: thuận–nghịch & pha trăng (nạp giáp). */
function TienThienSection() {
  const [overlay, setOverlay] = useState<Overlay>('thuan-nghich');
  const [xt, setXt] = useState(true);
  const en = useLang() === 'en';

  return (
    <Reveal as="section" className="panel mb-6 p-6 md:p-8">
      <h2 className="mb-1 text-xl">
        {en ? 'The Earlier Heaven circle & the rhythm of growth' : 'Vòng Tiên Thiên & nhịp sinh trưởng'}
      </h2>
      <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
        {en ? (
          <>
            Arrange the 8 trigrams into a circle (<b>South up · North down · East left · West right</b> —
            the classical convention); each opposing pair always <b className="text-ink">complements
            bit for bit</b>. This circle can be read in several layers: the Yin–Yang direction of{' '}
            <b>growth</b>, and the rhythm of the <b>moon's phases</b>.
          </>
        ) : (
          <>
            Xếp 8 quẻ thành một vòng (<b>Nam trên · Bắc dưới · Đông trái · Tây phải</b> — lối cổ thư),
            mỗi cặp đối nhau luôn <b className="text-ink">bù bit</b>. Vòng này đọc được nhiều lớp: chiều
            Âm–Dương <b>sinh trưởng</b>, và nhịp <b>pha trăng</b>.
          </>
        )}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <button className="switch-btn !py-1" data-active={overlay === 'plain'} onClick={() => setOverlay('plain')}>
          {en ? '8 trigrams' : '8 quẻ'}
        </button>
        <button className="switch-btn !py-1" data-active={overlay === 'thuan-nghich'} onClick={() => setOverlay('thuan-nghich')}>
          {en ? 'Forward–Counter' : 'Thuận–Nghịch'}
        </button>
        <button className="switch-btn !py-1" data-active={overlay === 'moon'} onClick={() => setOverlay('moon')}>
          {en ? 'Moon phases' : 'Pha trăng'}
        </button>
        <span className="mx-1 text-ink-faint">·</span>
        <button className="switch-btn !py-1" data-active={xt} onClick={() => setXt((v) => !v)}>
          {en ? 'Earlier-Heaven numbers' : 'Số Tiên Thiên'} {xt ? '✓' : '✗'}
        </button>
      </div>

      <BaguaWheel arrangement="earlier" showComplements overlay={overlay} showXianTian={xt} size={560} />

      <div className="mt-5 space-y-3">
        {overlay === 'thuan-nghich' && (
          <NoteCallout
            kind="truyen-thong"
            title={en ? 'A correction about direction — an easy place to go wrong' : 'Đính chính chiều xoay — chỗ rất dễ hiểu sai'}
            source={en ? 'Commentary on the Trigrams (Shuogua) · Shao Yong (Supreme Principles Governing the World)' : 'Thuyết Quái truyện · Thiệu Ung (Hoàng Cực Kinh Thế)'}
          >
            {en ? (
              <>
                <b className="text-ink">Both branches run clockwise.</b> "Left/right" is only a{' '}
                <i>half</i> of the circle (East = left / West = right), <b>not</b> the direction of
                rotation. The real difference: <b className="text-gold-soft">Forward</b> = "recounting
                what has passed" — counting toward Qian (the eastern half, what is already born);{' '}
                <b style={{ color: '#5fb89a' }}>Counter</b> = "knowing what is to come" — reckoning
                toward Kun (the western half, what is not yet born). Because the future "has not
                arrived," the calculus of the Changes is essentially <b>reckoning against the flow of
                time</b> ("the Changes reckon backward").
              </>
            ) : (
              <>
                <b className="text-ink">Cả hai nhánh đều thuận chiều kim đồng hồ.</b> "Tả/Hữu" chỉ là{' '}
                <i>nửa</i> vòng (Đông = trái / Tây = phải), <b>không phải</b> chiều xoay. Khác biệt thật
                sự: <b className="text-gold-soft">Thuận</b> = "kể cái đã đi" — đếm về phía Càn (nửa Đông,
                cái đã sinh); <b style={{ color: '#5fb89a' }}>Nghịch</b> = "biết cái sắp tới" — đoán về
                phía Khôn (nửa Tây, cái chưa sinh). Vì tương lai "chưa đến" nên phép tính của Dịch về bản
                chất là <b>tính ngược dòng thời gian</b> ("Dịch nghịch số dã").
              </>
            )}
          </NoteCallout>
        )}
        {overlay === 'moon' && (
          <NoteCallout
            kind="truyen-thong"
            title={en ? 'Moon phases by the najia theory' : 'Pha trăng theo thuyết nạp giáp'}
            source={en ? 'Najia (Jing Fang) · Cantong qi (Wei Boyang)' : 'Nạp giáp (Kinh Phòng) · Chu Dịch Tham Đồng Khế (Ngụy Bá Dương)'}
          >
            {en ? (
              <>
                Mapping moon phases ↔ trigrams is a <b>traditional reading layer</b> (najia), not a
                theorem. Li/Kan are the <i>substance</i> of the Sun/Moon; the other 6 trigrams track the
                lunar rhythm: new crescent (Zhen) → first quarter (Dui) → full (Qian) → waning (Xun) →
                last quarter (Gen) → dark (Kun).
              </>
            ) : (
              <>
                Ánh xạ pha trăng ↔ quẻ là một <b>lớp đọc truyền thống</b> (nạp giáp), không phải định lý.
                Ly/Khảm là <i>thể</i> Mặt Trời/Mặt Trăng; 6 quẻ còn lại ứng nhịp trăng: non (Chấn) →
                thượng huyền (Đoài) → tròn/vọng (Càn) → khuyết (Tốn) → hạ huyền (Cấn) → tối/hối (Khôn).
              </>
            )}
          </NoteCallout>
        )}
        {xt && (
          <NoteCallout
            kind="truyen-thong"
            title={en ? 'The Earlier-Heaven numbers 1–8 are an ORDER, not a binary value' : 'Số Tiên Thiên 1–8 là THỨ TỰ, không phải giá trị nhị phân'}
            source={en ? 'The Earlier Heaven order — Shao Yong' : 'Thứ tự Tiên Thiên — Thiệu Ung'}
          >
            {en ? (
              <>
                Qian 1 · Dui 2 · Li 3 · Zhen 4 · Xun 5 · Kan 6 · Gen 7 · Kun 8 is an old{' '}
                <b>counting order</b>. It <b className="text-ink">differs</b> from the app's binary value
                (Qian = 111 = <b>7</b>, bottom bit = LSB). The two meet when you <b>reverse the reading
                of the lines</b> (top→bottom) — and it is exactly that binary match that astonished
                Leibniz (verifiable by calculation).
              </>
            ) : (
              <>
                Càn 1 · Đoài 2 · Ly 3 · Chấn 4 · Tốn 5 · Khảm 6 · Cấn 7 · Khôn 8 là <b>thứ tự đếm</b> cổ.
                Nó <b className="text-ink">khác</b> giá trị nhị phân của app (Càn = 111 = <b>7</b>, bit
                đáy = LSB). Hai cách gặp nhau khi <b>đảo chiều đọc hào</b> (đỉnh→đáy) — chính sự trùng
                khớp nhị phân ấy khiến Leibniz kinh ngạc (kiểm được bằng phép tính).
              </>
            )}
          </NoteCallout>
        )}
      </div>
    </Reveal>
  );
}

// Thứ tự "gia đình": Cha, Mẹ, 3 con trai, 3 con gái.
const ORDER = ['Càn', 'Khôn', 'Chấn', 'Khảm', 'Cấn', 'Tốn', 'Ly', 'Đoài'];
const ORDERED = ORDER.map(trigramByName);

export default function PageStructure() {
  const colorMode = useSettings((s) => s.colorMode);
  const en = useLang() === 'en';
  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'Page 1 · Structure' : 'Trang 1 · Cấu trúc'}
        title={en ? 'Doubling & the Eight Trigrams' : 'Sinh đôi & Bát Quái'}
        symbol="⑃"
      >
        {en ? (
          <>
            The whole I Ching is built from <b className="text-ink">one repeated operation</b>:
            dividing in two. Each division adds <b>one line = one bit</b> (1 → 2 → 4 → 8 → … → 64).
            After three divisions we have <b>8 trigrams</b> — each a 3-bit binary number.
          </>
        ) : (
          <>
            Toàn bộ Kinh Dịch dựng bằng <b className="text-ink">một thao tác lặp lại</b>: chia
            đôi. Mỗi lần chia là thêm <b>một hào = một bit</b> (1 → 2 → 4 → 8 → … → 64). Sau ba
            lần chia ta có <b>8 quẻ đơn</b> — mỗi quẻ là một số nhị phân 3 bit.
          </>
        )}
      </PageHeader>

      {/* Sinh đôi */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">
          {en
            ? 'Taiji → Two Modes → Four Images → Eight Trigrams'
            : 'Thái Cực → Lưỡng Nghi → Tứ Tượng → Bát Quái'}
        </h2>
        <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              From a single origin, each level splits in two along Yang (
              <span style={{ color: '#e8c373' }}>gold</span>) and Yin (
              <span style={{ color: '#5fb89a' }}>jade</span>). 2³ = 8 trigrams.
            </>
          ) : (
            <>
              Từ một điểm gốc, mỗi tầng tách đôi theo Dương (
              <span style={{ color: '#e8c373' }}>vàng</span>) và Âm (
              <span style={{ color: '#5fb89a' }}>ngọc</span>). 2³ = 8 quẻ đơn.
            </>
          )}
        </p>
        <DoublingTree />

        <p className="mt-4 max-w-[72ch] rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-ink-faint">
          {en ? (
            <>
              The four numbers <b className="text-gold-deep">9 · 8 · 7 · 6</b> on the Four Images level
              (greater yang · lesser yin · lesser yang · greater yin) are the traditional{' '}
              <b className="text-ink-muted">casting numbers</b> — they mark the <b>moving-line
              mechanism</b> (an "old" line about to flip to its opposite), <b>not divination</b>. See
              that mechanism in action in{' '}
              <Link to="/64-que" className="text-gold-soft hover:underline">the casting section</Link>.
            </>
          ) : (
            <>
              Bốn số <b className="text-gold-deep">9 · 8 · 7 · 6</b> trên tầng Tứ Tượng (lão dương ·
              thiếu âm · thiếu dương · lão âm) là <b className="text-ink-muted">con số gieo quẻ</b>{' '}
              truyền thống — chúng đánh dấu <b>cơ chế hào động</b> (hào "già" sắp lật sang đối cực),{' '}
              <b>không phải bói</b>. Xem cơ chế ấy chạy ở{' '}
              <Link to="/64-que" className="text-gold-soft hover:underline">mục Cách lập quẻ</Link>.
            </>
          )}
        </p>

        <WisdomCallout concept="sinh-doi" className="mt-6" />
      </Reveal>

      {/* Bộ đếm bit */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">{en ? 'Binary counter ↔ Hexagram' : 'Bộ đếm nhị phân ↔ Quẻ'}</h2>
        <p className="mb-6 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The East–West bridge: each 6-line hexagram corresponds to <b>exactly</b> one number 0–63.
              Press <i>+1</i> to "count" through all 64 hexagrams as if counting in binary.
            </>
          ) : (
            <>
              Cây cầu Đông–Tây: mỗi quẻ 6 hào ứng <b>chính xác</b> một số 0–63. Bấm <i>+1</i>{' '}
              để "đếm" qua tất cả 64 quẻ như đếm số nhị phân.
            </>
          )}
        </p>
        <BitCounter />
      </Reveal>

      {/* 8 quẻ đơn */}
      <Reveal as="section" className="mb-6">
        <h2 className="mb-1 text-xl">
          {en ? 'The 8 Trigrams — the Bagua' : '8 Quẻ đơn — Bát Quái'}
        </h2>
        <p className="mb-3 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The eight "elements" of the Changes — each trigram is three lines (3 bits, 0–7), tied to a
              natural image, one Phase, and a role in the cosmic "family."
            </>
          ) : (
            <>
              Tám "nguyên tố" của Dịch — mỗi quẻ ba hào (3 bit, 0–7), gắn một hình tượng tự
              nhiên, một Hành và một vai trong "gia đình" vũ trụ.
            </>
          )}
        </p>
        <p className="mb-4 max-w-[72ch] rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-ink-faint">
          {en ? (
            <>
              <b className="text-ink-muted">Reading the names:</b> the modern name (<i>Heaven, Earth,
              Water…</i>) calls out the natural <b className="text-ink-muted">form</b>; the pinyin name
              (<i>Qián, Kūn, Kǎn…</i>) calls out its <b className="text-ink-muted">nature/virtue</b> —
              "strong and untiring, this is Qian." One trigram, two names lighting two sides.
            </>
          ) : (
            <>
              <b className="text-ink-muted">Mẹo đọc tên:</b> tên hiện đại (<i>Trời, Đất, Nước…</i>) gọi{' '}
              <b className="text-ink-muted">hình thể</b> tự nhiên; tên Hán-Việt (<i>Càn, Khôn, Khảm…</i>)
              gọi <b className="text-ink-muted">tính/đức</b> của nó — "mạnh mà không nghỉ gọi là Càn".
              Cùng một quẻ, hai lối gọi soi hai mặt.
            </>
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {ORDERED.map((t) => {
            const elColor = ELEMENT_META[t.element].color;
            return (
              <article key={t.id} className="panel p-5">
                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 flex-col items-center gap-2 rounded-xl border border-white/10 bg-cosmos-700/40 p-3">
                    <Gua lines={t.lines} width={64} lineHeight={9} gap={5} colorMode={colorMode} />
                    <span className="font-mono text-xs text-gold">{t.binary}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-gold-soft" aria-hidden>{t.symbol}</span>
                        <TermLabel modern={t.nameModern} hanViet={t.nameHanViet} modernEn={t.nameModernEn} pinyin={t.pinyin} hanzi={t.hanzi} size="lg" />
                      </div>
                      <span className="font-mono text-xs text-ink-faint">= {t.id}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="chip" style={{ color: elColor, borderColor: elColor + '55' }}>{en ? ELEMENT_EN[t.element] : t.element}</span>
                      <span className="chip">{en ? t.familyEn : t.family}</span>
                      <span className="chip">{en ? t.natureEn : t.nature}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{en ? t.modernEn : t.modern}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(en ? t.keywordsEn : t.keywords).map((k) => (
                    <span key={k} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-ink-faint">{k}</span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 border-t border-white/5 pt-3 text-xs text-ink-faint">
                  <span>{en ? 'Earlier Heaven' : 'Tiên Thiên'}: <b className="text-ink-muted">{en ? DIRECTION_EN[t.dirEarlier] : t.dirEarlier}</b></span>
                  <span>{en ? 'Later Heaven' : 'Hậu Thiên'}: <b className="text-ink-muted">{en ? DIRECTION_EN[t.dirLater] : t.dirLater}</b></span>
                  <span>{en ? 'Luoshu' : 'Lạc Thư'}: <b className="text-ink-muted">{t.luoshuNumber}</b></span>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Gia đình Bát Quái — cơ chế mượn một vạch */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">
          {en ? 'The Bagua family — the "borrow one line" mechanism' : 'Gia đình Bát Quái — cơ chế "mượn một vạch"'}
        </h2>
        <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              Beyond "nature/virtue," the eight trigrams also form a <b className="text-ink">family</b>:{' '}
              <b style={{ color: YANG }}>Father</b> (Qian, pure Yang) and <b style={{ color: YIN }}>Mother</b>{' '}
              (Kun, pure Yin) beget six children by <b>borrowing one line from each other</b>. The{' '}
              <i>position</i> of the borrowed line → which child by <b>rank</b>; whether that line is{' '}
              <i>yin or yang</i> → <b>daughter or son</b>.
            </>
          ) : (
            <>
              Ngoài "tính/đức", tám quẻ còn được xếp thành một <b className="text-ink">gia đình</b>:{' '}
              <b style={{ color: YANG }}>Cha</b> (Càn, thuần Dương) và <b style={{ color: YIN }}>Mẹ</b>{' '}
              (Khôn, thuần Âm) sinh sáu con bằng cách <b>mượn của nhau một vạch</b>. Vạch mượn ở{' '}
              <i>vị trí</i> nào → con <b>thứ</b> mấy; vạch ấy <i>âm hay dương</i> → <b>gái hay trai</b>.
            </>
          )}
        </p>
        <BaguaFamily />
        <p className="mt-4 max-w-[72ch] rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-ink-faint">
          {en ? (
            <>
              By the bits: a trigram with <b className="text-ink-muted">exactly 1 lone line</b> lets that
              line decide — 1 lone Yang → a son, 1 lone Yin → a daughter. The "eldest/middle/youngest"
              labels follow directly from the line's position (bottom → middle → top),{' '}
              <b>verifiable by calculation</b> (not a loose convention).
            </>
          ) : (
            <>
              Theo bit: quẻ có <b className="text-ink-muted">đúng 1 hào lẻ loi</b> thì hào ấy quyết định —
              1 hào Dương lẻ → con trai, 1 hào Âm lẻ → con gái. Cách gọi "trưởng/trung/thiếu" suy thẳng từ
              vị trí hào (đáy → giữa → trên), <b>kiểm được bằng phép tính</b> (không phải quy ước rời).
            </>
          )}
        </p>
      </Reveal>

      {/* Vòng Tiên Thiên: thuận–nghịch · pha trăng · số tiên thiên */}
      <TienThienSection />

      {/* Hai chiều đọc: Đông ↔ Tây (đáy→trên vs Leibniz trên→đáy).
          Tên "ống kính" để dành riêng cho Lý·Tượng·Số·Từ ở trang Gốc của Dịch (neo nguồn
          Trình Tử, là luận đề của cả site) — ở đây chỉ là chiều đọc, đừng dùng lại chữ đó. */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">
          {en ? 'Two reading directions — East ↔ West' : 'Hai chiều đọc — Đông ↔ Tây'}
        </h2>
        <p className="mb-6 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The ancients read the lines <b>bottom → top</b>; Leibniz read them <b>top → bottom</b> as
              one writes a number. For the same hexagram, the two directions give two numbers — and the
              "top→bottom" number <b className="text-ink">is exactly the number of the reversed
              hexagram</b> (<b className="text-jade">Reversed 綜</b> — the hexagram with its line order
              turned upside down). Flip the <b>reading direction</b> switch right below to feel it.
            </>
          ) : (
            <>
              Người xưa đọc hào <b>đáy → trên</b>; Leibniz đọc <b>trên → đáy</b> như viết số.
              Cùng một quẻ, hai chiều cho hai con số — và số "trên→đáy" <b className="text-ink">chính là
              số của quẻ Đảo</b> (<b className="text-jade">quẻ Đảo 綜</b> — quẻ lật ngược thứ tự hào).
              Bật công tắc <b>Chiều đọc</b> ngay dưới đây để cảm nhận.
            </>
          )}
        </p>
        <ReadingLensDuality />
      </Reveal>

      <Reveal as="section" className="panel-soft p-4 text-sm text-ink-muted">
        {en ? (
          <>
            The two trigrams <b>Qian</b> (111=7) and <b>Kun</b> (000=0) are the two binary poles; every
            opposing pair always <b className="text-ink">complements bit for bit</b> (sum = 7) — the
            foundation of the Earlier Heaven circle above. The next page links that circle with the{' '}
            <b>Yellow River Map · Luo River Writing</b> to derive Earlier/Later Heaven.{' '}
            <Link to="/ha-do-lac-thu" className="text-gold-soft hover:underline">
              → Hetu · Luoshu → the Eight Trigrams
            </Link>
          </>
        ) : (
          <>
            Hai quẻ <b>Càn</b> (111=7) và <b>Khôn</b> (000=0) là hai cực nhị phân; mọi cặp đối
            nhau luôn <b className="text-ink">bù bit</b> (cộng = 7) — nền của vòng Tiên Thiên ở
            trên. Trang sau nối vòng ấy với <b>Hà Đồ · Lạc Thư</b> để ra Tiên/Hậu Thiên.{' '}
            <Link to="/ha-do-lac-thu" className="text-gold-soft hover:underline">
              → Hà Đồ · Lạc Thư → Bát Quái
            </Link>
          </>
        )}
      </Reveal>
    </Measure>
  );
}
