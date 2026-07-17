import type { Bit } from '@/types';
import type { ColorMode } from '@/store/useSettings';
import { useSettings } from '@/store/useSettings';
import { linesToValue, splitTrigrams } from '@/lib/binary';
import { trigramById } from '@/data/trigrams';
import { ELEMENT_META } from '@/data/cosmograms';

export const YANG = '#e8c373'; // dương = vàng kim
export const YIN = '#5fb89a'; // âm = ngọc lục

/** Màu Ngũ hành của một quẻ đơn (3 bit) — tái dùng ELEMENT_META (khớp chip hành sẵn có). */
function trigramElementColor(trigramLines: Bit[]): string {
  return ELEMENT_META[trigramById(linesToValue(trigramLines)).element].color;
}

/**
 * Màu từng hào (theo index đáy→đỉnh) tuỳ bảng màu.
 *  - `duality` (hoặc số hào ∉ {3,6}): dương = YANG, âm = YIN.
 *  - `wuxing`: ngũ hành là thuộc tính QUẺ ĐƠN → tô theo NỬA (3 hào = 1 hành; 6 hào = nửa
 *    dưới theo quẻ dưới, nửa trên theo quẻ trên). Hình vạch liền/đứt vẫn giữ → âm/dương đọc
 *    bằng SHAPE, màu = hành. Xuất riêng để test không cần render.
 */
export function guaLineColors(lines: Bit[], colorMode: ColorMode = 'duality'): string[] {
  if (colorMode === 'wuxing' && lines.length === 3) {
    const c = trigramElementColor(lines);
    return lines.map(() => c);
  }
  if (colorMode === 'wuxing' && lines.length === 6) {
    const { lower, upper } = splitTrigrams(lines);
    const lc = trigramElementColor(lower);
    const uc = trigramElementColor(upper);
    return lines.map((_, i) => (i < 3 ? lc : uc));
  }
  return lines.map((b) => (b === 1 ? YANG : YIN));
}

interface GuaProps {
  /** Hào từ ĐÁY → ĐỈNH (index 0 = đáy). */
  lines: Bit[];
  width?: number;
  lineHeight?: number;
  gap?: number;
  glow?: boolean;
  /** Bảng màu. Bỏ trống = theo công tắc toàn cục (useSettings.colorMode); truyền để GHI ĐÈ
   *  (vd ép 'duality' cho quẻ cố ý minh hoạ Âm/Dương). 'wuxing' tô Ngũ hành theo nửa quẻ. */
  colorMode?: ColorMode;
  /** Bật tương tác: click vào một hào để đảo (trả về index theo đáy→đỉnh). */
  onToggle?: (index: number) => void;
  /** Tô sáng một số hào (index đáy→đỉnh). */
  highlight?: number[];
  className?: string;
}

/** Vẽ một quẻ (3 hào = quẻ đơn, 6 hào = quẻ kép). Vẽ từ đỉnh xuống đáy. */
export default function Gua({
  lines,
  width = 96,
  lineHeight = 12,
  gap = 7,
  glow = false,
  colorMode,
  onToggle,
  highlight = [],
  className,
}: GuaProps) {
  const n = lines.length;
  const height = n * lineHeight + (n - 1) * gap;
  const yinGap = width * 0.22; // khe giữa của hào âm
  const interactive = !!onToggle;
  // Mặc định LẤY từ công tắc toàn cục; prop `colorMode` (nếu truyền) GHI ĐÈ tại chỗ.
  // Quẻ <3 hào tự rơi về duality trong guaLineColors (ngũ hành gắn từ tầng bát quái).
  const storeColorMode = useSettings((s) => s.colorMode);
  const colors = guaLineColors(lines, colorMode ?? storeColorMode);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="img"
    >
      <defs>
        <filter id="guaGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {lines.map((_, visualRow) => {
        // visualRow 0 = đỉnh → index thực = n-1-visualRow
        const idx = n - 1 - visualRow;
        const bit = lines[idx];
        const y = visualRow * (lineHeight + gap);
        const color = colors[idx];
        const isHi = highlight.includes(idx);
        const filter = glow || isHi ? 'url(#guaGlow)' : undefined;
        const opacity = isHi ? 1 : 0.94;

        return (
          <g
            key={visualRow}
            onClick={interactive ? () => onToggle!(idx) : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            {bit === 1 ? (
              <rect x={0} y={y} width={width} height={lineHeight} rx={lineHeight / 2} fill={color} opacity={opacity} filter={filter} />
            ) : (
              <>
                <rect x={0} y={y} width={width / 2 - yinGap / 2} height={lineHeight} rx={lineHeight / 2} fill={color} opacity={opacity} filter={filter} />
                <rect x={width / 2 + yinGap / 2} y={y} width={width / 2 - yinGap / 2} height={lineHeight} rx={lineHeight / 2} fill={color} opacity={opacity} filter={filter} />
              </>
            )}
            {interactive && (
              <rect x={-4} y={y - gap / 2} width={width + 8} height={lineHeight + gap} fill="transparent" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
