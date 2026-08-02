import type { Metadata } from "next";

const siteUrl = "https://skills-agency.vercel.app";
const siteName = "The Agency";
const defaultDescription =
  "Cinematic showcase for a public roster of AI specialists, departments, and playbook-driven workflows.";
const defaultImage = toAbsoluteUrl("/social-card.png");

export const defaultSocialImage = {
  url: defaultImage,
  type: "image/png",
  width: 1200,
  height: 630,
  alt: siteName,
};

function toAbsoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

function createImageSet(imagePath?: string) {
  if (!imagePath) return [defaultSocialImage];

  const imageUrl = toAbsoluteUrl(imagePath);

  return [
    {
      url: imageUrl,
      alt: siteName,
    },
  ];
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
}

export const siteMetadata = {
  siteName,
  siteUrl,
  defaultDescription,
  defaultImage,
};

export function createPageMetadata({
  title,
  description,
  path,
  imagePath,
}: PageMetadataOptions): Metadata {
  const url = toAbsoluteUrl(path);
  const images = createImageSet(imagePath);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
