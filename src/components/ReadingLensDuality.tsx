import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Gua from './Gua';
import TermLabel from './TermLabel';
import NoteCallout from './NoteCallout';
import { hexagramByFuxi } from '@/data/hexagrams';
import { displayValue, displayString, reverseBits } from '@/lib/binary';
import { useLang, useT } from '@/i18n';

/**
 * Khung trình diễn "hai chiều đọc".
 * Cùng MỘT quẻ, đọc đáy→trên vs trên→đáy (Leibniz) ra hai con số; số trên→đáy chính
 * là số của quẻ ĐẢO (綜). Cột khớp công tắc chiều đọc được làm nổi.
 *
 * Từ "ống kính" để dành riêng cho Lý·Tượng·Số·Từ (trang Gốc của Dịch, neo nguồn Trình Tử)
 * — ở đây chỉ là CHIỀU ĐỌC. Công tắc là CỤC BỘ cho demo này, không phải setting toàn cục.
 */
export default function ReadingLensDuality() {
  const [value, setValue] = useState(1); // Phục (1 hào dương ở đáy) — ví dụ trực quan
  const [topFirst, setTopFirst] = useState(false); // chiều đọc CỤC BỘ cho demo này
  const reduce = useReducedMotion();
  const en = useLang() === 'en';
  const t = useT();

  const hex = hexagramByFuxi(value);
  const reversedValue = reverseBits(value, 6); // = displayValue(value, true)
  const reversedHex = hexagramByFuxi(reversedValue);
  const selfReversed = reversedValue === value;

  const Num = ({ n }: { n: number }) =>
    reduce ? (
      <span className="font-mono text-3xl text-gold">{n}</span>
    ) : (
      <motion.span
        key={n}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="font-mono text-3xl text-gold"
      >
        {n}
      </motion.span>
    );

  const cardCls = (active: boolean) =>
    `flex-1 rounded-xl border p-4 transition ${
      active ? 'border-gold/50 bg-gold/[0.06]' : 'border-white/10 bg-white/[0.02]'
    }`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[auto_1fr]">
      {/* quẻ mẫu */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-cosmos-700/40 p-5">
          {/* Thấu kính lưỡng nghi: ép Âm/Dương để không lẫn với bảng màu Ngũ hành. */}
          <Gua lines={hex.lines} width={110} lineHeight={13} glow colorMode="duality" />
        </div>
        <TermLabel
          modern={hex.nameModern}
          hanViet={hex.nameHanViet}
          modernEn={hex.nameModernEn}
          pinyin={hex.pinyin}
          hanzi={hex.hanzi}
        />
        <button
          className="switch-btn !py-1 text-xs"
          onClick={() => setValue(Math.floor(Math.random() * 64))}
        >
          {en ? '🔀 Try another hexagram' : '🔀 Đổi quẻ khác'}
        </button>
      </div>

      {/* hai cách đọc */}
      <div className="space-y-4">
        {/* Chiều đọc CỤC BỘ: chọn chiều đang "bật" cho demo này */}
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={t('settings.reading.title')}>
          <span className="mr-1 text-xs text-ink-faint">{t('settings.reading')}</span>
          <button
            className="switch-btn !py-1 text-xs"
            data-active={!topFirst}
            onClick={() => setTopFirst(false)}
          >
            {t('settings.reading.bottom')}
          </button>
          <button
            className="switch-btn !py-1 text-xs"
            data-active={topFirst}
            onClick={() => setTopFirst(true)}
          >
            {t('settings.reading.leibniz')}
          </button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className={cardCls(!topFirst)}>
            <div className="mb-1 text-xs text-ink-faint">
              {en ? 'Reading bottom→top' : 'Đọc đáy→trên'}{' '}
              {!topFirst && <span className="text-gold-soft">{en ? '· active' : '· đang bật'}</span>}
            </div>
            <Num n={displayValue(value, false)} />
            <div className="mt-1 font-mono text-sm text-ink-muted">{displayString(value, false)}</div>
          </div>
          <div className="flex items-center justify-center text-ink-faint">↔</div>
          <div className={cardCls(topFirst)}>
            <div className="mb-1 text-xs text-ink-faint">
              {en ? 'Reading top→bottom · Leibniz' : 'Đọc trên→đáy · Leibniz'}{' '}
              {topFirst && <span className="text-jade-soft">{en ? '· active' : '· đang bật'}</span>}
            </div>
            <Num n={displayValue(value, true)} />
            <div className="mt-1 font-mono text-sm text-ink-muted">{displayString(value, true)}</div>
          </div>
        </div>

        {/* nối với quẻ Đảo */}
        {selfReversed ? (
          <p className="text-sm text-ink-muted">
            {en ? (
              <>
                This hexagram is <b className="text-ink">mirror-symmetric</b> (a bit-palindrome) —
                read forward or backward, it gives the <b>same number</b>. Only{' '}
                <b className="text-ink">8 hexagrams are self-reversed</b> like this.
              </>
            ) : (
              <>
                Quẻ này <b className="text-ink">đối xứng gương</b> (palindrome bit) — đọc xuôi hay ngược
                đều ra <b>cùng số</b>. Chỉ có <b className="text-ink">8 quẻ tự-Đảo</b> như vậy.
              </>
            )}
          </p>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <Gua lines={reversedHex.lines} width={40} lineHeight={5} gap={3} colorMode="duality" />
            <p className="text-sm text-ink-muted">
              {en ? (
                <>
                  The number read <b className="text-ink">top→bottom</b> ({displayValue(value, true)}) is
                  exactly the number of the <b className="text-ink">reversed hexagram (綜)</b> —{' '}
                  {reversedHex.nameModernEn}{' '}
                  <span className="text-ink-faint">({reversedHex.pinyin})</span>. Flipping the reading
                  direction East↔West is precisely the operation of inverting the hexagram.
                </>
              ) : (
                <>
                  Số khi đọc <b className="text-ink">trên→đáy</b> ({displayValue(value, true)}) chính là số
                  của <b className="text-ink">quẻ Đảo (綜)</b> — {reversedHex.nameModern}{' '}
                  <span className="text-ink-faint">({reversedHex.nameHanViet})</span>. Đổi chiều đọc Đông↔Tây
                  = đúng phép lật ngược quẻ.
                </>
              )}
            </p>
          </div>
        )}

        <NoteCallout
          kind="kiem-duoc"
          title={en ? 'Why this is the East–West bridge' : 'Vì sao đây là cây cầu Đông–Tây'}
          source={
            en
              ? 'read the same hexagram both ways and compare the two numbers — that is the whole proof'
              : 'đọc cùng một quẻ theo hai chiều rồi so hai con số — chứng minh chỉ có vậy'
          }
        >
          {en ? (
            <>
              The <b className="text-ink">Earlier Heaven</b> (Fu Xi / Shao Yong) ordering of the 8
              trigrams is exactly <b>counting in binary 7→0 when the lines are read top→bottom</b> —
              this very Leibniz reading. Every number here is calculable, not a matter of belief:
              reversing the reading = the reversed-hexagram operation, complementing Yin–Yang = the
              opposite-hexagram operation. <b className="text-ink">Same hexagram, only numbered
              differently.</b>
            </>
          ) : (
            <>
              Sắp xếp <b className="text-ink">Tiên Thiên</b> (Phục Hy/Thiệu Ung) của 8 quẻ chính là{' '}
              <b>đếm nhị phân 7→0 khi đọc hào trên→đáy</b> — đúng cái chiều đọc Leibniz này. Mọi con số ở đây
              đều tính được, không phải tin lời: đổi chiều đọc = phép quẻ Đảo, bù Âm–Dương = phép quẻ Đối.{' '}
              <b className="text-ink">Cùng một quẻ, chỉ khác cách đánh số.</b>
            </>
          )}
        </NoteCallout>
      </div>
    </div>
  );
}
