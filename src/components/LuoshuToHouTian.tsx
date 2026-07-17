import { useState } from 'react';
import { motion } from 'framer-motion';
import { LUOSHU } from '@/data/cosmograms';
import { trigramById } from '@/data/trigrams';
import { directionToXY } from '@/lib/layout';
import { useLang } from '@/i18n';

const SIZE = 380;
const C = SIZE / 2;
const R = SIZE * 0.36;
const GRID_STEP = 78;

export default function LuoshuToHouTian() {
  const [phase, setPhase] = useState<'grid' | 'circle'>('grid');
  const en = useLang() === 'en';

  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-2">
        <button className="switch-btn !py-1" data-active={phase === 'grid'} onClick={() => setPhase('grid')}>
          {en ? '① Luoshu magic square' : '① Ma phương Lạc Thư'}
        </button>
        <span className="text-ink-faint">→</span>
        <button className="switch-btn !py-1" data-active={phase === 'circle'} onClick={() => setPhase('circle')}>
          {en ? '② Later Heaven Bagua' : '② Hậu Thiên Bát Quái'}
        </button>
      </div>

      <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: '100%' }}>
        {/* vòng tròn mờ khi ở phase circle */}
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            style={{ opacity: phase === 'circle' ? 1 : 0, transition: 'opacity .4s' }}
          />
        </svg>

        {LUOSHU.map((n) => {
          const [r, c] = n.gridPos!;
          const gridXY = { x: C + (c - 1) * GRID_STEP, y: C + (r - 1) * GRID_STEP };
          const circleXY =
            n.direction === 'Trung' ? { x: C, y: C } : directionToXY(C, C, R, n.direction);
          const target = phase === 'grid' ? gridXY : circleXY;
          const tri =
            n.laterHeavenTrigram !== undefined ? trigramById(n.laterHeavenTrigram) : null;
          const isCenter = n.direction === 'Trung';

          return (
            <motion.div
              key={n.value}
              className="absolute flex h-16 w-16 flex-col items-center justify-center rounded-full border text-center"
              style={{
                left: 0,
                top: 0,
                marginLeft: -32,
                marginTop: -32,
                borderColor: isCenter ? 'rgba(232,195,115,0.5)' : 'rgba(255,255,255,0.14)',
                background: isCenter ? 'rgba(232,195,115,0.12)' : 'rgba(17,22,42,0.92)',
              }}
              initial={false}
              animate={{ x: target.x, y: target.y }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              {tri && phase === 'circle' ? (
                <>
                  <span className="text-xl leading-none text-gold-soft">{tri.symbol}</span>
                  <span className="text-[11px] leading-tight text-ink">{en ? tri.nameModernEn : tri.nameModern}</span>
                  <span className="font-mono text-[9px] text-ink-faint">{n.value}</span>
                </>
              ) : (
                <>
                  <span className="font-mono text-2xl font-semibold text-gold">{n.value}</span>
                  {tri && <span className="text-[9px] text-ink-faint">{en ? tri.pinyin : tri.nameHanViet}</span>}
                  {isCenter && <span className="text-[9px] text-gold-soft">{en ? 'Human' : 'Nhân'}</span>}
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-2 text-center text-xs text-ink-faint">
        {en
          ? phase === 'grid'
            ? 'The nine numbers in the magic square — 5 at the center (Human).'
            : 'Each palace keeps its place → the Later Heaven Bagua: 1 Kan North, 9 Li South, 3 Zhen East, 7 Dui West…'
          : phase === 'grid'
            ? 'Chín con số trong ma phương — số 5 ở tâm (Nhân).'
            : 'Mỗi cung giữ nguyên vị trí → thành Hậu Thiên Bát Quái: 1 Khảm Bắc, 9 Ly Nam, 3 Chấn Đông, 7 Đoài Tây…'}
      </p>
    </div>
  );
}
