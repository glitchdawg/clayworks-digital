import type { Metadata } from "next";
import { draftMode } from "next/headers";

import { blogPostsData as defaultBlogPostsData, faqCategories as defaultFaqCategories, spaces } from "@/db/data";
import {
  getBlogPosts,
  getFAQCategories,
  getTestimonials,
  getStrapiImageUrl,
} from "@/app/lib/strapi";
import { BlogSection } from "../../components/features/blog/BlogSection";
import { ContactUs } from "../../components/features/services/ContactUs";
import { FAQSection } from "../../components/features/services/FAQ";
import { OfferingsSection } from "../../components/features/services/Offerings";
import { WhyChooseUsSection } from "../../components/features/services/WhyChoose";
import TestimonialsSection from "../../components/features/testimonials/Testimonial";
import SpaceCarousel from "../../components/features/workspace/SpaceCard";
import MeetingRooms from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Meeting Rooms",
  description:
    "Book professional meeting rooms in Bangalore. Flexible scheduling, premium amenities, and spaces designed for productive collaboration.",
  openGraph: {
    title: "Meeting Rooms - ClayWorks",
    description:
      "Professional meeting rooms with flexible scheduling. Perfect for client meetings, team collaboration, and presentations.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"}/meeting-rooms`,
    siteName: "ClayWorks",
    images: [
      {
        url: "/images/meetingroom.png",
        width: 1200,
        height: 630,
        alt: "Professional Meeting Rooms",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meeting Rooms - ClayWorks",
    description:
      "Professional meeting rooms with flexible scheduling. Perfect for client meetings, team collaboration, and presentations.",
    images: ["/images/meetingroom.png"],
  },
};

const page = async () => {
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
            items={[{ label: "Home", href: "/" }, { label: "Meeting Rooms" }]}
          />
        </div>
        <MeetingRooms
          layout="image-left"
          badge="MEETING ROOMS"
          title="Your Brand, Built from the Ground Up"
          description="Transform raw space into a custom office that reflects your culture, supports your workflows, and scales with your ambition."
          mainImage={{
            src: "/images/meetingroom.png", // You can replace this with the actual image from your design
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
      <SpaceCarousel
        badge="EXPLORE"
        title="Elevate Every Meeting"
        spaces={spaces}
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
      <OfferingsSection />
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

export default page;
