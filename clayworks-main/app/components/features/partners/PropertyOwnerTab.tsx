import React from "react";
import { ProcessStepCard } from "./ProcessStepCard";
import { PartnerLogos } from "./PartnerLogos";
import { PartnerContactForm } from "./PartnerContactForm";

interface PropertyOwnerTabProps {
  contactFormTitle?: string;
}

export function PropertyOwnerTab({ contactFormTitle }: PropertyOwnerTabProps) {
  const processSteps = [
    {
      stepNumber: 1,
      title: "Property Evaluation",
      description:
        "Gauge the earning potential of the property by partnering with us. We will first evaluate the property based on key parameters.",
    },
    {
      stepNumber: 2,
      title: "Begin Partnership",
      description:
        "Unlock that potential by starting a long-term partnership and signing an agreement with us.",
    },
    {
      stepNumber: 3,
      title: "Revamp & Renew",
      description:
        "Our team of designers and project experts will create the most flexible infrastructure at the optimum cost. You can also avail our help with financing if needed.",
    },
    {
      stepNumber: 4,
      title: "Welcome Quality Occupiers And Boost Revenue",
      description:
        "Our partnerships with leading companies and our thorough screening process ensures only the best occupiers and a stable lease, besides the higher yield on your asset.",
    },
    {
      stepNumber: 5,
      title: "Relax, We've Got Asset Management Covered",
      description:
        "Our dedicated asset management team handles cleaning, repairs, maintenance, and updates, protecting and extending the life of your investment.",
    },
  ];

  const mediaLogos = [
    {
      src: "/images/times.png",
      alt: "ET The Economic Times",
      width: 250,
      height: 100,
    },
    {
      src: "/images/india.png",
      alt: "BW Businessworld",
      width: 250,
      height: 100,
    },
    { src: "/images/hindu.png", alt: "The Hindu", width: 250, height: 100 },
  ];

  return (
    <div className="bg-primary">
      {/* Header Section */}
      <section className="py-12 md:!py-16 lg:!py-20">
        <div className="container mx-auto px-6">
          <div className="w-full text-center">
            <p className="text-base md:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
              FOR PROPERTY OWNERS
            </p>
            <h1 className="text-3xl md:!text-4xl lg:!text-[40px] font-inter-medium text-brand-secondary mb-6 leading-tight">
              Unlock the Potential of Your Property
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-sm md:!text-sm text-brand-secondary max-w-xl mx-auto font-inter-normal leading-relaxed text-left">
                Transform your commercial property into a ClayWorks workspace.
                With minimal effort on your part, you unlock exceptional
                financial returns and long-term value.
              </p>
              <p className="text-sm md:!text-sm text-brand-secondary max-w-xl mx-auto font-inter-normal leading-relaxed text-left">
                Experience the benefits firsthand and become a key player in
                reshaping India's real estate landscape.
              </p>
            </div>

            {/* Media Partner Logos */}
            <PartnerLogos logos={mediaLogos} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className=" bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full text-center">
            {/* Header */}
            <div className="mb-8 md:mb-12">
              <p className="text-base md:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
                HOW IT WORKS
              </p>
              <h2 className="text-3xl md:!text-3xl lg:!text-[40px] font-inter-medium text-brand-secondary">
                Our Process is Designed to Keep it Easy
              </h2>
            </div>

            {/* Process Steps Grid */}
            <ol
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
              role="list"
            >
              {processSteps.map((step) => (
                <li key={step.stepNumber} role="listitem">
                  <ProcessStepCard
                    stepNumber={step.stepNumber}
                    title={step.title}
                    description={step.description}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <PartnerContactForm title={contactFormTitle} />
    </div>
  );
}
