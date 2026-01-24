// components/layout/ImageContentWithCards.tsx
import Image from "next/image";
import { LocationCard } from "../../features/locations/LocationCard";
import { Button } from "../../ui/button";
import { ImageContentSection } from "./ImageContent";

interface Card {
  title: string;
  address: string;
  travelTime: string;
  distance: string;
  hasPowerBackup: boolean;
}

interface ImageContentWithCardsProps {
  // Image & Content Section
  imagePosition?: "left" | "right";
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;

  // Cards Data
  cards: Card[];

  // CTA Button
  ctaText: string;
  ctaTextMobile?: string;

  // Optional customization
  cardsOverlapImage?: boolean;
  showCardsOnMobile?: boolean;
}

export function ImageContentWithCards({
  imagePosition = "left",
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  cards,
  ctaText,
  ctaTextMobile,
  cardsOverlapImage = true,
  showCardsOnMobile = true,
}: ImageContentWithCardsProps) {
  return (
    <div className="bg-white lg:px-6 py-16">
      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto">
        <ImageContentSection
          imagePosition={imagePosition}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {/* Cards Grid */}
        <div
          className={`grid grid-cols-4 gap-6 mb-12 ${cardsOverlapImage ? "relative -mt-28 z-10" : ""}`}
        >
          {cards.map((card, index) => (
            <LocationCard key={index} {...card} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
          >
            {ctaText}
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Text Section */}
        <div className="text-center mb-12 px-6">
          {eyebrow && (
            <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-6 text-3xl md:!text-3xl lg:!text-4xl font-inter-medium text-[#1A2C42]">
            {title}
          </h2>
          <p className="text-[#1A2C42] font-inter-normal">{description}</p>
        </div>

        {/* Horizontal Scroll Cards */}
        {showCardsOnMobile && (
          <div className="mb-12">
            <div
              className="overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-4 px-6 pb-4">
                {cards.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-[280px]">
                    <LocationCard {...card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center px-6">
          <Button
            variant="outline"
            size="lg"
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
          >
            {ctaTextMobile || ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
