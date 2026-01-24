// components/PricingCard.tsx
import Image from "next/image";
import { ReactNode } from "react";

interface Badge {
  label: string;
  variant?: "default" | "outline" | "filled";
}

interface PricingCardProps {
  // Image
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;

  // Content
  title: string;
  description?: string;
  badges?: Badge[];

  // Pricing
  price?: string;
  pricePrefix?: string; // e.g., "From", "Starting at"
  priceSuffix?: string; // e.g., "/month", "/year"

  // Features (optional list)
  features?: string[];

  // CTA
  ctaText: string;
  ctaVariant?: "primary" | "secondary" | "outline";
  onCtaClick?: () => void;

  // Styling
  className?: string;
  cardRadius?: "lg" | "xl" | "2xl" | "3xl";
  cardShadow?: "sm" | "md" | "lg" | "xl" | "2xl";
  featured?: boolean; // Highlight as featured plan
}

export function PricingCard({
  imageSrc,
  imageAlt,
  imageClassName = "",
  title,
  description,
  badges,
  price,
  pricePrefix = "From",
  priceSuffix = "/month",
  features,
  ctaText,
  ctaVariant = "outline",
  onCtaClick,
  className = "",
  cardRadius = "2xl",
  cardShadow = "xl",
  featured = false,
}: PricingCardProps) {
  const radiusClasses = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  const ctaVariantClasses = {
    primary: "bg-brand-secondary text-white hover:bg-brand-secondary-hover",
    secondary: "bg-brand-primary text-white hover:bg-brand-primary-hover",
    outline:
      "border border-text-slate text-text-slate hover:bg-bg-secondary hover:border-border-gray-light",
  };

  return (
    <div
      className={`bg-white ${radiusClasses[cardRadius]} ${shadowClasses[cardShadow]} overflow-hidden ${className}`}
    >
      {/* Image */}
      {imageSrc && imageAlt && (
        <div className="relative w-full aspect-[2/1] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover ${imageClassName}`}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 lg:p-8">
        {/* Title */}
        <h3 className="text-xl lg:!text-2xl font-inter-semibold text-text-dark mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm lg:!text-base text-text-muted font-inter-normal leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-inter-medium ${
                  badge.variant === "filled"
                    ? "bg-brand-secondary text-white"
                    : badge.variant === "outline"
                      ? "border border-border-gray text-text-muted bg-white"
                      : "text-text-gray border border-border-dark"
                }`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-4" role="list">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-text-muted"
                role="listitem"
              >
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        {price && (
          <div className="mb-6">
            <p className="text-2xl lg:!text-2xl font-inter-semibold text-text-body">
              {pricePrefix && (
                <span className="text-base lg:text-lg font-inter-normal text-text-muted mr-2">
                  {pricePrefix}
                </span>
              )}
              {price}
              {priceSuffix && (
                <span className="text-base lg:text-lg font-inter-normal text-text-muted">
                  {priceSuffix}
                </span>
              )}
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          type="button"
          onClick={onCtaClick}
          className={`w-full py-3 px-6 rounded-lg font-inter-medium text-sm lg:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 min-h-[44px] flex items-center justify-center ${ctaVariantClasses[ctaVariant]}`}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
