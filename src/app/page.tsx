import type { Metadata } from "next";
import HomePageContent from "@/components/home/HomePageContent";
import { createPageMetadata } from "@/lib/metadata";

const homeMetadata = createPageMetadata({
  title: "The Agency",
  description:
    "Cinematic showcase for a public roster of AI specialists, departments, and playbook-driven workflows.",
  path: "/",
});

homeMetadata.title = {
  absolute: "The Agency",
};

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <HomePageContent />;
}
