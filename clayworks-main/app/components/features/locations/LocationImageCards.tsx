import Image from "next/image";
import type React from "react";

type ImageItem = {
  src: string;
  alt: string;
};

interface LocationImageCardsProps {
  images: ImageItem[];
  description: string;
  className?: string;
}

const LocationImageCards: React.FC<LocationImageCardsProps> = ({
  images,
  description,
  className = "",
}) => {
  const visibleImages = images.slice(0, 4);

  return (
    <section className={`py-12 lg:py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {visibleImages.map((img, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx < 2}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl mx-auto text-base lg:!text-base font-inter-normal leading-relaxed text-[#1A2C42]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default LocationImageCards;
