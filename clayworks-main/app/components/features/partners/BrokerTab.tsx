import React from "react";
import Image from "next/image";
import { ServiceOfferingCard } from "./ServiceOfferingCard";
import { BenefitCard } from "./BenefitCard";
import { PartnerLogos } from "./PartnerLogos";
import { PartnerContactForm } from "./PartnerContactForm";
import PartnersSection from "./Partner";

interface BrokerTabProps {
  contactFormTitle?: string;
}

export function BrokerTab({
  contactFormTitle = "Let's Help Your Clients Discover Their Ideal Office",
}: BrokerTabProps) {
  const serviceOfferings = [
    {
      title: "HyFlex™",
      description:
        "Companies have the option to choose the office model that best represents their needs. Our hybrid, flexible model, aka HyFlex™, is equipped to meet your clients where they are.",
      viewMoreHref: "#",
    },
    {
      title: "WaaE™",
      description:
        "Build not just an office, build a legacy with ClayWorks' unique offering WaaE™ (Workspace as an Experience). Our solutions are customised to reflect your client's unique company culture, providing their team with an experience over simply an office.",
      viewMoreHref: "#",
    },
    {
      title: "Spotch™",
      description:
        "We like to go above and beyond in our workspace management. Our selection of home office furniture is a great resource for WFH teams within the company.",
      viewMoreHref: "#",
    },
  ];

  const benefitStructure = [
    {
      title: "Initial Term up to 12 Months",
      description:
        "10% of total contract value. Includes month-to-month agreements.",
    },
    {
      title: "Initial Term Greater Than 12 Months",
      description:
        "The greater of either: 10% on months 1-12 + 2% on months 13-36 OR 5% of total contract value",
    },
    {
      title: "Renewals",
      description: "2% of total contract value on all additional months",
    },
    {
      title: "Expansions",
      description: "10% of total contract value on growth within the location",
    },
  ];

  const partnerLogos = [
    { src: "/images/viewsonic.png", alt: "ViewSonic", width: 120, height: 60 },
    { src: "/images/jio.png", alt: "Jio", width: 120, height: 60 },
    { src: "/images/intel.png", alt: "Intel", width: 120, height: 60 },
    { src: "/images/google.png", alt: "Google", width: 120, height: 60 },
  ];

  return (
    <div className="bg-primary">
      {/* Header Section */}
      <div className="py-12 md:!py-16 lg:!py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center text-center mb-6">
              <div>
                <p className="text-base md:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
                  FOR BROKERS
                </p>
                <h1 className="text-3xl md:!text-4xl lg:!text-[40px] font-inter-medium text-brand-secondary leading-tight">
                  The Clayworks Advantage
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Service Offering Cards */}
        <div className="py-2 md:!py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                role="list"
              >
                {serviceOfferings.map((service, index) => (
                  <li key={index} role="listitem">
                    <ServiceOfferingCard
                      title={service.title}
                      description={service.description}
                      viewMoreHref={service.viewMoreHref}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos */}
      <PartnersSection />

      {/* Benefit Structure Section */}
      <section className="py-6 md:!py-10 lg:!py-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className=" max-w-6xl mx-auto">
            {/* Header */}
            <div className="w-full text-center mb-8 md:mb-12">
              <p className="text-base md:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
                BENEFIT STRUCTURE
              </p>
              <h2 className="text-3xl md:!text-3xl lg:!text-[40px] font-inter-medium text-brand-secondary">
                We're Clear and Competitive
              </h2>
            </div>

            {/* Benefit Cards Grid */}
            <ul
              className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8"
              role="list"
            >
              {benefitStructure.map((benefit, index) => (
                <li key={index} role="listitem">
                  <BenefitCard
                    title={benefit.title}
                    description={benefit.description}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <PartnerContactForm title={contactFormTitle} />
    </div>
  );
}
