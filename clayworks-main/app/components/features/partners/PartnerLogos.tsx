import React from "react";
import Image from "next/image";

interface PartnerLogosProps {
  logos: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
}

export function PartnerLogos({ logos }: PartnerLogosProps) {
  return (
    <div className="py-4 md:!py-12">
      <div className="container mx-auto ">
        <ul
          className="grid md:grid-cols-3 grid-cols-1 items-center justify-center gap-12 md:!gap-12 lg!:gap-16"
          role="list"
          aria-label="Partner logos"
        >
          {logos.map((logo, index) => (
            <li
              key={index}
              className="flex items-center justify-center"
              role="listitem"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 60}
                className="object-contain h-auto"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
