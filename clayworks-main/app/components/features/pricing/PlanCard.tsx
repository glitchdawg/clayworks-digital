// components/PlanCard.tsx
"use client";

import Image from "next/image";
import { Button } from "../../ui/button";
import type { ReactNode, CSSProperties } from "react";

interface Feature {
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
}

interface SponsorBadge {
  text: string;
  logo: string;
  logoAlt: string;
}

interface Tag {
  label: string;
  variant?: "default" | "outline";
}

interface PlanCardProps {
  // Layout
  layout?: "horizontal" | "vertical";
  imagePosition?: "left" | "right";
  size?: "default" | "large"; // For case study hero cards

  // Content
  // Optional section header rendered above the card
  sectionEyebrow?: string;
  sectionTitle?: string;
  eyebrow?: string;
  heading: string;
  headingMobile?: string;
  description?: string; // Optional description for case studies
  imageSrc?: string; // Make image optional
  imageAlt?: string;
  features?: Feature[]; // Optional features
  sponsorBadge?: SponsorBadge;
  tags?: Tag[]; // Optional tags for case studies

  // CTA
  ctaText: string;
  ctaTextMobile?: string;
  ctaVariant?: "button" | "link"; // Button or link style
  onCtaClick?: () => void; // Optional - component handles internally if not provided

  // Styling
  className?: string;
  style?: CSSProperties;
  imageClassName?: string;
  cardShadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  cardRadius?: "lg" | "xl" | "2xl" | "3xl";
  buttonRadius?: "md" | "lg" | "xl" | "full";
  customShadow?: string;
  outerClassName?: string;
}

