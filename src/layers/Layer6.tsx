import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure, Bleed } from '@/components/Layout';
import HexagramMatrix from '@/components/HexagramMatrix';
import HexagramDetail from '@/components/HexagramDetail';
import WisdomCallout from '@/components/WisdomCallout';
import NoteCallout from '@/components/NoteCallout';
import { VienCircle, PhuongSquare } from '@/components/VienDo';
import Gua from '@/components/Gua';
import TermLabel from '@/components/TermLabel';
import { hexagramByKingWen, hexagramByFuxi } from '@/data/hexagrams';
import { linesToValue } from '@/lib/binary';
import { useLang } from '@/i18n';
import type { Bit } from '@/types';

// ── Mô phỏng gieo quẻ (3 đồng xu) ────────────────────────────────────────────
interface LineRoll {
  coins: number[];
  sum: number;
  bit: Bit;
  moving: boolean;
}
function typeLabel(sum: number, en: boolean): string {
  const vi: Record<number, string> = {
    6: 'Thái Âm (động)',
    7: 'Thiếu Dương',
    8: 'Thiếu Âm',
    9: 'Thái Dương (động)',
  };
  const eng: Record<number, string> = {
    6: 'Old Yin (changing)',
    7: 'Young Yang',
    8: 'Young Yin',
    9: 'Old Yang (changing)',
  };
  return (en ? eng : vi)[sum];
}
function rollLine(): LineRoll {
  const coins = [0, 0, 0].map(() => (Math.random() < 0.5 ? 2 : 3));
  const sum = coins.reduce((a, b) => a + b, 0);
  const bit: Bit = sum === 7 || sum === 9 ? 1 : 0;
  const moving = sum === 6 || sum === 9;
  return { coins, sum, bit, moving };
}

