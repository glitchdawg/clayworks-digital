import type { Metadata } from "next";
import { draftMode } from "next/headers";
import HeroBanner from "./components/features/workspace/HeroBanner";
import ExploreSection from "./components/features/workspace/ExploreSection";
import CoWorkingSpaces from "./components/features/workspace/CoWorkingSpaces";
import { OurAdvantage } from "./components/features/services/OurAdvantage";
import { WorkspacesSection } from "./components/features/workspace/Workspace";
import { CTASection } from "./components/features/services/GuideSection";
import { TourSection } from "./components/features/workspace/TourSection";
import TestimonialsSection from "./components/features/testimonials/Testimonial";
import PartnersSection from "./components/features/partners/Partner";
import { ImageContentWithCards } from "./components/layout/Section/ImageContentWithCards";
import { BlogSection } from "./components/features/blog/BlogSection";
import { locationCards as defaultLocationCards, blogPostsData as defaultBlogPosts } from "@/db/data";
import {
  getHeroSection,
  getLocations,
  getTestimonials,
  getBlogPosts,
  getPartners,
  getStrapiImageUrl
} from "@/app/lib/strapi";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover premium coworking spaces, private offices, and custom workspace solutions in Bangalore. Flexible plans, prime locations, and enterprise-grade amenities.",
  openGraph: {
    title: "ClayWorks - Premium Coworking Spaces in Bangalore",
    description:
      "Flexible workspace solutions for startups and enterprises. Premium coworking spaces, private offices, and custom workspace solutions.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in",
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/clayworkspace.jpg",
        width: 1200,
        height: 630,
        alt: "ClayWorks Coworking Space",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClayWorks - Premium Coworking Spaces in Bangalore",
    description:
      "Flexible workspace solutions for startups and enterprises. Premium coworking spaces, private offices, and custom workspace solutions.",
    images: ["/images/clayworkspace.jpg"],
  },
};

export default async function Home() {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch data from Strapi
  const [
    heroData,
    locationsData,
    testimonialsData,
    blogPostsData,
    partnersData
  ] = await Promise.all([
    getHeroSection('home', preview),
    getLocations({ featured: true, limit: 4, preview }),
    getTestimonials({ featured: true, limit: 10, preview }),
    getBlogPosts({ featured: true, limit: 4, preview }),
    getPartners({ featured: true, preview })
  ]);

  // Map Locations to Card format
  const locationCards = locationsData.length > 0
    ? locationsData.map(loc => ({
      title: loc.title || loc.name,
      address: loc.address,
      travelTime: loc.travelTime || "",
      distance: loc.distance || "",
      hasPowerBackup: loc.hasPowerBackup
    }))
    : defaultLocationCards;

  // Map BlogPosts to BlogCard format
  const blogPosts = blogPostsData.length > 0
    ? blogPostsData.map(post => ({
      image: getStrapiImageUrl(post.featuredImage) || "/images/workspace.jpg",
      title: post.title,
      description: post.excerpt || "",
      author: post.author || "ClayWorks Team",
      date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "",
      link: `/blogs/${post.slug}`
    }))
    : defaultBlogPosts;

  return (
    <div className="font-inter min-h-screen bg-white">
      <HeroBanner data={heroData} />
      <ExploreSection />
      <CoWorkingSpaces />
      <OurAdvantage />
      <WorkspacesSection />
      <CTASection
        eyebrow="INSIGHTS FROM THE WORLD OF WORK"
        title="Thinking Beyond the Desk"
        description="Perspectives on workspace design, productivity, culture, and how environments shape the way teams work."
        image={{
          src: "/images/guide.png",
          alt: "Beyond Desks Revenue Guide",
        }}
        imagePosition="left"
        formFields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Your Email ID",
            required: true,
          },
        ]}
        ctaText="Download PDF Guide"
      />

      <ImageContentWithCards
        imagePosition="left"
        imageSrc="/images/location.png"
        imageAlt="Location map"
        eyebrow="OUR LOCATIONS"
        title="Neighbourhood Workspaces Across Bengaluru"
        description="Each Clayworks location is chosen to reduce commute stress, integrate with its neighbourhood, and support everyday work life."
        cards={locationCards}
        ctaText="Read Client Stories"
        ctaTextMobile="Explore All Locations"
        cardsOverlapImage={true}
      />
      <PartnersSection partners={partnersData} />
      <TestimonialsSection testimonials={testimonialsData} />
      <TourSection
        sectionTitle="Experience Humansense at Work"
        heading="Thoughtfully designed environments"
        description="Where work feels lighter, calmer, and more human. Watch our short tour and explore how we redefine the workspace experience."
        imageSrc="/images/modern.png"
        videoUrl="https://www.youtube.com/embed/abc123xyz"
        layout="right"
      />
      <BlogSection blogPosts={blogPosts} />
    </div>
  );
}
