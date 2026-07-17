import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * "Cuộn hiện nhẹ": fade + trượt lên khi section vào khung nhìn (once).
 *
 * An toàn:
 *  - prefers-reduced-motion → render TĨNH ở opacity:1, không translate (không kẹt ẩn).
 *    `useReducedMotion` của Framer là SSR-safe (đọc matchMedia trong effect).
 *  - whileInView dùng IntersectionObserver (chỉ chạy client) → không crash SSR test.
 */
type RevealTag = 'div' | 'section' | 'article' | 'header';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Độ trễ (giây) để tạo hiệu ứng so le khi nhiều khối. */
  delay?: number;
  /** Quãng trượt theo trục Y (px). */
  y?: number;
  id?: string;
}

export default function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  y = 16,
  id,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as];

  if (reduce) {
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
