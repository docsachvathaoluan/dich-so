import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure } from '@/components/Layout';
import Gua, { YANG, YIN } from '@/components/Gua';
import WisdomCallout from '@/components/WisdomCallout';
import NoteCallout from '@/components/NoteCallout';
import { useLang } from '@/i18n';
import type { Bit } from '@/types';

// Quẻ minh hoạ "Phục Hy vạch nét, chưa có chữ" (6 hào bất kỳ — chỉ để gợi hình).
const PRE_TEXT_LINES: Bit[] = [1, 0, 0, 1, 0, 1];

export default function Layer0() {
  const [bit, setBit] = useState<Bit>(1);
  const lang = useLang();
  const en = lang === 'en';

  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'Layer 0 · Beginnings' : 'Lớp 0 · Khởi đầu'}
        title={en ? 'The Root of the Changes' : 'Gốc của Dịch'}
        symbol="☯"
      >
        {en ? (
          <>
            Before the 64 hexagrams, there was <b className="text-ink">a single idea</b>:
            everything arises from the interplay of two opposite yet complementary states —{' '}
            <span style={{ color: YANG }}>Yang</span> and{' '}
            <span style={{ color: YIN }}>Yin</span>. These are exactly the{' '}
            <b className="text-ink">0 and 1</b> of the modern world.
          </>
        ) : (
          <>
            Trước khi có 64 quẻ, có <b className="text-ink">một ý tưởng duy nhất</b>:
            vạn vật sinh ra từ sự đan xen của hai trạng thái đối lập mà bổ sung —{' '}
            <span style={{ color: YANG }}>Dương</span> và{' '}
            <span style={{ color: YIN }}>Âm</span>. Đó cũng chính là{' '}
            <b className="text-ink">0 và 1</b> của thế giới hiện đại.
          </>
        )}
      </PageHeader>

      {/* Âm Dương = bit */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">{en ? 'One line = one bit' : 'Một hào = một bit'}</h2>
        <p className="mb-6 max-w-[72ch] text-sm text-ink-muted">
          {en
            ? 'A line is the smallest building block of the Changes. It has only two possibilities. Tap the line below to flip between the two states.'
            : 'Hào là viên gạch nhỏ nhất của Dịch. Nó chỉ có hai khả năng. Bấm vào vạch dưới đây để lật giữa hai trạng thái.'}
        </p>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          <button
            onClick={() => setBit((b) => (b ? 0 : 1))}
            className="rounded-2xl border border-white/10 bg-cosmos-700/40 p-8 transition hover:border-gold/40"
            aria-label={en ? 'Flip the line' : 'Lật hào'}
          >
            <Gua lines={[bit]} width={140} lineHeight={20} glow />
          </button>

          <div className="text-center sm:text-left">
            <div
              className="font-serif text-5xl font-bold"
              style={{ color: bit ? YANG : YIN }}
            >
              {bit ? (en ? 'Yang' : 'Dương') : en ? 'Yin' : 'Âm'}
            </div>
            <div className="mt-2 space-y-1 text-sm text-ink-muted">
              <div>
                {en ? 'Binary value: ' : 'Giá trị nhị phân: '}
                <span className="font-mono text-ink">{bit}</span>
              </div>
              <div>
                {en ? 'State: ' : 'Trạng thái: '}
                {bit
                  ? en
                    ? 'bright · active · full'
                    : 'sáng · động · đầy'
                  : en
                    ? 'dark · still · empty'
                    : 'tối · tĩnh · rỗng'}
              </div>
              <div>
                {en ? 'Symbol: ' : 'Ký hiệu: '}
                {bit
                  ? en
                    ? 'solid line —'
                    : 'vạch liền —'
                  : en
                    ? 'broken line ▬ ▬'
                    : 'vạch đứt ▬ ▬'}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Thẻ minh triết Đạo gia (song ngữ). */}
      <WisdomCallout concept="am-duong-bit" className="mb-6" />

      {/* Thái cực sinh lưỡng nghi */}
      <Reveal as="section" delay={0.05} className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">
          {en ? 'Taiji gives birth to the Two Modes' : 'Thái Cực sinh Lưỡng Nghi'}
        </h2>
        <p className="max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              Taiji (太極), the Supreme Ultimate, is the undivided state of unity — like the
              original number <span className="font-mono text-ink">1</span>, or a bit not yet
              set. When it splits in two into Yin and Yang (the Two Modes), the universe's
              binary engine begins to run: 1 → 2 → 4 → 8 → … → 64. The whole of the I Ching is
              nothing but this one idea of doubling, repeated.
            </>
          ) : (
            <>
              Thái Cực (太極) là trạng thái hợp nhất chưa phân chia — như con số{' '}
              <span className="font-mono text-ink">1</span> ban đầu, hay bit chưa xác
              định. Khi nó phân đôi thành Âm–Dương (Lưỡng Nghi), guồng máy nhị phân
              của vũ trụ bắt đầu chạy: 1 → 2 → 4 → 8 → … → 64. Toàn bộ Kinh Dịch chỉ
              là sự nhân đôi lặp lại của ý tưởng này.
            </>
          )}
        </p>
        <div className="mt-5">
          <Link
            to="/bat-quai"
            className="text-sm text-gold-soft underline-offset-4 hover:underline"
          >
            {en
              ? '→ See Doubling & the Eight Trigrams (Taiji → 64)'
              : '→ Xem Sinh đôi & Bát Quái (Thái Cực → 64)'}
          </Link>
        </div>

        <WisdomCallout concept="dao-thai-cuc" className="mt-6" />
      </Reveal>

      {/* Ba nghĩa của Dịch */}
      <Reveal as="section" className="mb-6 grid gap-4 md:grid-cols-3">
        {(en
          ? [
              {
                t: 'Change',
                h: '變易',
                d: 'Everything is always changing. No state stands still; all things transform ceaselessly — like bits flipping without pause.',
              },
              {
                t: 'The Unchanging',
                h: '不易',
                d: 'Within change lies the changeless: the laws of operation themselves do not vary. The rules are fixed; the moves are countless.',
              },
              {
                t: 'Simplicity',
                h: '簡易',
                d: 'However complex the laws, they reduce to something simple: two states, Yin and Yang, and the ways of combining them.',
              },
            ]
          : [
              {
                t: 'Biến Dịch',
                h: '變易',
                d: 'Mọi thứ luôn thay đổi. Không có trạng thái nào đứng yên; vạn vật chuyển hoá không ngừng — như các bit liên tục lật.',
              },
              {
                t: 'Bất Dịch',
                h: '不易',
                d: 'Trong cái biến có cái bất biến: chính các quy luật vận hành thì không đổi. Luật chơi cố định, nước cờ thì vô vàn.',
              },
              {
                t: 'Giản Dịch',
                h: '簡易',
                d: 'Quy luật phức tạp đến đâu cũng quy về điều giản dị: hai trạng thái Âm–Dương và phép tổ hợp chúng.',
              },
            ]
        ).map((c) => (
          <div key={c.t} className="panel-soft p-5">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg text-gold-soft">{c.t}</h3>
              <span className="han text-sm text-ink-faint">{c.h}</span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{c.d}</p>
          </div>
        ))}
      </Reveal>

      {/* Kinh Dịch là sách chồng lớp: ba lớp tác giả */}
      <Reveal as="section" className="mb-6">
        <h2 className="mb-1 text-xl">
          {en ? 'The I Ching is a "layered" book' : 'Kinh Dịch là một cuốn sách "chồng lớp"'}
        </h2>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The I Ching we read today is <b className="text-ink">three layers stacked</b>, built
              up across three eras. Reading it well means knowing{' '}
              <b>which line belongs to which layer, and whose reading it is</b> — don't assume
              everything is the "original meaning."
            </>
          ) : (
            <>
              Cuốn Kinh Dịch ta đọc hôm nay là <b className="text-ink">ba lớp chồng lên nhau</b>, bồi đắp qua
              ba đời. Đọc giỏi nghĩa là biết <b>câu nào thuộc lớp nào, là cách hiểu của ai</b> — đừng tưởng
              tất cả đều là "ý gốc".
            </>
          )}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="panel-soft p-4">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg text-ink">{en ? 'Fu Xi' : 'Phục Hy'}</h3>
              <span className="han text-sm text-ink-faint">伏羲</span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              {en ? 'drew the lines · no words yet' : 'vạch quẻ · chưa có chữ'}
            </p>
            <div className="my-3">
              <Gua lines={PRE_TEXT_LINES} width={72} lineHeight={6} gap={4} colorMode="duality" />
            </div>
            <p className="text-sm text-ink-muted">
              {en ? (
                <>
                  Only <b className="text-ink">Yin–Yang strokes</b>: 8 trigrams → 64 hexagrams → 384
                  lines. Pure image, not a single word.
                </>
              ) : (
                <>
                  Chỉ <b className="text-ink">nét Âm–Dương</b>: 8 quẻ → 64 quẻ → 384 hào. Thuần hình tượng,
                  không một con chữ.
                </>
              )}
            </p>
          </div>
          <div className="panel-soft p-4">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg text-ink">
                {en ? 'King Wen · Duke of Zhou' : 'Văn Vương · Chu Công'}
              </h3>
              <span className="han text-sm text-ink-faint">文王 · 周公</span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">{en ? 'added WORDS' : 'thêm LỜI'}</p>
            <p className="mt-[1.1rem] text-sm text-ink-muted">
              {en ? (
                <>
                  <b className="text-ink">King Wen</b> wrote the <b>Judgment texts</b> (words for the
                  whole hexagram); the <b className="text-ink">Duke of Zhou</b> wrote the{' '}
                  <b>line texts</b> (words for each line). For the first time, the figures had words.
                </>
              ) : (
                <>
                  <b className="text-ink">Văn Vương</b> làm <b>Thoán từ</b> (lời cả quẻ);{' '}
                  <b className="text-ink">Chu Công</b> làm <b>Hào từ</b> (lời từng hào). Lần đầu quẻ có chữ
                  đi kèm.
                </>
              )}
            </p>
          </div>
          <div className="panel-soft p-4">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg text-ink">{en ? 'Confucius' : 'Khổng Tử'}</h3>
              <span className="han text-sm text-ink-faint">孔子</span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              {en ? 'added the EXPLANATION of principle' : 'thêm GIẢI NGHĨA LÝ'}
            </p>
            <p className="mt-[1.1rem] text-sm text-ink-muted">
              {en ? (
                <>
                  The <b className="text-ink">Ten Wings</b> — Commentary on the Judgment, on the Image,
                  the Wenyan, the Great Treatise… extend the work in terms of <b>principle</b>, telling
                  us why fortune or misfortune follows.
                </>
              ) : (
                <>
                  <b className="text-ink">Thập Dực</b> — Thoán truyện, Tượng truyện, Văn ngôn, Hệ từ… suy rộng
                  về mặt <b>nghĩa lý</b>, cho ta hiểu vì sao lành/dữ.
                </>
              )}
            </p>
          </div>
        </div>
        <NoteCallout
          kind="truyen-thong"
          title={en ? "Don't confuse the three layers" : 'Đừng lẫn lộn ba lớp'}
          source={
            en
              ? 'Outline of the Theory of the Changes (remarks of Cheng Yi · Zhu Xi); attributing authorship is traditional — modern scholarship still debates it'
              : 'Dịch Thuyết Cương Lĩnh (lời bàn Trình Di · Chu Hy); quy gán tác giả là truyền thống — học giới hiện đại còn tranh luận'
          }
          className="mt-4"
        >
          {en ? (
            <>
              <i>"The Changes of Confucius are not the Changes of King Wen; the Changes of King Wen are
              not the Changes of Fu Xi."</i> Later readers often err by seeing only Confucius's layer of
              principle while forgetting the original intent of King Wen and the Duke of Zhou. Assigning
              the three layers to three "sages" is a <b>traditional record</b>, cited to show how the great
              book grew — not a theorem about authorship.
            </>
          ) : (
            <>
              <i>"Dịch của Khổng Tử không phải là Dịch của Văn Vương; Dịch của Văn Vương không phải là Dịch của
              Phục Hy."</i> Người đời sau hay sai vì chỉ thấy phần nghĩa lý của Khổng Tử mà quên bản ý gốc của
              Văn Vương – Chu Công. Việc quy ba lớp cho ba "thánh nhân" là <b>ghi chép truyền thống</b>, nêu để
              hiểu cách cuốn sách lớn dần, không phải định lý về tác giả.
            </>
          )}
        </NoteCallout>
      </Reveal>

      {/* Bốn "ống kính" đọc một quẻ */}
      <Reveal as="section" className="mb-6">
        <h2 className="mb-1 text-xl">
          {en
            ? "Four 'lenses' for reading a hexagram — and this site's path"
            : 'Bốn "ống kính" đọc một quẻ — và lối đi của trang này'}
        </h2>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The ancients viewed a hexagram through four lenses. Master Cheng (Cheng Yi) ordered
              them by <i>order of birth</i>: <b className="text-ink">Li → Xiang → Shu</b> (principle
              → image → number) — only where there is <b>Li</b> can there be <b>Xiang</b>, and only
              then <b>Shu</b>. That is, <b className="text-gold-soft">number</b> sits at the{' '}
              <i>tip</i>, not the root.{' '}
              <b className="text-ink">This site deliberately enters through that tip</b>: it takes
              number / binary as the doorway, because that is where the Changes meet modern thought
              and what today's reader knows best — then it leads from the tip back to the{' '}
              <b className="text-ink">root (Li)</b>.
            </>
          ) : (
            <>
              Người xưa soi một quẻ qua bốn lăng kính. Trình Tử xếp chúng theo <i>thứ tự sinh ra</i>:{' '}
              <b className="text-ink">Lý → Tượng → Số</b> — có cái <b>Lý</b> mới có <b>Tượng</b>, rồi mới có{' '}
              <b>Số</b>. Tức <b className="text-gold-soft">Số</b> nằm ở <i>ngọn</i>, không phải gốc.{' '}
              <b className="text-ink">Trang này cố ý vào bằng cái ngọn ấy</b>: lấy Số/nhị phân làm cửa, vì đó
              là nơi Dịch gặp tư duy hiện đại và là thứ người hôm nay quen nhất — rồi từ ngọn dẫn ngược về{' '}
              <b className="text-ink">gốc (Lý)</b>.
            </>
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(en
            ? [
                { t: 'Xiang', h: '象', d: 'Image / the pattern of odd–even strokes. The "very clear" — seen at a glance: heaven, earth, water, fire.', hot: false },
                { t: 'Li', h: '理', d: 'The inner principle. The "very subtle" — fine, to be pondered: the law of how things work.', hot: false },
                { t: 'Shu', h: '數', d: "Number / binary position. This site's modern lens: each hexagram is a number 0–63.", hot: true },
                { t: 'Xing', h: '性', d: 'The nature / character of the hexagram. "Strong and untiring, this is Qian" — spirit, not just form.', hot: false },
              ]
            : [
                { t: 'Tượng', h: '象', d: 'Hình ảnh / nét vạch chẵn–lẻ. Cái "rất rõ" — nhìn là thấy: trời, đất, nước, lửa.', hot: false },
                { t: 'Lý', h: '理', d: 'Nghĩa lý ẩn bên trong. Cái "rất nhỏ" — vi tế, phải ngẫm: quy luật vận hành.', hot: false },
                { t: 'Số', h: '數', d: 'Con số / vị trí nhị phân. Lăng kính hiện đại của trang: mỗi quẻ là một số 0–63.', hot: true },
                { t: 'Tính', h: '性', d: 'Bản tính / đức của quẻ. "Mạnh mà không nghỉ gọi là Càn" — tinh thần, không chỉ hình.', hot: false },
              ]
          ).map((c) => (
            <div
              key={c.t}
              className={`panel-soft p-4 ${c.hot ? 'border-gold/30 bg-gold/[0.05]' : ''}`}
            >
              <div className="flex items-baseline gap-2">
                <h3 className={`text-lg ${c.hot ? 'text-gold' : 'text-ink'}`}>{c.t}</h3>
                <span className="han text-sm text-ink-faint">{c.h}</span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          {en ? (
            <>
              Master Cheng: <i>"The very subtle is Li; the very clear is Xiang."</i> He also warned
              that fixating on calculating Shu in fine detail is <i>"chasing the stream to its tip"</i> —
              so this site uses Shu as a <b>bridge</b>, not a stopping point. The four lenses are a
              traditional way of seeing, complementary rather than mutually exclusive.
            </>
          ) : (
            <>
              Trình Tử: <i>"Rất nhỏ là Lý, rất rõ là Tượng."</i> Cụ cũng cảnh báo: chăm chăm tính Số cho
              chi li là <i>"tìm dòng theo ngọn"</i> — nên trang này dùng Số như <b>cây cầu</b>, không dừng lại
              ở Số. Bốn ống kính là cách nhìn truyền thống, bổ sung cho nhau chứ không loại nhau.
            </>
          )}
        </p>
      </Reveal>

      {/* Thể vs Dụng */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">
          {en
            ? 'Substance and Function — two tiers in one book'
            : 'Thể và Dụng — hai tầng trong cùng một cuốn'}
        </h2>
        <p className="mb-3 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              A pair of ideas runs through this whole site: <b className="text-ink">Substance</b>{' '}
              <span className="han text-ink-faint">體</span> is <i>the changeless</i> (structure, frame);{' '}
              <b className="text-ink">Function</b> <span className="han text-ink-faint">用</span> is{' '}
              <i>the applied / interpreted</i> (how it is used, how it is linked). Later pages reuse this
              exact pair (Hetu / Earlier Heaven lean toward <i>substance</i>; Luoshu / Later Heaven lean
              toward <i>function</i>).
            </>
          ) : (
            <>
              Một cặp khái niệm xuyên suốt trang này: <b className="text-ink">Thể</b>{' '}
              <span className="han text-ink-faint">體</span> là <i>cái bất biến</i> (kết cấu, khung);{' '}
              <b className="text-ink">Dụng</b> <span className="han text-ink-faint">用</span> là{' '}
              <i>cái vận dụng / diễn giải</i> (cách dùng, cách nối). Các trang sau dùng lại đúng cặp này
              (Hà Đồ/Tiên Thiên nghiêng về <i>thể</i>, Lạc Thư/Hậu Thiên nghiêng về <i>dụng</i>).
            </>
          )}
        </p>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              For the 64 hexagrams: the <b className="text-ink">substance</b> tier is the combinatorial
              structure of bits — all 64 hexagrams <b>appear at once</b>, none "gives birth" to another.
              Sayings like <i>"Standstill comes out of Peace"</i> or <i>"the firm returns, the yielding
              advances"</i> belong to the <b className="text-ink">function</b> tier — connective readings{' '}
              <b>added afterward</b>. Confusing the two tiers is the source of every "meaningless" dispute.
            </>
          ) : (
            <>
              Với 64 quẻ: tầng <b className="text-ink">thể</b> là kết cấu tổ hợp bit — toàn bộ 64 quẻ{' '}
              <b>hiện ra cùng một lúc</b>, không quẻ nào "đẻ" ra quẻ nào. Còn những câu kiểu{' '}
              <i>"Bĩ ra từ Thái"</i>, <i>"cương lại, nhu tiến"</i> là tầng <b className="text-ink">dụng</b> —
              diễn giải nối kết <b>thêm vào sau</b>. Lẫn hai tầng là nguồn của mọi tranh cãi "vô nghĩa".
            </>
          )}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <NoteCallout
            kind="kiem-duoc"
            title={en ? 'Substance tier — verifiable' : 'Tầng thể — kiểm được'}
          >
            {en ? (
              <>
                64 hexagrams = <b className="text-ink">2⁶</b> combinations of 6 bits, covering exactly
                the numbers <b>0–63</b>, each once. This is a combinatorial fact — you can count them
                yourself — independent of any interpretation.
              </>
            ) : (
              <>
                64 quẻ = <b className="text-ink">2⁶</b> tổ hợp 6 bit, phủ đúng các số <b>0–63</b>, mỗi số một
                lần. Đây là sự thật tổ hợp — bạn tự đếm được — không phụ thuộc cách diễn giải.
              </>
            )}
          </NoteCallout>
          <NoteCallout
            kind="truyen-thong"
            title={en ? 'Function tier — reading after Zhu Xi' : 'Tầng dụng — đọc theo Chu Hy'}
            source={en ? 'Zhu Xi — Outline of the Theory of the Changes' : 'Chu Hy (Chu Tử) — Dịch Thuyết Cương Lĩnh'}
          >
            {en ? (
              <>
                "The 64 hexagrams are born at once; none gives birth to another," and the way of dissolving
                the paradox "Standstill comes out of Peace" is <b>Zhu Xi's substance/function reading</b> —
                one way of seeing, not a theorem. The point is to read <i>flexibly</i>: knowing which lines
                belong to structure and which to interpretation.
              </>
            ) : (
              <>
                "64 quẻ sinh cùng một lúc, không quẻ nào đẻ ra quẻ nào" và phép gỡ nghịch lý "Bĩ ra từ Thái"
                là <b>cách đọc thể/dụng của Chu Hy</b> — một lối nhìn, không phải định lý. Cốt ở chỗ đọc{' '}
                <i>linh hoạt</i>: biết câu nào thuộc kết cấu, câu nào thuộc diễn giải.
              </>
            )}
          </NoteCallout>
        </div>
      </Reveal>

      <Reveal as="section" className="panel-soft p-5 text-sm text-ink-muted">
        {en ? (
          <>
            💡 In 1703, the mathematician Leibniz — father of the binary system — was astonished to
            find that Shao Yong's diagram of the 64 hexagrams matched perfectly the binary number
            sequence he had just invented.{' '}
            <Link to="/phuong-phap" className="text-gold-soft hover:underline">
              Read the story & method →
            </Link>
          </>
        ) : (
          <>
            💡 Năm 1703, nhà toán học Leibniz — cha đẻ của hệ nhị phân — sửng sốt khi
            thấy sơ đồ 64 quẻ của Thiệu Ung khớp hoàn toàn với dãy số nhị phân ông vừa
            phát minh.{' '}
            <Link to="/phuong-phap" className="text-gold-soft hover:underline">
              Đọc câu chuyện & phương pháp →
            </Link>
          </>
        )}
      </Reveal>
    </Measure>
  );
}
