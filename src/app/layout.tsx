import type { Metadata } from "next";
import type { ReactNode } from "react";
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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={agencyTheme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
