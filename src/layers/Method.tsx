import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import NoteCallout from '@/components/NoteCallout';
import { Measure } from '@/components/Layout';
import { useLang } from '@/i18n';

const SOURCES = [
  'Nguyễn Hiến Lê — “Kinh Dịch: Đạo của người quân tử”.',
  'Ngô Tất Tố — “Kinh Dịch”.',
  'Richard Wilhelm & Cary F. Baynes — “The I Ching, or Book of Changes”.',
  'Thiệu Ung (Thiệu Khang Tiết) — “Hoàng Cực Kinh Thế”; các đồ Tiên Thiên (Phương Viên Đồ).',
  'Thuyết Quái truyện (Thập Dực) — phương vị Tiên Thiên & chiều thuận–nghịch.',
  'Nạp giáp: Kinh Phòng; Ngụy Bá Dương — “Chu Dịch Tham Đồng Khế” (pha trăng ↔ quẻ).',
  'Wikipedia (EN) — “King Wen sequence”, “Bagua”, “Hexagram (I Ching)”, “Luoshu Square”, “Hetu”.',
  'G. W. Leibniz — “Explication de l’arithmétique binaire” (1703).',
];

// Nguồn học thuật tiếng Anh (bản EN cite thêm để người đọc quốc tế tra được).
const SOURCES_EN = [
  'James Legge — “The Yî King” (Sacred Books of the East, vol. 16, 1882/1899; public domain).',
  'Richard Wilhelm & Cary F. Baynes — “The I Ching, or Book of Changes” (the canonical English names).',
  'Richard J. Lynn — “The Classic of Changes: A New Translation… as Interpreted by Wang Bi” (1994).',
  'Richard Rutt — “The Book of Changes (Zhouyi): A Bronze Age Document” (1996).',
  'Joseph Needham — “Science and Civilisation in China” (the term “Five Phases”).',
  'Shao Yong — “Supreme Principles Governing the World”; the Earlier-Heaven diagrams (Square-and-Round).',
  'Commentary on the Trigrams (Shuogua, one of the Ten Wings) — Earlier-Heaven directions & forward/counter flow.',
  'G. W. Leibniz — “Explication de l’arithmétique binaire” (1703).',
];

