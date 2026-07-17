import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { Measure } from '@/components/Layout';
import WisdomCallout from '@/components/WisdomCallout';
import { useLang } from '@/i18n';

// Worldview Đạo gia — 5 trụ cốt lõi (giảng cô đọng, không sa đà).
const PILLARS = [
  {
    t: 'Đạo',
    tEn: 'The Dao',
    h: '道',
    d: 'Cái gốc chưa phân, vượt ngôn từ, sinh ra và vận hành vạn vật. Tương ứng Thái Cực của Dịch.',
    dEn: 'The undivided root, beyond words, that gives birth to and moves all things. It answers to the Taiji of the Changes.',
  },
  {
    t: 'Vô vi',
    tEn: 'Wu wei',
    h: '無為',
    d: 'Không phải “không làm gì”, mà là hành động THUẬN theo lẽ tự nhiên — không cưỡng cầu.',
    dEn: 'Not "doing nothing," but acting IN ACCORD with the natural way — without forcing.',
  },
  {
    t: 'Phản phục',
    tEn: 'Return',
    h: '反復',
    d: 'Cực thịnh thì quay đầu; vạn vật trở về cội. Cùng nhịp tiêu–tức và quẻ Phục của Dịch.',
    dEn: 'At the peak, things turn back; all things return to the root. The same waxing–waning rhythm and the hexagram Return of the Changes.',
  },
  {
    t: 'Tự nhiên',
    tEn: 'Self-so (ziran)',
    h: '自然',
    d: '“Đạo pháp tự nhiên” — lấy lẽ tự-nó-như-thế làm chuẩn, không áp đặt ý chí lên vạn vật.',
    dEn: '"The Dao follows what is so of itself" — taking things-as-they-are as the standard, imposing no will on the world.',
  },
  {
    t: 'Tề vật',
    tEn: 'Equalizing things',
    h: '齊物',
    d: '(Trang Tử) Vạn vật ngang nhau, đúng–sai chỉ là tương đối tùy góc nhìn. Soi sáng quan hệ đối/đảo của quẻ.',
    dEn: '(Zhuangzi) All things are equal; right and wrong are relative to viewpoint. It lights up the Opposite/Reversed relations of the hexagrams.',
  },
];

