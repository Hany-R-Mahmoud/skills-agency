import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import agencyTheme from "@/styles/antd.config";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The Agency",
  description: "Neon HQ showcase for an AI skills company.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="agency-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const storageKey = 'agency-theme';
                const stored = window.localStorage.getItem(storageKey);
                const theme = stored === 'light' || stored === 'dark'
                  ? stored
                  : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={agencyTheme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
