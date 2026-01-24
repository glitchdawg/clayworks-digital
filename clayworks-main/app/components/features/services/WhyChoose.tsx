// components/WhyChooseUsSection.tsx
"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";

interface ListItem {
  title: string;
  description?: string;
  content?: string; // For accordion mode
}

interface WhyChooseUsSectionProps {
  // Content
  eyebrow?: string;
  title: string;
  description?: string;
  items: ListItem[];

  // Image
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";

  // Display mode
  mode?: "accordion" | "list"; // accordion has expandable items, list is just bullets
  defaultOpenIndex?: number; // For accordion mode

  // CTA
  ctaText?: string;
  ctaVariant?: "primary" | "secondary";
  onCtaClick?: () => void;
  showCta?: boolean;

  // Styling
  className?: string;
  backgroundColor?: string;
}

export function WhyChooseUsSection({
  eyebrow,
  title,
  description,
  items,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  mode = "accordion",
  defaultOpenIndex = 1,
  ctaText = "Schedule Call",
  ctaVariant = "secondary",
  onCtaClick,
  showCta = true,
  className = "",
  backgroundColor = "bg-white",
}: WhyChooseUsSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(
    mode === "accordion" ? defaultOpenIndex : -1,
  );

  const toggleItem = (index: number) => {
    if (mode === "accordion") {
      setOpenIndex(openIndex === index ? -1 : index);
    }
  };

  const isImageLeft = imagePosition === "left";
  const hasImage = imageSrc && imageAlt;

  const ctaVariantClasses = {
    primary: "bg-brand-secondary hover:bg-brand-secondary-hover text-white",
    secondary: "bg-brand-primary hover:bg-brand-primary-hover text-white",
  };

  return (
    <section className={`${backgroundColor} py-10 lg:!py-16 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Desktop Layout */}
        <div
          className={`hidden lg:flex lg:gap-12 lg:items-start ${!hasImage ? "max-w-4xl mx-auto" : ""}`}
        >
          {/* Image - Left Side */}
          {hasImage && isImageLeft && (
            <div className="w-[45%] flex-shrink-0">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <div className="mb-8">
              {eyebrow && (
                <p className="md:text-2xl text-base font-inter-normal tracking-wider text-black mb-1">
                  {eyebrow}
                </p>
              )}
              <h2 className="mb-8 text-text-heading text-3xl md:!text-3xl lg:!text-4xl font-inter-medium max-w-md">
                {title}
              </h2>
              {description && (
                <p className="text-base lg:text-lg text-text-muted font-inter-normal">
                  {description}
                </p>
              )}
            </div>

            {/* Items - Accordion Mode */}
            {mode === "accordion" && (
              <div
                className="space-y-4 mb-8"
                role="region"
                aria-label="Accordion"
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`border-l-4 ${
                      openIndex === index
                        ? "border-brand-primary"
                        : "border-transparent"
                    } hover:border-brand-primary transition-all duration-300 ease-in-out`}
                  >
                    <div className="flex items-start justify-between gap-4 p-4">
                      <div className="flex-1">
                        <h3
                          id={`accordion-heading-${index}`}
                          className={`font-inter-semibold text-xl ${
                            openIndex === index
                              ? "text-text-heading"
                              : "text-text-gray-light"
                          } transition-colors duration-300 ease-in-out`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`accordion-content-${index}`}
                        aria-labelledby={`accordion-heading-${index}`}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${
                          openIndex === index
                            ? "border-brand-primary bg-orange-50"
                            : "border-brand-primary bg-white hover:border-brand-primary"
                        }`}
                      >
                        {openIndex === index ? (
                          <Minus
                            className="w-4 h-4 text-brand-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <Plus
                            className="w-4 h-4 text-brand-primary"
                            aria-hidden="true"
                          />
                        )}
                        <span className="sr-only">
                          {openIndex === index ? "Collapse" : "Expand"}{" "}
                          {item.title}
                        </span>
                      </button>
                    </div>
                    {openIndex === index && item.content && (
                      <div
                        id={`accordion-content-${index}`}
                        role="region"
                        aria-labelledby={`accordion-heading-${index}`}
                        className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        <p className="text-text-gray-medium text-base font-inter-normal leading-relaxed pr-8">
                          {item.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Items - List Mode */}
            {mode === "list" && (
              <ul className="space-y-6 mb-8">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1A2C42] mt-2"></div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-inter-semibold text-[#1A2C42] mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm lg:text-base text-[#6B7280] font-inter-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Button */}
            {showCta && (
              <Button
                type="button"
                onClick={onCtaClick}
                className={`${ctaVariantClasses[ctaVariant]} font-inter-medium text-base px-12 py-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2`}
                style={{ boxShadow: "0px 15px 26px 0px #00000040" }}
              >
                {ctaText}
              </Button>
            )}
          </div>

          {/* Image - Right Side */}
          {hasImage && !isImageLeft && (
            <div className="w-[45%] flex-shrink-0">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="mb-8 text-center">
            {eyebrow && (
              <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
                {eyebrow}
              </p>
            )}
            <h2 className="mb-6 font-inter-medium text-3xl md:!text-3xl lg:!text-4xl text-[#2B2B2B]">
              {title}
            </h2>
            {description && (
              <p className="text-base text-[#6B7280] font-inter-normal">
                {description}
              </p>
            )}
          </div>

          {/* Mobile Image */}
          {hasImage && (
            <div className="relative h-[300px] rounded-3xl overflow-hidden mb-8">
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          {/* Items - Accordion Mode */}
          {mode === "accordion" && (
            <div
              className="space-y-3 mb-8"
              role="region"
              aria-label="Accordion"
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`border-l-4 rounded-r-xl transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "border-[#E07B39] bg-white"
                      : "border-transparent bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 p-4">
                    <div className="flex-1">
                      <h3
                        id={`mobile-accordion-heading-${index}`}
                        className={`text-lg font-inter-semibold ${
                          openIndex === index ? "text-black" : "text-[#5D5C5D]"
                        } transition-colors duration-300 ease-in-out`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`mobile-accordion-content-${index}`}
                      aria-labelledby={`mobile-accordion-heading-${index}`}
                      className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${
                        openIndex === index
                          ? "border-[#E07B39] bg-white"
                          : "border-[#E07B39] bg-white"
                      }`}
                    >
                      {openIndex === index ? (
                        <Minus
                          className="w-3 h-3 text-[#E07B39]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus
                          className="w-3 h-3 text-[#E07B39]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {openIndex === index ? "Collapse" : "Expand"}{" "}
                        {item.title}
                      </span>
                    </button>
                  </div>
                  {openIndex === index && item.content && (
                    <div
                      id={`mobile-accordion-content-${index}`}
                      role="region"
                      aria-labelledby={`mobile-accordion-heading-${index}`}
                      className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300"
                    >
                      <p className="text-[#5C5C5C] text-base font-inter-normal leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Items - List Mode */}
          {mode === "list" && (
            <ul className="space-y-5 mb-8">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1A2C42] mt-2"></div>
                  <div className="flex-1">
                    <h3 className="text-base font-inter-semibold text-[#1A2C42] mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-[#6B7280] font-inter-normal leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Button */}
          {showCta && (
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={onCtaClick}
                className={`${ctaVariantClasses[ctaVariant]} py-4 px-16 text-base font-inter-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2`}
                style={{ boxShadow: "0px 15px 26px 0px #00000040" }}
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