export default function PageWisdom() {
  const en = useLang() === 'en';
  return (
    <Measure size="content">
      <PageHeader
        kicker={en ? 'Wisdom · A parallel' : 'Minh triết · Đối chiếu'}
        title={en ? 'Laozi–Zhuangzi & the Changes' : 'Minh triết Lão–Trang & Dịch'}
        symbol="❧"
      >
        {en ? (
          <>
            Alongside the Changes stand two great voices of <b className="text-ink">Daoism</b>:{' '}
            <b className="text-ink">Laozi</b> (the Daodejing) and <b className="text-ink">Zhuangzi</b>{' '}
            (the book that bears his name). They are <b>not of the same root</b> as the Changes, yet
            they <b>resonate deeply</b>: the same worldview of{' '}
            <span className="text-silk-soft">yin–yang · change · return · wu wei</span>. This page lets
            you read the Changes and hear the echo of these two thinkers at once.
          </>
        ) : (
          <>
            Bên cạnh Dịch còn hai tiếng nói lớn của <b className="text-ink">Đạo gia</b>:{' '}
            <b className="text-ink">Lão Tử</b> (Đạo Đức Kinh) và <b className="text-ink">Trang Tử</b>{' '}
            (Nam Hoa Kinh). Họ <b>không cùng một gốc</b> với Dịch, nhưng <b>cộng hưởng rất sâu</b>:
            cùng một thế giới quan <span className="text-silk-soft">âm–dương · biến dịch · phản phục · vô vi</span>.
            Trang này giúp bạn vừa xem Dịch vừa nghe lại tiếng vọng của hai người.
          </>
        )}
      </PageHeader>

      {/* Lão Tử / Trang Tử là ai */}
      <Reveal as="section" className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="panel p-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl text-silk-soft">{en ? 'Laozi' : 'Lão Tử'}</h2>
            <span className="han text-sm text-ink-faint">老子</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {en ? (
              <>
                The traditional author of the <b className="text-ink">Daodejing</b> (道德經) — about 81
                chapters, the root of Daoism. Terse, paradoxical prose: soft water overcomes the hard,
                non-action accomplishes, knowing when to stop keeps one whole.
              </>
            ) : (
              <>
                Tác giả tương truyền của <b className="text-ink">Đạo Đức Kinh</b> (道德經) — khoảng
                81 chương, gốc của Đạo gia. Văn cô đọng, nghịch lý: nước mềm thắng cứng, vô vi mà
                thành, biết dừng để toàn vẹn.
              </>
            )}
          </p>
        </div>
        <div className="panel p-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl text-silk-soft">{en ? 'Zhuangzi' : 'Trang Tử'}</h2>
            <span className="han text-sm text-ink-faint">莊子</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {en ? (
              <>
                Around the 4th century BCE, he inherited and gave soaring imaginative form to Laozi's
                thought in the <b className="text-ink">Zhuangzi</b> (莊子). Famous for the{' '}
                <i>Discussion on Making All Things Equal</i>, the <i>butterfly dream</i>, and{' '}
                <i>Cook Ding carving the ox</i> — all about relativity and following the natural way.
              </>
            ) : (
              <>
                Khoảng thế kỷ 4 TCN, kế thừa và bay bổng hoá tư tưởng Lão Tử trong{' '}
                <b className="text-ink">Nam Hoa Kinh</b> (莊子). Nổi tiếng với{' '}
                <i>Tề Vật Luận</i>, giấc <i>mộng hồ điệp</i>, chuyện <i>Bào Đinh mổ trâu</i> — tất cả
                nói về sự tương đối và thuận theo lẽ tự nhiên.
              </>
            )}
          </p>
        </div>
      </Reveal>

      {/* Bản đồ định vị — trung thực */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-2 text-xl">
          {en ? 'Placing it: where does Daoism sit in Eastern thought?' : 'Định vị: Đạo gia ở đâu trong đông phương học?'}
        </h2>
        <p className="mb-4 max-w-[72ch] text-sm leading-relaxed text-ink-muted">
          {en ? (
            <>
              There is a popular saying that the essence of Eastern thought is captured in
              "Laozi–Zhuangzi–the Changes." That saying is{' '}
              <b className="text-ink">inspiring but not academically neutral</b>. To be honest:
            </>
          ) : (
            <>
              Có một cách nói phổ biến rằng tinh hoa đông phương gói trong “Lão–Trang–Dịch”. Cách
              nói ấy <b className="text-ink">gợi cảm hứng nhưng không trung lập về học thuật</b>.
              Để trung thực:
            </>
          )}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="panel-soft p-4">
            <h3 className="text-base text-silk-soft">{en ? 'Daoism 道家' : 'Đạo gia 道家'}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {en ? 'Laozi · Zhuangzi. Prizes nature, wu wei, return.' : 'Lão Tử · Trang Tử. Trọng tự nhiên, vô vi, phản phục.'}
            </p>
          </div>
          <div className="panel-soft p-4">
            <h3 className="text-base text-gold-soft">{en ? 'Confucianism 儒家' : 'Nho gia 儒家'}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {en ? 'Confucius – Mencius. Prizes ethics, order, self-cultivation.' : 'Khổng – Mạnh. Trọng luân lý, trật tự, tu thân.'}
            </p>
          </div>
          <div className="panel-soft p-4">
            <h3 className="text-base text-jade-soft">{en ? 'Buddhism 佛教' : 'Phật giáo 佛教'}</h3>
            <p className="mt-1 text-sm text-ink-muted">
              {en ? 'Arrived from India. Impermanence, dependent arising, liberation.' : 'Du nhập từ Ấn Độ. Vô thường, duyên khởi, giải thoát.'}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-silk/20 bg-silk/[0.04] p-4 text-sm text-ink-muted">
          {en ? (
            <>
              <b className="text-silk-soft">Honest note.</b>{' '}
              <b className="text-ink">The I Ching is originally a Confucian classic</b> (one of the Five
              Classics). The "Daoist" philosophy of the Changes came through the{' '}
              <b className="text-ink">Ten Wings</b> (ten commentaries) and especially the commentary of{' '}
              <b className="text-ink">Wang Bi</b> (王弼, 3rd century) — that is, the Changes and
              Laozi–Zhuangzi <b>converged later</b>, not from one root. So this page treats
              Laozi–Zhuangzi as a <i>resonant stream</i>, not "a trinity that defines the whole of
              Eastern thought."
            </>
          ) : (
            <>
              <b className="text-silk-soft">Ghi chú trung thực.</b>{' '}
              <b className="text-ink">Kinh Dịch vốn là kinh điển của Nho gia</b> (một trong Ngũ
              Kinh). Phần triết lý “đạo gia hoá” của Dịch đến qua{' '}
              <b className="text-ink">Thập Dực</b> (mười thiên truyện) và đặc biệt là chú giải của{' '}
              <b className="text-ink">Vương Bật</b> (王弼, thế kỷ 3) — tức Dịch và Lão–Trang{' '}
              <b>hợp lưu về sau</b>, không phải cùng một gốc. Bởi vậy trang này xếp Lão–Trang như{' '}
              <i>dòng cộng hưởng</i>, không phải “bộ ba định nghĩa toàn bộ đông phương học”.
            </>
          )}
        </div>
      </Reveal>

      {/* Worldview 5 trụ */}
      <Reveal as="section" className="panel mb-6 p-6 md:p-8">
        <h2 className="mb-1 text-xl">{en ? 'Five pillars of the Daoist worldview' : 'Năm trụ của thế giới quan Đạo gia'}</h2>
        <p className="mb-5 max-w-[72ch] text-sm text-ink-muted">
          {en
            ? 'These are the "lenses" for reading Laozi and Zhuangzi. You will find they fit the patterns of the Changes to a surprising degree.'
            : 'Đây là “bộ kính” để đọc Lão–Trang. Bạn sẽ thấy chúng khớp đến bất ngờ với các khuôn mẫu của Dịch.'}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.t} className="panel-soft p-5">
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg text-silk-soft">{en ? p.tEn : p.t}</h3>
                <span className="han text-sm text-ink-faint">{p.h}</span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{en ? p.dEn : p.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Cộng hưởng với Dịch — tái dùng WisdomCallout theo concept */}
      <Reveal as="section" className="mb-6">
        <h2 className="mb-3 text-xl">{en ? 'Four points of resonance with the Changes' : 'Bốn điểm cộng hưởng với Dịch'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <WisdomCallout concept="dao-thai-cuc" />
          <WisdomCallout concept="sinh-doi" />
          <WisdomCallout concept="phan-phuc" />
          <WisdomCallout concept="te-vat" />
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          {en ? (
            <>
              Tip: "Daoist parallel" cards like these also appear here and there while you browse other
              pages. You can toggle them on/off from the <b className="text-ink-muted">⚙ Display</b> button at the top.
            </>
          ) : (
            <>
              Mẹo: các thẻ “Đối chiếu Đạo gia” như trên cũng xuất hiện rải rác trong lúc bạn xem
              các trang khác. Có thể tắt/bật chúng ở nút <b className="text-ink-muted">⚙ Hiển thị</b> trên đầu trang.
            </>
          )}
        </p>
      </Reveal>

      {/* Nguồn */}
      <Reveal as="section" className="panel-soft p-5 text-sm text-ink-muted">
        <h2 className="mb-2 text-base text-silk-soft">{en ? 'Sources & how to verify' : 'Nguồn & cách kiểm chứng'}</h2>
        {en ? (
          <ul className="space-y-1.5">
            <li>• Chinese originals: ctext.org (Daodejing; Zhuangzi — chiefly the 7 Inner Chapters), Wikisource 道德經 / 莊子.</li>
            <li>• English cross-reference: Legge (1891, public domain); Waley, Watson, D.C. Lau for phrasing. Vietnamese: Nguyễn Hiến Lê, Thu Giang Nguyễn Duy Cần.</li>
            <li>• Each quote cites its chapter (Daodejing) / chapter-title (Zhuangzi); the translations are <i>interpretations, not the original wording</i>, and are not stated as theorems — the Chinese original sits beside each one so you can judge for yourself.</li>
          </ul>
        ) : (
          <ul className="space-y-1.5">
            <li>• Hán nguyên văn: ctext.org (Đạo Đức Kinh; Trang Tử — ưu tiên 7 Nội thiên), Wikisource 道德經 / 莊子.</li>
            <li>• Bản dịch Việt đối chiếu: Nguyễn Hiến Lê (Lão Tử; Trang Tử) làm chính; Thu Giang Nguyễn Duy Cần phụ.</li>
            <li>• Mỗi câu trích ghi rõ chương (ĐĐK) / thiên (Trang Tử); bản dịch Việt là <i>diễn giải, không phải nguyên văn</i>, không nêu như định lý — hán tự nguyên văn luôn nằm cạnh để bạn tự đối chiếu.</li>
          </ul>
        )}
        <p className="mt-3 text-xs text-ink-faint">
          {en ? (
            <>
              See also <Link to="/phuong-phap" className="text-gold-soft hover:underline">Method & Sources</Link>{' '}
              and <Link to="/goc" className="text-gold-soft hover:underline">The Root of the Changes</Link>.
            </>
          ) : (
            <>
              Xem thêm <Link to="/phuong-phap" className="text-gold-soft hover:underline">Phương pháp & Nguồn</Link>{' '}
              và <Link to="/goc" className="text-gold-soft hover:underline">Gốc của Dịch</Link>.
            </>
          )}
        </p>
      </Reveal>
    </Measure>
  );
}
