import type { Metadata } from "next";
import { draftMode } from "next/headers";
import AboutUsBanner from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";
import {
  blogPostsData as defaultBlogPostsData,
  caseStudiesData as defaultCaseStudiesData,
  impactStats,
  leaders as defaultLeaders,
  locationCards,
  principleCards,
} from "@/db/data";
import { PrincipleSection } from "../../components/features/about/PrincipleSection";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import { ImpactSection } from "../../components/features/about/Impact";
import { PlanCard } from "../../components/features/pricing/PlanCard";
import CaseStudies from "../../components/features/services/CaseStudies";
import { LeadershipSection } from "../../components/features/about/Leadership";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";
import { ImageContentWithCards } from "../../components/layout/Section/ImageContentWithCards";
import { ContactUs } from "../../components/features/services/ContactUs";
import { BlogSection } from "../../components/features/blog/BlogSection";
import {
  getTeamMembers,
  getBlogPosts,
  getCaseStudies,
  getStrapiImageUrl,
} from "@/app/lib/strapi";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Crafting the future of workspaces. We are a team of passionate professionals dedicated to providing the best workspace solutions for our clients.",
  openGraph: {
    title: "About Us - ClayWorks",
    description:
      "Learn about our mission, values, and team. We believe the right environment sparks extraordinary outcomes.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/about-us`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/aboutus.png",
        width: 1200,
        height: 630,
        alt: "About ClayWorks",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ClayWorks",
    description:
      "Learn about our mission, values, and team. We believe the right environment sparks extraordinary outcomes.",
    images: ["/images/aboutus.png"],
  },
};

const AboutUsPage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch data from Strapi
  const [teamMembersData, blogPostsFromStrapi, caseStudiesFromStrapi] = await Promise.all([
    getTeamMembers({ preview }),
    getBlogPosts({ featured: true, limit: 4, preview }),
    getCaseStudies({ limit: 6, preview }),
  ]);

  // Map Strapi TeamMembers to LeadershipSection format with fallback
  const leaders = teamMembersData.length > 0
    ? teamMembersData.map(member => ({
      name: member.name,
      title: member.title,
      bio: member.bio || "",
      image: getStrapiImageUrl(member.image) || "/images/abhijit.png",
    }))
    : defaultLeaders;

  // Map Strapi BlogPosts to BlogSection format with fallback
  const blogPosts = blogPostsFromStrapi.length > 0
    ? blogPostsFromStrapi.map(post => ({
      image: getStrapiImageUrl(post.featuredImage) || "/images/workspace.jpg",
      title: post.title,
      description: post.excerpt || "",
      author: post.author || "ClayWorks Team",
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "",
      link: `/blogs/${post.slug}`,
    }))
    : defaultBlogPostsData;

  // Map Strapi CaseStudies to component format with fallback
  const caseStudiesData = caseStudiesFromStrapi.length > 0
    ? caseStudiesFromStrapi.map(cs => ({
      id: String(cs.id),
      companyName: cs.companyName,
      description: cs.description,
      linkText: cs.linkText || "Read This Case Study",
      linkUrl: `/case-studies/${cs.slug}`,
    }))
    : defaultCaseStudiesData;

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
          />
        </div>
        <AboutUsBanner
          mainImage={{
            src: "/images/aboutus.png",
            alt: "Day Pass Workspace",
          }}
          layout="image-right"
          badge="About Clayworks"
          title="Human-Centric Workspaces Built for People"
          description="At Clayworks, we exist to enrich how work feels, every day. We build and operate premium, flexible, and sustainable workspaces that help teams do their best work — not just be productive, but be purposeful."
        />
      </div>
      <PrincipleSection
        eyebrow="OUR PRINCIPLE"
        title="We believe workspaces should do more than house work — they should elevate it."
        description="Great work begins with spaces that care for people first — thoughtfully designed, naturally inviting, intuitively supported, and rooted in well-being. Our HumanSense at Work philosophy places empathy at the center of every environment we create."
        cards={principleCards}
      />
      <WhyChooseUsSection
        eyebrow="WHY CLAYWORKS"
        title="Why Clayworks"
        imageSrc="/images/meeting.jpg"
        imageAlt="Office workspace"
        imagePosition="left"
        mode="accordion"
        defaultOpenIndex={1}
        items={[
          {
            title: "Brand-First Design",
            content:
              "Every workspace reflects your brand identity and culture, creating an environment that resonates with your team and impresses clients.",
          },
          {
            title: "Scalable Infrastructure",
            content:
              "Modular layouts and future-proof systems adapt as you grow.",
          },
          {
            title: "Sustainable by Default",
            content:
              "Built with eco-friendly materials and energy-efficient systems to reduce your carbon footprint.",
          },
          {
            title: "Hospitality-Grade Service",
            content:
              "Professional reception, mail handling, and concierge support ensure seamless operations.",
          },
          {
            title: "Designed to Scale with You",
            content:
              "Flexible agreements and modular spaces that grow with your business needs.",
          },
        ]}
        ctaText="Schedule Call"
        ctaVariant="secondary"
      />
      <ImpactSection
        eyebrow="IMPACT"
        title="Built for Business, Crafted for Growth"
        stats={impactStats}
      />
      <div className="mx-auto max-w-6xl px-6 py-8 lg:!py-12">
        <PlanCard
          heading="Scaling Office Culture with Ford Pro Charging"
          description="When Ford Pro needed a space that echoed their EV‑innovation culture, ClayWorks delivered a refined, hybrid-fit workspace aligned with their values and growth trajectory. The space now boosts engagement and reflects their brand identity."
          imageSrc="/images/study.png"
          imageAlt="Ford Pro office space"
          tags={[
            { label: "Banking" },
            { label: "Sourcing" },
            { label: "Office Management" },
          ]}
          ctaText="Read This Case Study"
          ctaVariant="link"
          imagePosition="left"
          className="w-full"
        />
      </div>
      <CaseStudies caseStudies={caseStudiesData} />
      <LeadershipSection
        eyebrow="LEADERSHIP"
        title="Driven by Prolific Minds, Led by Experience"
        leaders={leaders}
      />

      <TestimonialsSection />
      <ImageContentWithCards
        imagePosition="left"
        imageSrc="/images/location.png"
        imageAlt="Location map"
        eyebrow="WHERE WE'RE LOCATED"
        title="Neighbourhood Workspaces Across Bengaluru"
        description="Each Clayworks location is chosen to reduce commute stress, integrate with its neighbourhood, and support everyday work life."
        cards={locationCards}
        ctaText="Read Client Stories"
        ctaTextMobile="Explore All Locations"
        cardsOverlapImage={true}
      />
      <ContactUs />

      <BlogSection blogPosts={blogPosts} />
    </div>
  );
};

export default AboutUsPage;

