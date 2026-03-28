import type { ThemeConfig } from 'antd'

/**
 * Ant Design v6 theme token overrides
 * Design system: "The Agency v2" — cinematic editorial command floor
 *
 * Rules:
 * - Never override tokens inline in components
 * - All color decisions live here and in theme-global.css
 * - Component-level tokens (Card, Menu, etc.) in the `components` block below
 */

const agencyTheme: ThemeConfig = {
  token: {
    // ─── Color: Brand ───────────────────────────────────────────
    colorPrimary:          'var(--dept-command)',
    colorPrimaryHover:     'var(--accent-cyan-dim)',
    colorPrimaryActive:    'var(--accent-cyan-dim)',
    colorPrimaryBg:        'var(--accent-cyan-bg)',
    colorLink:             'var(--dept-command)',
    colorLinkHover:        'var(--accent-cyan-dim)',

    // ─── Color: Semantic ────────────────────────────────────────
    colorSuccess:          'var(--dept-quality)',
    colorWarning:          'var(--dept-engineering)',
    colorError:            'var(--dept-design)',
    colorInfo:             'var(--dept-command)',

    // ─── Color: Surface ─────────────────────────────────────────
    colorBgBase:           'var(--surface-void)',
    colorBgContainer:      'var(--surface-mid)',
    colorBgElevated:       'var(--surface-lift)',
    colorBgLayout:         'var(--surface-void)',
    colorBgSpotlight:      'var(--surface-high)',
    colorBgMask:           'color-mix(in srgb, var(--surface-void) 72%, transparent)',

    // ─── Color: Border ──────────────────────────────────────────
    colorBorder:           'var(--border-default)',
    colorBorderSecondary:  'var(--border-subtle)',
    colorSplit:            'var(--border-subtle)',

    // ─── Color: Text ────────────────────────────────────────────
    colorText:             'var(--text-primary)',
    colorTextSecondary:    'var(--text-secondary)',
    colorTextTertiary:     'var(--text-tertiary)',
    colorTextDisabled:     'var(--text-disabled)',
    colorTextHeading:      'var(--text-heading)',

    // ─── Typography ─────────────────────────────────────────────
    fontFamily:            'var(--font-body)',
    fontFamilyCode:        'var(--font-mono)',
    fontSize:              16,
    fontSizeLG:            16,
    fontSizeSM:            12,
    fontSizeXL:            20,
    fontSizeHeading1:      56,
    fontSizeHeading2:      36,
    fontSizeHeading3:      24,
    fontSizeHeading4:      18,
    lineHeight:            1.6,
    lineHeightLG:          1.5,

    // ─── Shape ──────────────────────────────────────────────────
    borderRadius:          2,           // Sharp, terminal feel
    borderRadiusLG:        4,
    borderRadiusSM:        2,
    borderRadiusXS:        1,

    // ─── Motion ─────────────────────────────────────────────────
    motionDurationFast:    '0.1s',
    motionDurationMid:     '0.15s',
    motionDurationSlow:    '0.2s',
    motionEaseInOut:       'cubic-bezier(0.4, 0, 0.2, 1)',

    // ─── Spacing ────────────────────────────────────────────────
    padding:               16,
    paddingLG:             24,
    paddingSM:             12,
    paddingXS:             8,
    margin:                16,
    marginLG:              24,
    marginSM:              12,
    marginXS:              8,

    // ─── Control ────────────────────────────────────────────────
    controlHeight:         36,
    controlHeightLG:       44,
    controlHeightSM:       28,
    lineWidth:             1,
    lineWidthBold:         2,
  },

  components: {
    // ─── Layout ─────────────────────────────────────────────────
    Layout: {
      siderBg:             'var(--surface-void)',
      bodyBg:              'var(--surface-void)',
      headerBg:            'var(--surface-inset)',
      headerHeight:        48,
      headerPadding:       '0 24px',
    },

    // ─── Menu (sidebar nav) ─────────────────────────────────────
    Menu: {
      darkItemBg:          'var(--surface-void)',
      darkSubMenuItemBg:   'var(--surface-inset)',
      darkItemColor:       'var(--text-secondary)',
      darkItemHoverColor:  'var(--dept-command)',
      darkItemSelectedColor: 'var(--dept-command)',
      darkItemSelectedBg:  'var(--accent-cyan-bg)',
      itemHeight:          40,
      collapsedWidth:      48,
      fontSize:            12,
    },

    // ─── Card ───────────────────────────────────────────────────
    Card: {
      colorBgContainer:    'var(--surface-inset)',
      colorBorderSecondary:'var(--border-default)',
      paddingLG:           16,
      borderRadiusLG:      2,
    },

    // ─── Button ─────────────────────────────────────────────────
    Button: {
      primaryColor:        'var(--text-on-accent)',
      defaultBg:           'transparent',
      defaultColor:        'var(--dept-command)',
      defaultBorderColor:  'var(--dept-command)',
      borderRadius:        2,
      controlHeight:       36,
      fontWeight:          500,
    },

    // ─── Input ──────────────────────────────────────────────────
    Input: {
      colorBgContainer:    'var(--surface-inset)',
      colorBorder:         'transparent',
      activeBorderColor:   'var(--dept-command)',
      hoverBorderColor:    'var(--text-tertiary)',
      borderRadius:        2,
      paddingInline:       12,
    },

    // ─── Select ─────────────────────────────────────────────────
    Select: {
      colorBgContainer:    'var(--surface-inset)',
      colorBorder:         'var(--border-default)',
      optionSelectedBg:    'var(--accent-cyan-bg)',
      optionActiveBg:      'var(--surface-mid)',
      borderRadius:        2,
    },

    // ─── Tag ────────────────────────────────────────────────────
    Tag: {
      borderRadiusSM:      2,
      defaultBg:           'var(--surface-lift)',
      defaultColor:        'var(--text-secondary)',
      fontSizeSM:          11,
    },

    // ─── Drawer (agent detail slide-in panel) ───────────────────
    Drawer: {
      colorBgElevated:     'var(--surface-inset)',
      colorBorder:         'var(--border-default)',
      paddingLG:           24,
      footerPaddingBlock:  16,
    },

    // ─── Tooltip ────────────────────────────────────────────────
    Tooltip: {
      colorBgSpotlight:    'var(--surface-high)',
      colorTextLightSolid: 'var(--text-primary)',
      borderRadius:        2,
    },

    // ─── Badge / status indicators ──────────────────────────────
    Badge: {
      colorBgContainer:    'var(--surface-void)',
      fontSize:            11,
    },

    // ─── Typography ─────────────────────────────────────────────
    Typography: {
      colorTextHeading:    'var(--text-heading)',
      titleMarginTop:      0,
      titleMarginBottom:   '0.5em',
    },

    // ─── Divider ────────────────────────────────────────────────
    Divider: {
      colorSplit:          'var(--border-subtle)',
      lineWidth:           1,
    },
  },

  // Use CSS-in-JS — required for App Router + Ant Design v6
  cssVar: {
    key: 'agency',
  },
  hashed: false,
}

export default agencyTheme
