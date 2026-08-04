import "@/app/globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PwaProvider from "@/components/pwa/PwaProvider";
import agencyTheme from "@/styles/antd.config";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { defaultSocialImage, siteMetadata } from "@/lib/metadata";
import StandaloneVisitorCounter from "@/components/StandaloneVisitorCounter";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.siteName,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.defaultDescription,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/skills-agency-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icons/skills-agency-192.png",
  },
  appleWebApp: {
    capable: true,
    title: siteMetadata.siteName,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: siteMetadata.siteName,
    title: siteMetadata.siteName,
    description: siteMetadata.defaultDescription,
    url: siteMetadata.siteUrl,
    images: [
      {
        ...defaultSocialImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.siteName,
    description: siteMetadata.defaultDescription,
    images: [defaultSocialImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d10",
  colorScheme: "dark light",
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
            <PwaProvider>
              {children}
              <StandaloneVisitorCounter />
              <GoogleAnalytics gaId={gaId} />
              <Analytics />
            </PwaProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
