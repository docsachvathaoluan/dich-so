import type { ReactNode } from 'react';

/**
 * Hệ chiều rộng 2 lớp cho "Dịch Số":
 *  - <Measure>  : cột nội dung được canh giữa, có giới hạn để đọc dễ.
 *      size='prose'   → cột CHỮ thuần (~68 ký tự/dòng) cho diễn giải/văn cổ/ghi chú.
 *      size='content' → cột mặc định cho panel/grid/UI (rộng rãi nhưng vẫn bó).
 *      size='wide'    → cho khối lớn cần nhiều bề ngang mà chưa tới mức tràn viền.
 *  - <Bleed>    : tràn hết bề ngang vùng nội dung (cho visual/sơ đồ/ma trận anh hùng).
 *
 * Quy ước: trong mỗi trang, BỌC nội dung thường bằng <Measure> (mặc định 'content'),
 * và cho section visual lớn ra ngoài <Measure> rồi bọc <Bleed> để nở hết bề ngang.
 */

type MeasureSize = 'prose' | 'content' | 'wide';

const MAX_W: Record<MeasureSize, string> = {
  prose: 'max-w-[68ch]',
  content: 'max-w-[1240px]',
  wide: 'max-w-[1600px]',
};

interface MeasureProps {
  size?: MeasureSize;
  as?: 'div' | 'section' | 'header' | 'article';
  className?: string;
  children: ReactNode;
}

export function Measure({
  size = 'content',
  as: Tag = 'div',
  className = '',
  children,
}: MeasureProps) {
  return (
    <Tag className={`mx-auto w-full ${MAX_W[size]} ${className}`}>{children}</Tag>
  );
}

interface BleedProps {
  as?: 'div' | 'section';
  className?: string;
  children: ReactNode;
}

export function Bleed({ as: Tag = 'div', className = '', children }: BleedProps) {
  return <Tag className={`w-full ${className}`}>{children}</Tag>;
}
