import React from "react";

interface ProcessStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

export function ProcessStepCard({
  stepNumber,
  title,
  description,
}: ProcessStepCardProps) {
  return (
    <article
      className="bg-primary rounded-2xl p-6 md:p-8 h-full"
      style={{
        boxShadow:
          "0px 4px 9px 0px #0000000D, 0px 16px 16px 0px #0000000A, 0px 36px 22px 0px #00000008, 0px 65px 26px 0px #00000003, 0px 101px 28px 0px #00000000",
      }}
    >
      {/* Step Number */}
      <div className="mb-4 text-left">
        <span className="text-2xl md:!text-3xl lg:!text-4xl font-inter-semibold text-text-gray-light">
          {stepNumber}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:!text-xl lg:!text-2xl font-inter-semibold text-text-gray-light mb-3 text-left">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:!text-base text-text-gray-light font-inter-normal leading-relaxed text-left">
        {description}
      </p>
    </article>
  );
}
