import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import NoteCallout from '@/components/NoteCallout';
import Gua from '@/components/Gua';
import TwoOrders from '@/components/TwoOrders';
import SpineMorph from '@/components/SpineMorph';
import DoublingTree from '@/components/DoublingTree';
import BaguaWheel from '@/components/BaguaWheel';
import TichQuaiWheel from '@/components/TichQuaiWheel';
import SeasonScene from '@/components/SeasonScene';
import HetuDiagram from '@/components/HetuDiagram';
import LuoshuSquare from '@/components/LuoshuSquare';
import { VienCircle, PhuongSquare } from '@/components/VienDo';
import { Measure } from '@/components/Layout';
import { hexagramByFuxi, hexagramByKingWen } from '@/data/hexagrams';
import { TICH_QUAI } from '@/data/monthHexagrams';
import { symmetryFamily, reversedValue, oppositeValue } from '@/lib/relations';
import { useLang, useT } from '@/i18n';

type Lens = 'shu' | 'xiang' | 'li';

/** Neo của ba cụm — dải mở đầu nhảy tới đây. */
const ANCHOR: Record<Lens, string> = {
  shu: 'tang-so',
  xiang: 'tang-tuong',
  li: 'tang-ly',
};

/**
 * Vỏ chung của một "đốt": tiêu đề + hai chip + thân.
 *
 * Chip độ tin nói về LUẬN ĐIỂM CHÍNH của đốt. Luận điểm phụ khác hạng thì đánh dấu ⓘ ngay
 * trong câu văn — không đẻ chip thứ ba ở đầu khối.
 *
 * `id` chuyền thẳng xuống Reveal (Reveal đã nhận id sẵn, cả nhánh giảm-chuyển-động).
 */
function SpineRow({
  id,
  n,
  title,
  lens,
  verified,
  children,
}: {
  id?: string;
  n: number;
  title: string;
  lens: Lens;
  verified: boolean;
  children: ReactNode;
}) {
  const t = useT();
  return (
    <Reveal as="section" id={id} className="panel mb-6 p-6 md:p-8">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <h2 className="font-serif text-xl text-gold-soft">
          {n} · {title}
        </h2>
        <span className="chip">{t(`spine.lens.${lens}`)}</span>
        <span className={verified ? 'chip text-jade-soft' : 'chip'}>
          {verified ? `✓ ${t('note.verified')}` : `ⓘ ${t('note.traditional')}`}
        </span>
      </div>
      {children}
    </Reveal>
  );
}

/** Một câu dẫn ngắn giữa tiêu đề và sơ đồ — cho biết đang nhìn cái gì. */
function SpineLead({ children }: { children: ReactNode }) {
  return <p className="mb-5 max-w-[80ch] text-sm leading-relaxed text-ink-muted">{children}</p>;
}

/**
 * Hàng sơ đồ trải HẾT bề ngang, ở dưới câu dẫn.
 *
 * Ngưỡng chia cột là `xl:`/`2xl:` chứ KHÔNG phải `lg:` — breakpoint Tailwind đo BỀ NGANG
 * MÀN HÌNH, mà cột nội dung ở đây hẹp hơn màn hình ~350px (sidebar ghim `w-72` 288px +
 * `main px` + `panel p-8`). Ở 1024 (lg) mỗi ô 2-cột chỉ còn ~292px — nhỏ hơn cả bản cũ.
 * Dưới ngưỡng thì xếp chồng, sơ đồ ăn trọn bề ngang → to hơn. Đừng hạ về `lg:`.
 */
function SpineFigures({
  cols = 'xl:grid-cols-2',
  children,
}: {
  cols?: string;
  children: ReactNode;
}) {
  return <div className={`grid items-center gap-6 ${cols}`}>{children}</div>;
}

/**
 * Một sơ đồ + nhãn, bọc trần bề ngang để hai bên CÂN CỠ.
 *
 * Trần phải bù cho lề trong khác nhau của từng sơ đồ (vd VienCircle có padX=80 nên vòng
 * tròn chỉ chiếm 62% viewBox, còn PhuongSquare chiếm 99%) → bọc bằng nhau là lệch. Con số
 * `max` tính cho nội dung thật ngang nhau, không phải wrapper ngang nhau.
 */
function Figure({ max, label, children }: { max: string; label?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: max }}>
      {children}
      {label && <p className="mt-1 text-center text-xs text-ink-faint">{label}</p>}
    </div>
  );
}

/** Khối chữ dưới sơ đồ: giải thích (trái) · biên lai + ghi chú + link (phải). */
function SpineText({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <div className="max-w-[68ch] text-sm leading-relaxed text-ink-muted">{children}</div>
      <aside className="min-w-0 space-y-3">{aside}</aside>
    </div>
  );
}

/** Thẻ biên lai "Tự kiểm" — con số người đọc tự cộng được, đặt cạnh điều nó bảo đảm. */
function CheckCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="panel-soft p-4">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gold-soft">{title}</div>
      <div className="text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

/** Ghi chú "diễn giải truyền thống" nội dòng trong cột biên lai. */
function TradNote({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs leading-relaxed text-ink-faint">
      <span className="text-gold-soft">ⓘ</span> {children}
    </p>
  );
}

function SourceLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-block text-xs text-gold-soft underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