function CastSection() {
  const [rolls, setRolls] = useState<LineRoll[] | null>(null);
  const cast = () => setRolls(Array.from({ length: 6 }, rollLine));
  const en = useLang() === 'en';

  const primaryLines = rolls?.map((r) => r.bit) as Bit[] | undefined;
  const primaryHex = primaryLines ? hexagramByFuxi(linesToValue(primaryLines)) : null;
  const movingIdx = rolls?.map((r, i) => (r.moving ? i : -1)).filter((i) => i >= 0) ?? [];
  const transformedLines = primaryLines?.map((b, i) => (movingIdx.includes(i) ? ((b ^ 1) as Bit) : b));
  const transformedHex =
    transformedLines && movingIdx.length > 0 ? hexagramByFuxi(linesToValue(transformedLines)) : null;

  return (
    <Reveal as="section" className="panel p-6 md:p-8">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">
          {en ? 'How a hexagram is formed ' : 'Cách lập quẻ '}
          <span className="text-sm text-ink-faint">
            {en ? '— illustrating the method' : '— minh hoạ phương pháp'}
          </span>
        </h2>
        <button className="switch-btn" data-active onClick={cast}>
          {en ? '🎲 Cast a hexagram' : '🎲 Gieo một quẻ'}
        </button>
      </div>
      <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
        {en ? (
          <>
            The ancients "drew" a hexagram from randomness (yarrow stalks / coin tosses). In modern
            terms this is a <b className="text-ink">random binary generator</b>: each line is a bit
            from a dice roll. This section illustrates the <b>mechanism</b>, it does not tell fortunes.
          </>
        ) : (
          <>
            Người xưa "rút" một quẻ từ ngẫu nhiên (cỏ thi / tung đồng xu). Nhìn hiện đại, đây là
            một <b className="text-ink">bộ sinh số nhị phân ngẫu nhiên</b>: mỗi hào là một bit
            tung xúc xắc. Mục này minh hoạ <b>cơ chế</b>, không phán vận mệnh.
          </>
        )}
      </p>

      {!rolls ? (
        <p className="text-sm text-ink-muted">
          {en
            ? 'Press "Cast a hexagram": each cast tosses 3 coins (tails = 2, heads = 3); the total 6–9 sets each line as yin/yang and whether it is "changing".'
            : 'Bấm "Gieo một quẻ": mỗi lần tung 3 đồng (sấp = 2, ngửa = 3); tổng 6–9 định hào âm/dương và "động" hay không.'}
        </p>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-14">
          <div className="space-y-1.5">
            {[...rolls].reverse().map((r, vi) => {
              const idx = 5 - vi;
              return (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: vi * 0.08 }} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-xs text-ink-faint">{en ? `Line ${idx + 1}` : `Hào ${idx + 1}`}</span>
                  <span className="font-mono text-ink-muted">{r.coins.join(' + ')} = {r.sum}</span>
                  <Gua lines={[r.bit]} width={64} lineHeight={8} />
                  <span className={`text-xs ${r.moving ? 'text-cinnabar' : 'text-ink-faint'}`}>{typeLabel(r.sum, en)}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-center gap-5 sm:gap-8">
            {primaryHex && (
              <div className="min-w-[7rem] text-center">
                <div className="mb-1 text-xs text-ink-faint">{en ? 'Primary hexagram' : 'Quẻ chính'}</div>
                <Gua lines={primaryHex.lines} width={64} lineHeight={8} glow highlight={movingIdx} />
                <div className="mt-2"><TermLabel modern={primaryHex.nameModern} hanViet={primaryHex.nameHanViet} hanzi={primaryHex.hanzi} modernEn={primaryHex.nameModernEn} pinyin={primaryHex.pinyin} /></div>
                <Link to={`/64-que?q=${primaryHex.kingWen}`} className="mt-1 inline-block text-xs text-gold-soft hover:underline">{en ? 'See meaning ↑' : 'Xem ý nghĩa ↑'}</Link>
                {movingIdx.length === 0 && (
                  <p className="mx-auto mt-2 max-w-[9rem] text-xs text-ink-faint">
                    {en ? 'No changing lines → the hexagram is stable, no transformation.' : 'Không có hào động → quẻ ổn định, không biến.'}
                  </p>
                )}
              </div>
            )}
            {transformedHex && (
              <>
                <div aria-hidden className="text-2xl text-ink-faint">→</div>
                <div className="min-w-[7rem] text-center">
                  <div className="mb-1 text-xs text-ink-faint">{en ? '→ changes into' : '→ biến thành'}</div>
                  <Gua lines={transformedHex.lines} width={64} lineHeight={8} highlight={movingIdx} />
                  <div className="mt-2"><TermLabel modern={transformedHex.nameModern} hanViet={transformedHex.nameHanViet} hanzi={transformedHex.hanzi} modernEn={transformedHex.nameModernEn} pinyin={transformedHex.pinyin} /></div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2 text-sm text-ink-muted">
        {en ? (
          <>
            <div className="panel-soft p-4"><b className="text-gold-soft">Uneven probability:</b> with 3 coins, P(6)=1/8, P(7)=3/8, P(8)=3/8, P(9)=1/8 — a "changing line" is rarer. Pure probability.</div>
            <div className="panel-soft p-4"><b className="text-gold-soft">A "changing line"</b> is an extreme line about to flip to its opposite — turning this hexagram into another, modeling "when a thing reaches its extreme it reverses".</div>
          </>
        ) : (
          <>
            <div className="panel-soft p-4"><b className="text-gold-soft">Xác suất không đều:</b> với 3 đồng xu, P(6)=1/8, P(7)=3/8, P(8)=3/8, P(9)=1/8 — "hào động" hiếm hơn. Toán xác suất thuần tuý.</div>
            <div className="panel-soft p-4"><b className="text-gold-soft">"Hào động"</b> là hào cực sắp lật sang đối cực — biến quẻ này thành quẻ khác, mô phỏng "vật cực tắc phản".</div>
          </>
        )}
      </div>
    </Reveal>
  );
}

export default function Layer6() {
  const [params, setParams] = useSearchParams();
  const q = Number(params.get('q')) || 1;
  const selected = q >= 1 && q <= 64 ? q : 1;
  const hex = hexagramByKingWen(selected);
  const en = useLang() === 'en';

  const select = (kingWen: number) => setParams({ q: String(kingWen) }, { replace: true });

  return (
    <div className="space-y-6">
      <Measure size="content">
        <PageHeader
          kicker={en ? 'Page 4 · Dynamics' : 'Trang 4 · Vận hành'}
          title={en ? 'The 64 Hexagrams & How They Form' : '64 Quẻ & Cách lập quẻ'}
          symbol="▦"
        >
          {en ? (
            <>
              Stack two trigrams (3 bits each) into a 6-bit hexagram → exactly{' '}
              <b className="text-ink">64 = 2⁶</b> combinations. Click a cell for details; at the bottom
              is how the ancients "drew" a hexagram.
            </>
          ) : (
            <>
              Chồng hai quẻ đơn (mỗi 3 bit) thành quẻ kép 6 bit → đúng <b className="text-ink">64 = 2⁶</b>{' '}
              tổ hợp. Bấm một ô để xem chi tiết; cuối trang là cách người xưa "rút" một quẻ.
            </>
          )}
        </PageHeader>
      </Measure>

      {/* HERO full-bleed: ma trận 64 quẻ + chi tiết */}
      <Bleed>
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,640px)_1fr]">
          <section className="panel p-4 lg:p-6">
            <HexagramMatrix selected={selected} onSelect={select} />
          </section>
          <section className="min-w-0">
            <HexagramDetail hex={hex} />
          </section>
        </Reveal>
      </Bleed>

      {/* Phương Viên Đồ — vuông trong tròn */}
      <Measure size="content">
        <Reveal as="section" className="panel p-6 md:p-8">
          <h2 className="mb-1 text-xl">
            {en ? 'The Square-and-Round diagram — a square within a circle' : 'Phương Viên Đồ — vuông trong tròn'}
          </h2>
          <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
            {en ? (
              <>
                The same 64 hexagrams, two arrangements: the <b className="text-gold-soft">circle</b> images{' '}
                <b>Heaven</b> (motion · time), the <b className="text-jade-soft">square</b> images{' '}
                <b>Earth</b> (stillness · space). The circle follows the Earlier Heaven (Shao Yong) order:
                Qian at the top, Kun at the bottom, each opposing pair a <b className="text-ink">bit-complement</b>
                across the center.
              </>
            ) : (
              <>
                Cùng 64 quẻ, hai cách bày: <b className="text-gold-soft">vòng tròn</b> tượng{' '}
                <b>Trời</b> (động · thời gian), <b className="text-jade-soft">hình vuông</b> tượng{' '}
                <b>Đất</b> (tĩnh · không gian). Vòng xếp theo thứ tự Tiên Thiên (Thiệu Ung): Càn ở
                đỉnh, Khôn ở đáy, mỗi cặp đối nhau là <b className="text-ink">bù bit</b> nằm đối tâm.
              </>
            )}
          </p>

          <div className="grid items-center gap-6 lg:grid-cols-2">
            <VienCircle />
            <div className="flex flex-col items-center gap-2">
              <PhuongSquare />
              <p className="max-w-[440px] text-center text-xs text-ink-faint">
                {en ? (
                  <>
                    The square (Earth): a binary grid, its bright diagonal linking{' '}
                    <b className="text-ink-muted">Kun</b> (top-left) → <b className="text-ink-muted">Qian</b> (bottom-right).
                  </>
                ) : (
                  <>
                    Phương (Đất): lưới nhị phân, đường chéo sáng nối <b className="text-ink-muted">Khôn</b>{' '}
                    (góc trên-trái) → <b className="text-ink-muted">Càn</b> (góc dưới-phải).
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <NoteCallout
              kind="kiem-duoc"
              title={en ? 'East–West symmetry — verifiable by calculation' : 'Đối xứng Đông–Tây — tự kiểm bằng phép tính'}
              source={en ? 'computed directly from the 64 codes 0–63' : 'tính trực tiếp từ 64 mã 0–63'}
            >
              {en ? (
                <>
                  The vertical Qian–Kun axis splits the circle into an <b className="text-gold-soft">East</b>
                  half (32 hexagrams with a yang bottom line) and a <b style={{ color: '#5fb89a' }}>West</b>
                  half (32 with a yin bottom line) — <b>192 lines each</b>. The two halves are{' '}
                  <b className="text-ink">bit-complement mirror images</b>, so the yang lines in the East =
                  the yin lines in the West = <b>112</b>. (Every number here is verifiable, not taken on trust.)
                </>
              ) : (
                <>
                  Trục dọc Càn–Khôn chia vòng thành nửa <b className="text-gold-soft">Đông</b> (32 quẻ có
                  hào đáy Dương) và nửa <b style={{ color: '#5fb89a' }}>Tây</b> (32 quẻ hào đáy Âm) —{' '}
                  <b>192 hào mỗi nửa</b>. Hai nửa là <b className="text-ink">ảnh gương bù-bit</b> của
                  nhau, nên số hào Dương nửa Đông = số hào Âm nửa Tây = <b>112</b>. (Mọi con số ở đây
                  đều kiểm được, không phải tin lời.)
                </>
              )}
            </NoteCallout>
            <NoteCallout
              kind="truyen-thong"
              title={en ? 'Some points are traditional interpretation' : 'Vài điểm là diễn giải truyền thống'}
              source={en ? 'Shao Yong (Huangji Jingshi); Fu Xi 圓圖/方圖' : 'Thiệu Ung (Hoàng Cực Kinh Thế); Phục Hy 圓圖/方圖'}
            >
              {en ? (
                <>
                  The idea "round = Heaven/time, square = Earth/space" and reading the circle "like a
                  clock/calendar" (up to the grand cycle of <b>129,600 years</b>) is{' '}
                  <b>traditional interpretation</b>. The two pure hexagrams <b className="text-ink">Li</b>
                  (the Sun) and <b className="text-ink">Kan</b> (the Moon) sit <i>near</i> the horizontal
                  East–West axis (offset ~11° and diametrically opposite), not exactly on it — this circle
                  is drawn in binary order, so we mark their true positions. The square grid is an{' '}
                  <b>equivalent binary matrix</b>, not the interlocking 方圖 in its original layout.
                </>
              ) : (
                <>
                  Ý "tròn = Trời/thời gian, vuông = Đất/không gian" và vòng "đọc như đồng hồ/lịch" (đến
                  đại chu kỳ <b>129.600 năm</b>) là <b>diễn giải truyền thống</b>. Hai quẻ thuần{' '}
                  <b className="text-ink">Ly</b> (Mặt Trời) và <b className="text-ink">Khảm</b> (Mặt Trăng)
                  nằm <i>gần</i> trục ngang Đông–Tây (lệch ~11° và đối tâm nhau), chứ không đúng tâm —
                  vòng này vẽ theo thứ tự nhị phân nên ta ghi đúng vị trí thật. Lưới vuông là{' '}
                  <b>ma trận nhị phân tương đương</b>, không phải bản 方圖 xếp xà-quyện nguyên trạng.
                </>
              )}
            </NoteCallout>
          </div>
        </Reveal>
      </Measure>

      <Measure size="content" className="space-y-6">
        <WisdomCallout concept="te-vat" />
        <CastSection />
        <WisdomCallout concept="vo-vi" />
      </Measure>
    </div>
  );
}