export default function Method() {
  const en = useLang() === 'en';
  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'About the project' : 'Về dự án'}
        title={en ? 'Method & Sources' : 'Phương pháp & Nguồn'}
        symbol="✦"
      >
        {en ? (
          <>
            <b className="text-ink">Dịch Số</b> approaches the I Ching as an{' '}
            <b>image–number system</b>: keeping the spirit of Eastern philosophy but decoding it with
            modern arithmetic and imagery, so the reader grasps the <i>law</i> rather than only the
            phenomenon. The focus is <b>explanation</b>, not divination. On <b>method</b>: the ancients
            ordered it <b className="text-ink">Principle → Image → Number</b> (Number at the tip); this
            site deliberately <i>enters through the tip</i> (Number/binary — what today's reader knows
            best) to <b>lead back to the root (Principle)</b>.
          </>
        ) : (
          <>
            <b className="text-ink">Dịch Số</b> tiếp cận Kinh Dịch như một{' '}
            <b>hệ thống tượng – số</b>: giữ tinh thần triết học phương Đông nhưng giải
            mã bằng số học và hình ảnh hiện đại, để người đọc nắm <i>quy luật</i> chứ
            không chỉ thấy hiện tượng. Trọng tâm là <b>giảng giải</b>, không bói toán.{' '}
            Về <b>phương pháp</b>: cổ nhân xếp <b className="text-ink">Lý → Tượng → Số</b> (Số ở ngọn);
            trang cố ý <i>vào bằng cái ngọn</i> (Số/nhị phân — thứ người hôm nay quen) để{' '}
            <b>dẫn ngược về gốc (Lý)</b>.
          </>
        )}
      </PageHeader>

      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-2 text-xl">{en ? 'When the Changes met binary' : 'Khi Dịch gặp nhị phân'}</h2>
        <p className="text-sm leading-relaxed text-ink-muted">
          {en ? (
            <>
              In 1701 the missionary Joachim Bouvet sent the mathematician{' '}
              <b className="text-ink">Gottfried Leibniz</b> a diagram of the 64 hexagrams arranged in
              Shao Yong's order (Song dynasty). Leibniz — who had just perfected the{' '}
              <b className="text-ink">binary system</b> — was astonished to see: taking a yin line as 0
              and a yang line as 1, the 64 hexagrams match <b>exactly</b> the binary numbers from 0 to
              63. A system thousands of years old and a modern mathematical invention met at the same
              simple idea: everything is built from two states and their combinations.
            </>
          ) : (
            <>
              Năm 1701, giáo sĩ Joachim Bouvet gửi cho nhà toán học{' '}
              <b className="text-ink">Gottfried Leibniz</b> sơ đồ 64 quẻ sắp theo trật
              tự của Thiệu Ung (đời Tống). Leibniz — người vừa hoàn thiện{' '}
              <b className="text-ink">hệ nhị phân</b> — kinh ngạc nhận ra: nếu coi hào
              âm là 0, hào dương là 1 thì 64 quẻ khớp <b>chính xác</b> các số nhị phân
              từ 0 đến 63. Một hệ thống có tuổi đời hàng nghìn năm và một phát minh toán
              học hiện đại gặp nhau ở cùng một ý tưởng giản dị: mọi thứ dựng từ hai
              trạng thái và phép tổ hợp.
            </>
          )}
        </p>
      </Reveal>

      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-3 text-xl">
          {en ? 'The East–West laws — self-checked by calculation' : 'Quy luật Đông–Tây — đã tự kiểm bằng phép tính'}
        </h2>
        <p className="mb-3 text-sm leading-relaxed text-ink-muted">
          {en
            ? 'The direction in which lines are read is the very bridge between Eastern philosophy and Western arithmetic. All four findings below are verifiable by calculation (not a matter of belief):'
            : 'Chính chiều đọc hào là cây cầu giữa triết Đông và số học Tây. Bốn phát hiện sau đều kiểm được bằng phép tính (không phải tin lời):'}
        </p>
        {en ? (
          <ul className="mb-3 space-y-1.5 text-sm text-ink-muted">
            <li>• <b className="text-ink">Reading direction = the Reversed hexagram.</b> Flipping the reading (bottom→top ↔ top→bottom/Leibniz) = exactly the <b>Reversed (綜)</b> operation.</li>
            <li>• <b className="text-ink">Swapping Yin↔Yang = the Opposite hexagram.</b> Bit-complement (63−v) = the <b>Opposite (錯)</b> operation.</li>
            <li>• <b className="text-ink">Earlier Heaven = counting in binary.</b> The <b>Earlier Heaven</b> ordering (Shao Yong) = counting 7→0 when the lines are read top→bottom.</li>
            <li>• <b className="text-ink">King Wen's rule.</b> 64 hexagrams = 32 adjacent pairs: 28 Reversed pairs + 4 Opposite pairs.</li>
          </ul>
        ) : (
          <ul className="mb-3 space-y-1.5 text-sm text-ink-muted">
            <li>• <b className="text-ink">Chiều đọc = quẻ Đảo.</b> Đổi chiều đọc (đáy→trên ↔ trên→đáy/Leibniz) = đúng phép <b>quẻ Đảo (綜)</b>.</li>
            <li>• <b className="text-ink">Hoán Âm↔Dương = quẻ Đối.</b> Bù bit (63−v) = phép <b>quẻ Đối (錯)</b>.</li>
            <li>• <b className="text-ink">Tiên Thiên = đếm nhị phân.</b> Sắp xếp <b>Tiên Thiên</b> (Thiệu Ung) = đếm 7→0 khi đọc hào trên→đáy.</li>
            <li>• <b className="text-ink">Luật Văn Vương.</b> 64 quẻ = 32 cặp liền kề: 28 cặp Đảo + 4 cặp Đối.</li>
          </ul>
        )}
        <NoteCallout
          kind="truyen-thong"
          title={en ? 'Where there is NO law — stated plainly' : 'Chỗ KHÔNG có luật — nói thẳng'}
          source={
            en
              ? 'all 48 bit transformations tried — none fits; Later Heaven ↔ Luoshu is a direction/season placement'
              : 'đã thử toàn bộ 48 phép biến đổi bit — không phép nào khớp; Hậu Thiên ↔ Lạc Thư là sắp đặt phương vị/mùa vụ'
          }
        >
          {en ? (
            <>
              <b className="text-ink">Earlier Heaven → Later Heaven does NOT reduce to any bit operation.</b> The
              search was exhaustive, and the count is small enough to follow:{' '}
              <b className="text-ink">6 ways of permuting the bit positions × 8 ways of flipping Yin/Yang = 48
              transformations</b> — not one of them turns the Earlier Heaven order into the Later Heaven order.
              Later Heaven (King Wen) is tied to Luoshu/Nine-Palace positions — a <b>traditional
              interpretation</b>, not a theorem.
            </>
          ) : (
            <>
              <b className="text-ink">Tiên Thiên → Hậu Thiên KHÔNG quy về một phép toán bit nào.</b> Đã vét cạn,
              và con số đủ nhỏ để bạn theo dõi:{' '}
              <b className="text-ink">6 phép hoán vị vị trí bit × 8 phép lật Âm/Dương = 48 phép biến đổi</b> —
              không phép nào biến trật tự Tiên Thiên thành trật tự Hậu Thiên. Hậu Thiên (Văn Vương) gắn với vị
              trí Lạc Thư/Cửu Cung — là <b>diễn giải truyền thống</b>, không phải định lý.
            </>
          )}
        </NoteCallout>
      </Reveal>

      <Reveal as="section" className="panel mb-6 p-6">
        <h2 className="mb-1 text-xl">
          {en ? 'Three ancient Changes — why it begins with Qian' : 'Ba bản Dịch cổ — vì sao bắt đầu bằng Càn'}
        </h2>
        <p className="mb-4 text-sm text-ink-muted">
          {en ? (
            <>
              Tradition holds there were three versions of the Changes, each <b>beginning with a different
              hexagram</b> — reflecting the worldview of its era. This is a <b className="text-ink">traditional
              record</b> (mostly lost), given for context, not as a theorem.
            </>
          ) : (
            <>
              Tương truyền có ba bản Dịch, mỗi bản <b>mở đầu bằng một quẻ khác nhau</b> — phản ánh
              thế giới quan từng thời. Đây là ghi chép <b className="text-ink">truyền thống</b> (phần
              lớn đã thất truyền), nêu để hiểu bối cảnh, không phải định lý.
            </>
          )}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {(en
            ? [
                { t: 'Lianshan', h: '連山', dynasty: 'Xia dynasty', start: 'Gen ☶ (Mountain)', note: 'Begins with stillness/stopping.' },
                { t: 'Guizang', h: '歸藏', dynasty: 'Shang dynasty', start: 'Kun ☷ (Earth)', note: 'Begins with storing/receiving.' },
                { t: 'Zhouyi', h: '周易', dynasty: 'Zhou dynasty (King Wen)', start: 'Qian ☰ (Heaven)', note: 'The surviving version — this app follows the Zhouyi.', hot: true },
              ]
            : [
                { t: 'Liên Sơn', h: '連山', dynasty: 'nhà Hạ', start: 'Cấn ☶ (Núi)', note: 'Khởi từ sự tĩnh/dừng.' },
                { t: 'Quy Tàng', h: '歸藏', dynasty: 'nhà Thương', start: 'Khôn ☷ (Đất)', note: 'Khởi từ sự thu tàng/tiếp nhận.' },
                { t: 'Chu Dịch', h: '周易', dynasty: 'nhà Chu (Văn Vương)', start: 'Càn ☰ (Trời)', note: 'Bản còn lại — app này theo Chu Dịch.', hot: true },
              ]
          ).map((c) => (
            <div key={c.t} className={`panel-soft p-4 ${c.hot ? 'border-gold/30 bg-gold/[0.05]' : ''}`}>
              <div className="flex items-baseline gap-2">
                <h3 className={`text-lg ${c.hot ? 'text-gold' : 'text-ink'}`}>{c.t}</h3>
                <span className="han text-sm text-ink-faint">{c.h}</span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">{c.dynasty}</p>
              <p className="mt-2 text-sm text-ink-muted">{en ? 'Opens with:' : 'Mở đầu:'} <b className="text-ink-muted">{c.start}</b></p>
              <p className="mt-1 text-sm text-ink-muted">{c.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-faint">
          {en ? (
            <>
              Don't confuse the <b className="text-ink-muted">three versions</b> (<i>which</i> book: Lianshan /
              Guizang / Zhouyi) with the <b className="text-ink-muted">three authorial layers</b> (<i>who</i>
              built it up: Fu Xi → King Wen·Duke of Zhou → Confucius) — see{' '}
              <Link to="/goc" className="text-gold-soft hover:underline">The Root of the Changes · "a layered book"</Link>.
            </>
          ) : (
            <>
              Đừng lẫn <b className="text-ink-muted">ba bản Dịch</b> (sách <i>nào</i>: Liên Sơn / Quy Tàng / Chu Dịch)
              với <b className="text-ink-muted">ba lớp tác giả</b> (<i>ai</i> bồi đắp: Phục Hy → Văn Vương·Chu Công →
              Khổng Tử) — xem{' '}
              <Link to="/goc" className="text-gold-soft hover:underline">Gốc của Dịch · "sách chồng lớp"</Link>.
            </>
          )}
        </p>
      </Reveal>

      <Reveal as="section" className="panel mb-6 p-6">
        <h2 className="mb-3 text-xl">{en ? 'Conventions & honest notes' : 'Quy ước & ghi chú trung thực'}</h2>
        {en ? (
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>
              • <b className="text-ink">Binary code:</b> yang line = 1, yin line = 0; the app's standard
              convention reads from the <b>bottom up</b> (line 1 = least-significant bit), so Qian =
              111111 = 63, Kun = 0. The <b>Doubling & Bagua</b> page has an interactive demo that flips
              to the Leibniz direction (top→bottom), revealing a subtle point: the reading direction is
              itself a convention.
            </li>
            <li>
              • <b className="text-ink">Verifiable numbers vs. interpretation:</b> the Hetu summing to 55,
              the Luoshu summing to 45 with a magic constant of 15 are <b>mathematical facts</b>. But the
              links "Hetu→Earlier Heaven, Luoshu→Later Heaven" or the assignment of Generation/Overcoming
              cycles are <b>interpretive tradition</b> (the diagrams are clearly documented from the Song
              dynasty; with variants) — given to understand the ancient worldview, not presented as theorems.
            </li>
            <li>
              • <b className="text-ink">Sovereign hexagrams:</b> reckoned by the lunar month; the four
              solstice/equinox anchors are certain, the remaining months are conventional when aligned on
              the solar-term circle.
            </li>
            <li>
              • <b className="text-ink">Modern interpretation</b> is the project's synthesis, <i>not</i> a
              literal translation; classical texts (the Judgment/the Image) are given only where certain, to
              avoid garbled transmission.
            </li>
          </ul>
        ) : (
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>
              • <b className="text-ink">Mã nhị phân:</b> hào dương = 1, hào âm = 0; quy
              ước chuẩn của app đọc từ <b>đáy lên</b> (hào 1 = bit thấp nhất), nên Càn =
              111111 = 63, Khôn = 0. Trang <b>Sinh đôi &amp; Bát Quái</b> có demo lật sang
              chiều Leibniz (trên→đáy) cho thấy điểm tinh tế: bản thân chiều đọc là một quy ước.
            </li>
            <li>
              • <b className="text-ink">Số kiểm được vs. diễn giải:</b> Hà Đồ tổng 55,
              Lạc Thư tổng 45 và ma phương =15 là <b>sự thật toán học</b>. Còn các liên
              hệ “Hà Đồ→Tiên Thiên, Lạc Thư→Hậu Thiên” hay gán vòng Sinh/Khắc là{' '}
              <b>truyền thống diễn giải</b> (sơ đồ ghi chép rõ từ đời Tống; có dị bản) —
              được nêu để hiểu thế giới quan người xưa, không trình bày như định lý.
            </li>
            <li>
              • <b className="text-ink">Tích quái:</b> gốc tính theo tháng âm lịch; bốn
              mốc chí/phân là chắc chắn, các tháng còn lại mang tính quy ước khi gióng
              lên vòng tiết khí.
            </li>
            <li>
              • <b className="text-ink">Diễn giải hiện đại</b> là phần tổng hợp của dự
              án, <i>không</i> phải dịch nguyên văn; văn ngữ cổ (Thoán/Tượng) chỉ ghi
              nơi chắc chắn để tránh tam sao thất bản.
            </li>
          </ul>
        )}
      </Reveal>

      <Reveal as="section" className="panel mb-6 p-6">
        <h2 className="mb-2 text-xl">{en ? 'The content structure of each hexagram' : 'Cấu trúc nội dung mỗi quẻ'}</h2>
        <p className="text-sm text-ink-muted">
          {en ? (
            <>
              All 64 hexagrams have a <b>short interpretation</b> and a <b>deep interpretation</b> (with the
              classical Judgment/Image texts). The <b>deep interpretation</b> has 5 fixed subsections — the
              two-trigram structure, the opposite/reversed/nuclear transformations, the binary position, line
              positions (traditional notes), and a mapping to modern life — shown as a collapsible accordion on
              the <Link to="/64-que" className="text-gold-soft hover:underline">64 Hexagrams</Link> page. The
              calculable parts (opposite/reversed/nuclear, line positions, binary position) are computed
              straight from the hexagram's binary code, never copied by hand; the prose is the project's
              synthesis (readers can cross-check against the sources).
            </>
          ) : (
            <>
              Cả 64 quẻ đều đã có <b>diễn giải ngắn</b> và <b>diễn giải sâu</b> (kèm văn ngữ cổ
              Thoán/Tượng). <b>Diễn giải sâu</b> gồm 5 tiểu mục cố định — cấu trúc 2 quẻ đơn, biến
              hóa đối/đảo/hỗ, vị trí nhị phân, hào vị (ghi chú truyền thống) và ánh xạ đời sống hiện
              đại — trình bày dạng accordion thu/mở ở trang{' '}
              <Link to="/64-que" className="text-gold-soft hover:underline">64 Quẻ</Link>. Phần tính
              được (đối/đảo/hỗ, hào vị, vị trí nhị phân) tính thẳng từ mã nhị phân của quẻ, không chép
              tay; phần văn là tổng hợp của dự án (người đọc có thể tự đối chiếu khi đọc sách).
            </>
          )}
        </p>
      </Reveal>

      <Reveal as="section" className="mb-6 grid gap-4 md:grid-cols-2">
        {(en
          ? [
              { t: 'Yin/Yang = bit', d: 'A line is the smallest unit, only 0/1.', to: '/goc' },
              { t: 'Hetu & Luoshu', d: 'Two number-root matrices: pairs 5 apart (sum 55) and a magic square =15 (sum 45).', to: '/ha-do-lac-thu' },
              { t: 'Doubling 2ⁿ', d: 'Taiji → 2 → 4 → 8 → 64; each level adds one bit.', to: '/bat-quai' },
              { t: 'Deriving the trigrams', d: 'Luoshu lays out directly into Later Heaven; Hetu answers to Earlier Heaven (bit-complement symmetry).', to: '/ha-do-lac-thu' },
              { t: '12 sovereign hexagrams ↔ the year', d: 'Yang energy swells then fades — the binary rhythm of the four seasons.', to: '/vu-tru-mua' },
              { t: 'Relations & the matrix', d: 'Opposite/reversed/nuclear; the 8×8 matrix is the binary ladder 0–63.', to: '/64-que' },
            ]
          : [
              { t: 'Âm/Dương = bit', d: 'Hào là đơn vị nhỏ nhất, chỉ có 0/1.', to: '/goc' },
              { t: 'Hà Đồ & Lạc Thư', d: 'Hai ma trận số gốc: cặp lệch-5 (tổng 55) và ma phương =15 (tổng 45).', to: '/ha-do-lac-thu' },
              { t: 'Sinh đôi 2ⁿ', d: 'Thái Cực → 2 → 4 → 8 → 64; mỗi tầng thêm một bit.', to: '/bat-quai' },
              { t: 'Dẫn xuất Bát Quái', d: 'Lạc Thư đặt thẳng ra Hậu Thiên; Hà Đồ ứng Tiên Thiên (đối xứng bù-bit).', to: '/ha-do-lac-thu' },
              { t: '12 Tích quái ↔ năm', d: 'Dương khí lớn dần rồi tàn — nhịp nhị phân của bốn mùa.', to: '/vu-tru-mua' },
              { t: 'Quan hệ & ma trận', d: 'Đối/đảo/hỗ; ma trận 8×8 chính là thang nhị phân 0–63.', to: '/64-que' },
            ]
        ).map((c) => (
          <Link key={c.t} to={c.to} className="panel-soft p-5 transition hover:border-gold/30">
            <h3 className="text-lg text-gold-soft">{c.t}</h3>
            <p className="mt-1 text-sm text-ink-muted">{c.d}</p>
          </Link>
        ))}
      </Reveal>

      <Reveal as="section" className="panel-soft p-6">
        <h2 className="mb-3 text-xl">{en ? 'References' : 'Nguồn tham khảo'}</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-muted">
          {(en ? SOURCES_EN : SOURCES).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Reveal>
    </Measure>
  );
}
