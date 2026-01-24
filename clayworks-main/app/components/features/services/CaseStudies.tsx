"use client";

import type React from "react";

export interface CaseStudy {
  id: string;
  companyName: string;
  description: string;
  linkText: string;
  linkUrl?: string;
}

export interface CaseStudiesProps {
  caseStudies: CaseStudy[];
  className?: string;
  title?: string;
  subtitle?: string;
  onCaseStudyClick?: (caseStudy: CaseStudy) => void;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({
  caseStudies,
  className = "bg-white py-10 lg:py-16",
  title,
  subtitle,
  onCaseStudyClick,
}) => {
  const handleReadMore = (caseStudy: CaseStudy) => {
    if (onCaseStudyClick) {
      onCaseStudyClick(caseStudy);
      return;
    }

    if (!caseStudy.linkUrl) {
      return;
    }

    // Open external link with security attributes (noopener noreferrer)
    const link = document.createElement("a");
    link.href = caseStudy.linkUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={className}>
      <div className="container mx-auto ">
        {/* Desktop: 3-column layout with vertical separators */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-0 items-stretch" role="list">
            {caseStudies.map((caseStudy, index) => (
              <article
                key={caseStudy.id || index}
                className={`flex flex-col text-start px-8 py-4 h-full ${
                  index < caseStudies.length - 1
                    ? "border-r border-gray-200"
                    : ""
                }`}
                role="listitem"
              >
                {/* Company Name */}
                <h3 className="text-2xl font-inter-bold text-brand-secondary leading-tight mb-3">
                  {caseStudy.companyName}
                </h3>

                {/* Description */}
                <p className="text-gray-500 font-inter-normal text-base leading-relaxed mb-6 flex-grow">
                  {caseStudy.description}
                </p>

                {/* Read More Link */}
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => handleReadMore(caseStudy)}
                    className="text-brand-primary hover:text-brand-primary font-medium text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
                    aria-label={`Read more about ${caseStudy.companyName} case study`}
                  >
                    {caseStudy.linkText}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Tablet: 2-column layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-8" role="list">
            {caseStudies.map((caseStudy, index) => (
              <article
                key={caseStudy.id || index}
                className={`text-center px-4 py-4 ${
                  index % 2 === 0 ? "border-r border-gray-200" : ""
                }`}
                role="listitem"
              >
                <h3 className="text-xl font-inter-bold text-brand-secondary leading-tight mb-4">
                  {caseStudy.companyName}
                </h3>
                <p className="text-gray-500 font-inter-normal text-sm leading-relaxed mb-6">
                  {caseStudy.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleReadMore(caseStudy)}
                  className="text-brand-primary hover:text-brand-primary font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
                  aria-label={`Read more about ${caseStudy.companyName} case study`}
                >
                  {caseStudy.linkText}
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile: Single column with separators */}
        <div className="md:hidden">
          <div className="space-y-2" role="list">
            {caseStudies.map((caseStudy, index) => (
              <article
                key={caseStudy.id || index}
                className="text-start py-3 border-b border-gray-200 last:border-b-0"
                role="listitem"
              >
                <h3 className="text-xl font-inter-bold text-brand-secondary leading-tight mb-2">
                  {caseStudy.companyName}
                </h3>
                <p className="text-gray-500 font-inter-normal text-sm leading-relaxed mb-3">
                  {caseStudy.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleReadMore(caseStudy)}
                  className="text-brand-primary hover:text-brand-primary font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
                  aria-label={`Read more about ${caseStudy.companyName} case study`}
                >
                  {caseStudy.linkText}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
