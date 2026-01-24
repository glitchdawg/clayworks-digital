import Image from "next/image";
import { Icon } from "@iconify/react";

type ProximityItem = {
  icon: "airport" | "metro" | "bus" | "hotel" | "building" | "city";
  label: string;
  distance: string; // e.g., "23 KM"
};

interface LocationProximityProps {
  eyebrow?: string;
  title: string;
  mapImage: { src: string; alt: string };
  items: ProximityItem[];
  className?: string;
}

const iconMap: Record<ProximityItem["icon"], string> = {
  airport: "mdi:airplane",
  metro: "mdi:subway-variant",
  bus: "mdi:bus",
  hotel: "mdi:bed-king-outline",
  building: "mdi:office-building-outline",
  city: "mdi:city-variant-outline",
};

export function LocationProximity({
  eyebrow = "LOCATION & PROXIMITY",
  title,
  mapImage,
  items,
  className = "",
}: LocationProximityProps) {
  return (
    <section className={`bg-white py-12 lg:py-16 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-start">
          {/* Map */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-sm order-1 lg:order-none">
            <Image
              src={mapImage.src}
              alt={mapImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="">
            {eyebrow && (
              <p className="text-base lg:!text-base font-inter-medium text-black tracking-wider uppercase mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl lg:!text-4xl font-inter-medium text-black leading-tight mb-3">
              {title}
            </h2>

            <ul className="">
              {items.map((item) => (
                <li
                  key={`${item.label}-${item.distance}`}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      icon={iconMap[item.icon]}
                      className="w-4 h-4 lg:!w-5 lg:!h-5 text-[#5D5C5D] mt-0.5"
                    />
                    <span className="text-[#5D5C5D] font-inter-normal text-sm lg:text-lg">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[#5D5C5D] font-inter-semibold text-sm lg:!text-base">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