export function PlanCard({
  layout = "horizontal",
  imagePosition = "left",
  size = "default",
  sectionEyebrow,
  sectionTitle,
  eyebrow,
  heading,
  headingMobile,
  description,
  imageSrc,
  imageAlt,
  features,
  sponsorBadge,
  tags,
  ctaText,
  ctaTextMobile,
  ctaVariant = "button",
  onCtaClick,
  className = "",
  style,
  imageClassName = "",
  cardShadow = "xl",
  cardRadius = "3xl",
  buttonRadius = "lg",
  customShadow,
  outerClassName = "",
}: PlanCardProps) {
  const isImageLeft = imagePosition === "left";
  const hasImage = imageSrc && imageAlt;

  const baseOuterClassName = "px-4 sm:px-6 lg:px-8";
  const wrapperClassName =
    `${baseOuterClassName}${outerClassName ? ` ${outerClassName}` : ""}${className ? ` ${className}` : ""}`.trim();

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  const radiusClasses = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  const buttonRadiusClasses = {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // Text-only card (no image)
  if (!hasImage) {
    return (
      <div className={wrapperClassName} style={style}>
        <div
          className={`bg-white ${radiusClasses[cardRadius]} ${customShadow ? "" : shadowClasses[cardShadow]} p-8 lg:p-10 h-full`}
          style={customShadow ? { boxShadow: customShadow } : {}}
        >
          {eyebrow && (
            <p className="text-xs font-inter-medium text-[#6B7280] uppercase tracking-wider mb-2">
              {eyebrow}
            </p>
          )}

          <h3 className="text-xl lg:!text-3xl font-inter-semibold text-[#1F2937] mb-4 leading-tight">
            {heading}
          </h3>

          {description && (
            <p className="text-sm lg:!text-base text-[#1C1C1C] font-inter-normal leading-relaxed mb-5">
              {description}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-xs font-inter-medium ${tag.variant === "outline"
                      ? "border border-[#DDDDDD] text-[#6B7280] bg-white"
                      : "text-[#374151] border border-[#DDDDDD]"
                    }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          {ctaVariant === "link" ? (
            <button
              type="button"
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  // TODO: Implement navigation or action for CTA button

                }
              }}
              className="text-brand-primary font-inter-medium text-sm hover:text-brand-primary-hover transition-colors duration-200 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
            >
              {ctaText}
            </button>
          ) : (
            <button
              type="button"
              className={`w-full border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-all duration-200 py-2.5 px-6 text-sm font-inter-medium focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${buttonRadiusClasses[buttonRadius]}`}
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  // TODO: Implement navigation or action for CTA button

                }
              }}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName} style={style}>
      {/* Optional Section Header */}
      {(sectionEyebrow || sectionTitle) && (
        <div className="mb-6 lg:mb-8">
          {sectionEyebrow && (
            <p className="text-base lg:text-base font-inter-normal text-black uppercase tracking-wider mb-2">
              {sectionEyebrow}
            </p>
          )}
          {sectionTitle && (
            <h2
              className={`${size === "large" ? "text-3xl lg:!text-4xl" : "text-4xl"} font-inter-semibold text-[#2B2B2B] mb-4 leading-tight`}
            >
              {sectionTitle}
            </h2>
          )}
        </div>
      )}
      {/* Desktop Layout */}
      <div
        className={`hidden lg:flex lg:items-stretch lg:gap-0 lg:mx-auto bg-white ${radiusClasses[cardRadius]} ${customShadow ? "" : shadowClasses[cardShadow]} overflow-hidden min-h-[500px]`}
        style={customShadow ? { boxShadow: customShadow } : {}}
      >
        {/* Image Section */}
        <div
          className={`relative w-1/2 ${isImageLeft ? "order-1" : "order-2"}`}
        >
          <div className={`relative w-full h-full overflow-hidden`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={`object-cover ${imageClassName}`}
            />
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`w-1/2 ${isImageLeft ? "order-2" : "order-1"} p-8 lg:p-10 flex flex-col justify-center`}
        >
          {eyebrow && (
            <p className="text-base lg:text-base font-inter-normal text-black uppercase tracking-wider mb-3">
              {eyebrow}
            </p>
          )}

          <h2
            className={`${size === "large" ? "text-3xl lg:!text-3xl" : "text-3xl"} max-w-sm font-inter-semibold text-[#2B2B2B] mb-4 leading-tight`}
          >
            {heading}
          </h2>

          {/* Description (for case studies) */}
          {description && (
            <p className="text-sm lg:!text-base text-[#1C1C1C] font-inter-normal leading-relaxed mb-6">
              {description}
            </p>
          )}

          {/* Features List (for plans) */}
          {features && features.length > 0 && (
            <ul className="space-y-4 mb-6" role="list">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-black"
                    aria-hidden="true"
                  >
                    {feature.imageSrc ? (
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt || feature.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      feature.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[#1C1C1C] font-inter-semibold text-base leading-relaxed">
                        {feature.title}
                      </p>
                      {feature.subtitle && (
                        <p className="text-[#404040] font-inter-normal text-base">
                          {feature.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Tags (for case studies) */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-xs font-inter-medium ${tag.variant === "outline"
                      ? "border border-[#DDDDDD] text-[#6B7280] bg-white"
                      : "text-[#374151] border border-[#DDDDDD]"
                    }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}

          {/* Sponsor Badge */}
          {sponsorBadge && (
            <div className="bg-bg-accent rounded-lg px-4 mb-6 flex items-center gap-3 w-fit">
              <span className="text-text-body font-inter-semibold text-base">
                {sponsorBadge.text}
              </span>
              <Image
                src={sponsorBadge.logo}
                alt={sponsorBadge.logoAlt}
                width={100}
                height={40}
                className="object-contain"
              />
            </div>
          )}

          {/* CTA */}
          {ctaVariant === "link" ? (
            <button
              type="button"
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  // TODO: Implement navigation or action for CTA button

                }
              }}
              className="text-brand-primary font-inter-medium text-sm hover:text-brand-primary-hover transition-colors duration-200 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
            >
              {ctaText}
            </button>
          ) : (
            <button
              type="button"
              className={`w-full max-w-xs border border-border-gray text-text-gray hover:bg-bg-secondary hover:border-border-gray-light transition-all duration-200 py-2.5 px-6 text-sm font-inter-medium focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${buttonRadiusClasses[buttonRadius]}`}
              onClick={() => {
                if (onCtaClick) {
                  onCtaClick();
                } else {
                  // TODO: Implement navigation or action for CTA button

                }
              }}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div
          className={`bg-white ${radiusClasses[cardRadius]} ${customShadow ? "" : shadowClasses[cardShadow]} overflow-hidden`}
          style={customShadow ? { boxShadow: customShadow } : {}}
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={`object-cover ${imageClassName}`}
            />
          </div>

          {/* Content */}
          <div className="lg:!p-6 p-4">
            {eyebrow && (
              <p className="text-base font-inter-normal text-[#404040] uppercase tracking-wider mb-2">
                {eyebrow}
              </p>
            )}

            <h2 className="text-2xl font-inter-semibold text-[#2B2B2B] mb-3 leading-tight">
              {headingMobile || heading}
            </h2>

            {/* Description */}
            {description && (
              <p className="text-base text-[#404040] font-inter-normal leading-relaxed mb-5">
                {description}
              </p>
            )}

            {/* Features List */}
            {features && features.length > 0 && (
              <ul className="space-y-4 mb-5" role="list">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3"
                    role="listitem"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-black"
                      aria-hidden="true"
                    >
                      {feature.imageSrc ? (
                        <Image
                          src={feature.imageSrc}
                          alt={feature.imageAlt || feature.title}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        feature.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <p className="text-[#1C1C1C] font-inter-semibold text-sm leading-relaxed break-words">
                          {feature.title}
                        </p>
                        {feature.subtitle && (
                          <p className="text-[#404040] font-inter-normal text-sm break-words">
                            {feature.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 rounded-full text-xs font-inter-medium ${tag.variant === "outline"
                        ? "border border-[#DDDDDD] text-[#6B7280] bg-white"
                        : "text-[#374151] border border-[#DDDDDD]"
                      }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}

            {/* Sponsor Badge */}
            {sponsorBadge && (
              <div className="bg-[#E5EEF8] rounded-lg p-3 mb-5 flex items-center gap-2 w-full">
                <span className="text-[#1C1C1C] font-inter-semibold text-sm whitespace-nowrap">
                  {sponsorBadge.text}
                </span>
                <Image
                  src={sponsorBadge.logo}
                  alt={sponsorBadge.logoAlt}
                  width={80}
                  height={30}
                  className="object-contain flex-shrink-0"
                />
              </div>
            )}

            {/* CTA */}
            {ctaVariant === "link" ? (
              <button
                type="button"
                onClick={() => {
                  if (onCtaClick) {
                    onCtaClick();
                  } else {
                    // TODO: Implement navigation or action for CTA button

                  }
                }}
                className="text-brand-primary font-inter-medium text-sm hover:text-brand-primary-hover transition-colors duration-200 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 rounded"
              >
                {ctaTextMobile || ctaText}
              </button>
            ) : (
              <button
                type="button"
                className={`w-full border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-all duration-200 py-2.5 px-6 text-sm font-inter-medium focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${buttonRadiusClasses[buttonRadius]}`}
                onClick={() => {
                  if (onCtaClick) {
                    onCtaClick();
                  } else {
                    // TODO: Implement navigation or action for CTA button

                  }
                }}
              >
                {ctaTextMobile || ctaText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
