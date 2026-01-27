import type { Metadata } from "next";
import { draftMode } from "next/headers";
import PrivateOffice from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";
import {
  blogPostsData as defaultBlogPostsData,
  faqCategories as defaultFaqCategories,
  offerCards,
  processPrivateOffice,
  spaces,
} from "@/db/data";
import {
  getBlogPosts,
  getFAQCategories,
  getTestimonials,
  getStrapiImageUrl,
} from "@/app/lib/strapi";
import SpaceCarousel from "../../components/features/workspace/SpaceCard";
import { CTASection } from "../../components/features/services/GuideSection";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import { ProcessOverview } from "../../components/features/services/ProcessOverview";
import { PlanCard } from "../../components/features/pricing/PlanCard";
import { PhilosophySection } from "../../components/features/about/Philosophy";
import { OffersSection } from "../../components/features/services/Offers";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";
import { FAQSection } from "../../components/features/services/FAQ";
import { ContactUs } from "../../components/features/services/ContactUs";
import { BlogSection } from "../../components/features/blog/BlogSection";

export const metadata: Metadata = {
  title: "Private Office",
  description:
    "Private office spaces designed around your team. Fully managed, branded workspace without the headaches of ownership. Custom-fit and ready to move in.",
  openGraph: {
    title: "Private Office Spaces - ClayWorks",
    description:
      "Fully managed private offices in Bangalore. Custom-fit to your team, branded to your culture, ready to move in.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/private-office`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/client.png",
        width: 1200,
        height: 630,
        alt: "Private Office Spaces",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Office Spaces - ClayWorks",
    description:
      "Fully managed private offices in Bangalore. Custom-fit to your team, branded to your culture, ready to move in.",
    images: ["/images/client.png"],
  },
};

const PrivateOfficePage = async () => {
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
            items={[{ label: "Home", href: "/" }, { label: "Private Office" }]}
          />
        </div>
        <PrivateOffice
          mainImage={{
            src: "/images/client.png",
            alt: "Day Pass Workspace",
          }}
          layout="image-right"
          badge="MANAGED OFFICES"
          title="Private Office Spaces Designed Around Your Team"
          description="A fully managed, branded workspace—without the headaches of ownership. Custom-fit to your team, and ready to move in."
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
      <SpaceCarousel
        badge="EXPLORE"
        title="Pick Your Space to Thrive Today"
        spaces={spaces}
      />
      <CTASection
        eyebrow="SEAT CALCULATOR"
        title="Learn What Your Seats Are Really Costing You"
        description="Know how much it truly costs to sustain each seat in your current office. And see benefits we can offer at competitive costs"
        image={{
          src: "/images/home.png",
          alt: "Office workspace",
        }}
        imagePosition="left"
        formFields={[
          {
            id: "seats",
            label: "Number of Seats",
            type: "select",
            placeholder: "10 - 30",
            required: true,
            options: [
              { value: "10-30", label: "10 - 30" },
              { value: "31-50", label: "31 - 50" },
              { value: "51-100", label: "51 - 100" },
              { value: "100+", label: "100+" },
            ],
          },
        ]}
        ctaText="Let's Calculate"
        ctaButtonColor="bg-[#E07B39] hover:bg-[#D06A28]"
      />
      <WhyChooseUsSection
        eyebrow="WHY CHOOSE US"
        title="Purpose-Built, Performance-Driven"
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
      <ProcessOverview
        eyebrow="PROCESS OVERVIEW"
        title="A Turnkey Journey to Your Perfect Office"
        steps={processPrivateOffice}
      />

      <section className="py-10 lg:py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Featured Case Study - Large */}
          <div className="mb-8">
            <PlanCard
              sectionEyebrow="CASE STUDIES"
              sectionTitle="Proof of Success"
              heading="Scaling Office Culture with Ford Pro Charging"
              description="When Ford Pro needed a space that echoed their EV-innovation culture, ClayWorks delivered a refined, hybrid-fit workspace aligned with their values and growth trajectory. The space now boosts engagement and reflects their brand identity."
              imageSrc="/images/study.png"
              imageAlt="Ford Pro"
              tags={[
                { label: "Branding" },
                { label: "Sourcing" },
                { label: "Office Management" },
              ]}
              ctaText="Read This Case Study"
              ctaVariant="link"
              size="large"
            />
          </div>

          {/* Additional Case Studies - Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlanCard
              heading="From Factory Floor to Flagship Workspace"
              description="ClayWorks transformed a historic BPL assembly plant into ClayWorks Create—a sustainable hybrid campus..."
              tags={[{ label: "Branding" }, { label: "Construction" }]}
              ctaText="Read This Case Study"
              ctaVariant="link"
              className="h-full"
            />

            <PlanCard
              heading="Startup Growth, Simplified at Signzy"
              description="From a handful of seats to a 50+ seat enterprise-ready hub..."
              tags={[
                { label: "Location sourcing" },
                { label: "Brand integration" },
              ]}
              ctaText="Read This Case Study"
              ctaVariant="link"
              className="h-full"
            />
          </div>
        </div>
      </section>
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

export default PrivateOfficePage;
