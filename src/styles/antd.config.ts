import type { ThemeConfig } from 'antd'

/**
 * Ant Design v6 theme token overrides
 * Design system: "The Kinetic Terminal" — Neon Game Studio
 *
 * Rules:
 * - Never override tokens inline in components
 * - All color decisions live here and in theme-global.css
 * - Component-level tokens (Card, Menu, etc.) in the `components` block below
 */

const agencyTheme: ThemeConfig = {
  token: {
    // ─── Color: Brand ───────────────────────────────────────────
    colorPrimary:          '#8ff5ff',   // Cyan — primary accent
    colorPrimaryHover:     '#b8faff',
    colorPrimaryActive:    '#5ee8f5',
    colorPrimaryBg:        '#0a2020',   // Subtle bg tint for primary areas
    colorLink:             '#8ff5ff',
    colorLinkHover:        '#b8faff',

    // ─── Color: Semantic ────────────────────────────────────────
    colorSuccess:          '#39ff14',   // Mint green — live/online status
    colorWarning:          '#f5a623',   // Amber — caution states
    colorError:            '#ff4d6d',   // Hot coral — threat/error
    colorInfo:             '#8ff5ff',

    // ─── Color: Surface ─────────────────────────────────────────
    colorBgBase:           '#0e0e0e',   // The Void — root background
    colorBgContainer:      '#191919',   // Surface container
    colorBgElevated:       '#1f1f1f',   // Surface container high
    colorBgLayout:         '#0e0e0e',
    colorBgSpotlight:      '#262626',   // Surface container highest
    colorBgMask:           'rgba(0,0,0,0.7)',

    // ─── Color: Border ──────────────────────────────────────────
    colorBorder:           '#2a2a2a',
    colorBorderSecondary:  '#1e1e1e',
    colorSplit:            '#1e1e1e',

    // ─── Color: Text ────────────────────────────────────────────
    colorText:             '#e8eaf0',   // on-surface — never pure white
    colorTextSecondary:    '#888a94',
    colorTextTertiary:     '#555760',
    colorTextDisabled:     '#3a3c44',
    colorTextHeading:      '#f0f2f8',

    // ─── Typography ─────────────────────────────────────────────
    fontFamily:            '"Space Grotesk", system-ui, sans-serif',
    fontFamilyCode:        '"JetBrains Mono", "Fira Code", monospace',
    fontSize:              14,
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
      siderBg:             '#0e0e0e',
      bodyBg:              '#0e0e0e',
      headerBg:            '#131313',
      headerHeight:        48,
      headerPadding:       '0 24px',
    },

    // ─── Menu (sidebar nav) ─────────────────────────────────────
    Menu: {
      darkItemBg:          '#0e0e0e',
      darkSubMenuItemBg:   '#131313',
      darkItemColor:       '#888a94',
      darkItemHoverColor:  '#8ff5ff',
      darkItemSelectedColor: '#8ff5ff',
      darkItemSelectedBg:  '#0a2020',
      itemHeight:          40,
      collapsedWidth:      48,
      fontSize:            12,
    },

    // ─── Card ───────────────────────────────────────────────────
    Card: {
      colorBgContainer:    '#131313',
      colorBorderSecondary:'#2a2a2a',
      paddingLG:           16,
      borderRadiusLG:      2,
    },

    // ─── Button ─────────────────────────────────────────────────
    Button: {
      primaryColor:        '#0e0e0e',   // text on primary bg
      defaultBg:           'transparent',
      defaultColor:        '#8ff5ff',
      defaultBorderColor:  '#8ff5ff',
      borderRadius:        2,
      controlHeight:       36,
      fontWeight:          500,
    },

    // ─── Input ──────────────────────────────────────────────────
    Input: {
      colorBgContainer:    '#131313',
      colorBorder:         'transparent',
      activeBorderColor:   '#8ff5ff',
      hoverBorderColor:    '#555760',
      borderRadius:        2,
      paddingInline:       12,
    },

    // ─── Select ─────────────────────────────────────────────────
    Select: {
      colorBgContainer:    '#131313',
      colorBorder:         '#2a2a2a',
      optionSelectedBg:    '#0a2020',
      optionActiveBg:      '#1a1a1a',
      borderRadius:        2,
    },

    // ─── Tag ────────────────────────────────────────────────────
    Tag: {
      borderRadiusSM:      2,
      defaultBg:           '#1f1f1f',
      defaultColor:        '#888a94',
      fontSizeSM:          11,
    },

    // ─── Drawer (agent detail slide-in panel) ───────────────────
    Drawer: {
      colorBgElevated:     '#131313',
      colorBorder:         '#2a2a2a',
      paddingLG:           24,
      footerPaddingBlock:  16,
    },

    // ─── Tooltip ────────────────────────────────────────────────
    Tooltip: {
      colorBgSpotlight:    '#262626',
      colorTextLightSolid: '#e8eaf0',
      borderRadius:        2,
    },

    // ─── Badge / status indicators ──────────────────────────────
    Badge: {
      colorBgContainer:    '#0e0e0e',
      fontSize:            11,
    },

    // ─── Typography ─────────────────────────────────────────────
    Typography: {
      colorTextHeading:    '#f0f2f8',
      titleMarginTop:      0,
      titleMarginBottom:   '0.5em',
    },

    // ─── Divider ────────────────────────────────────────────────
    Divider: {
      colorSplit:          '#1e1e1e',
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
