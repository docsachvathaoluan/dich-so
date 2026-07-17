import { describe, it, expect, vi } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { LAYERS } from '@/layers/layerMeta';

/**
 * Luật canh "ngôn ngữ publish": chữ trên site là chữ cho NGƯỜI ĐỌC, không phải cho dev.
 *
 * Người đọc không có repo, không chạy được test, không mở được file — nên đường dẫn file,
 * từ ngữ nghề, nhãn viết tắt nội bộ và lời hứa "đang làm dở" đều vô nghĩa với họ. Biên lai
 * của site là PHÉP TÍNH người đọc tự làm được tại chỗ, không phải tên file test.
 *
 * Seam = HTML render ra cho người đọc: điểm cao nhất có thể, không biết bên trong viết thế
 * nào nên không vỡ khi refactor.
 *
 * GIỮ NGUYÊN (không phải rò rỉ): thuật ngữ toán học thật — nhóm Klein, khối 6 chiều, bù
 * bit, LSB — và hán tự nguyên văn. Đó là linh hồn của site, không phải rác.
 */

// ── Mẫu cấm ─────────────────────────────────────────────────────────────────
// Mỗi mẫu kèm CÁCH SỬA, để người vi phạm sau này biết thay bằng gì.
const FORBIDDEN: Array<{ label: string; re: RegExp; fix: string }> = [
  // Tầng 1 · Đường dẫn file
  { label: 'đường dẫn tests/', re: /tests\//, fix: 'thay bằng phép tính người đọc tự làm được' },
  { label: 'đường dẫn docs/', re: /docs\//, fix: 'nêu thẳng nguồn thật (tên tác giả/sách), đừng trỏ file' },
  { label: 'đường dẫn src/lib', re: /src\/lib/, fix: '“tính thẳng từ mã nhị phân của quẻ, không chép tay”' },
  { label: 'tên file test', re: /\.test\.tsx?/, fix: 'thay bằng phép tính tại chỗ' },

  // Tầng 2 · Từ ngữ nghề
  { label: '“unit test”', re: /unit[- ]test/i, fix: '“tính trực tiếp từ 64 mã 0–63”' },
  { label: '“bất biến dữ liệu”', re: /bất biến dữ liệu/i, fix: '“bạn tự đếm được” — KHÔNG đụng “cái bất biến” (nghĩa triết học, phải giữ)' },
  { label: '“data invariant”', re: /data invariant/i, fix: '“you can count them yourself”' },
  { label: '“auto-sinh”', re: /auto-sinh/i, fix: '“tính thẳng từ mã nhị phân của quẻ, không chép tay”' },

  // Tầng 3 · Nhãn nội bộ chưa bao giờ giải nghĩa
  // \b KHÔNG dùng được trước “Đ” (Đ không thuộc \w) → chặn biên bằng lookahead chữ số.
  { label: 'nhãn ĐL1/ĐL2/ĐL3', re: /ĐL[123](?!\d)/, fix: 'đặt tên thật mô tả nội dung, vd “Chiều đọc = quẻ Đảo”' },
  // EN “L1.” — đòi dấu chấm + không phải chữ số phía sau, tránh trùng path SVG (“L1.5”).
  { label: 'nhãn L1/L2/L3 (EN)', re: /\bL[123]\.(?!\d)/, fix: 'đặt tên thật mô tả nội dung' },

  // Tiến độ · lời hứa hết hạn theo thời gian.
  // “đang đối chiếu” thành SAI ngay khi đối chiếu xong mà không ai sửa chuỗi;
  // “là diễn giải, không phải nguyên văn” thì đúng vĩnh viễn.
  { label: '“đang bổ sung”', re: /đang bổ sung/i, fix: 'mô tả BẢN CHẤT nội dung, đừng mô tả tiến độ dự án' },
  { label: '“đang đối chiếu”', re: /đang đối chiếu/i, fix: '“là diễn giải, không phải nguyên văn”' },
  { label: '“being added”', re: /being added/i, fix: 'mô tả BẢN CHẤT nội dung, đừng mô tả tiến độ dự án' },
  { label: '“being cross-checked”', re: /being cross-checked/i, fix: '“a synthesis, not the original wording”' },
];

function assertClean(text: string, where: string) {
  for (const { label, re, fix } of FORBIDDEN) {
    expect(text.match(re), `${where} rò ngôn ngữ dev: ${label} → ${fix}`).toBeNull();
  }
}

/**
 * Render một route ở MỘT ngôn ngữ cụ thể.
 *
 * KHÔNG dùng được `useSettings.setState({ lang })`: dưới `renderToString`, zustand đọc
 * snapshot qua `getServerState || getInitialState` → luôn trả state lúc TẠO store, nên
 * setState không có tác dụng và mọi route sẽ render theo `detectLang()` của máy đang chạy.
 * Thay vào đó: nạp lại module với `navigator.language` giả — đúng đường mà người đọc thật
 * đi vào site lần đầu.
 */
async function renderAs(lang: 'vi' | 'en', path: string): Promise<string> {
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

// 8 trang thật + trang chủ. Thêm /64-que CÓ CHỌN QUẺ: thẻ minh triết nằm trong panel từng
// quẻ, render mặc định có thể không chạm tới.
const ROUTES = [
  '/',
  ...LAYERS.map((l) => l.path),
  '/64-que?q=1', // Càn — có neo minh triết Đạo gia
  '/64-que?q=24', // Phục — có neo minh triết Đạo gia
];

describe('HTML người đọc nhận — không rò ngôn ngữ dev', () => {
  for (const lang of ['vi', 'en'] as const) {
    for (const path of ROUTES) {
      it(`${path} (${lang})`, async () => {
        assertClean(await renderAs(lang, path), `${path} [${lang}]`);
      });
    }
  }

  // Chống dương tính giả: nếu renderAs hỏng và trả trang rỗng/sai ngôn ngữ, mọi assert ở
  // trên xanh vô nghĩa. Neo lại bằng chữ ĐẶC TRƯNG của từng ngôn ngữ.
  it('renderAs thật sự đổi ngôn ngữ (không phải xanh giả)', async () => {
    expect(await renderAs('vi', '/goc')).toContain('Gốc của Dịch');
    expect(await renderAs('en', '/goc')).toContain('The Root of the Changes');
  });
});

/**
 * Bổ sung cho seam trên — KHÔNG thừa.
 *
 * Chuỗi WIP lặp nhiều nhất toàn site (thẻ minh triết: 6 trang + panel cả 64 quẻ) nằm sau
 * một `useState(false)` — người đọc bấm mới thấy. SSR không bao giờ mở nó, nên test HTML ở
 * trên VĨNH VIỄN mù với đúng cái ca nặng nhất. Quét thẳng chuỗi nguồn để bịt lỗ đó.
 *
 * Chỉ quét nhóm "tiến độ": mẫu hẹp, không đụng comment nội bộ nhắc docs//tests/ (vô hại, không
 * render ra). Nếu cần chữ này trong comment cho dev, hãy diễn đạt cách khác.
 */
const PROGRESS = FORBIDDEN.filter((f) => /đang|being/.test(f.label));

function tsxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) return tsxFiles(full);
    return /\.tsx?$/.test(e.name) ? [full] : [];
  });
}

describe('chuỗi chỉ hiện sau khi bấm — cũng không được hứa "đang làm dở"', () => {
  const srcDir = fileURLToPath(new URL('../src', import.meta.url));

  for (const file of tsxFiles(srcDir)) {
    const rel = file.slice(srcDir.length + 1);
    it(`src/${rel}`, () => {
      const code = readFileSync(file, 'utf8');
      for (const { label, re, fix } of PROGRESS) {
        expect(code.match(re), `src/${rel}: ${label} → ${fix}`).toBeNull();
      }
    });
  }
});
