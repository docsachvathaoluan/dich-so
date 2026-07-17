import { useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Starfield from './components/Starfield';
import SettingsMenu from './components/SettingsMenu';
import { useSettings } from './store/useSettings';
import { useT } from './i18n';
import { LAYERS } from './layers/layerMeta';

import Layer0 from './layers/Layer0';
import PageStructure from './layers/PageStructure';
import PageRoots from './layers/PageRoots';
import Layer5 from './layers/Layer5';
import Layer6 from './layers/Layer6';
import PageSpine from './layers/PageSpine';
import PageWisdom from './layers/PageWisdom';
import Method from './layers/Method';

const ROUTES: Record<string, JSX.Element> = {
  '/goc': <Layer0 />,
  '/bat-quai': <PageStructure />,
  '/ha-do-lac-thu': <PageRoots />,
  '/vu-tru-mua': <Layer5 />,
  '/64-que': <Layer6 />,
  '/xuyen-tang': <PageSpine />,
  '/minh-triet': <PageWisdom />,
  '/phuong-phap': <Method />,
};

// Redirect các path cũ (sau khi gộp trang) → trang mới, tránh gãy link/bookmark.
const REDIRECTS: Record<string, string> = {
  '/sinh-doi': '/bat-quai',
  '/tien-hau-thien': '/ha-do-lac-thu',
  '/tieu-vu-tru': '/ha-do-lac-thu',
  '/lap-que': '/64-que',
};

export default function App() {
  const [open, setOpen] = useState(false); // drawer mobile
  const sidebarPinned = useSettings((s) => s.sidebarPinned); // ghim sidebar mở (desktop, persist)
  const toggleSidebar = useSettings((s) => s.toggleSidebar);
  const lang = useSettings((s) => s.lang);
  const toggleLang = useSettings((s) => s.toggleLang);
  const t = useT();
  const location = useLocation();

  const expanded = sidebarPinned; // trạng thái nở của sidebar trên desktop

  // nhóm các lớp theo `group` (giữ thứ tự).
  const groups: { name: string; items: typeof LAYERS }[] = [];
  for (const l of LAYERS) {
    const last = groups[groups.length - 1];
    if (last && last.name === l.group) last.items.push(l);
    else groups.push({ name: l.group, items: [l] });
  }

  return (
    <div className="relative flex min-h-screen">
      <Starfield />

      {/* Nút mở menu (mobile) */}
      <button
        className="fixed left-3 top-3 z-40 rounded-lg border border-white/10 bg-cosmos-800/80 px-3 py-2 text-ink-muted backdrop-blur lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('app.openMap')}
      >
        ☰
      </button>

      {/* Spacer giữ chỗ cho sidebar cố định (chỉ desktop): mở = 18rem, thu gọn = rail 76px. */}
      <div
        className={`hidden shrink-0 transition-[width] duration-300 lg:block ${
          sidebarPinned ? 'w-72' : 'w-[76px]'
        }`}
        aria-hidden
      />

      {/* Sidebar / bản đồ lớp — cố định, luôn hiện (desktop); nút ◂/▸ thu gọn về rail icon */}
      <aside
        className={`group fixed inset-y-0 left-0 z-30 flex flex-col overflow-hidden border-r border-white/10 bg-cosmos-900/90 backdrop-blur-md transition-[width,transform] duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-72 lg:translate-x-0 ${expanded ? 'lg:w-72 shadow-panel-raised' : 'lg:w-[76px]'}`}
      >
        {/* Logo + nút ghim */}
        <div className="flex items-center gap-2 px-4 pb-3 pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-lg text-gold-soft">
            ◈
          </span>
          <div
            className={`min-w-0 flex-1 transition-opacity duration-200 ${
              expanded ? 'opacity-100' : 'opacity-0 lg:opacity-0'
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-gold-soft">Dịch Số</span>
              <span className="text-[11px] text-ink-faint">易數</span>
            </div>
            <p className="truncate text-[11px] text-ink-faint">{t('app.tagline')}</p>
          </div>
          {/* Nút thu gọn (desktop) — chỉ hiện khi đang mở; khi thu gọn dùng nút ở chân */}
          <button
            onClick={toggleSidebar}
            className={`shrink-0 rounded-md border border-white/10 p-1 text-ink-faint transition hover:text-gold-soft ${
              expanded ? 'hidden lg:block' : 'hidden'
            }`}
            title={t('app.collapseSidebar')}
            aria-label={t('app.collapseSidebar')}
          >
            ◂
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {groups.map((g) => (
            <div key={g.name} className="mb-3">
              <div
                className={`px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-faint transition-opacity duration-200 ${
                  expanded ? 'opacity-100' : 'lg:opacity-0'
                }`}
              >
                {t('group.' + g.name)}
              </div>
              {g.items.map((l) => (
                <NavLink
                  key={l.path}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  title={lang === 'en' ? l.titleEn : l.title}
                  className={({ isActive }) =>
                    `group/item relative flex items-center gap-3 rounded-lg px-2 py-2 transition ${
                      isActive
                        ? 'bg-gold/10 text-ink'
                        : 'text-ink-muted hover:bg-white/5 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-base transition ${
                          isActive
                            ? 'border-gold/40 bg-cosmos-700/80 text-gold-soft shadow-gold'
                            : 'border-white/10 bg-cosmos-700/60 text-gold-soft/80'
                        }`}
                      >
                        {l.symbol}
                      </span>
                      <span
                        className={`min-w-0 transition-opacity duration-200 ${
                          expanded ? 'opacity-100' : 'lg:opacity-0'
                        }`}
                      >
                        <span className="block truncate text-sm">
                          {lang === 'en' ? l.titleEn : l.title}
                        </span>
                        <span className="block truncate text-[11px] text-ink-faint">
                          {lang === 'en' ? l.subtitleEn : l.subtitle}
                        </span>
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Chân sidebar: nút mở rộng khi đang thu gọn (rail) — luôn truy cập được trên desktop */}
        <div className={`border-t border-white/10 px-3 py-3 ${expanded ? 'lg:hidden' : 'hidden lg:block'}`}>
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center rounded-md border border-white/10 p-2 text-ink-faint transition hover:text-gold-soft"
            title={t('app.expandSidebar')}
            aria-label={t('app.expandSidebar')}
          >
            ▸
          </button>
        </div>
      </aside>

      {/* lớp phủ tối khi mở drawer mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Nội dung chính — full width, page tự quản chiều rộng bằng <Measure>/<Bleed> */}
      <main className="min-w-0 flex-1 px-5 py-8 md:px-8 lg:py-12 xl:px-12 2xl:px-16">
        {/* Top bar: nút ⚙ mở bảng công tắc hiển thị — dính (sticky) góc trên phải khi cuộn.
            Cả dải để pointer-events-none, chỉ nút mới bắt sự kiện → không chặn click nội dung. */}
        <div className="pointer-events-none sticky top-4 z-40 mb-4 flex items-center justify-end gap-2 pl-12 lg:pl-0">
          {/* Nút đổi Việt/Anh — standalone, luôn hiện (người nước ngoài thấy ngay, không cần mở ⚙). */}
          <button
            onClick={toggleLang}
            className="pointer-events-auto switch-btn flex items-center gap-1.5 !py-1.5"
            aria-label={t('app.lang.switchAria')}
            title={lang === 'vi' ? t('app.lang.toEn') : t('app.lang.toVi')}
          >
            <span aria-hidden>🌐</span>
            <span className="font-medium">{lang === 'vi' ? 'VI' : 'EN'}</span>
          </button>
          <div className="pointer-events-auto">
            <SettingsMenu />
          </div>
        </div>

        <div key={location.pathname}>
          <Routes>
            <Route path="/" element={<Navigate to="/goc" replace />} />
            {Object.entries(ROUTES).map(([path, el]) => (
              <Route key={path} path={path} element={el} />
            ))}
            {Object.entries(REDIRECTS).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<Navigate to="/goc" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
