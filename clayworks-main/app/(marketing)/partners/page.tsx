import type { Metadata } from "next";

import PartnersTabs from "../../components/features/partners/PartnersTabs";
import PartnersBanner from "../../components/layout/PageHero/InternalBanner";
import Breadcrumb from "../../components/ui/breadcrumb";

interface PartnersPageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with ClayWorks to unlock new value, transform your real estate, and shape the next era of Indian workspaces together.",
  openGraph: {
    title: "Partners - ClayWorks",
    description:
      "Turn Properties into Possibilities. Partner with ClayWorks to unlock new value, transform your real estate, and shape the next era of Indian workspaces together.",
    images: ["/images/talk.jpg"],
  },
};

const PartnersPage = async ({ searchParams }: PartnersPageProps) => {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  // Determine active tab from searchParams, default to 'property-owner'
  const activeTab = (params.tab === "broker" ? "broker" : "property-owner") as
    | "property-owner"
    | "broker";

  return (
    <div className="bg-white">
      <div className="pt-24 md:!pt-24 lg:!pt-28">
        <div className="container mx-auto px-6">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Partners" }]}
          />
        </div>
        <PartnersBanner
          mainImage={{
            src: "/images/talk.jpg",
            alt: "Partners discussing business opportunities",
            hasPlayButton: true,
          }}
          layout="image-left"
          title="Turn Properties into Possibilities"
          description="Partner with ClayWorks to unlock new value, transform your real estate, and shape the next era of Indian workspaces together."
          showForm={false}
          buttonText="Let's Talk"
          buttonTextMobile="Let's Talk"
          buttonColor="bg-[#E08B4F]"
          buttonHoverColor="hover:bg-[#D06A28]"
        />
      </div>
      <PartnersTabs
        activeTab={activeTab}
        propertyOwnerLabel="I'm a Property Owner"
        brokerLabel="I'm a Broker"
      />
    </div>
  );
};

export default PartnersPage;
