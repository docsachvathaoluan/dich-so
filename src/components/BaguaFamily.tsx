import { useState } from 'react';
import Gua, { YANG, YIN } from './Gua';
import TermLabel from './TermLabel';
import { trigramByName, trigramFamilyRole } from '@/data/trigrams';
import { useLang } from '@/i18n';
import type { Trigram } from '@/types';

/**
 * "Gia đình Bát Quái" — cơ chế MƯỢN MỘT VẠCH (interactive nhẹ, dạy được).
 * Cha (Càn, thuần Dương) & Mẹ (Khôn, thuần Âm) sinh sáu con bằng cách "mượn" của
 * nhau một vạch. Vạch lẻ loi (hào thiểu số) = vạch mượn → vị trí cho biết THỨ
 * (trưởng/trung/thiếu), âm/dương cho biết TRAI/GÁI. Vai trò suy từ bit qua
 * `trigramFamilyRole` (cùng nguồn với unit test) — không hardcode.
 */

const CHA = trigramByName('Càn');
const ME = trigramByName('Khôn');
// 3 con trai (1 Dương lẻ) rồi 3 con gái (1 Âm lẻ) — theo thứ tự "gia đình".
const CHILDREN: Trigram[] = ['Chấn', 'Khảm', 'Cấn', 'Tốn', 'Ly', 'Đoài'].map(trigramByName);

const POS_LABEL = ['dưới (hào 1)', 'giữa (hào 2)', 'trên (hào 3)'];
const POS_LABEL_EN = ['bottom (line 1)', 'middle (line 2)', 'top (line 3)'];
// Vai vế con → tên EN (khớp FAMILY_EN nhưng dùng cho câu văn rời).
const RANK_EN: Record<string, string> = { 'Trưởng': 'eldest', 'Trung': 'middle', 'Thiếu': 'youngest' };

function Parent({ t, label }: { t: Trigram; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-cosmos-700/40 p-3">
      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">{label}</span>
      <Gua lines={t.lines} width={60} lineHeight={8} gap={5} />
      <TermLabel modern={t.nameModern} hanViet={t.nameHanViet} modernEn={t.nameModernEn} pinyin={t.pinyin} hanzi={t.hanzi} />
    </div>
  );
}

export default function BaguaFamily() {
  const [selName, setSelName] = useState('Chấn');
  const en = useLang() === 'en';
  const sel = trigramByName(selName);
  const role = trigramFamilyRole(sel.lines);
  const isSon = role.gender === 'nam';
  const borrowColor = isSon ? YANG : YIN;
  const borrowedPos =
    role.borrowedLine != null ? (en ? POS_LABEL_EN : POS_LABEL)[role.borrowedLine] : '';

  return (
    <div className="space-y-5">
      {/* Cha + Mẹ */}
      <div className="flex items-stretch justify-center gap-4">
        <Parent t={CHA} label={en ? 'Father' : 'Cha'} />
        <div className="flex items-center text-2xl text-ink-faint" aria-hidden>＋</div>
        <Parent t={ME} label={en ? 'Mother' : 'Mẹ'} />
      </div>

      {/* Chọn một người con */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <span className="mr-1 text-xs text-ink-faint">
          {en ? 'Pick one of the children:' : 'Chọn một người con:'}
        </span>
        {CHILDREN.map((t) => (
          <button
            key={t.id}
            className="switch-btn !py-1 text-xs"
            data-active={selName === t.nameHanViet}
            onClick={() => setSelName(t.nameHanViet)}
          >
            {en ? t.nameModernEn : t.nameModern} <span className="han text-ink-faint">{t.hanzi}</span>
          </button>
        ))}
      </div>

      {/* Chi tiết: quẻ con với vạch mượn được làm sáng */}
      <div className="grid items-center gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-2">
          <Gua lines={sel.lines} width={104} lineHeight={13} gap={9} highlight={role.borrowedLine != null ? [role.borrowedLine] : []} />
          <TermLabel modern={sel.nameModern} hanViet={sel.nameHanViet} modernEn={sel.nameModernEn} pinyin={sel.pinyin} hanzi={sel.hanzi} size="lg" />
        </div>

        <div className="space-y-2 text-sm text-ink-muted">
          <p>
            {en ? (
              isSon ? (
                <>
                  <b style={{ color: YIN }}>Mother</b> borrows <b style={{ color: borrowColor }}>one Yang line</b> from{' '}
                  <b style={{ color: YANG }}>Father</b>, placing it at the <b className="text-ink">{borrowedPos}</b>.
                </>
              ) : (
                <>
                  <b style={{ color: YANG }}>Father</b> borrows <b style={{ color: borrowColor }}>one Yin line</b> from{' '}
                  <b style={{ color: YIN }}>Mother</b>, placing it at the <b className="text-ink">{borrowedPos}</b>.
                </>
              )
            ) : isSon ? (
              <>
                <b style={{ color: YIN }}>Mẹ</b> mượn <b style={{ color: borrowColor }}>một hào Dương</b> của{' '}
                <b style={{ color: YANG }}>Cha</b>, đặt ở <b className="text-ink">{borrowedPos}</b>.
              </>
            ) : (
              <>
                <b style={{ color: YANG }}>Cha</b> mượn <b style={{ color: borrowColor }}>một hào Âm</b> của{' '}
                <b style={{ color: YIN }}>Mẹ</b>, đặt ở <b className="text-ink">{borrowedPos}</b>.
              </>
            )}
          </p>
          <p>
            {en ? (
              <>
                → the <b className="text-ink">lone line</b> (now glowing) is the "borrowed" one: its position tells the{' '}
                <b className="text-ink">rank</b>, and whether it is yin or yang tells{' '}
                <b className="text-ink">daughter or son</b>.
              </>
            ) : (
              <>
                → <b className="text-ink">vạch lẻ loi</b> (đang phát sáng) là vạch "mượn": vị trí của nó cho biết{' '}
                <b className="text-ink">thứ</b>, còn âm/dương cho biết <b className="text-ink">trai/gái</b>.
              </>
            )}
          </p>
          <p className="rounded-lg bg-white/[0.03] px-3 py-2">
            {en ? (
              <>
                Result: <b style={{ color: borrowColor }}>{sel.familyEn}</b> — the{' '}
                <b>{role.rank ? RANK_EN[role.rank] : ''}</b> {isSon ? 'son' : 'daughter'}.
              </>
            ) : (
              <>
                Kết quả: <b style={{ color: borrowColor }}>{role.role}</b> — con <b>{role.rank?.toLowerCase()}</b>{' '}
                {isSon ? 'trai' : 'gái'}.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
