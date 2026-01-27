import type { Metadata } from "next";
import { draftMode } from "next/headers";

import {
  caseStudiesData as defaultCaseStudiesData,
  faqCategories as defaultFaqCategories,
  blogPostsData as defaultBlogPostsData,
  offerCards,
  processSteps,
  reasonsData,
} from "@/db/data";
import {
  getBlogPosts,
  getCaseStudies,
  getFAQCategories,
  getTestimonials,
  getStrapiImageUrl,
} from "@/app/lib/strapi";
import { PhilosophySection } from "../../components/features/about/Philosophy";
import { BlogSection } from "../../components/features/blog/BlogSection";
import CaseStudies from "../../components/features/services/CaseStudies";
import { ContactUs } from "../../components/features/services/ContactUs";
import { FAQSection } from "../../components/features/services/FAQ";
import { CTASection } from "../../components/features/services/GuideSection";
import { OffersSection } from "../../components/features/services/Offers";
import { ProcessOverview } from "../../components/features/services/ProcessOverview";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";
import BuiltToSuit from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Built to Suit",
  description:
    "Transform raw space into a custom office that reflects your culture, supports your workflows, and scales with your ambition.",
  openGraph: {
    title: "Built to Suit Offices - ClayWorks",
    description:
      "Custom office spaces built from the ground up. Your brand, your culture, your workspace.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/built-to-suit`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/buildtosuitbanner.png",
        width: 1200,
        height: 630,
        alt: "Built to Suit Office Spaces",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Built to Suit Offices - ClayWorks",
    description:
      "Custom office spaces built from the ground up. Your brand, your culture, your workspace.",
    images: ["/images/buildtosuitbanner.png"],
  },
};

const BuiltToSuitPage = async () => {
  // Check for preview mode
  const { isEnabled } = await draftMode();
  const preview = isEnabled;

  // Fetch data from Strapi
  const [
    faqCategoriesData,
    blogPostsFromStrapi,
    caseStudiesFromStrapi,
    testimonialsData
  ] = await Promise.all([
    getFAQCategories(preview),
    getBlogPosts({ featured: true, limit: 4, preview }),
    getCaseStudies({ limit: 6, preview }),
    getTestimonials({ featured: true, limit: 10, preview })
  ]);

  // Map FAQ categories to match the expected format with nested FAQs
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
            items={[{ label: "Home", href: "/" }, { label: "Built to Suit" }]}
          />
        </div>
        <BuiltToSuit
          layout="image-left"
          badge="BUILT-TO-SUIT"
          title="Your Brand, Built from the Ground Up"
          description="Transform raw space into a custom office that reflects your culture, supports your workflows, and scales with your ambition."
          mainImage={{
            src: "/images/buildtosuitbanner.png", // You can replace this with the actual image from your design
            alt: "Professionals reviewing blueprints in a modern office",
            placeholder: "Modern Office Space",
          }}
          showForm={true}
          dateOptions={[
            { value: "", label: "Date" },
            { value: "today", label: "Today" },
            { value: "tomorrow", label: "Tomorrow" },
            { value: "this-week", label: "This Week" },
            { value: "next-week", label: "Next Week" },
            { value: "custom", label: "Choose date..." },
          ]}
          guestsOptions={[
            { value: "10:00 am - 10:30 am", label: "10:00 am - 10:30 am" },
            { value: "11:00 am - 11:30 am", label: "11:00 am - 11:30 am" },
            { value: "2:00 pm - 2:30 pm", label: "2:00 pm - 2:30 pm" },
            { value: "3:00 pm - 3:30 pm", label: "3:00 pm - 3:30 pm" },
            { value: "4:00 pm - 4:30 pm", label: "4:00 pm - 4:30 pm" },
          ]}
          buttonText="Schedule Call"
          buttonTextMobile="Schedule Call"
          buttonColor="bg-brand-primary"
          buttonHoverColor="hover:bg-brand-primary-hover"
        />
      </div>
      <CaseStudies caseStudies={caseStudiesData} />
      <ProcessOverview
        eyebrow="PROCESS OVERVIEW"
        title="A Turnkey Journey to Your Perfect Office"
        steps={processSteps}
      />
      <WhyChooseUsSection
        eyebrow="WHY CHOOSE US"
        title="Purpose‑Built, Performance‑Driven"
        imageSrc="/images/meeting.jpg"
        imageAlt="Meeting room workspace"
        ctaText="Schedule Call"
        items={reasonsData}
        mode="accordion"
      />
      <PhilosophySection
        eyebrow="PHILOSOPHY"
        title="The Workspace as an Experience™ approach"
        description1="WaaE™ is our proprietary model that combines strategic location selection, custom design, and seamless management into one powerful, business-ready solution."
        description2="We don't just hand over real estate. We deliver workspaces that actively support performance, culture, and retention."
      />
      <OffersSection
        title="What WaaE™ Offers Your Business"
        centerImage={{
          src: "/images/star.png",
          alt: "Trophy",
        }}
        cards={offerCards}
      />

      <TestimonialsSection testimonials={testimonialsData} />

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

export default BuiltToSuitPage;
