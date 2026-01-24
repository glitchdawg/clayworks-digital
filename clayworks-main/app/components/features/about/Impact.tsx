// components/ImpactSection.tsx
import { ReactNode } from "react";
import Image from "next/image";

interface StatCard {
  imageSrc: string;
  value: string;
  label: string;
}

interface ImpactSectionProps {
  eyebrow: string;
  title: string;
  stats: StatCard[];
  className?: string;
}

export function ImpactSection({
  eyebrow,
  title,
  stats,
  className = "",
}: ImpactSectionProps) {
  return (
    <section className={`py-8 lg:py-12 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-base lg:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl lg:!text-4xl max-w-2xl mx-auto  font-inter-medium text-[#1A2C42] leading-tight">
            {title}
          </h2>
        </div>

        {/* Stats Grid - Desktop: Asymmetric layout, Mobile: Stacked */}
        <div className="max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Top Row - 3 cards */}
            <ul className="grid grid-cols-3 gap-6 mb-6" role="list">
              {stats.slice(0, 3).map((stat, index) => (
                <li key={index} role="listitem">
                  <StatCard
                    imageSrc={stat.imageSrc}
                    value={stat.value}
                    label={stat.label}
                  />
                </li>
              ))}
            </ul>

            {/* Bottom Row - 2 cards centered */}
            <ul className="flex justify-center gap-6" role="list">
              {stats.slice(3, 5).map((stat, index) => (
                <li
                  key={index}
                  className="w-full max-w-[calc(33.333%-1rem)]"
                  role="listitem"
                >
                  <StatCard
                    imageSrc={stat.imageSrc}
                    value={stat.value}
                    label={stat.label}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Layout - Stacked */}
          <ul className="lg:hidden space-y-4" role="list">
            {stats.map((stat, index) => (
              <li key={index} role="listitem">
                <StatCard
                  imageSrc={stat.imageSrc}
                  value={stat.value}
                  label={stat.label}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Individual Stat Card Component
function StatCard({
  imageSrc,
  value,
  label,
}: {
  imageSrc: string;
  value: string;
  label: string;
}) {
  return (
    <article
      className="bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300 p-8 lg:text-center text-left h-full"
      style={{
        boxShadow:
          "0px 5px 11px 0px #0000000D, 0px 20px 20px 0px #0000000A, 0px 45px 27px 0px #00000008, 0px 79px 32px 0px #00000003, 0px 124px 35px 0px #00000000",
      }}
    >
      <div className="lg:block flex items-center gap-4">
        {/* Image */}
        <div
          className="lg:mb-4 mb-0 flex lg:justify-center justify-start"
          aria-hidden="true"
        >
          <Image
            src={imageSrc}
            alt={`${label} statistic icon`}
            width={64}
            height={64}
          />
        </div>

        {/* Text */}
        <div>
          {/* Value */}
          <div className="text-xl lg:!text-xl font-inter-semibold text-black mb-2">
            {value}
          </div>

          {/* Label */}
          <p className="text-sm lg:!text-base text-black font-inter-normal">
            {label}
          </p>
        </div>
      </div>
    </article>
  );
}
