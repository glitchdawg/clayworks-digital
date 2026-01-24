import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore expert advice, trends, and ideas to help your team thrive. Insights for the modern workspace from ClayWorks.",
  openGraph: {
    title: "Blog - ClayWorks",
    description:
      "Expert insights, trends, and ideas for the modern workspace. Case studies, productivity tips, and workspace solutions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/blogs`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/meeting.jpg",
        width: 1200,
        height: 630,
        alt: "ClayWorks Blog - Workspace Insights",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - ClayWorks",
    description:
      "Expert insights, trends, and ideas for the modern workspace. Case studies, productivity tips, and workspace solutions.",
    images: ["/images/meeting.jpg"],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
