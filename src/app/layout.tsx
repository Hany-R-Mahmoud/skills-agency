import "@/app/globals.css";
import agencyTheme from "@/styles/antd.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "The Agency",
    template: "%s | The Agency",
  },
  description:
    "Cinematic showcase for a public roster of AI specialists, departments, and playbook-driven workflows.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={agencyTheme}>
            {children}
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
