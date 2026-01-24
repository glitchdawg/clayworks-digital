import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/ui/breadcrumb";
import LocationBanner from "@/app/components/layout/PageHero/InternalBanner";
import { locationsDetail } from "@/db/locations";
import { OfferingsSection } from "@/app/components/features/services/Offerings";
import { PricingSection } from "@/app/components/features/pricing/PricingSection";
import { PricingCard } from "@/app/components/features/pricing/PricingCard";
import { PlanComparisonSection } from "@/app/components/features/pricing/PlanComparisonSection";
import { PlanComparisonCard } from "@/app/components/features/pricing/PlanComparison";
import TestimonialsSection from "@/app/components/features/testimonials/Testimonial";
import { FAQSection } from "@/app/components/features/services/FAQ";
import { BlogSection } from "@/app/components/features/blog/BlogSection";
import { blogPostsData, faqCategories } from "@/db/data";
import { ContactUs } from "@/app/components/features/services/ContactUs";
import { OtherLocationsSection } from "@/app/components/features/locations/OtherLocationsSection";
import { allLocationCards } from "@/db/locationCards";
import { LocationProximity } from "@/app/components/features/locations/LocationProximity";
import LocationImageCards from "@/app/components/features/locations/LocationImageCards";

type Params = {
  slug: string;
};

export function generateStaticParams(): Params[] {
  return locationsDetail.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsDetail.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found",
      description: "The requested location could not be found.",
    };
  }

  return {
    title: `${location.title} - Coworking Space | ClayWorks`,
    description: `${location.description} Located in ${
      location.subtitle || "Bangalore"
    }. Premium coworking space with flexible plans and enterprise-grade amenities.`,
    openGraph: {
      title: `${location.title} - ClayWorks Coworking Space`,
      description: location.description,
      url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://clayworks.in"
      }/location/${slug}`,
      siteName: "ClayWorks",
      images: location.mainImage
        ? [
            {
              url: location.mainImage.src,
              width: 1200,
              height: 630,
              alt: location.mainImage.alt,
            },
          ]
        : undefined,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${location.title} - ClayWorks`,
      description: location.description,
      images: location.mainImage ? [location.mainImage.src] : undefined,
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const location = locationsDetail.find((l) => l.slug === slug);
  if (!location) return notFound();

  const otherLocations = allLocationCards
    .filter((c) => c.slug !== slug)
    .slice(0, 4)
    .map((c) => ({
      title: c.title,
      address: c.address,
      travelTime: c.travelTime,
      distance: c.distance,
      hasPowerBackup: c.hasPowerBackup,
    }));

  return (
    <div className=" bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto">
          <Breadcrumb items={location.breadcrumbs} />
        </div>
        <LocationBanner
          layout="image-left"
          subtitle={location.subtitle}
          title={location.title}
          description={location.description}
          rating={location.rating}
          operatingHours={location.operatingHours}
          mainImage={location.mainImage}
          tabs={[
            { label: "Day Pass", value: "day-pass", active: true },
            { label: "Private office", value: "private-office" },
            { label: "Meeting Room", value: "meeting-room" },
          ]}
          dateOptions={[
            { value: "date", label: "Date" },
            { value: "today", label: "Today" },
            { value: "tomorrow", label: "Tomorrow" },
          ]}
          guestsOptions={[
            { value: "just-me", label: "Just Me" },
            { value: "2-5", label: "2-5 People" },
            { value: "6-10", label: "6-10 People" },
          ]}
          buttonText="Check Availability"
          buttonTextMobile="Check Availability"
        />
      </div>
      <LocationImageCards
        images={[
          { src: "/images/workspace.jpg", alt: "Workspace overview" },
          { src: "/images/meeting.jpg", alt: "Meeting room" },
          { src: "/images/workspace1.jpg", alt: "Modern workspace" },
          { src: "/images/workspace2.jpg", alt: "Collaborative area" },
        ]}
        description="Step into Opus and discover flexible layouts, collaborative lounges, and a buzzing café atmosphere. With curated events and access to lifestyle amenities in the same building, every workday becomes an experience worth looking forward to"
      />
      <OfferingsSection />
      {location.pricing && (
        <PricingSection
          eyebrow={location.pricing.eyebrow}
          title={location.pricing.title}
          columns={3}
        >
          {location.pricing.cards.map((card, idx) => (
            <PricingCard
              key={idx}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              title={card.title}
              description={card.description}
              badges={card.badges}
              price={card.price}
              pricePrefix={card.pricePrefix}
              priceSuffix={card.priceSuffix}
              ctaText={card.ctaText}
              ctaVariant={card.ctaVariant}
              featured={card.featured}
            />
          ))}
        </PricingSection>
      )}
      {location.planComparison && (
        <PlanComparisonSection
          title={location.planComparison.title}
          columns={location.planComparison.columns || 2}
        >
          {location.planComparison.cards.map((card, idx) => (
            <PlanComparisonCard
              key={idx}
              eyebrow={card.eyebrow}
              title={card.title}
              features={card.features.map((f, i) => ({
                imageSrc:
                  f.icon === "building"
                    ? "/images/icons/businesslocation.png"
                    : f.icon === "user"
                      ? "/images/icons/userbadge.png"
                      : "/images/icons/meetingroom.png",
                imageAlt:
                  f.icon === "building"
                    ? "Building"
                    : f.icon === "user"
                      ? "User Badge"
                      : "Meeting Room",
                title: f.title,
                subtitle: f.subtitle,
              }))}
              sponsorBadge={card.sponsorBadge}
              ctaText={card.ctaText}
            />
          ))}
        </PlanComparisonSection>
      )}
      {location.proximity && (
        <LocationProximity
          title={location.proximity.title}
          mapImage={location.proximity.mapImage}
          items={location.proximity.items}
        />
      )}
      <TestimonialsSection />
      <FAQSection
        eyebrow="FAQS"
        title="Everything There's to Know"
        categories={faqCategories}
      />
      <ContactUs />
      <OtherLocationsSection
        title="More Spaces Available to You"
        locations={otherLocations}
        viewAllHref="/locations"
      />
      <BlogSection blogPosts={blogPostsData} />
    </div>
  );
}
