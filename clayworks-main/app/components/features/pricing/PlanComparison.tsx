// components/PlanComparisonCard.tsx
import Image from "next/image";

interface PlanFeature {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
}

interface SponsorBadge {
  text: string;
  logo: string;
  logoAlt: string;
}

interface PlanComparisonCardProps {
  eyebrow: string;
  title: string;
  features: PlanFeature[];
  sponsorBadge?: SponsorBadge;
  ctaText: string;
  className?: string;
}

export function PlanComparisonCard({
  eyebrow,
  title,
  features,
  sponsorBadge,
  ctaText,
  className = "",
}: PlanComparisonCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl p-8 lg:p-10 h-full flex flex-col ${className}`}
    >
      {/* Eyebrow */}
      <p className="text-base lg:!text-base font-inter-normal text-black uppercase tracking-wider mb-2">
        {eyebrow}
      </p>

      {/* Title */}
      <h3 className="text-2xl lg:!text-3xl font-inter-semibold text-[#2B2B2B] mb-8 leading-tight">
        {title}
      </h3>

      {/* Features */}
      <ul className="space-y-6 mb-8 flex-1" role="list">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4" role="listitem">
            <div
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
              aria-hidden="true"
            >
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt || feature.title}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="flex-1 pt-1">
              <p className="text-[#1C1C1C] font-inter-bold text-base lg:text-lg leading-relaxed">
                {feature.title}
                {feature.subtitle && (
                  <span className="font-inter-normal font-normal text-[#404040]">
                    {" "}
                    {feature.subtitle}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Sponsor Badge */}
      {sponsorBadge && (
        <div className="bg-[#E5EEF8] rounded-lg px-3 mb-5 inline-flex items-center gap-6 w-fit">
          <span className="text-[#1C1C1C] font-inter-semibold text-base">
            {sponsorBadge.text}
          </span>
          <Image
            src={sponsorBadge.logo}
            alt={sponsorBadge.logoAlt}
            width={80}
            height={30}
            className="object-contain"
          />
        </div>
      )}

      {/* CTA Button */}
      <button
        type="button"
        className="w-full border-2 border-[#D1D5DB] text-[#1A2C42] hover:bg-[#F9FAFB] hover:border-[#9CA3AF] transition-all duration-200 py-3 px-6 rounded-xl text-base font-inter-medium focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
      >
        {ctaText}
      </button>
    </div>
  );
}
