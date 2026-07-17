import { useSettings } from '@/store/useSettings';
import { ELEMENT_META, NGU_HANH_SINH } from '@/data/cosmograms';
import { useT, useLang, ELEMENT_EN } from '@/i18n';

/** Thanh công tắc lớp thuật ngữ (đặt ở chân sidebar). */
export default function SettingsBar() {
  const {
    termPrimary,
    showHanzi,
    showWisdom,
    colorMode,
    setTermPrimary,
    toggleHanzi,
    toggleWisdom,
    setColorMode,
  } = useSettings();
  const t = useT();
  const lang = useLang();
  const on = t('common.on');
  const off = t('common.off');

  return (
    <div className="space-y-2 text-xs">
      <div className="text-ink-faint uppercase tracking-wider">{t('settings.title')}</div>

      <div className="flex items-center gap-1.5">
        <span className="text-ink-muted w-16">{t('settings.name')}</span>
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={termPrimary === 'modern'}
          onClick={() => setTermPrimary('modern')}
        >
          {t('settings.name.modern')}
        </button>
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={termPrimary === 'hanviet'}
          onClick={() => setTermPrimary('hanviet')}
        >
          {t('settings.name.hanviet')}
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-ink-muted w-16">{t('settings.color')}</span>
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={colorMode === 'duality'}
          onClick={() => setColorMode('duality')}
          title={t('settings.color.dualityTitle')}
        >
          {t('settings.color.duality')}
        </button>
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={colorMode === 'wuxing'}
          onClick={() => setColorMode('wuxing')}
          title={t('settings.color.wuxingTitle')}
        >
          {t('settings.color.wuxing')}
        </button>
      </div>

      {/* Chú giải 5 hành — chỉ hiện khi đang bật bảng màu Ngũ hành (áp cho toàn site). */}
      {colorMode === 'wuxing' && (
        <div className="rounded-md border border-white/10 bg-white/[0.02] p-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {NGU_HANH_SINH.map((el) => (
              <span key={el} className="inline-flex items-center gap-1">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-sm"
                  style={{ background: ELEMENT_META[el].color }}
                />
                <span className="text-ink-muted">{lang === 'en' ? ELEMENT_EN[el] : el}</span>
              </span>
            ))}
          </div>
          <p className="mt-1.5 leading-snug text-ink-faint">{t('settings.wuxingNote')}</p>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={showHanzi}
          onClick={toggleHanzi}
          title={t('settings.hanzi.title')}
        >
          {t('settings.hanzi')} {showHanzi ? on : off}
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          className="switch-btn flex-1 !py-1 text-center"
          data-active={showWisdom}
          onClick={toggleWisdom}
          title={t('settings.wisdom.title')}
        >
          {t('settings.wisdom')} {showWisdom ? on : off}
        </button>
      </div>
    </div>
  );
}
