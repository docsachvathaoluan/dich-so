import { HEXAGRAMS, hexagramByFuxi } from '@/data/hexagrams';
import { trigramById } from '@/data/trigrams';
import { ELEMENT_META, NGU_HANH_SINH } from '@/data/cosmograms';
import { useSettings } from '@/store/useSettings';
import { useLang, ELEMENT_EN } from '@/i18n';
import Gua from './Gua';
import type { Hexagram } from '@/types';

interface Props {
  selected: number | null; // kingWen
  onSelect: (kingWen: number) => void;
}

function Cell({
  hex,
  selected,
  onSelect,
}: {
  hex: Hexagram;
  selected: boolean;
  onSelect: (k: number) => void;
}) {
  const colorMode = useSettings((s) => s.colorMode);
  const en = useLang() === 'en';
  const title = en
    ? `${hex.pinyin} (${hex.nameModernEn}) · #${hex.kingWen} · ${hex.fuxiValue}`
    : `${hex.nameHanViet} (${hex.nameModern}) · #${hex.kingWen} · ${hex.fuxiValue}`;
  return (
    <button
      onClick={() => onSelect(hex.kingWen)}
      title={title}
      className="group flex aspect-square w-full flex-col items-center justify-center rounded-md border transition hover:border-gold/40 hover:bg-gold/5"
      style={{
        borderColor: selected ? '#e8c373' : 'rgba(255,255,255,0.08)',
        background: selected ? 'rgba(232,195,115,0.14)' : 'rgba(255,255,255,0.02)',
        boxShadow: selected ? '0 0 16px -3px rgba(232,195,115,0.5)' : undefined,
      }}
    >
      <Gua lines={hex.lines} width={30} lineHeight={3.4} gap={1.8} colorMode={colorMode} />
      <span className="mt-0.5 font-mono text-[8px] text-ink-faint group-hover:text-ink-muted">
        {hex.kingWen}
      </span>
    </button>
  );
}

export default function HexagramMatrix({ selected, onSelect }: Props) {
  const arrangement = useSettings((s) => s.arrangement);
  const setArrangement = useSettings((s) => s.setArrangement);
  const colorMode = useSettings((s) => s.colorMode);
  const en = useLang() === 'en';

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          <button className="switch-btn !py-1" data-active={arrangement === 'fuxi'} onClick={() => setArrangement('fuxi')}>
            {en ? 'Fu Xi matrix (binary)' : 'Ma trận Phục Hy (nhị phân)'}
          </button>
          <button className="switch-btn !py-1" data-active={arrangement === 'kingwen'} onClick={() => setArrangement('kingwen')}>
            {en ? 'King Wen sequence' : 'Thứ tự Văn Vương'}
          </button>
        </div>
      </div>

      {/* Ngũ hành: legend + ghi chú "2 thái cực" — chỉ khi bật bảng màu Ngũ hành */}
      {colorMode === 'wuxing' && (
        <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
            <span className="text-ink-faint">
              {en ? 'Five Phases (colored by trigram half):' : 'Ngũ hành (tô theo nửa quẻ):'}
            </span>
            {NGU_HANH_SINH.map((el) => (
              <span key={el} className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ background: ELEMENT_META[el].color }}
                />
                <span className="text-ink-muted">{en ? ELEMENT_EN[el] : el}</span>
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            {arrangement === 'fuxi' ? (
              en ? (
                <>
                  <b className="text-ink-muted">Fu Xi</b> order: each row shares one upper trigram →{' '}
                  <b className="text-ink-muted">the top half is one color = a horizontal band</b>; the
                  lower half varies by column. A <i>clean</i> numeric order.
                </>
              ) : (
                <>
                  Trật tự <b className="text-ink-muted">Phục Hy</b>: mỗi hàng cùng một quẻ trên →{' '}
                  <b className="text-ink-muted">nửa trên đồng màu = dải ngang</b>; nửa dưới đổi theo cột.
                  Trật tự số học <i>sạch</i>.
                </>
              )
            ) : en ? (
              <>
                <b className="text-ink-muted">King Wen</b> order (arranged by <i>meaning/story</i>) → the
                colors <b className="text-ink-muted">shatter</b>, forming no bands. Switch to{' '}
                <b className="text-ink-muted">Fu Xi</b> to see the "clean numeric order" — the two poles
                of the same 64 hexagrams.
              </>
            ) : (
              <>
                Trật tự <b className="text-ink-muted">Văn Vương</b> (xếp theo <i>nghĩa/người</i>) → màu{' '}
                <b className="text-ink-muted">vỡ vụn</b>, không thành dải. Đổi sang{' '}
                <b className="text-ink-muted">Phục Hy</b> để thấy "trật tự số học sạch" — hai thái cực
                của cùng 64 quẻ.
              </>
            )}
          </p>
        </div>
      )}

      {arrangement === 'fuxi' ? (
        <div className="mx-auto w-full max-w-[600px]">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: 'minmax(1.25rem,auto) repeat(8, minmax(0,1fr))' }}
          >
            {/* hàng nhãn cột (quẻ dưới) */}
            <div />
            {Array.from({ length: 8 }, (_, c) => (
              <div key={`c${c}`} className="flex items-end justify-center pb-0.5 text-sm text-gold-soft/80">
                {trigramById(c).symbol}
              </div>
            ))}
            {/* 8 hàng: nhãn (quẻ trên) + 8 ô */}
            {Array.from({ length: 8 }, (_, rUpper) => (
              <FuxiRow key={rUpper} rUpper={rUpper} selected={selected} onSelect={onSelect} />
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            {en ? (
              <>
                Row = upper trigram, col = lower trigram. Binary value = (row × 8 + col), from 0
                (top-left) to 63 (bottom-right) — the cell position always follows bottom = LSB.
              </>
            ) : (
              <>
                Hàng = quẻ trên, cột = quẻ dưới. Giá trị nhị phân = (hàng × 8 + cột), từ 0
                (góc trên-trái) đến 63 (góc dưới-phải) — vị trí ô luôn theo đáy=LSB.
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-[600px] grid-cols-8 gap-1.5">
          {HEXAGRAMS.map((hex) => (
            <Cell key={hex.kingWen} hex={hex} selected={selected === hex.kingWen} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function FuxiRow({
  rUpper,
  selected,
  onSelect,
}: {
  rUpper: number;
  selected: number | null;
  onSelect: (k: number) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center text-sm text-gold-soft/80">
        {trigramById(rUpper).symbol}
      </div>
      {Array.from({ length: 8 }, (_, cLower) => {
        const hex = hexagramByFuxi(rUpper * 8 + cLower);
        return <Cell key={cLower} hex={hex} selected={selected === hex.kingWen} onSelect={onSelect} />;
      })}
    </>
  );
}
