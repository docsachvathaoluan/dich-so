import { useState } from 'react';
import { Link } from 'react-router-dom';
import Gua from './Gua';
import TermLabel from './TermLabel';
import type { Bit } from '@/types';
import {
  linesToValue,
  valueToLines,
  displayString,
  splitTrigrams,
} from '@/lib/binary';
import { hexagramByFuxi } from '@/data/hexagrams';
import { trigramById } from '@/data/trigrams';
import { useLang } from '@/i18n';
import { pickLang } from '@/lib/text';

export default function BitCounter() {
  const [lines, setLines] = useState<Bit[]>([1, 0, 1, 0, 1, 0]);
  const lang = useLang();
  const en = lang === 'en';

  const value = linesToValue(lines); // canonical (đáy=LSB)
  const shown = value;
  const hex = hexagramByFuxi(value);
  const { lower, upper } = splitTrigrams(lines);
  const lowerT = trigramById(linesToValue(lower));
  const upperT = trigramById(linesToValue(upper));

  const toggle = (i: number) =>
    setLines((ls) => ls.map((b, j) => (j === i ? ((b ^ 1) as Bit) : b)));
  const setValue = (v: number) => setLines(valueToLines((v + 64) % 64, 6));

  return (
    <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
      {/* quẻ tương tác */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-cosmos-700/40 p-5">
          <Gua lines={lines} width={120} lineHeight={14} glow onToggle={toggle} />
        </div>
        <p className="text-center text-[11px] text-ink-faint">
          {en ? 'Tap each line to flip it' : 'Bấm vào từng hào để lật'}
          <br />
          {en ? '(line 1 = bottom)' : '(hào 1 = dưới cùng)'}
        </p>
      </div>

      {/* thông tin */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
          <div>
            <div className="text-xs text-ink-faint">
              {en ? `King Wen hexagram #${hex.kingWen}` : `Quẻ Văn Vương #${hex.kingWen}`}
            </div>
            <TermLabel
              modern={hex.nameModern}
              hanViet={hex.nameHanViet}
              modernEn={hex.nameModernEn}
              pinyin={hex.pinyin}
              hanzi={hex.hanzi}
              size="lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <div className="panel-soft px-3 py-2">
            <div className="text-xs text-ink-faint">
              {en ? 'Binary (bottom→top)' : 'Nhị phân (đáy→trên)'}
            </div>
            <div className="font-mono text-lg text-gold">
              {displayString(value, false)}
            </div>
          </div>
          <div className="panel-soft px-3 py-2">
            <div className="text-xs text-ink-faint">{en ? 'Decimal' : 'Thập phân'}</div>
            <div className="font-mono text-lg text-ink">{shown}</div>
          </div>
          <div className="panel-soft px-3 py-2">
            <div className="text-xs text-ink-faint">{en ? 'Structure' : 'Cấu tạo'}</div>
            <div className="text-sm text-ink">
              {en
                ? `${upperT.nameModernEn} / ${lowerT.nameModernEn}`
                : `${upperT.nameModern} / ${lowerT.nameModern}`}
            </div>
          </div>
        </div>

        <p className="text-sm text-ink-muted">{pickLang(lang, hex.en?.modernShort, hex.modernShort)}</p>

        <div className="flex flex-wrap gap-2">
          <button className="switch-btn" onClick={() => setValue(value - 1)}>
            − 1
          </button>
          <button className="switch-btn" onClick={() => setValue(value + 1)}>
            + 1
          </button>
          <button className="switch-btn" onClick={() => setValue(Math.floor(Math.random() * 64))}>
            {en ? 'Random' : 'Ngẫu nhiên'}
          </button>
          <button className="switch-btn" onClick={() => setLines([1, 1, 1, 1, 1, 1])}>
            {en ? 'All Yang (63)' : 'Toàn Dương (63)'}
          </button>
          <button className="switch-btn" onClick={() => setLines([0, 0, 0, 0, 0, 0])}>
            {en ? 'All Yin (0)' : 'Toàn Âm (0)'}
          </button>
          <Link to={`/64-que?q=${hex.kingWen}`} className="switch-btn">
            {en ? 'View detail →' : 'Xem chi tiết →'}
          </Link>
        </div>
      </div>
    </div>
  );
}
