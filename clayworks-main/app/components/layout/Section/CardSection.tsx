// components/layout/CardSection.tsx
import type { ReactNode } from "react";
import { Button } from "../../ui/button";

interface CardData {
  [key: string]: any;
}

interface CardSectionProps<T extends CardData> {
  // Header
  eyebrow?: string;
  title?: string;

  // Cards
  cards: T[];
  renderCard: (card: T, index: number) => ReactNode;

  // Layout
  desktopGridColumns?: 3 | 4 | 5;
  mobileCardWidth?: string;
  desktopCardWidth?: string;
  forceCarousel?: boolean;

  // CTA
  ctaText: string;
  onCtaClick?: () => void;

  // Styling
  className?: string;
  headerClassName?: string;
  cardsContainerClassName?: string;
}

export function CardSection<T extends CardData>({
  eyebrow,
  title,
  cards,
  renderCard,
  desktopGridColumns = 4,
  mobileCardWidth = "85%",
  desktopCardWidth,
  forceCarousel = false,
  ctaText,
  onCtaClick,
  className = "bg-white py-8 lg:py-12",
  headerClassName = "",
  cardsContainerClassName = "lg:pl-6",
}: CardSectionProps<T>) {
  const showDesktopCarousel =
    forceCarousel || cards.length > desktopGridColumns;

  // Calculate desktop card width for carousel
  const calculateDesktopCardWidth = () => {
    if (desktopCardWidth) return desktopCardWidth;
    const gap = 1.5; // 6 = 1.5rem in gap-6
    return `calc(${100 / desktopGridColumns}% - ${gap}rem)`;
  };

  const gridColsClass = {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
  }[desktopGridColumns];

  return (
    <section className={className}>
      <div className={cardsContainerClassName}>
        {/* Header */}
        <div
          className={`text-center mb-6 lg:mb-12 space-y-4 ${headerClassName}`}
        >
          {eyebrow && (
            <p className="text-base font-inter-normal text-black uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium font-inter-medium text-[#2B2B2B] leading-tight">
              {title}
            </h2>
          )}
        </div>

        {/* Desktop Grid (when cards <= columns) */}
        {!showDesktopCarousel && (
          <div className={`hidden lg:grid ${gridColsClass} lg:gap-6`}>
            {cards.map((card, index) => (
              <div key={(card && (card.id ?? card.slug)) || index}>
                {renderCard(card, index)}
              </div>
            ))}
          </div>
        )}

        {/* Desktop Horizontal Scroll (when cards > columns) */}
        {showDesktopCarousel && (
          <div className="hidden lg:block">
            <div
              className="overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-6 pb-12 pl-0">
                {cards.map((card, index) => (
                  <div
                    key={(card && (card.id ?? card.slug)) || index}
                    className="flex-shrink-0"
                    style={{ width: calculateDesktopCardWidth() }}
                  >
                    {renderCard(card, index)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-4 px-6 pb-4">
              {cards.map((card, index) => (
                <div
                  key={(card && (card.id ?? card.slug)) || index}
                  className="flex-shrink-0"
                  style={{ width: mobileCardWidth }}
                >
                  {renderCard(card, index)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        </div> */}
      </div>
    </section>
  );
}
