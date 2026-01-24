// components/OffersSection.tsx
import Image from "next/image";

interface OfferCard {
  title: string;
  description: string;
}

interface CenterImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface OffersSectionProps {
  title: string;
  subtitle?: string;
  centerImage: CenterImage;
  cards: OfferCard[];
  className?: string;
}

export function OffersSection({
  title,
  subtitle,
  centerImage,
  cards,
  className = "",
}: OffersSectionProps) {
  return (
    <section className={`py-10 lg:py-0 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Title - Mobile */}
        <h2 className="text-2xl lg:!text-4xl font-inter-medium text-[#2B2B2B] text-center mb-4 lg:hidden mx-auto max-w-sm">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-[#1A2C42] text-center mb-12 lg:hidden">
            {subtitle}
          </p>
        )}

        {/* Desktop Layout - Circular Pattern */}
        <div className="hidden lg:block relative max-w-7xl mx-auto">
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: "900px" }}
          >
            {/* Title - Desktop positioned to touch outer circle */}
            <h2 className="absolute top-[60px] left-1/2 transform -translate-x-1/2 text-2xl lg:!text-4xl font-inter-medium text-[#2B2B2B] text-center mx-auto max-w-sm z-30">
              {title}
            </h2>
            {subtitle && (
              <p className="absolute top-[180px] left-1/2 transform -translate-x-1/2 text-lg text-[#1A2C42] text-center z-30">
                {subtitle}
              </p>
            )}
            {/* Background Circles - Larger circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="900"
                height="900"
                viewBox="0 0 900 900"
                className="opacity-30"
              >
                {/* Outer circle */}
                <circle
                  cx="450"
                  cy="450"
                  r="330"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />

                {/* Middle circle */}
                <circle
                  cx="450"
                  cy="450"
                  r="250"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />

                {/* Inner circle */}
                <circle
                  cx="450"
                  cy="450"
                  r="170"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Center Image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-full h-full">
                <Image
                  src={centerImage.src}
                  alt={centerImage.alt}
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* Top Left Card */}
            {cards[0] && (
              <div
                className="absolute z-20 w-72"
                style={{ top: "12%", left: "8%" }}
              >
                <OfferCard
                  title={cards[0].title}
                  description={cards[0].description}
                />
              </div>
            )}

            {/* Top Right Card */}
            {cards[1] && (
              <div
                className="absolute z-20 w-72"
                style={{ top: "12%", right: "8%" }}
              >
                <OfferCard
                  title={cards[1].title}
                  description={cards[1].description}
                />
              </div>
            )}

            {/* Middle Right Card */}
            {cards[2] && (
              <div
                className="absolute z-20 w-72"
                style={{
                  top: "50%",
                  right: "8%",
                  transform: "translateY(-50%)",
                }}
              >
                <OfferCard
                  title={cards[2].title}
                  description={cards[2].description}
                />
              </div>
            )}

            {/* Middle Left Card */}
            {cards[3] && (
              <div
                className="absolute z-20 w-72"
                style={{
                  top: "50%",
                  left: "8%",
                  transform: "translateY(-50%)",
                }}
              >
                <OfferCard
                  title={cards[3].title}
                  description={cards[3].description}
                />
              </div>
            )}

            {/* Bottom Center Card */}
            {cards[4] && (
              <div
                className="absolute z-20 w-80"
                style={{
                  bottom: "16%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <OfferCard
                  title={cards[4].title}
                  description={cards[4].description}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="lg:hidden space-y-6">
          {/* Center Image */}
          <div className="flex justify-center items-center mb-8">
            <Image
              src={centerImage.src}
              alt={centerImage.alt}
              width={100}
              height={100}
            />
          </div>

          {/* Cards */}
          <ul className="space-y-6" role="list">
            {cards.map((card, index) => (
              <li key={index} role="listitem">
                <OfferCard title={card.title} description={card.description} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Individual Card Component
function OfferCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article
      className="bg-white rounded-2xl px-6 py-4 transition-shadow duration-300 hover:shadow-lg"
      style={{
        boxShadow:
          "0px 4px 9px 0px #0000000D, 0px 16px 16px 0px #0000000A, 0px 36px 22px 0px #00000008, 0px 65px 26px 0px #00000003, 0px 101px 28px 0px #00000000",
      }}
    >
      <h3 className="text-lg lg:text-xl font-inter-semibold text-[#1A2C42] mb-2">
        {title}
      </h3>
      <p className="text-xs lg:!text-xs text-[#6B7280] font-inter-normal leading-relaxed">
        {description}
      </p>
    </article>
  );
}
