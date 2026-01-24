import type { Metadata } from "next";
import { draftMode } from "next/headers";
import VirtualOffice from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";
import { PricingCard } from "../../components/features/pricing/PricingCard";
import { PricingSection } from "../../components/features/pricing/PricingSection";
import { PlanComparisonCard } from "../../components/features/pricing/PlanComparison";
import { PlanComparisonSection } from "../../components/features/pricing/PlanComparisonSection";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import { FAQSection } from "../../components/features/services/FAQ";
import { ContactUs } from "../../components/features/services/ContactUs";
import { BlogSection } from "../../components/features/blog/BlogSection";
import { blogPostsData as defaultBlogPostsData, faqCategories as defaultFaqCategories } from "@/db/data";
import {
  getBlogPosts,
  getFAQCategories,
  getTestimonials,
  getStrapiImageUrl,
} from "@/app/lib/strapi";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";

export const metadata: Metadata = {
  title: "Virtual Office",
  description:
    "Business address without overheads. Get a prestigious Bangalore address for your brand, mail handling, GST registration, and company registration support.",
  openGraph: {
    title: "Virtual Office - ClayWorks",
    description:
      "Professional business address in Bangalore. GST registration, company registration, and mail handling services.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/virtual-office`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/discussion.png",
        width: 1200,
        height: 630,
        alt: "Virtual Office Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Office - ClayWorks",
    description:
      "Professional business address in Bangalore. GST registration, company registration, and mail handling services.",
    images: ["/images/discussion.png"],
  },
};

