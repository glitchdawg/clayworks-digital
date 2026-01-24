import type { Metadata } from "next";
import { draftMode } from "next/headers";

import {
  blogPostsData as defaultBlogPostsData,
  elitePlanFeatures,
  faqCategories as defaultFaqCategories,
  locationCards as defaultLocationCards,
  reasonsData,
  spaces,
} from "@/db/data";
import {
  getBlogPosts,
  getFAQCategories,
  getTestimonials,
  getLocations,
  getStrapiImageUrl,
} from "@/app/lib/strapi";
import { BlogSection } from "../../components/features/blog/BlogSection";
import { ContactUs } from "../../components/features/services/ContactUs";
import { FAQSection } from "../../components/features/services/FAQ";
import { OfferingsSection } from "../../components/features/services/Offerings";
import { PlanCard } from "../../components/features/pricing/PlanCard";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";
import SpaceCarousel from "../../components/features/workspace/SpaceCard";
import { TourSection } from "../../components/features/workspace/TourSection";
import { ImageContentWithCards } from "../../components/layout/Section/ImageContentWithCards";
import DayPass from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Day Pass",
  description:
    "Book a day pass for flexible workspace access. Step in, plug in, and make the most of your day in a professional environment built for success.",
  openGraph: {
    title: "Day Pass - ClayWorks Coworking Space",
    description:
      "Flexible day pass access to premium coworking spaces in Bangalore. Book for today, tomorrow, or this week.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"
      }/day-pass`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/daypas.png",
        width: 1200,
        height: 630,
        alt: "Day Pass Workspace Access",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Day Pass - ClayWorks Coworking Space",
    description:
      "Flexible day pass access to premium coworking spaces in Bangalore. Book for today, tomorrow, or this week.",
    images: ["/images/daypas.png"],
  },
};

export default async function DayPassPage() {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch data from Strapi
  const [
    faqCategoriesData,
    blogPostsFromStrapi,
    locationsData,
    testimonialsData
  ] = await Promise.all([
    getFAQCategories(preview),
    getBlogPosts({ featured: true, limit: 4, preview }),
    getLocations({ featured: true, limit: 4, preview }),
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

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Day Pass" }]}
          />
        </div>
        <DayPass
          mainImage={{
            src: "/images/daypas.png",
            alt: "Day Pass Workspace",
          }}
          layout="image-left"
          badge="DAY PASS"
          title="Your Workspace, Anytime You Need It"
          description="Step in, plug in, and make the most of your day in a professional environment built for success."
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
          locationOptions={[
            { value: "", label: "Location" },
            { value: "downtown", label: "Downtown" },
            { value: "midtown", label: "Midtown" },
            { value: "uptown", label: "Uptown" },
          ]}
          buttonText="Book Day Pass"
          buttonTextMobile="Explore"
          buttonColor="bg-brand-primary"
          buttonHoverColor="hover:bg-brand-primary-hover"
        />
      </div>
      <SpaceCarousel
        badge="EXPLORE"
        title="Pick Your Space to Thrive Today"
        spaces={spaces}
      />
      <OfferingsSection />
      <WhyChooseUsSection
        eyebrow="WHY CHOOSE US"
        title="Purpose‑Built, Performance‑Driven"
        imageSrc="/images/meeting.jpg"
        imageAlt="Meeting room workspace"
        ctaText="Schedule Call"
        items={reasonsData}
        mode="accordion"
      />
      <TourSection
        sectionTitle="TAKE A TOUR"
        heading="What It Feels Like to Work Here"
        description="Take a virtual walk through our spaces and feel what your next workday could look like."
        imageSrc="/images/modern.png"
        videoUrl="https://www.youtube.com/embed/abc123xyz"
        layout="right"
      />
      <ImageContentWithCards
        imagePosition="right"
        imageSrc="/images/locationperson.jpg"
        imageAlt="Location map"
        eyebrow="LOCATIONS"
        title="Your Next Workplace Just a Ride Away"
        description="Step into workspaces that feel like a retreat, yet stay close to the city’s business pulse. Every ClayWorks address is easily reachable by cab, metro, or even a short stroll, with seamless access built into the experience."
        cards={locationCards}
        ctaText="Read all stories"
        ctaTextMobile="View All Locations"
        cardsOverlapImage={true}
      />
      <TestimonialsSection testimonials={testimonialsData} />
      <FAQSection
        eyebrow="FAQS"
        title="Everything There's to Know"
        categories={faqCategories}
      />
      <ContactUs />
      <PlanCard
        imagePosition="left"
        eyebrow="ELITE PLAN"
        heading="When You Need Something More"
        headingMobile="Accelerating Businesses"
        imageSrc="/images/plan.jpg"
        imageAlt="Professional woman working at desk"
        features={elitePlanFeatures}
        sponsorBadge={{
          text: "Endpoint Protection by",
          logo: "/images/badge.png",
          logoAlt: "Trend Micro",
        }}
        ctaText="Explore This Unique Plan"
        ctaTextMobile="Know More"
        className="container mx-auto"
        outerClassName="!py-12"
        cardRadius="3xl"
        buttonRadius="lg"
        customShadow="0px 43px 43px 0px #00000012"
      />

      <BlogSection blogPosts={blogPostsData} />
    </div>
  );
}
