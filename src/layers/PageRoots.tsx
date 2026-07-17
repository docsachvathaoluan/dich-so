import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure } from '@/components/Layout';
import HetuDiagram from '@/components/HetuDiagram';
import LuoshuSquare from '@/components/LuoshuSquare';
import NguHanhCycle from '@/components/NguHanhCycle';
import BaguaWheel from '@/components/BaguaWheel';
import LuoshuToHouTian from '@/components/LuoshuToHouTian';
import NoteCallout from '@/components/NoteCallout';
import Gua from '@/components/Gua';
import TermLabel from '@/components/TermLabel';
import { HETU_HEAVEN, HETU_EARTH } from '@/data/cosmograms';
import { hexagramByKingWen } from '@/data/hexagrams';
import { useLang } from '@/i18n';

// Ba quẻ minh hoạ "giao": Thái (11) · Bĩ (12) · Ký Tế (63).
const GIAO = [
  {
    hex: hexagramByKingWen(11),
    gloss: 'Đất trên / Trời dưới → hai khí đi về phía nhau → GIAO → hanh thông.',
    glossEn: 'Earth above / Heaven below → the two energies move toward each other → they MEET → free flow.',
  },
  {
    hex: hexagramByKingWen(12),
    gloss: 'Trời trên / Đất dưới → mỗi bên một ngả → KHÔNG giao → bế tắc.',
    glossEn: 'Heaven above / Earth below → each goes its own way → they do NOT meet → standstill.',
  },
  {
    hex: hexagramByKingWen(63),
    gloss: 'Nước trên / Lửa dưới → các vạch so le hoàn hảo Dương–Âm → việc ĐÃ xong.',
    glossEn: 'Water above / Fire below → lines perfectly alternating Yang–Yin → the task is ALREADY done.',
  },
];

