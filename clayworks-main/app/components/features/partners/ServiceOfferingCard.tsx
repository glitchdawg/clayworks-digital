import React from "react";
import Link from "next/link";

interface ServiceOfferingCardProps {
  title: string;
  description: string;
  viewMoreHref?: string;
}

export function ServiceOfferingCard({
  title,
  description,
  viewMoreHref = "#",
}: ServiceOfferingCardProps) {
  return (
    <article
      className="bg-primary rounded-2xl p-6 md:p-8 h-full flex flex-col"
      style={{
        boxShadow:
          "0px 4px 9px 0px #0000000D, 0px 16px 16px 0px #0000000A, 0px 36px 22px 0px #00000008, 0px 65px 26px 0px #00000003, 0px 101px 28px 0px #00000000",
      }}
    >
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-inter-semibold text-brand-secondary mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-brand-secondary font-inter-normal leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {/* View More Link */}
      <Link
        href={viewMoreHref}
        className="text-sm md:text-base font-inter-medium text-brand-primary hover:text-brand-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
        aria-label={`View more about ${title}`}
      >
        View more
      </Link>
    </article>
  );
}
