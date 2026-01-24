// components/PhilosophySection.tsx
interface PhilosophySectionProps {
  eyebrow: string;
  title: string;
  description1: string;
  description2: string;
  className?: string;
  backgroundColor?: string;
}

export function PhilosophySection({
  eyebrow,
  title,
  description1,
  description2,
  className = "",
  backgroundColor = "bg-[#E5EEF8]",
}: PhilosophySectionProps) {
  return (
    <section className={`py-8 lg:py-16 ${className}`}>
      <div className="container mx-auto px-6">
        <div
          className={`${backgroundColor} rounded-2xl px-8 py-12 lg:px-16 lg:py-10`}
        >
          {/* Eyebrow */}
          <p className="text-base lg:text-base font-inter-medium text-black uppercase tracking-wider mb-2 lg:mb-3">
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="text-2xl lg:!text-4xl font-inter-medium text-[#2B2B2B] mb-8 lg:mb-12 max-w-sm leading-tight">
            {title}
          </h2>

          {/* Description - Two Column on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <p className="text-sm lg:text-base text-[#1A2C42] font-inter-normal leading-relaxed">
              {description1}
            </p>
            <p className="text-sm lg:text-base text-[#1A2C42] font-inter-normal leading-relaxed">
              {description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