export default function PageRoots() {
  const en = useLang() === 'en';
  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'Page 2 · Number-roots → arrangement' : 'Trang 2 · Gốc số → sắp xếp'}
        title={en ? 'Hetu · Luoshu → the Eight Trigrams' : 'Hà Đồ · Lạc Thư → Bát Quái'}
        symbol="𝍢"
      >
        {en ? (
          <>
            The trigrams tell us the <i>structure</i> (3 bits); the{' '}
            <b className="text-gold-soft">Yellow River Map (Hetu)</b> &{' '}
            <b className="text-gold-soft">Luo River Writing (Luoshu)</b> — two number matrices
            "received from heaven" — tell us <i>how to arrange</i> them into two trigram circles and
            how the Five Phases arise. This is a second kind of "root," complementing the binary root
            of the previous page.
          </>
        ) : (
          <>
            Quẻ đơn cho ta biết <i>cấu tạo</i> (3 bit); còn <b className="text-gold-soft">Hà Đồ</b> &{' '}
            <b className="text-gold-soft">Lạc Thư</b> — hai ma trận số "nhận từ trời" — cho ta{' '}
            <i>cách sắp xếp</i> chúng thành hai vòng Bát Quái và sinh ra Ngũ Hành. Đây là loại
            "gốc" thứ hai, bổ sung cho gốc nhị phân ở trang trước.
          </>
        )}
      </PageHeader>

      {/* Hà Đồ & Lạc Thư */}
      <Reveal className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-6">
          <div className="mb-1 flex items-baseline gap-2">
            <h2 className="text-xl">{en ? 'Hetu' : 'Hà Đồ'} <span className="han text-ink-faint">河圖</span></h2>
            <span className="chip">{en ? 'substance · generation' : 'thể · sinh hóa'}</span>
          </div>
          <p className="mb-4 text-sm text-ink-muted">
            {en ? (
              <>
                Appeared on the back of the <b>Dragon-Horse</b> in the Yellow River. Ten numbers form 5
                pairs each <b className="text-ink">exactly 5 apart</b> (1–6, 2–7, 3–8, 4–9, 5–10); odd
                (Heaven) inside, even (Earth) outside.
              </>
            ) : (
              <>
                Hiện trên lưng <b>Long Mã</b> ở Hoàng Hà. Mười số xếp 5 cặp <b className="text-ink">lệch
                đúng 5</b> (1–6, 2–7, 3–8, 4–9, 5–10); lẻ (Trời) trong, chẵn (Đất) ngoài.
              </>
            )}
          </p>
          <HetuDiagram />
        </section>
        <section className="panel p-6">
          <div className="mb-1 flex items-baseline gap-2">
            <h2 className="text-xl">{en ? 'Luoshu' : 'Lạc Thư'} <span className="han text-ink-faint">洛書</span></h2>
            <span className="chip">{en ? 'function · operation' : 'dụng · vận hành'}</span>
          </div>
          <p className="mb-4 text-sm text-ink-muted">
            {en ? (
              <>
                Appeared on the shell of the <b>Divine Turtle</b> in the Luo River. Nine numbers form a{' '}
                <b className="text-ink">3×3 magic square</b> — every row/column/diagonal = 15. This is
                the <b>Nine Palaces</b> — the frame of Later Heaven.
              </>
            ) : (
              <>
                Hiện trên mai <b>Thần Quy</b> ở sông Lạc. Chín số xếp <b className="text-ink">ma
                phương 3×3</b> — mọi hàng/cột/chéo = 15. Đây là <b>Cửu Cung</b> — khung Hậu Thiên.
              </>
            )}
          </p>
          <LuoshuSquare />
        </section>
      </Reveal>

      {/* Ngũ Hành */}
      <Reveal as="section" className="panel mt-6 p-6">
        <h2 className="mb-1 text-xl">
          {en ? 'Two numbers give birth to the Five Phases' : 'Hai con số sinh ra Ngũ Hành'}
        </h2>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              Each direction answers to one Phase; going around the circle, the Phases follow one another
              by <b className="text-jade-soft">Generation</b>. The Luoshu is tied to{' '}
              <b className="text-cinnabar">Overcoming</b> — <i>by traditional interpretation</i>.
            </>
          ) : (
            <>
              Mỗi hướng ứng một Hành; đi vòng quanh, các Hành nối nhau theo <b className="text-jade-soft">Tương
              Sinh</b>. Lạc Thư gắn với <b className="text-cinnabar">Tương Khắc</b> — <i>theo lối diễn giải truyền thống</i>.
            </>
          )}
        </p>
        <div className="grid items-center gap-6 md:grid-cols-2">
          <NguHanhCycle />
          <div className="space-y-3 text-sm text-ink-muted">
            {en ? (
              <>
                <div className="panel-soft p-4"><b className="text-jade-soft">Generation</b> — the nourishing cycle: Wood→Fire→Earth→Metal→Water→Wood.</div>
                <div className="panel-soft p-4"><b className="text-cinnabar">Overcoming</b> — the restraining cycle: Wood→Earth→Water→Fire→Metal→Wood.</div>
              </>
            ) : (
              <>
                <div className="panel-soft p-4"><b className="text-jade-soft">Tương Sinh</b> — vòng nuôi dưỡng: Mộc→Hỏa→Thổ→Kim→Thủy→Mộc.</div>
                <div className="panel-soft p-4"><b className="text-cinnabar">Tương Khắc</b> — vòng chế ước: Mộc→Thổ→Thủy→Hỏa→Kim→Mộc.</div>
              </>
            )}
          </div>
        </div>
      </Reveal>

      {/* Tiên / Hậu Thiên */}
      <Reveal>
        <h2 id="tien-hau-thien" className="mb-3 mt-10 text-2xl font-serif">
          {en ? 'The two trigram circles' : 'Hai vòng Bát Quái'}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="panel p-6">
          <div className="mb-1 flex items-baseline gap-2">
            <h3 className="text-xl">{en ? 'Earlier Heaven' : 'Tiên Thiên'}</h3>
            <span className="chip">{en ? 'symmetry · substance' : 'đối xứng · thể'}</span>
          </div>
          <p className="mb-3 text-sm text-ink-muted">
            {en ? (
              <>
                The two trigrams at either end of a diameter always <b className="text-gold">complement
                bit for bit</b> (sum = 7): Heaven↔Earth, Fire↔Water, Thunder↔Wind, Lake↔Mountain.
              </>
            ) : (
              <>
                Hai quẻ hai đầu đường kính luôn <b className="text-gold">bù bit</b> (cộng = 7):
                Trời↔Đất, Lửa↔Nước, Sấm↔Gió, Đầm↔Núi.
              </>
            )}
          </p>
          <BaguaWheel arrangement="earlier" showComplements />
        </section>
        <section className="panel p-6">
          <div className="mb-1 flex items-baseline gap-2">
            <h3 className="text-xl">{en ? 'Later Heaven' : 'Hậu Thiên'}</h3>
            <span className="chip">{en ? 'season/direction · function' : 'mùa/hướng · dụng'}</span>
          </div>
          <p className="mb-3 text-sm text-ink-muted">
            {en ? (
              <>
                Laid out by the yearly cycle: Thunder-East-Spring, Fire-South-Summer,
                Lake/Heaven-West-Autumn, Water-North-Winter. A map of "the world we live in."
              </>
            ) : (
              <>
                Bố trí theo chu kỳ năm: Sấm-Đông-Xuân, Lửa-Nam-Hạ, Đoài/Càn-Tây-Thu,
                Nước-Bắc-Đông. Bản đồ "thế giới đang sống".
              </>
            )}
          </p>
          <BaguaWheel arrangement="later" />
        </section>
        </div>
      </Reveal>

      {/* Dẫn xuất */}
      <Reveal as="section" className="panel mt-6 p-6 md:p-8">
        <h3 className="mb-1 text-xl">{en ? 'Derivation: Luoshu → Later Heaven' : 'Dẫn xuất: Lạc Thư → Hậu Thiên'}</h3>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              A <b className="text-ink">clean & direct</b> link: place each magic-square number into its
              own palace and out comes the Later Heaven Bagua (the Nine Palaces). Tap to watch the numbers
              "fly" into place.
            </>
          ) : (
            <>
              Liên hệ <b className="text-ink">sạch & trực tiếp</b>: đặt mỗi số ma phương vào đúng
              cung của nó là ra ngay Hậu Thiên Bát Quái (Cửu Cung). Bấm để xem các số "bay" vào.
            </>
          )}
        </p>
        <LuoshuToHouTian />
        <p className="mt-4 text-sm text-ink-muted">
          {en ? (
            <>
              By contrast, <b>Hetu → Earlier Heaven</b> is a <b>conceptual</b> link (no 1:1 mapping of
              numbers): the symmetry and generative pairing of the Hetu mirror the bit-complement
              symmetry of the Earlier Heaven order.
            </>
          ) : (
            <>
              Còn <b>Hà Đồ → Tiên Thiên</b> là liên hệ <b>khái niệm</b> (không thả số 1:1): tính
              đối xứng & cặp sinh hóa của Hà Đồ phản chiếu trật tự đối xứng bù-bit của Tiên Thiên.
            </>
          )}
        </p>
      </Reveal>

      {/* Vì sao Hậu Thiên xếp như vậy — mức độ "giao" */}
      <Reveal as="section" className="panel mt-6 p-6 md:p-8">
        <h3 className="mb-1 text-xl">
          {en ? 'Why Later Heaven is arranged so — by degree of "meeting"' : 'Vì sao Hậu Thiên xếp như vậy — theo mức độ "giao"'}
        </h3>
        <p className="mb-4 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              <b className="text-ink">"Meeting"</b> = Yin and Yang encountering and blending. The Later
              Heaven circle can be read by each trigram's <i>degree of meeting</i>: the more complete the
              meeting, the more central the seat.
            </>
          ) : (
            <>
              <b className="text-ink">"Giao"</b> = Âm Dương gặp nhau, hoà vào nhau. Vòng Hậu Thiên có thể đọc
              theo <i>mức độ giao</i> của từng quẻ: càng giao trọn càng được ngôi chính.
            </>
          )}
        </p>
        <NoteCallout
          kind="truyen-thong"
          title={en ? 'Four degrees of meeting → four kinds of seat' : 'Bốn mức giao → bốn loại ngôi'}
          source={en ? 'Commentary on the Trigrams (Shuogua) · Song-Confucian reading (variant traditions)' : 'Thuyết Quái truyện · diễn giải Tống Nho (có dị bản)'}
        >
          {en ? (
            <ul className="space-y-1">
              <li>• <b className="text-ink">Kan ↔ Li</b> have <b>fully met</b> → the main North–South axis (Zi–Wu).</li>
              <li>• <b className="text-ink">Zhen ↔ Dui</b> are <b>just beginning</b> to meet → the horizontal East–West axis ("dawn–dusk").</li>
              <li>• <b className="text-ink">Xun ↔ Gen</b> have <b>not yet</b> met, Yin and Yang still mixed → slightly off the corners, still in the "usable" zone.</li>
              <li>• <b className="text-ink">Qian ↔ Kun</b> are pure Yang / pure Yin (extremes) → withdrawn to the <b>"unusable"</b> corners.</li>
            </ul>
          ) : (
            <ul className="space-y-1">
              <li>• <b className="text-ink">Khảm ↔ Ly</b> đã <b>giao trọn vẹn</b> → trục chính Bắc–Nam (Tý–Ngọ).</li>
              <li>• <b className="text-ink">Chấn ↔ Đoài</b> <b>mới chớm</b> giao → trục ngang Đông–Tây ("sớm–tối").</li>
              <li>• <b className="text-ink">Tốn ↔ Cấn</b> <b>chưa</b> giao, Âm Dương còn lẫn → góc hơi lệch, vẫn trong chỗ "dùng".</li>
              <li>• <b className="text-ink">Càn ↔ Khôn</b> thuần Dương / thuần Âm (cực đoan) → lui ra góc <b>"bất dụng"</b>.</li>
            </ul>
          )}
          {en ? (
            <>This is an <b>interpretive reading</b> to understand the ancient worldview, not a theorem derived by calculation.</>
          ) : (
            <>Đây là <b>lối diễn giải</b> để hiểu thế giới quan người xưa, không phải định lý suy ra từ phép tính.</>
          )}
        </NoteCallout>

        <h4 className="mb-3 mt-6 text-base text-ink">
          {en ? '"Meeting" is clearest through three hexagrams' : '"Giao" nhìn rõ nhất qua ba quẻ'}
        </h4>
        <div className="grid gap-4 sm:grid-cols-3">
          {GIAO.map(({ hex, gloss, glossEn }) => (
            <div key={hex.kingWen} className="panel-soft flex flex-col items-center gap-3 p-4 text-center">
              <Gua lines={hex.lines} width={72} lineHeight={7} gap={5} />
              <TermLabel modern={hex.nameModern} hanViet={hex.nameHanViet} modernEn={hex.nameModernEn} pinyin={hex.pinyin} hanzi={hex.hanzi} />
              <p className="text-xs text-ink-muted">{en ? glossEn : gloss}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Thiên - Địa - Nhân (Tiểu vũ trụ) */}
      <Reveal>
        <h2 id="thien-dia-nhan" className="mb-3 mt-10 text-2xl font-serif">
          {en ? 'From the Hetu to the human: Heaven · Earth · Human' : 'Từ Hà Đồ đến con người: Thiên · Địa · Nhân'}
        </h2>
        <section className="panel p-6 md:p-8">
        <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
          {en ? (
            <>
              The number <b className="text-ink">5</b> always sits at the <b>center</b> of both diagrams —
              the axle joining Heaven (odd numbers) and Earth (even numbers). That is the human's place:
              the same law that runs the <b>Macrocosm</b> also flows through the <b>Microcosm</b> — the
              body, the emotions, a human life.
            </>
          ) : (
            <>
              Số <b className="text-ink">5</b> luôn ở <b>tâm</b> cả hai sơ đồ — trục nối Trời (số
              lẻ) và Đất (số chẵn). Đó là chỗ đứng của con người: cùng một quy luật vận hành{' '}
              <b>Đại vũ trụ</b> cũng chảy trong <b>Tiểu vũ trụ</b> — thân thể, cảm xúc, đời người.
            </>
          )}
        </p>
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="text-sm uppercase tracking-widest text-gold/70">{en ? 'Heaven' : 'Thiên'}</div>
            <div className="mt-1 font-serif text-2xl" style={{ color: '#f4ecd8' }}>{en ? 'Sky' : 'Trời'}</div>
            <div className="mt-1 text-xs text-ink-faint">{en ? `odd (Yang) · total ${HETU_HEAVEN}` : `số lẻ (Dương) · tổng ${HETU_HEAVEN}`}</div>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
              <div>
                <div className="font-serif text-2xl text-gold-soft">{en ? 'Human' : 'Nhân'}</div>
                <div className="text-xs text-ink-faint">{en ? 'center · 5' : 'tâm · số 5'}</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm uppercase tracking-widest text-jade/70">{en ? 'Earth' : 'Địa'}</div>
            <div className="mt-1 font-serif text-2xl text-jade-soft">{en ? 'Ground' : 'Đất'}</div>
            <div className="mt-1 text-xs text-ink-faint">{en ? `even (Yin) · total ${HETU_EARTH}` : `số chẵn (Âm) · tổng ${HETU_EARTH}`}</div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3 text-sm text-ink-muted">
          {en ? (
            <>
              <div className="panel-soft p-4"><b className="text-gold-soft">The rise–fall rhythm</b>: know which "month" you are in — neither proud at the peak nor despairing at the trough.</div>
              <div className="panel-soft p-4"><b className="text-gold-soft">The Return hexagram within</b>: after the utmost extreme, a single yang line is always reborn.</div>
              <div className="panel-soft p-4"><b className="text-gold-soft">Yin–Yang balance</b>: bodily-mental health is the harmonizing of motion/stillness, work/rest, giving/receiving.</div>
            </>
          ) : (
            <>
              <div className="panel-soft p-4"><b className="text-gold-soft">Nhịp thịnh–suy</b>: biết mình đang ở "tháng" nào để không kiêu lúc thịnh, không nản lúc suy.</div>
              <div className="panel-soft p-4"><b className="text-gold-soft">Quẻ Phục trong tâm</b>: sau cùng cực luôn có một tia dương hồi sinh.</div>
              <div className="panel-soft p-4"><b className="text-gold-soft">Cân bằng Âm–Dương</b>: sức khỏe thân-tâm là điều hòa động/tĩnh, làm/nghỉ, cho/nhận.</div>
            </>
          )}
        </div>
        </section>
      </Reveal>

      <p className="mt-6 panel-soft p-4 text-xs text-ink-faint">
        {en ? (
          <>
            ⚠️ <b>Honest note:</b> The Hetu/Luoshu are clearly documented from the Song dynasty. The pairing
            "Hetu→Earlier Heaven, Luoshu→Later Heaven" and the assignment of the Generation/Overcoming
            cycles are <b>interpretive tradition</b> (with variant versions), given to understand the
            ancient worldview. The mapping of Luoshu numbers → Later Heaven palaces, however, is consistent
            & verifiable. Sources: see{' '}
            <Link to="/phuong-phap" className="text-gold-soft hover:underline">Method & Sources</Link>.
          </>
        ) : (
          <>
            ⚠️ <b>Ghi chú trung thực:</b> Hà Đồ/Lạc Thư được ghi chép rõ từ đời Tống. Mối "Hà Đồ→Tiên
            Thiên, Lạc Thư→Hậu Thiên" và gán vòng Sinh/Khắc là <b>truyền thống diễn giải</b> (có dị
            bản), nêu để hiểu thế giới quan người xưa. Phần ánh xạ số Lạc Thư → cung Hậu Thiên thì
            nhất quán & kiểm chứng được. Nguồn: xem{' '}
            <Link to="/phuong-phap" className="text-gold-soft hover:underline">Phương pháp & Nguồn</Link>.
          </>
        )}
      </p>
    </Measure>
  );
}
