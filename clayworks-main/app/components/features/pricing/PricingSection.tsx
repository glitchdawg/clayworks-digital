// components/PricingSection.tsx
import type { ReactNode } from "react";

interface PricingSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function PricingSection({
  eyebrow,
  title,
  description,
  children,
  columns = 3,
  className = "",
}: PricingSectionProps) {
  const gridColsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[columns];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          {eyebrow && (
            <p className="text-base lg:!text-base font-inter-medium text-black uppercase tracking-wider mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl lg:!text-4xl font-inter-medium text-[#2B2B2B] leading-tight max-w-sm mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-base lg:text-lg text-[#6B7280] font-inter-normal max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
