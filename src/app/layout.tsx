import "@/app/globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import agencyTheme from "@/styles/antd.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.siteName,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.defaultDescription,
  openGraph: {
    type: "website",
    siteName: siteMetadata.siteName,
    title: siteMetadata.siteName,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    images: [
      {
        url: siteMetadata.defaultImage,
        alt: siteMetadata.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.siteName,
    description: siteMetadata.defaultDescription,
    images: [siteMetadata.defaultImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteMetadata.siteName,
  url: siteMetadata.siteUrl,
  description: siteMetadata.defaultDescription,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AntdRegistry>
          <ConfigProvider theme={agencyTheme}>
            {children}
            <GoogleAnalytics gaId={gaId} />
            <Analytics />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