/** Đốt 1 — một vạch liền, một vạch đứt: hai trạng thái, đúng một bit. */
function BitFigure() {
  const en = useLang() === 'en';
  return (
    <div className="flex items-end justify-center gap-12 py-4">
      {[
        { lines: [1 as const], v: '1', t: en ? 'Yang · solid' : 'Dương · liền' },
        { lines: [0 as const], v: '0', t: en ? 'Yin · broken' : 'Âm · đứt' },
      ].map((x) => (
        <figure key={x.v} className="flex flex-col items-center gap-2">
          <Gua lines={x.lines} width={150} lineHeight={20} glow={x.v === '1'} />
          <figcaption className="text-center">
            <div className="font-mono text-3xl text-gold-soft">{x.v}</div>
            <div className="text-xs text-ink-faint">{x.t}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** HERO A — minh hoạ một HỌ đối xứng (nhóm Klein 4) trên một quẻ ví dụ. */
function FamilyDemo({ en }: { en: boolean }) {
  const base = hexagramByFuxi(17); // Truân (Khảm/Chấn) — họ đầy-4
  const rev = reversedValue(base.lines);
  const opp = oppositeValue(base.lines);
  const fam = symmetryFamily(base.lines);
  const labelOf = (v: number) =>
    en
      ? v === base.fuxiValue ? 'hexagram' : v === rev ? 'Reversed (綜)' : v === opp ? 'Opposite (錯)' : 'Rev-Opp'
      : v === base.fuxiValue ? 'quẻ' : v === rev ? 'Đảo (綜)' : v === opp ? 'Đối (錯)' : 'Đảo-Đối';
  return (
    <div className="flex flex-wrap items-end justify-center gap-5">
      {fam.map((v) => {
        const h = hexagramByFuxi(v);
        return (
          <figure key={v} className="flex flex-col items-center gap-1.5">
            <Gua lines={h.lines} width={40} lineHeight={4} gap={2.2} glow={v === base.fuxiValue} />
            <figcaption className="text-center">
              <div className="text-xs text-ink">{en ? h.pinyin : h.nameHanViet}</div>
              <div className="text-[10px] text-gold-soft/80">{labelOf(v)}</div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/**
 * Đốt 5 — 12 Tích quái. Có state riêng vì vòng + quỹ đạo + Trái Đất phải đồng bộ theo `idx`.
 * Vòng lặp "Chạy" chép từ Layer5 (1600ms/tháng, mod 12, tự tắt khi giảm-chuyển-động) — không
 * tách hook để khỏi đụng Layer5 (ngoài phạm vi); nó là animation, lệch thì cùng lắm hai trang
 * chạy nhanh chậm khác nhau.
 */
function TichQuaiRecap() {
  const en = useLang() === 'en';
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

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

  const curHex = hexagramByKingWen(TICH_QUAI[idx].kingWen);

  return (
    <SpineRow n={5} title={en ? 'The 12 sovereign hexagrams' : '12 Tích quái'} lens="xiang" verified={false}>
      <SpineLead>
        {en
          ? 'Twelve of the sixty-four, laid round a year as a clock. Press play, or step month by month — the wheel, the orbit seen from above, and the tilted Earth all move together.'
          : 'Mười hai quẻ trong sáu tư, xếp quanh một năm thành đồng hồ. Bấm chạy, hoặc lần từng tháng — vòng quẻ, quỹ đạo nhìn từ trên, và Trái Đất nghiêng cùng chuyển.'}
      </SpineLead>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <button className="switch-btn" onClick={() => setIdx((i) => (i + 11) % 12)}>
          {en ? '‹ Prev' : '‹ Trước'}
        </button>
        <button className="switch-btn" data-active={playing} onClick={() => setPlaying((p) => !p)}>
          {en ? (playing ? '⏸ Pause' : '▶ Play') : playing ? '⏸ Dừng' : '▶ Chạy'}
        </button>
        <button className="switch-btn" onClick={() => setIdx((i) => (i + 1) % 12)}>
          {en ? 'Next ›' : 'Sau ›'}
        </button>
      </div>

      {/* Track riêng: vòng Tích quái (vẽ ở 440, tự thu nhỏ cả khối khi hẹp) ‖ SeasonScene
          (tự tách quỹ đạo 250 + Trái Đất 400). 2xl mới chia cột — xem SpineFigures. */}
      <SpineFigures cols="2xl:grid-cols-[440px_1fr]">
        {/* min-w-0: ô lưới mặc định không co nhỏ hơn nội dung → thiếu nó là vòng đội khung ra. */}
        <div className="mx-auto min-w-0 w-full">
          <TichQuaiWheel
            idx={idx}
            onSelect={setIdx}
            center={<Gua lines={curHex.lines} width={62} lineHeight={7} gap={4} glow className="mx-auto" />}
          />
        </div>
        <div className="min-w-0">
          <SeasonScene idx={idx} compact />
        </div>
      </SpineFigures>

      <SpineText
        aside={
          <>
            <TradNote>
              {en
                ? 'Four anchors are firm — Return at winter solstice, Coming to Meet at summer solstice, and the two equinoxes. The rest of the month-to-hexagram mapping is convention, reckoned by lunar month, and varies between sources.'
                : 'Bốn mốc thì chắc — Phục ở Đông chí, Cấu ở Hạ chí, và hai điểm phân. Phần còn lại của bảng tháng-ứng-quẻ là quy ước, canh theo tháng âm lịch, và có sai khác giữa các sách.'}
            </TradNote>
            <SourceLink to="/vu-tru-mua">{en ? 'The Cosmos & the Seasons →' : 'Vũ trụ & Mùa →'}</SourceLink>
          </>
        }
      >
        <p className="mb-3">
          {en ? (
            <>
              Yang lines rise from the bottom one at a time until all six are yang, then yin lines
              do the same. The clock's punchline sits at its two extremes. At the bottom, deepest
              winter: <b className="text-gold-soft">Return</b> (復) — five yin and{' '}
              <b>one yang line just born</b>. At the top, high summer:{' '}
              <b className="text-jade">Coming to Meet</b> (姤) — five yang and one yin just born.
            </>
          ) : (
            <>
              Hào dương mọc dần từ đáy, từng cái một, tới khi đủ sáu hào dương; rồi hào âm cũng làm
              y vậy. Cú chốt của đồng hồ nằm ở hai cực. Dưới đáy, giữa mùa đông sâu nhất:{' '}
              <b className="text-gold-soft">Phục</b> (復) — năm hào âm và{' '}
              <b>một hào dương vừa sinh</b>. Trên đỉnh, giữa mùa hè gắt nhất:{' '}
              <b className="text-jade">Cấu</b> (姤) — năm hào dương và một hào âm vừa sinh.
            </>
          )}
        </p>
        <p>
          {en ? (
            <>
              The turn does not happen after the extreme.{' '}
              <b className="text-ink">The extreme is the turn.</b>
            </>
          ) : (
            <>
              Chỗ chuyển không nằm sau cực điểm.{' '}
              <b className="text-ink">Cực điểm chính là chỗ chuyển.</b>
            </>
          )}
        </p>
      </SpineText>
    </SpineRow>
  );
}

export default function PageSpine() {
  const en = useLang() === 'en';
  const t = useT();

  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'Synthesis · The whole picture' : 'Đúc kết · Toàn cảnh'}
        title={
          en
            ? 'The whole picture — from one bit to the underlying law'
            : 'Toàn cảnh — từ một bit đến quy luật'
        }
        symbol="⇌"
      >
        {en ? (
          <>
            One page for the whole thing. Below, the six steps of the journey in order — each
            with a figure and <b className="text-ink">a number you can check yourself</b> — and
            then, at the end, what falls out of them. You need not have read anything else
            first; every step links back to its own page if you want to dig.
          </>
        ) : (
          <>
            Một trang cho tất cả. Bên dưới là sáu bước của hành trình, theo thứ tự — mỗi bước
            một hình và <b className="text-ink">một con số bạn tự kiểm được</b> — rồi cuối
            cùng là thứ rơi ra từ chúng. Không cần đọc trang nào trước; mỗi bước đều có lối
            dẫn về trang gốc nếu bạn muốn đào sâu.
          </>
        )}
      </PageHeader>

      {/* Dải ba tầng — mở đầu: cho thấy cả cung trước khi đi.
          <a href="#..."> thường, KHÔNG dùng <Link> (Link sẽ đổi route chứ không cuộn). */}
      <Reveal className="panel-soft mb-6 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {(['shu', 'xiang', 'li'] as const).map((l, i) => (
            <span key={l} className="flex items-center gap-3">
              {i > 0 && <span className="text-ink-faint">→</span>}
              <a
                href={`#${ANCHOR[l]}`}
                className="chip text-sm text-ink transition hover:border-gold-soft/40 hover:text-gold-soft"
              >
                {t(`spine.lens.${l}`)}
              </a>
            </span>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-[64ch] text-center text-sm text-ink-muted">
          {en ? (
            <>
              Cheng Yi read it <b className="text-ink">Li → Xiang → Shu</b>: the principle comes
              first, then the image, and number sits at the <i>tip</i>. This site walks it{' '}
              <b className="text-gold-soft">backwards on purpose</b> — in through the tip, where
              the Changes meet the way we already think, and out at the root.
            </>
          ) : (
            <>
              Trình Tử đọc theo <b className="text-ink">Lý → Tượng → Số</b>: có Lý mới có Tượng,
              rồi mới có Số — tức Số nằm ở <i>ngọn</i>. Trang này{' '}
              <b className="text-gold-soft">cố ý đi ngược</b>: vào bằng cái ngọn ấy, nơi Dịch gặp
              lối nghĩ ta đã quen, rồi từ ngọn dẫn về gốc.
            </>
          )}
        </p>
      </Reveal>

      {/* ─────────────── THÂN ─────────────── */}

      <SpineRow id={ANCHOR.shu} n={1} title={en ? 'One line = one bit' : 'Một hào = một bit'} lens="shu" verified>
        <SpineLead>
          {en
            ? 'A hexagram is built from lines, and a line has only two states: solid or broken. Nothing else — no third option, no in-between.'
            : 'Quẻ dựng từ hào, mà hào chỉ có hai trạng thái: liền hoặc đứt. Hết — không có lựa chọn thứ ba, không có ở giữa.'}
        </SpineLead>

        <BitFigure />

        <SpineText
          aside={
            <>
              <CheckCard title={en ? 'Check it' : 'Tự kiểm'}>
                {en
                  ? 'Count the states of one line. Two. That is one bit, by definition.'
                  : 'Đếm số trạng thái của một hào. Hai. Đúng bằng một bit, theo định nghĩa.'}
              </CheckCard>
              <SourceLink to="/goc">{en ? 'The Root of the Changes →' : 'Gốc của Dịch →'}</SourceLink>
            </>
          }
        >
          <p>
            {en ? (
              <>
                That is exactly what a <b className="text-gold-soft">bit</b> is. Call solid{' '}
                <b className="text-gold-soft">1</b> and broken <b className="text-jade">0</b> and
                you have not translated the Changes into computing — you have noticed they were
                already the same thing. Leibniz noticed it in 1703 and could not quite believe it.
              </>
            ) : (
              <>
                Đó đúng là định nghĩa của <b className="text-gold-soft">bit</b>. Gọi liền là{' '}
                <b className="text-gold-soft">1</b>, đứt là <b className="text-jade">0</b> — ta
                không hề "dịch" Dịch sang máy tính, ta chỉ nhận ra hai thứ vốn là một. Leibniz
                nhận ra điều này năm 1703 và đã sững người.
              </>
            )}
          </p>
        </SpineText>
      </SpineRow>

      <SpineRow n={2} title={en ? 'Doubling: 2⁶ = 64' : 'Sinh đôi: 2⁶ = 64'} lens="shu" verified>
        <SpineLead>
          {en
            ? 'Now repeat one move: split in two. Taiji → two modes → four images → eight trigrams. Each split adds exactly one bit. The tree below is the count from 0 to 63, drawn sideways.'
            : 'Giờ lặp đúng một động tác: tách đôi. Thái Cực → Lưỡng Nghi → Tứ Tượng → Bát Quái. Mỗi lần tách thêm đúng một bit. Cái cây bên dưới chính là phép đếm 0 đến 63, vẽ nằm ngang.'}
        </SpineLead>

        <DoublingTree />

        <SpineText
          aside={
            <>
              <CheckCard title="2⁶ = 64">
                {en
                  ? 'Six splits: 2×2×2×2×2×2 = 64 — the 64 hexagrams, nothing added and nothing left out.'
                  : 'Sáu lần tách: 2×2×2×2×2×2 = 64 — đúng 64 quẻ, không thêm không sót.'}
              </CheckCard>
              <SourceLink to="/bat-quai">{en ? 'Doubling & the Eight Trigrams →' : 'Sinh đôi & Bát Quái →'}</SourceLink>
            </>
          }
        >
          <p>
            {en ? (
              <>
                The doubling tree <i>is</i> binary counting. Every leaf is a run of bits, and
                reading the tree top to bottom walks the numbers <b className="text-ink">0, 1, 2, …,
                63</b> in order. This is the one bridge the whole site rests on: the Changes and
                binary are not <i>like</i> each other — at the root they are the same machine.
              </>
            ) : (
              <>
                Cây sinh đôi <i>chính là</i> phép đếm nhị phân. Mỗi lá là một chuỗi bit, và đọc cây
                từ trên xuống là đi qua các số <b className="text-ink">0, 1, 2, …, 63</b> theo thứ
                tự. Đây là cây cầu mà cả trang đứng trên: Dịch và nhị phân không <i>giống</i> nhau —
                ở gốc chúng là cùng một cỗ máy.
              </>
            )}
          </p>
        </SpineText>
      </SpineRow>

      <SpineRow n={3} title={en ? 'Hetu 55 · Luoshu 45 · 15' : 'Hà Đồ 55 · Lạc Thư 45 · 15'} lens="shu" verified>
        <SpineLead>
          {en
            ? 'Two number-diagrams sit under almost everything the tradition built. Hover the toggles to read them as dots or numerals; on the Luoshu, pick a line to check its sum.'
            : 'Hai bản đồ số nằm dưới gần như mọi thứ người xưa dựng lên. Bấm công tắc để đọc theo chấm hay chữ số; ở Lạc Thư, chọn một đường để kiểm tổng.'}
        </SpineLead>

        <SpineFigures>
          <Figure max="400px">
            <HetuDiagram />
          </Figure>
          <Figure max="400px">
            <LuoshuSquare />
          </Figure>
        </SpineFigures>

        <SpineText
          aside={
            <>
              <CheckCard title={en ? 'Add them yourself' : 'Tự cộng thử'}>
                {en ? (
                  <>
                    Hetu: 1+2+…+10 = <b className="text-gold-soft">55</b>. Luoshu: 1+2+…+9 ={' '}
                    <b className="text-gold-soft">45</b>, and every row, column and diagonal = 15.
                  </>
                ) : (
                  <>
                    Hà Đồ: 1+2+…+10 = <b className="text-gold-soft">55</b>. Lạc Thư: 1+2+…+9 ={' '}
                    <b className="text-gold-soft">45</b>, và mọi hàng, cột, đường chéo đều = 15.
                  </>
                )}
              </CheckCard>
              <TradNote>
                {en
                  ? 'Pairing each direction with a Five Phase — Hetu as the Generating cycle, Luoshu as the Overcoming cycle — is traditional interpretation, with variant readings. The sums are not.'
                  : 'Chuyện gán mỗi hướng một Hành — Hà Đồ ra vòng Tương Sinh, Lạc Thư ra vòng Tương Khắc — là diễn giải truyền thống, có dị bản. Mấy tổng thì không.'}
              </TradNote>
              <SourceLink to="/ha-do-lac-thu">{en ? 'Hetu · Luoshu →' : 'Hà Đồ · Lạc Thư →'}</SourceLink>
            </>
          }
        >
          <p className="mb-3">
            {en ? (
              <>
                <b className="text-ink">Hetu</b> (left): ten numbers in five pairs, every pair
                exactly <b className="text-gold-soft">5</b> apart — 1·6, 2·7, 3·8, 4·9, 5·10. Odd
                numbers (Heaven) inside, even (Earth) outside.
              </>
            ) : (
              <>
                <b className="text-ink">Hà Đồ</b> (trái): mười con số xếp thành năm cặp, cặp nào
                cũng lệch đúng <b className="text-gold-soft">5</b> — 1·6, 2·7, 3·8, 4·9, 5·10. Số lẻ
                (Trời) nằm trong, số chẵn (Đất) nằm ngoài.
              </>
            )}
          </p>
          <p>
            {en ? (
              <>
                <b className="text-ink">Luoshu</b> (right): nine numbers in a 3×3 magic square,
                every line summing to <b className="text-gold-soft">15</b> — the Nine Palaces, the
                frame that Later Heaven is laid on.
              </>
            ) : (
              <>
                <b className="text-ink">Lạc Thư</b> (phải): chín con số xếp ma phương 3×3, mọi đường
                cộng ra <b className="text-gold-soft">15</b> — đó là Cửu Cung, cái khung mà Hậu
                Thiên đặt lên.
              </>
            )}
          </p>
        </SpineText>
      </SpineRow>

      <SpineRow
        id={ANCHOR.xiang}
        n={4}
        title={en ? 'The two trigram circles' : 'Hai vòng Bát Quái'}
        lens="xiang"
        verified
      >
        <SpineLead>
          {en
            ? 'Here the numbers become images. The same eight trigrams, laid in a circle two different ways, for two different jobs.'
            : 'Đến đây số hoá thành tượng. Vẫn tám quẻ đơn ấy, xếp thành vòng theo hai cách, cho hai việc khác nhau.'}
        </SpineLead>

        <SpineFigures>
          <Figure max="480px" label={en ? 'Earlier Heaven 先天' : 'Tiên Thiên 先天'}>
            <BaguaWheel arrangement="earlier" showComplements />
          </Figure>
          <Figure max="480px" label={en ? 'Later Heaven 後天' : 'Hậu Thiên 後天'}>
            <BaguaWheel arrangement="later" />
          </Figure>
        </SpineFigures>

        <SpineText
          aside={
            <>
              <CheckCard title={en ? 'Each facing pair = 7' : 'Mỗi cặp đối tâm = 7'}>
                {en
                  ? 'Read each trigram as 0–7. Heaven 111 = 7, Earth 000 = 0, and 7+0 = 7. All four diameter pairs do it — that is what bit-complement means.'
                  : 'Đọc mỗi quẻ ra số 0–7. Trời 111 = 7, Đất 000 = 0, và 7+0 = 7. Cả bốn cặp đối tâm đều vậy — bù bit nghĩa là thế.'}
              </CheckCard>
              <SourceLink to="/ha-do-lac-thu#tien-hau-thien">
                {en ? 'Earlier / Later Heaven →' : 'Tiên / Hậu Thiên →'}
              </SourceLink>
            </>
          }
        >
          <p className="mb-3">
            {en ? (
              <>
                <b className="text-gold-soft">Earlier Heaven</b> is built on symmetry: every pair
                facing across the diameter is a <b>bit-complement</b> — flip all three bits of one
                and you get the other. Heaven 111 opposite Earth 000. A diagram of{' '}
                <i>structure</i>, standing still.
              </>
            ) : (
              <>
                <b className="text-gold-soft">Tiên Thiên</b> dựng trên đối xứng: mọi cặp đứng đối
                tâm đều là <b>bù bit</b> — lật cả ba bit của quẻ này ra đúng quẻ kia. Trời 111 đối
                Đất 000. Bản đồ của <i>cấu trúc</i>, đứng yên.
              </>
            )}
          </p>
          <p>
            {en ? (
              <>
                <b className="text-jade">Later Heaven</b> is built on the year: it sits on the Nine
                Palaces of the Luoshu and reads as a cycle of seasons and directions — the world we
                actually live in, turning.
              </>
            ) : (
              <>
                <b className="text-jade">Hậu Thiên</b> dựng trên năm tháng: nó đặt trên Cửu Cung của
                Lạc Thư, đọc ra vòng mùa và vòng hướng — cái thế giới ta đang sống, đang quay.
              </>
            )}
          </p>
        </SpineText>
      </SpineRow>

      <TichQuaiRecap />

      <SpineRow n={6} title={en ? 'All 64 — square and circle' : 'Cả 64 — vuông và tròn'} lens="xiang" verified>
        <SpineLead>
          {en
            ? 'Stack two trigrams and you get a hexagram: 8 × 8 = 64 — the same 64 the doubling tree gave, reached a second way. Shao Yong drew them as a square inside a circle.'
            : 'Chồng hai quẻ đơn lên nhau ra một quẻ kép: 8 × 8 = 64 — đúng 64 mà cây sinh đôi đã cho, tới bằng đường thứ hai. Thiệu Ung vẽ chúng thành hình vuông trong vòng tròn.'}
        </SpineLead>

        <SpineFigures>
          <Figure max="560px" label={en ? 'Round · Yuan 圓' : 'Viên · tròn 圓'}>
            <VienCircle />
          </Figure>
          <Figure max="355px" label={en ? 'Square · Fang 方' : 'Phương · vuông 方'}>
            <PhuongSquare />
          </Figure>
        </SpineFigures>

        <SpineText
          aside={
            <>
              <CheckCard title="0 – 63">
                {en ? (
                  <>
                    2⁶ = 64, and the codes run 0 through 63 with no gaps and no duplicates. Heaven ={' '}
                    <b className="text-gold-soft">111111 = 63</b>, Earth ={' '}
                    <b className="text-jade">000000 = 0</b>.
                  </>
                ) : (
                  <>
                    2⁶ = 64, và dãy mã chạy từ 0 tới 63, không hở không trùng. Trời ={' '}
                    <b className="text-gold-soft">111111 = 63</b>, Đất ={' '}
                    <b className="text-jade">000000 = 0</b>.
                  </>
                )}
              </CheckCard>
              <TradNote>
                {en
                  ? 'Reading the round as Heaven · motion · time and the square as Earth · stillness · space is traditional, as is the 129,600-year world-cycle Shao Yong hung on it. The count is not.'
                  : 'Đọc vòng tròn là Trời · động · thời gian và hình vuông là Đất · tĩnh · không gian là diễn giải truyền thống, chu kỳ 129.600 năm Thiệu Ung treo lên đó cũng vậy. Phép đếm thì không.'}
              </TradNote>
              <SourceLink to="/64-que">{en ? 'The 64 Hexagrams →' : '64 Quẻ →'}</SourceLink>
            </>
          }
        >
          <p className="mb-3">
            {en ? (
              <>
                Both figures hold the <b className="text-ink">same 64 in the same order</b> — the
                circle unrolls the count around a ring, the square packs it into an 8×8 grid. Each
                hexagram has its own address in <b className="text-ink">0–63</b>, on both.
              </>
            ) : (
              <>
                Cả hai hình giữ <b className="text-ink">cùng 64 quẻ, cùng thứ tự</b> — vòng tròn
                trải phép đếm quanh một vành, hình vuông đóng gói nó vào lưới 8×8. Mỗi quẻ có địa
                chỉ riêng trong <b className="text-ink">0–63</b>, ở cả hai.
              </>
            )}
          </p>
          <p>
            {en ? (
              <>
                This is the <b className="text-gold-soft">Square-and-Round diagram</b> — where the
                journey's numbers arrive as one picture. The next three panels ask what shape these
                64 are in.
              </>
            ) : (
              <>
                Đây là <b className="text-gold-soft">Phương Viên Đồ</b> — nơi những con số của hành
                trình hiện lại thành một hình. Ba khối kế tiếp hỏi 64 quẻ ấy có hình gì.
              </>
            )}
          </p>
        </SpineText>
      </SpineRow>

      {/* ─────────────── ĐỈNH ─────────────── */}

      <Reveal className="mb-6 mt-10 text-center">
        <p className="mx-auto max-w-[64ch] text-sm text-ink-muted">
          {en ? (
            <>
              That is the journey. <b className="text-ink">Now the part that only makes sense
              once you have walked it</b> — what happens when you ask the 64 what shape they are
              in.
            </>
          ) : (
            <>
              Hành trình là vậy. <b className="text-ink">Giờ tới phần chỉ có nghĩa khi đã đi hết
              đoạn trên</b> — chuyện gì xảy ra khi ta hỏi 64 quẻ ấy rằng chúng có hình gì.
            </>
          )}
        </p>
      </Reveal>

      <SpineRow
        id={ANCHOR.li}
        n={7}
        title={en ? 'Two mirrors → 20 families' : 'Hai phép gương → 20 họ'}
        lens="li"
        verified
      >
        <p className="mb-4 max-w-[72ch] text-sm leading-relaxed text-ink-muted">
          {en ? (
            <>
              On a 6-bit string there are exactly two base transformations:{' '}
              <b className="text-gold-soft">OPPOSITE (錯)</b> = complement every bit (reflection
              through the <i>center</i>) and <b className="text-jade">REVERSED (綜)</b> = reverse
              the line order (reflection in a <i>mirror</i>). These two commute → they generate a
              Klein 4-group, splitting the 64 hexagrams into{' '}
              <b className="text-ink">20 families</b> (12 full-4 + 8 pair-2). Every hexagram lives
              in a family of ≤ 4:
            </>
          ) : (
            <>
              Trên chuỗi 6 bit có đúng hai phép biến đổi nền: <b className="text-gold-soft">ĐỐI (錯)</b> = bù
              mọi bit (phản chiếu <i>tâm</i>) và <b className="text-jade">ĐẢO (綜)</b> = đảo thứ tự hào (phản
              chiếu <i>gương</i>). Hai phép này giao hoán → sinh nhóm Klein 4, chia 64 quẻ thành{' '}
              <b className="text-ink">20 họ</b> (12 họ đầy-4 + 8 họ đôi-2). Mỗi quẻ sống trong một họ ≤ 4:
            </>
          )}
        </p>
        <FamilyDemo en={en} />
        <div className="mt-5">
          <NoteCallout kind="kiem-duoc" title={en ? '20 families — verifiable' : '20 họ — kiểm được'}>
            {en ? (
              <>
                The group {'{Reversed, Opposite}'} splits the 64 hexagrams into 12 four-families + 8
                two-families — <b className="text-ink">add it up yourself: 12×4 + 8×2 = 64 ✓</b>. The 4
                palindrome families coincide exactly with 4 of King Wen's OPPOSITE pairs, and here they
                are by name: <b className="text-ink">Qian·Kun (1–2)</b>, <b className="text-ink">Yi·Da
                Guo (27–28)</b>, <b className="text-ink">Kan·Li (29–30)</b>, <b className="text-ink">Zhong
                Fu·Xiao Guo (61–62)</b> — all four sit side by side in King Wen's order; check them
                against the table of 64 and you will see it.
              </>
            ) : (
              <>
                Nhóm {'{Đảo, Đối}'} chia 64 quẻ thành 12 họ-4 + 8 họ-2 —{' '}
                <b className="text-ink">tự cộng: 12×4 + 8×2 = 64 ✓</b>. 4 họ palindrome trùng đúng 4 cặp
                ĐỐI của Văn Vương, và đây là đích danh bốn cặp đó:{' '}
                <b className="text-ink">Càn·Khôn (1–2)</b>, <b className="text-ink">Di·Đại Quá (27–28)</b>,{' '}
                <b className="text-ink">Khảm·Ly (29–30)</b>, <b className="text-ink">Trung Phu·Tiểu Quá
                (61–62)</b> — cả bốn đều đứng liền nhau trong thứ tự Văn Vương; tra bảng 64 quẻ là thấy.
              </>
            )}
          </NoteCallout>
        </div>
      </SpineRow>

      <SpineRow n={8} title={en ? 'Two orders = two choices of axis' : 'Hai trật tự = hai cách chọn trục'} lens="li" verified>
        <p className="mb-4 max-w-[72ch] text-sm leading-relaxed text-ink-muted">
          {en ? (
            <>
              The same 64 hexagrams, ordered by <b className="text-gold-soft">OPPOSITE + magnitude</b>,
              give the Fu Xi matrix (0→63, clean bands = <i>space/stillness</i>); ordered by{' '}
              <b className="text-jade">REVERSED</b>, they give King Wen's 32 "invert-or-else-transform"
              pairs (<i>time/motion</i>).
            </>
          ) : (
            <>
              Cùng 64 quẻ đó, sắp theo <b className="text-gold-soft">ĐỐI + độ lớn</b> ra ma trận Phục Hy
              (0→63, dải sạch = <i>không gian/tĩnh</i>); sắp theo <b className="text-jade">ĐẢO</b> ra 32 cặp
              "phi phúc tức biến" của Văn Vương (<i>thời gian/động</i>).
            </>
          )}
        </p>
        <TwoOrders />
      </SpineRow>

      <SpineRow
        n={9}
        title={en ? 'Fold the matrix into a circle' : 'Gập ma trận thành vòng'}
        lens="li"
        verified={false}
      >
        <p className="mb-4 max-w-[72ch] text-sm leading-relaxed text-ink-muted">
          {en ? (
            <>
              The square matrix (Fang) and the circle (Yuan) are <b className="text-ink">the same 64
              hexagrams in the same order</b> — only laid out differently. Shao Yong overlaid both on one
              figure: the <b className="text-ink">Round</b> (Heaven · motion · time) enclosing the outside,
              the <b className="text-ink">Square</b> (Earth · stillness · space) within. Drag the slider to
              fold square into circle; <b className="text-ink">hover or tap a hexagram</b> to read its
              meaning and its Opposite/Reversed relations in the panel at right.{' '}
              <Link to="/64-que" className="text-gold-soft underline-offset-2 hover:underline">See it in detail on the 64 Hexagrams page →</Link>
            </>
          ) : (
            <>
              Ma trận vuông (Phương) và vòng tròn (Viên) là <b className="text-ink">cùng 64 quẻ, cùng thứ
              tự</b> — chỉ khác cách trải hình. Thiệu Ung chồng cả hai lên một hình:{' '}
              <b className="text-ink">Viên</b> (tròn · Trời · động · thời gian) bọc ngoài,{' '}
              <b className="text-ink">Phương</b> (vuông · Đất · tĩnh · không gian) bên trong. Kéo thanh
              trượt để gập vuông thành tròn; <b className="text-ink">rê hoặc bấm một quẻ</b> để đọc ý nghĩa
              và quan hệ Đối/Đảo ở bảng bên phải.{' '}
              <Link to="/64-que" className="text-gold-soft underline-offset-2 hover:underline">Xem chi tiết ở trang 64 Quẻ →</Link>
            </>
          )}
        </p>
        <SpineMorph />
        <div className="mt-5">
          <NoteCallout
            kind="truyen-thong"
            title={en ? 'The honest boundary' : 'Ranh giới trung thực'}
            source={en ? 'Shao Yong · Zhu Xi' : 'Thiệu Ung · Chu Hi'}
          >
            {en ? (
              <>
                Earlier → Later Heaven is <b>not</b> a fixed bit operation (all 48 were exhausted);
                there is <b>no</b> "hidden five-phase cycle" in the Fu Xi/King Wen order; assigning
                Hetu↔Earlier Heaven, Luoshu↔Later Heaven is a Song-dynasty reading with variants; the
                "Square" here is a binary grid, not the old 方圖 diagram.
              </>
            ) : (
              <>
                Tiên → Hậu Thiên <b>không</b> phải một phép bit cố định (đã vét cạn 48 phép); <b>không</b> có
                "vòng ngũ hành ẩn" trong thứ tự Phục Hy/Văn Vương; quy gán Hà Đồ↔Tiên Thiên, Lạc Thư↔Hậu
                Thiên là diễn giải đời Tống có dị bản; "Phương" ở đây là lưới nhị phân, không phải bản 方圖 cổ.
              </>
            )}
          </NoteCallout>
        </div>
      </SpineRow>

      <SpineRow n={10} title={en ? 'Meta yin–yang' : 'Meta-âm-dương'} lens="li" verified>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-ink-faint">
                <th className="border-b border-white/10 py-2 pr-4 font-normal"></th>
                <th className="border-b border-white/10 py-2 pr-4 font-medium text-gold-soft">{en ? 'SPACE (still)' : 'KHÔNG GIAN (tĩnh)'}</th>
                <th className="border-b border-white/10 py-2 font-medium text-jade">{en ? 'TIME (moving)' : 'THỜI GIAN (động)'}</th>
              </tr>
            </thead>
            <tbody className="text-ink-muted">
              {(en
                ? [
                    ['axis of symmetry', 'OPPOSITE — bit-complement, central reflection', 'REVERSED — bit-flip, mirror reflection'],
                    ['matrix', 'Fu Xi (8×8 = 0..63)', 'King Wen (32 pairs)'],
                    ['trigram circle', 'Earlier Heaven (先天)', 'Later Heaven (後天)'],
                    ['number-root (traditional)', 'Hetu (55)', 'Luoshu (45 · rows 15)'],
                    ['Square-and-Round', 'SQUARE — Fang · Earth', 'ROUND — Yuan · Heaven'],
                  ]
                : [
                    ['trục đối xứng', 'ĐỐI — bù bit, phản chiếu tâm', 'ĐẢO — đảo bit, phản chiếu gương'],
                    ['ma trận', 'Phục Hy (8×8 = 0..63)', 'Văn Vương (32 cặp)'],
                    ['bát quái', 'Tiên Thiên (先天)', 'Hậu Thiên (後天)'],
                    ['gốc số (truyền thống)', 'Hà Đồ (55)', 'Lạc Thư (45 · hàng 15)'],
                    ['Phương Viên Đồ', 'PHƯƠNG — vuông · Đất', 'VIÊN — tròn · Trời'],
                  ]
              ).map((row) => (
                <tr key={row[0]}>
                  <td className="border-b border-white/5 py-2 pr-4 text-ink-faint">{row[0]}</td>
                  <td className="border-b border-white/5 py-2 pr-4">{row[1]}</td>
                  <td className="border-b border-white/5 py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-[74ch] text-sm text-ink-muted">
          {en ? (
            <>
              The left column ↔ the right column is precisely the <b className="text-ink">yin–yang
              pair</b>, reappearing at the meta level. The Changes' game: begin from 1 bit, package it
              into 64 states, then organize them along exactly the two halves of the same duality that
              produced them. <b className="text-gold-soft">That is the root you came in through the tip
              to reach.</b>
            </>
          ) : (
            <>
              Cột trái ↔ cột phải chính là <b className="text-ink">cặp âm–dương</b>, hiện lại ở tầng meta.
              Game của Dịch: khởi từ 1 bit, đóng gói thành 64 trạng thái, rồi tổ chức chúng theo đúng hai
              nửa của chính cái nhị nguyên đã sinh ra chúng.{' '}
              <b className="text-gold-soft">Đó là cái gốc mà ta đi từ ngọn để về.</b>
            </>
          )}
        </p>
      </SpineRow>

      {/* Cửa ra */}
      <Reveal as="section" className="panel-soft mb-6 p-6 md:p-8">
        <h2 className="mb-1 font-serif text-xl text-gold-soft">{en ? 'Where to next' : 'Đi tiếp đâu'}</h2>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en
            ? 'Two more pages sit beside the journey rather than on it:'
            : 'Hai trang nữa đứng cạnh hành trình, không nằm trên nó:'}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(en
            ? [
                { t: 'Laozi–Zhuangzi Wisdom', d: 'Where Daoist thought resonates with the Changes — and, honestly, where it does not share a root.', to: '/minh-triet' },
                { t: 'Method & Sources', d: 'How this site was built, what was checked by calculation, and where every claim comes from.', to: '/phuong-phap' },
              ]
            : [
                { t: 'Minh triết Lão–Trang', d: 'Chỗ Đạo gia cộng hưởng với Dịch — và, nói thẳng, chỗ hai bên không cùng gốc.', to: '/minh-triet' },
                { t: 'Phương pháp & Nguồn', d: 'Trang này dựng thế nào, chỗ nào đã kiểm bằng phép tính, và mỗi khẳng định đến từ đâu.', to: '/phuong-phap' },
              ]
          ).map((s) => (
            <Link key={s.to} to={s.to} className="panel-soft p-4 transition hover:border-gold-soft/30">
              <div className="mb-1 text-sm font-medium text-gold-soft">{s.t} →</div>
              <p className="text-sm leading-relaxed text-ink-muted">{s.d}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </Measure>
  );
}
