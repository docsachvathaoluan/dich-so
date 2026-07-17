import { describe, it, expect, afterAll } from 'vitest';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createElement } from 'react';
import App from '@/App';
import { LAYERS } from '@/layers/layerMeta';
import { useSettings } from '@/store/useSettings';

/**
 * Smoke test: render mỗi route bằng SSR để bắt lỗi crash khi render
 * (không có trình duyệt; effect/canvas không chạy trong SSR nhưng nhánh render được phủ).
 */
describe('render mọi lớp không crash', () => {
  const paths = [
    '/',
    ...LAYERS.map((l) => l.path),
    // các path cũ (redirect) vẫn phải render được:
    '/sinh-doi',
    '/tien-hau-thien',
    '/tieu-vu-tru',
    '/lap-que',
    '/khong-ton-tai',
  ];

  for (const path of paths) {
    it(`route ${path}`, () => {
      const html = renderToString(
        createElement(MemoryRouter, { initialEntries: [path] }, createElement(App))
      );
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(0);
    });
  }

  // Chống lỗ hổng: nếu quên nối ROUTES, /xuyen-tang rơi về /goc mà test vòng lặp vẫn xanh.
  // → khẳng định nội dung ĐẶC TRƯNG của PageSpine thật sự render ở đúng route.
  //   (tiêu đề trang giờ song ngữ — chấp nhận cả VN lẫn EN để không phụ thuộc lang mặc định.)
  it('/xuyen-tang render đúng trang PageSpine (không rơi về /goc)', () => {
    const html = renderToString(
      createElement(MemoryRouter, { initialEntries: ['/xuyen-tang'] }, createElement(App))
    );
    const hasVi = html.includes('Toàn cảnh — từ một bit đến quy luật');
    const hasEn = html.includes('The whole picture — from one bit to the underlying law');
    expect(hasVi || hasEn).toBe(true);
  });
});

// Bản tiếng Anh: mọi route vẫn render không crash khi lang='en'.
describe('render mọi lớp ở lang=en không crash', () => {
  afterAll(() => useSettings.setState({ lang: 'vi' }));

  const paths = ['/', ...LAYERS.map((l) => l.path)];
  for (const path of paths) {
    it(`route ${path} (en)`, () => {
      useSettings.setState({ lang: 'en' });
      const html = renderToString(
        createElement(MemoryRouter, { initialEntries: [path] }, createElement(App))
      );
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(0);
    });
  }

  it('/goc ở lang=en render nội dung tiếng Anh', () => {
    useSettings.setState({ lang: 'en' });
    const html = renderToString(
      createElement(MemoryRouter, { initialEntries: ['/goc'] }, createElement(App))
    );
    expect(html).toContain('The Root of the Changes');
  });

  // Đợt 4–5: mọi trang đã dịch — khẳng định TIÊU ĐỀ EN đặc trưng render đúng route ở lang=en.
  it('mọi trang đã dịch hiển thị tiêu đề EN đặc trưng', () => {
    const expectEn: Array<[string, string]> = [
      ['/bat-quai', 'Doubling &amp; the Eight Trigrams'],
      ['/ha-do-lac-thu', 'Hetu · Luoshu → the Eight Trigrams'],
      ['/vu-tru-mua', 'The Cosmos &amp; the Seasons'],
      ['/xuyen-tang', 'The whole picture — from one bit to the underlying law'],
      ['/minh-triet', 'Laozi–Zhuangzi &amp; the Changes'],
      ['/phuong-phap', 'Method &amp; Sources'],
    ];
    for (const [path, needle] of expectEn) {
      useSettings.setState({ lang: 'en' });
      const html = renderToString(
        createElement(MemoryRouter, { initialEntries: [path] }, createElement(App))
      );
      expect(html, `${path} thiếu tiêu đề EN`).toContain(needle);
    }
  });
});
