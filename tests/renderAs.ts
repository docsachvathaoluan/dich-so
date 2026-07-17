import { vi } from 'vitest';

/**
 * Render một route ở ngôn ngữ CHỈ ĐỊNH — kết quả giống nhau trên mọi máy.
 *
 * Vì sao phải cầu kỳ thế này (đừng rút gọn thành setState):
 *  1. `lang` được store tự nhận từ `navigator.language` LÚC TẠO store.
 *  2. Dưới `renderToString`, zustand trả snapshot qua `getInitialState()` → gọi
 *     `useSettings.setState({ lang })` SAU đó KHÔNG có tác dụng gì cả.
 *  3. `navigator` chỉ tồn tại từ Node 21.2 trở lên.
 *
 * Cộng lại: nếu để tự nhiên, test đổi kết quả theo MÁY — máy locale Anh (Node mới) thì
 * xanh, máy locale Việt hoặc CI chạy Node 20 thì đỏ. Stub `navigator` rồi nạp lại module
 * là cách duy nhất khiến "render ở tiếng Anh" nghĩa đúng là render ở tiếng Anh.
 */
export async function renderAs(lang: 'vi' | 'en', path: string): Promise<string> {
  vi.resetModules();
  vi.stubGlobal('navigator', { language: lang === 'en' ? 'en-US' : 'vi-VN' });
  // Nạp SAU khi reset để App và store dùng cùng một bản module.
  const { createElement } = await import('react');
  const { renderToString } = await import('react-dom/server');
  const { MemoryRouter } = await import('react-router-dom');
  const { default: App } = await import('@/App');
  return renderToString(
    createElement(MemoryRouter, { initialEntries: [path] }, createElement(App))
  );
}
