"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Partner as StrapiPartner, getStrapiMediaUrl } from "@/app/lib/strapi";

interface Partner {
  id: string;
  name: string;
  logo: string;
}

interface PartnersSectionProps {
  partners?: StrapiPartner[];
}

const PartnersSection = ({ partners: strapiPartners = [] }: PartnersSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const defaultPartners: Partner[] = [
    { id: "1", name: "ViewSonic", logo: "/images/viewsonic.png" },
    { id: "2", name: "Jio", logo: "/images/jio.png" },
    { id: "3", name: "Aputero", logo: "/images/google.png" },
    { id: "4", name: "Ford Pro", logo: "/images/intel.png" },
    { id: "5", name: "ViewSonic", logo: "/images/viewsonic.png" },
    { id: "6", name: "Signzy", logo: "/images/google.png" },
  ];

  // Map Strapi partners to local interface if available, else use default
  const partners: Partner[] = strapiPartners.length > 0
    ? strapiPartners.map(p => ({
      id: String(p.id),
      name: p.name,
      logo: getStrapiMediaUrl(p.logo)
    }))
    : defaultPartners;

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed here (lower = slower, higher = faster)

    const animate = () => {
      if (isPaused) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled through one set of partners
      const maxScroll = scrollContainer.scrollWidth / 3;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      if (!isPaused) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPaused]);

  return (
    <section className="w-full pb-10 sm:py-16 lg:py-10 bg-white overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12 space-y-3">
          <p className="text-base font-inter-medium text-black uppercase tracking-wider mb-1">
            OUR PARTNERS
          </p>
          <h2 className="text-3xl md:!text-3xl lg:!text-4xl font-medium font-inter-medium text-[#2B2B2B] leading-tight">
            Trusted by Teams That Scale
          </h2>
        </div>

        {/* Logo Carousel */}
        <div className="relative w-full">
          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-16 sm:gap-20 lg:gap-24 xl:gap-32 overflow-hidden scrollbar-hide"
            role="list"
            aria-label="Partner logos carousel"
            aria-live="polite"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                role="listitem"
              >
                <div className="relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} partner logo`}
                    width={100}
                    height={100}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
