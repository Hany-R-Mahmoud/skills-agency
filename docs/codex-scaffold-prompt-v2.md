# Codex Scaffold Prompt — The Agency v2

## Step 1: Create Next.js 16 project

```bash
npx create-next-app@latest the-agency \
  --typescript \
  --app \
  --no-tailwind \
  --eslint \
  --src-dir \
  --import-alias "@/*"
```

## Step 2: Install dependencies

```bash
cd the-agency

# Ant Design v6 + CSS-in-JS engine
npm install antd @ant-design/cssinjs @ant-design/icons

# Animation
npm install framer-motion

# SCSS
npm install --save-dev sass

# TypeScript runner (for scripts)
npm install --save-dev tsx

# Utilities
npm install clsx
```

## Step 3: Install spec-kit (requires uv + Python 3.11+)

```bash
# Install uv if not present
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install specify CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.4.0

# Initialize spec-kit for Codex
specify init . --here --ai codex --ai-skills --force

# Also initialize for OpenCode (run both — you'll use both tools)
specify init . --here --ai opencode --force
```

## Step 4: Create project structure

Create these directories and empty placeholder files:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── departments/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── page.module.scss
│   └── agents/
│       └── [id]/
│           ├── page.tsx
│           └── page.module.scss
├── components/
│   ├── layout/
│   │   ├── Sidebar/
│   │   │   ├── index.tsx
│   │   │   └── Sidebar.module.scss
│   │   └── MainArea/
│   │       ├── index.tsx
│   │       └── MainArea.module.scss
│   ├── agents/
│   │   ├── AgentCard/
│   │   │   ├── index.tsx
│   │   │   └── AgentCard.module.scss
│   │   └── AgentPanel/
│   │       ├── index.tsx
│   │       └── AgentPanel.module.scss
│   ├── departments/
│   │   ├── DeptRoom/
│   │   │   ├── index.tsx
│   │   │   └── DeptRoom.module.scss
│   │   └── DeptCard/
│   │       ├── index.tsx
│   │       └── DeptCard.module.scss
│   └── shared/
│       ├── AgentSprite/
│       │   ├── index.tsx
│       │   └── AgentSprite.module.scss
│       └── StatusPip/
│           ├── index.tsx
│           └── StatusPip.module.scss
├── lib/
│   ├── types.ts        ← copy from types.ts file
│   ├── audio.ts        ← placeholder for Phase 8
│   └── utils.ts
├── styles/
│   ├── theme-global.css  ← copy from theme-global.css file
│   └── antd.config.ts    ← copy from antd.config.ts file
└── data/
    └── skills.json       ← copy from skills.json file

public/
├── audio/
│   ├── ui/             ← placeholder dirs
│   └── agents/
└── fonts/

scripts/
└── sync-skills.ts      ← placeholder for Phase 10
```

## Step 5: next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons'],
  },
}

export default nextConfig
```

## Step 6: src/app/globals.css

```css
/* Minimal reset only — all tokens live in theme-global.css */
@import '../styles/theme-global.css';

*, *::before, *::after {
  box-sizing: border-box;
}
```

## Step 7: src/app/layout.tsx (basic shell)

```tsx
import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import agencyTheme from '@/styles/antd.config'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'The Agency',
  description: 'Next-gen AI agent management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={agencyTheme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
```

## Step 8: Verify Vercel connection

```bash
npx vercel link
git add .
git commit -m "chore: initial scaffold"
git push origin main
```

Confirm Vercel dashboard shows a successful deploy before proceeding to spec-kit constitution.

---

## Notes

- Do NOT install Tailwind — all styling is SCSS modules + CSS custom properties
- `@ant-design/nextjs-registry` is required for Next.js App Router + Ant Design v6
- Place `theme-global.css` and `antd.config.ts` in `src/styles/` (not root)
- `skills.json` goes in `src/data/` — loaded via server components, not API routes
- The `specify init` command must run AFTER the project exists (needs a git repo)
