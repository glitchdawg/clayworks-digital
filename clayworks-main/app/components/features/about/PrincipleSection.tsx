// components/PrincipleSection.tsx
import Image from "next/image";

interface PrincipleCard {
  imageSrc: string;
  title: string;
  description: string;
}

interface PrincipleSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  cards: PrincipleCard[];
  className?: string;
}

export function PrincipleSection({
  eyebrow,
  title,
  description,
  cards,

  className = "",
}: PrincipleSectionProps) {
  return (
    <section className={`pt-12 lg:!pt-16 bg-white relative ${className}`}>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 max-w-4xl mx-auto">
          <p className="text-base lg:!text-base font-inter-medium text-black uppercase tracking-wider mb-2">
            {eyebrow}
          </p>
          <h2 className="text-3xl lg:!text-4xl max-w-2xl mx-auto  font-inter-medium text-[#1A2C42] leading-tight mb-4">
            {title}
          </h2>
          <p className="text-sm lg:text-base text-[#1A2C42] max-w-xl mx-auto font-inter-normal leading-relaxed ">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {cards.map((card) => (
            <li key={card.title}>
              <PrincipleCard
                imageSrc={card.imageSrc}
                title={card.title}
                description={card.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Individual Principle Card Component
function PrincipleCard({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) {
  return (
    <article
      className="bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300 p-8 lg:p-10 text-center"
      style={{ boxShadow: "0px 28.83px 28.83px 0px #00000026" }}
    >
      {/* Icon */}
      <div className="mb-6 flex justify-center" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={`${title} principle icon`}
          width={80}
          height={80}
        />
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-inter-semibold text-[#1A2C42] mb-4 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm lg:text-base text-[#6B7280] font-inter-normal leading-relaxed">
        {description}
      </p>
    </article>
  );
}
