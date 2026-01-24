import type { Metadata } from "next";
import { draftMode } from "next/headers";
import BlogHero from "../../components/features/blog/BlogHero";
import Breadcrumb from "../../components/ui/breadcrumb";
import { getAllBlogPosts as getStaticBlogPosts } from "./data";
import { BlogsClientWrapper } from "./BlogsClientWrapper";
import { getBlogPosts, getStrapiImageUrl } from "@/app/lib/strapi";

export const metadata: Metadata = {
  title: "Blog - Insights for the Modern Workspace",
  description:
    "Explore expert advice, trends, and ideas to help your team thrive — whether you're a startup founder, enterprise leader, or remote professional.",
  openGraph: {
    title: "Blog - ClayWorks",
    description:
      "Explore expert advice, trends, and ideas to help your team thrive in the modern workspace.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/blogs`,
    siteName: "ClayWorks",
    locale: "en_IN",
    type: "website",
  },
};

const BlogsPage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch blog posts from Strapi
  const strapiPosts = await getBlogPosts({ limit: 20, preview });

  // Map Strapi blog posts to the expected format, fall back to static data if empty
  const blogPosts =
    strapiPosts.length > 0
      ? strapiPosts.map((post) => ({
        image: getStrapiImageUrl(post.featuredImage) || "/images/workspace.jpg",
        imageAlt: post.featuredImage?.alternativeText || post.title,
        title: post.title,
        excerpt: post.excerpt || "",
        author: post.author || "ClayWorks Team",
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          : "",
        categories: post.categories || [],
        link: `/blogs/${post.slug}`,
      }))
      : getStaticBlogPosts(12);

  // Get the featured/hero post (first post from Strapi, or fallback)
  const featuredPost =
    strapiPosts.length > 0
      ? {
        image: getStrapiImageUrl(strapiPosts[0].featuredImage) || "/images/meeting.jpg",
        imageAlt: strapiPosts[0].featuredImage?.alternativeText || "Modern workspace",
        title: strapiPosts[0].title,
        excerpt: strapiPosts[0].excerpt || "Discover insights for the modern workspace.",
        author: strapiPosts[0].author || "ClayWorks Team",
        date: strapiPosts[0].publishedAt
          ? new Date(strapiPosts[0].publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          : "",
        readMoreLink: `/blogs/${strapiPosts[0].slug}`,
        categories: strapiPosts[0].categories || ["Workspace Solutions"],
      }
      : {
        image: "/images/meeting.jpg",
        imageAlt: "Modern workspace",
        title: "Why Your Workday Deserves Better Than a Café Table",
        excerpt:
          "Tired of noisy backgrounds and unstable Wi-Fi? Discover how a Day Pass at ClayWorks.",
        author: "John Doe",
        date: "Aug 23, 2025",
        readMoreLink: "/blogs/workday-deserves-better",
        categories: [
          "Health & Wellbeing",
          "Health & Wellbeing",
          "Productivity & Work Culture",
        ],
      };

  // Define sections - Featured and Compact cards are consecutive
  const sections = [
    // After 3 blog posts, show featured card
    {
      type: "featured" as const,
      position: 3,
      data: {
        image: "/images/meeting.jpg",
        imageAlt: "Office culture",
        title: "Scaling Office Culture with Ford Pro Charging",
        excerpt:
          "When Ford Pro needed a space that echoed their EV-innovation culture, ClayWorks delivered a refined, hybrid-fit workspace aligned with their values and growth trajectory. The space now boosts engagement and reflects their brand identity.",
        tags: ["Branding", "Sourcing", "Office Management"],
        link: "/case-studies/ford-pro-charging",
        ctaText: "Read The Case Study",
      },
    },
    // Immediately after featured card (same position), show compact trio
    {
      type: "compact-trio" as const,
      position: 3, // Same position as featured - they'll be consecutive
      data: [
        {
          title: "TechCo Innovations",
          description:
            "Scaled from 5 desks to 100 in under 2 months with a 6-month payback for the tenant fit outs. Now, TechCo enjoys a fully built-out, branded custom office at...",
          link: "/case-studies/techco-innovations",
          ctaText: "Read The Case Study",
        },
        {
          title: "Global Finance Group",
          description:
            "Gained instant credibility and compliance in a commercial and compliance at 30% occupancy costs, on...",
          link: "/case-studies/global-finance-group",
          ctaText: "Read The Case Study",
        },
        {
          title: "Design House Collective",
          description:
            "Transitioned from scattered freelancers to a full-time office at 30% of what acquiring a traditional, secured coworking space at 2x, not space, no long...",
          link: "/case-studies/design-house-collective",
          ctaText: "Read The Case Study",
        },
      ],
    },
    // After more blog posts, show newsletter
    {
      type: "newsletter" as const,
      position: 8,
      data: {
        title: "Stay Ahead of the Curve",
        description:
          "Get fresh insights, expert tips, and the latest workspace trends delivered to your inbox every month.",
        buttonText: "Subscribe Now",
      },
    },
  ];

  // Calculate total pages based on Strapi posts count
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / 6));

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
        </div>
        <BlogHero
          title="Insights for the Modern Workspace"
          description="Explore expert advice, trends, and ideas to help your team thrive — whether you're a startup founder, enterprise leader, or remote professional."
          categoryTags={[
            [
              { label: "Case Studies", value: "case-studies" },
              { label: "Workspace Solutions", value: "workspace-solutions" },
              {
                label: "Productivity & Work Culture",
                value: "productivity-work-culture",
              },
            ],
            [
              {
                label: "Design & Sustainability",
                value: "design-sustainability",
              },
              { label: "Managed Offices", value: "managed-offices" },
              { label: "Health & Wellbeing", value: "health-wellbeing" },
            ],
            [
              { label: "Branding", value: "branding" },
              {
                label: "Community & Networking",
                value: "community-networking",
              },
              { label: "Expert Opinion", value: "expert-opinion" },
            ],
          ]}
          featuredPost={featuredPost}
        />
      </div>

      <BlogsClientWrapper
        blogPosts={blogPosts}
        sections={sections}
        totalPages={totalPages}
      />
    </div>
  );
};

export default BlogsPage;
