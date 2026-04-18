import type { Metadata } from "next";

const siteUrl = "https://skills-agency.vercel.app";
const siteName = "The Agency";
const defaultDescription =
  "Cinematic showcase for a public roster of AI specialists, departments, and playbook-driven workflows.";
const defaultImage =
  "https://ik.imagekit.io/hrim/images/office/command-department.png?updatedAt=1774688158259";

function toAbsoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

function createImageSet(imagePath?: string) {
  const imageUrl = imagePath ? toAbsoluteUrl(imagePath) : defaultImage;

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
      images: images.map((image) => image.url),
    },
  };
}
