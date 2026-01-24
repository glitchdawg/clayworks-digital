// components/PlanComparisonSection.tsx
import type { ReactNode } from "react";

interface PlanComparisonSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
  backgroundColor?: string;
}

export function PlanComparisonSection({
  title,
  subtitle,
  children,
  columns = 2,
  className = "",
  backgroundColor = "bg-white",
}: PlanComparisonSectionProps) {
  const gridColsClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
  }[columns];

  return (
    <section className={`pb-8 lg:pb-12 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:!text-4xl font-inter-medium text-black leading-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base lg:text-lg text-[#6B7280] font-inter-normal max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div
          className={`grid grid-cols-1 ${gridColsClass} gap-8 lg:gap-10 mx-auto`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