const VirtualOfficePage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch data from Strapi
  const [
    faqCategoriesData,
    blogPostsFromStrapi,
    testimonialsData
  ] = await Promise.all([
    getFAQCategories(preview),
    getBlogPosts({ featured: true, limit: 4, preview }),
    getTestimonials({ featured: true, limit: 10, preview })
  ]);

  // Map FAQ categories to match the expected format
  const faqCategories = faqCategoriesData.length > 0
    ? faqCategoriesData.map(cat => ({
      id: cat.slug,
      label: cat.name,
      faqs: (cat.faqs || []).map(faq => ({
        question: faq.question,
        answer: faq.answer,
      })),
    }))
    : defaultFaqCategories;

  // Map Strapi BlogPosts to BlogSection format with fallback
  const blogPostsData = blogPostsFromStrapi.length > 0
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

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Virtual Office" }]}
          />
        </div>
        <VirtualOffice
          mainImage={{
            src: "/images/discussion.png",
            alt: "Day Pass Workspace",
          }}
          layout="image-left"
          badge="VIRTUAL OFFICE"
          title="Business Address Without Overheads"
          description="Transform raw space into a custom office that reflects your culture, supports your workflows, and scales with your ambition."
          dateOptions={[
            { value: "", label: "Date" },
            { value: "today", label: "Today" },
            { value: "tomorrow", label: "Tomorrow" },
            { value: "this-week", label: "This Week" },
            { value: "custom", label: "Choose date..." },
          ]}
          guestsOptions={[
            { value: "just-me", label: "Just me" },
            { value: "2", label: "2 people" },
            { value: "3-5", label: "3-5 people" },
            { value: "5+", label: "5+ people" },
          ]}
          buttonText="Book Day Pass"
          buttonTextMobile="Explore"
          buttonColor="bg-brand-primary"
          buttonHoverColor="hover:bg-brand-primary-hover"
        />
      </div>

      <PricingSection
        eyebrow="EXPLORE PLANS"
        title="Plans That Fit Your Stage of Growth"
        columns={3}
      >
        <PricingCard
          imageSrc="/images/business.png"
          imageAlt="Business Address Plan"
          title="Business Address Plan"
          description="A professional Bangalore address for your brand and mail. Perfect for websites, visiting cards, and client trust."
          badges={[{ label: "Solo founders" }, { label: "Freelancers" }]}
          price="₹999"
          pricePrefix="From"
          priceSuffix="/month"
          ctaText="Purchase Plan"
          ctaVariant="outline"
        />

        <PricingCard
          imageSrc="/images/gst.png"
          imageAlt="GST Registration Plan"
          title="GST Registration Plan"
          description="GST-ready address with verified docs for registration. Includes mail handling + official compliance support."
          badges={[{ label: "Expanding businesses" }]}
          price="₹1,299"
          pricePrefix="From"
          priceSuffix="/month"
          ctaText="Purchase Plan"
          ctaVariant="outline"
        />

        <PricingCard
          imageSrc="/images/locate.png"
          imageAlt="Company Registration Plan"
          title="Company Registration Plan"
          description="Government-compliant address for incorporation. Includes utility bill, NOC, rental agreement & more."
          badges={[{ label: "New startups" }]}
          price="₹1,499"
          pricePrefix="From"
          priceSuffix="/month"
          ctaText="Purchase Plan"
          ctaVariant="outline"
        />
      </PricingSection>
      <PlanComparisonSection title="Need Little Extra" columns={2}>
        {/* Premium Plan */}
        <PlanComparisonCard
          eyebrow="PREMIUM PLAN"
          title="Startups Wanting More"
          features={[
            {
              imageSrc: "/images/icons/businesslocation.png",
              imageAlt: "Business location",
              title: "Business Address, GST & Company Registration",
            },
            {
              imageSrc: "/images/icons/userbadge.png",
              imageAlt: "User badge",
              title: "2 days/week",
              subtitle: "workspace at any location",
            },
            {
              imageSrc: "/images/icons/meetingroom.png",
              imageAlt: "Meeting room",
              title: "2 hrs/week",
              subtitle: "meeting room at any location",
            },
          ]}
          ctaText="Know More"
        />

        {/* Elite Plan */}
        <PlanComparisonCard
          eyebrow="ELITE PLAN"
          title="Accelerating Businesses"
          features={[
            {
              imageSrc: "/images/icons/businesslocation.png",
              imageAlt: "Business location",
              title: "Business Address, GST & Company Registration",
            },
            {
              imageSrc: "/images/icons/userbadge.png",
              imageAlt: "User badge",
              title: "5 days/week",
              subtitle: "workspace at any location",
            },
            {
              imageSrc: "/images/icons/meetingroom.png",
              imageAlt: "Meeting room",
              title: "10 hrs/week",
              subtitle: "meeting room at any location",
            },
          ]}
          sponsorBadge={{
            text: "Endpoint Protection by",
            logo: "/images/badge.png",
            logoAlt: "Trend Micro",
          }}
          ctaText="Know More"
        />
      </PlanComparisonSection>
      <WhyChooseUsSection
        eyebrow="WHY THIS WORKS"
        title="The ClayWorks Advantage"
        imageSrc="/images/type.png"
        imageAlt="Team collaboration"
        imagePosition="left"
        mode="list"
        items={[
          {
            title: "Prestigious Bangalore Address",
            description: "that projects trust and boosts your image",
          },
          {
            title: "Reception & Concierge Support",
            description: "with real people managing your mail and packages",
          },
          {
            title: "Scalable Plans",
            description:
              "to help you pay for what you need now, add more when you grow",
          },
          {
            title: "On-Demand Workspaces",
            description: "with book desks, cabins or meeting rooms anytime",
          },
          {
            title: "Hassle-Free Compliance",
            description: "so you focus on what you do best and we do the rest",
          },
        ]}
        ctaText="Schedule Call"
        ctaVariant="secondary"
      />
      <TestimonialsSection testimonials={testimonialsData} />
      <FAQSection
        eyebrow="FAQS"
        title="Everything There's to Know"
        categories={faqCategories}
      />
      <ContactUs />
      <BlogSection blogPosts={blogPostsData} />
    </div>
  );
};

export default VirtualOfficePage;
